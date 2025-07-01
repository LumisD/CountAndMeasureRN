import {toObjectIdOrUndefined} from "../../../../data/db/utils";
import {MeasureAndCountRepository} from "../../../../data/repository/MeasureAndCountRepository";
import {getDefaultUnionTitle} from "../../../utils/generalUtils";
import {createPlatformShareIntent} from "../../../utils/shareIntent";
import {
  AddNewItemEffect,
  SHARE_UNION,
  SHOW_SNACKBAR,
} from "../../AddNewItemEffect";
import {AddNewItemState} from "../../AddNewItemState";
import {
  getShareableString,
  mapChipboardToChipboardUi,
} from "../../models/ChipboardUI";

export async function handleShareUnion(
  repo: MeasureAndCountRepository,
  get: () => {state: AddNewItemState},
  t: (key: string) => string,
): Promise<{newState: AddNewItemState; effect?: AddNewItemEffect}> {
  const currentState = get().state;
  const currentUnion = currentState.unionOfChipboards;
  const unionIdObject = toObjectIdOrUndefined(currentUnion.id);

  if (!unionIdObject) {
    console.error(
      `handleShareUnion: Invalid union.id: ${currentUnion.id} , objectId: ${unionIdObject}`,
    );
    return {newState: currentState, effect: undefined};
  }

  const chipboardsFromDb = await repo.getChipboardsByUnionId(unionIdObject);

  const chipboards = chipboardsFromDb.map(c => mapChipboardToChipboardUi(c));

  if (chipboards.length === 0) {
    return {
      newState: currentState,
      effect: {type: SHOW_SNACKBAR, message: t("no_chipboards_to_share")},
    };
  }

  const unionTitle = currentUnion.title || getDefaultUnionTitle();

  let textToShare = unionTitle + "\n\n";

  chipboards.forEach((chipboard, index) => {
    textToShare += `${index + 1}. ${getShareableString(
      chipboard,
      currentUnion,
    )}\n`;
  });

  const shareIntent = createPlatformShareIntent(
    textToShare.trim(),
    unionTitle,
    t,
  );

  return {
    newState: currentState,
    effect: {type: SHARE_UNION, shareIntent},
  };
}
