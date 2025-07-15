import {toObjectIdOrUndefined} from "../../../../data/db/utils";
import {MeasureAndCountRepository} from "../../../../data/repository/MeasureAndCountRepository";
import {CountStore} from "../CountStore";
import {CountState} from "../../CountState";
import {CountEffect} from "../../CountEffect";
import {DEFAULT_UNION_ID} from "../../../common/Constants";
import {
  toUnionOfChipboardsUI,
  UnionOfChipboardsUI,
} from "../../../models/UnionOfChipboardsUI";
import {mapChipboardToChipboardUi} from "../../models/ChipboardUI";
import {
  getAllRealsAsString,
  getChipboardAsString,
  getChipboardWithInitialValuesAndCharacteristics,
} from "../utils";

export async function handleStart(
  unionId: string | null,
  repo: MeasureAndCountRepository,
  get: () => CountStore,
  set: (fn: (store: CountStore) => CountStore) => void,
  previousUnsubscribe?: (() => void) | null,
  saveUnsubscribe?: (unsub: () => void) => void,
): Promise<{
  newState: CountState;
  effect?: CountEffect;
}> {
  // This function consists of two parts:
  // 1. Get union by unionId or last unfinished union
  // 2. Subscribe to chipboards by unionId

  console.log("MaC Count handleStart started with unionId:", unionId);
  const currentState = get().state;

  const isBackButtonVisible = !(
    unionId === null || unionId === DEFAULT_UNION_ID
  );
  let newState: CountState = {
    ...currentState,
    isBackButtonVisible,
  };

  // 1. Get union by unionId or last unfinished union
  let union: UnionOfChipboardsUI | null = null;

  const needsFallback = unionId === null || unionId === DEFAULT_UNION_ID;
  const objectId = !needsFallback ? toObjectIdOrUndefined(unionId) : undefined;

  const repoUnion = needsFallback
    ? await repo.getLastUnFinishedUnionOfChipboards()
    : objectId
    ? await repo.getUnionOfChipboardsById(objectId)
    : await repo.getLastUnFinishedUnionOfChipboards();

  if (repoUnion) {
    union = toUnionOfChipboardsUI(repoUnion);
  }

  if (!union) {
    return {
      newState: {
        ...newState,
        messageForEmptyList: "press_new_screen_create_chipboard_sheet_list",
      },
    };
  }

  const unionUI = union;
  newState = {
    ...newState,
    unionOfChipboards: unionUI,
    chipboardToFind: {
      ...newState.chipboardToFind,
      unionId: unionUI.id,
    },
    messageForEmptyList: null,
  };

  // 3. Subscribe to chipboards by unionId
  if (saveUnsubscribe && unionUI.id) {
    // Unsubscribe from previous
    previousUnsubscribe?.();

    // Subscribe to new chipboards
    const objectId = toObjectIdOrUndefined(unionUI.id);
    if (!objectId) {
      console.error(
        `MaC handleStart: Invalid unionId: ${unionId} , objectId: ${objectId}`,
      );
      return {newState: newState, effect: undefined};
    }

    const unsub = repo.subscribeToChipboardsByUnionId(objectId, chipboards => {
      console.log(
        "MaC handleStart: repo.subscribeToChipboardsByUnionId called with chipboards.length:",
        chipboards.length,
      );
      const updated = chipboards
        .sort((a, b) => {
          const priority = (s: number) => (s === 0 ? 0 : s === 2 ? 1 : 2);
          return priority(a.state) - priority(b.state);
        })
        .map(it => {
          const chipUI = mapChipboardToChipboardUi(it);
          return {
            ...chipUI,
            quantityAsString: it.quantity.toString(),
            size1AsString: it.size1,
            size2AsString: it.size2,
            size3AsString: it.size3,
            real1AsString: it.realSize1,
            real2AsString: it.realSize2,
            real3AsString: it.realSize3,
            chipboardAsString: getChipboardAsString(
              chipUI,
              unionUI.dimensions,
              unionUI.direction,
            ),
            allRealsAsString: getAllRealsAsString(
              chipUI,
              unionUI.dimensions,
              unionUI.direction,
            ),
          };
        });

      if (updated.length === 0) {
        repo.deleteUnionOfChipboards(objectId);
        return;
      }

      const updatedState = {
        ...get().state,
        chipboards: updated,
        messageForEmptyList: null,
      };

      set(store => ({
        ...store,
        state: {
          ...updatedState,
        },
      }));
    });
    saveUnsubscribe(unsub);
  }
  console.log("MaC handleStart finished");

  return {
    newState,
    effect: undefined,
  };
}
