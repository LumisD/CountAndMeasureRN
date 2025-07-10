import {CountState} from "../../CountState";
import {MeasureAndCountRepository} from "../../../../data/repository/MeasureAndCountRepository";
import {CountEffect, SHOW_SNACKBAR, SHARE_UNION} from "../../CountEffect";
import {toObjectIdOrUndefined} from "../../../../data/db/utils";
import {getDefaultUnionTitle} from "../../../utils/generalUtils";
import {
  ChipboardUI,
  getShareableString,
  mapChipboardToChipboardUi,
} from "../../models/ChipboardUI";
import {createPlatformShareIntent} from "../../../utils/shareIntent";
import {t} from "i18next";

export async function handleShareUnion(
  repo: MeasureAndCountRepository,
  get: () => {state: CountState},
): Promise<{newState: CountState; effect?: CountEffect}> {
  console.log("MaC handleShareUnion started");
  const currentState = get().state;
  const currentUnion = currentState.unionOfChipboards;
  const unionId = toObjectIdOrUndefined(currentUnion.id);

  if (!unionId) {
    console.error(`handleShareUnion: invalid unionId: ${currentUnion.id}`);
    return {newState: currentState};
  }

  const chipboards = (await repo.getChipboardsByUnionId(unionId)).map(
    mapChipboardToChipboardUi,
  );
  if (chipboards.length === 0) {
    return {
      newState: currentState,
      effect: {
        type: SHOW_SNACKBAR,
        message: t("no_chipboards_to_share"),
      },
    };
  }

  const unknownChipboards = chipboards.filter(it => it.state === 2);
  const notFoundChipboards = chipboards.filter(it => it.state === 0);
  const foundChipboards = chipboards.filter(it => it.state === 1);

  const foundWithRealSize = foundChipboards.filter(
    it =>
      parseFloat(it.realSize1) > 0 ||
      parseFloat(it.realSize2) > 0 ||
      parseFloat(it.realSize3) > 0,
  );

  const foundWithoutRealSize = foundChipboards.filter(
    it =>
      parseFloat(it.realSize1) <= 0 &&
      parseFloat(it.realSize2) <= 0 &&
      parseFloat(it.realSize3) <= 0,
  );

  const unionTitle = currentUnion.title || getDefaultUnionTitle();

  const textToShareBuilder: string[] = [];
  textToShareBuilder.push(unionTitle, "");

  appendChipboardSection(
    t("not_found_chipboards"),
    notFoundChipboards,
    textToShareBuilder,
    currentUnion,
    foundWithRealSize,
  );
  appendChipboardSection(
    t("unknown_chipboards"),
    unknownChipboards,
    textToShareBuilder,
    currentUnion,
    foundWithRealSize,
  );
  appendChipboardSection(
    t("found_chipboards_with_mismatched_sizes"),
    foundWithRealSize,
    textToShareBuilder,
    currentUnion,
    foundWithRealSize,
  );
  appendChipboardSection(
    "found_chipboards",
    foundWithoutRealSize,
    textToShareBuilder,
    currentUnion,
    foundWithRealSize,
  );

  const textToShare = textToShareBuilder.join("\n").trim();

  const shareIntent = createPlatformShareIntent(textToShare, unionTitle, t);
  console.log("MaC handleShareUnion finished");

  return {
    newState: currentState,
    effect: {type: SHARE_UNION, shareIntent},
  };
}

function appendChipboardSection(
  title: string,
  list: ChipboardUI[],
  builder: string[],
  union: CountState["unionOfChipboards"],
  foundWithRealSize: ChipboardUI[],
) {
  if (list.length === 0) return;
  builder.push(title);

  list.forEach((chipboard, index) => {
    const prefix = `${index + 1}. `;
    const shareable = getShareableString(chipboard, union);

    if (list === foundWithRealSize && shareable.includes("\n")) {
      const [firstLine, secondLine] = shareable.split("\n", 2);
      builder.push(`${prefix}${firstLine}`);
      if (secondLine) {
        builder.push(" ".repeat(prefix.length) + secondLine);
      }
    } else {
      builder.push(`${prefix}${shareable}`);
    }
  });

  builder.push("");
}
