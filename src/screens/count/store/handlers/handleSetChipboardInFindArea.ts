import {toObjectIdOrUndefined} from "../../../../data/db/utils";
import {MeasureAndCountRepository} from "../../../../data/repository/MeasureAndCountRepository";
import {CountEffect, FLASH_AND_SCROLL} from "../../CountEffect";
import {CountState} from "../../CountState";
import {ChipboardUI} from "../../models/ChipboardUI";

export async function handleSetChipboardInFindArea(
  chipboard: ChipboardUI,
  repo: MeasureAndCountRepository,
  get: () => {state: CountState},
): Promise<{newState: CountState; effect?: CountEffect}> {
  const currentState = get().state;

  // logic for chipboard with state = 0 - not found
  // set in the chipboard isUnderReview = true (also in the list), isFoundButtonAvailable = true
  // set chipboard in state.chipboardToFind
  // set state.isFoundAreaOpen = true
  // FlashFindItemArea as _effect.send(CountEffect.FlashFindItemArea)

  // logic for chipboard with state = 2 - unknown
  // set chipboard isUnderReview = false in the list for all chipboards, isFoundButtonAvailable = false
  // set chipboard in state.chipboardToFind
  // delete chipboard from db
  // state.isUnknownButtonAvailable = true
  // set state.isFoundAreaOpen = true
  // FlashFindItemArea as _effect.send(AddNewItemEffect.FlashFindItemArea)

  const updatedChipboards = currentState.chipboards.map(it => {
    if (it.isUnderReview) {
      return {...it, isUnderReview: false};
    } else if (it.id === chipboard.id) {
      if (chipboard.state === 0) {
        return {...chipboard, isUnderReview: true};
      }
    }
    return it;
  });

  const chipboardsWithUnderReviewOnTop =
    setItemWhichUnderReviewOnTopOfList(updatedChipboards);

  const updatedState: CountState = {
    ...currentState,
    chipboards: chipboardsWithUnderReviewOnTop,
    chipboardToFind: {
      ...chipboard,
      isUnderReview: chipboard.state === 0,
    },
    isUnknownButtonAvailable: chipboard.state === 2,
    isFoundButtonAvailable: chipboard.state === 0,
    isFoundAreaOpen: true,
  };

  if (chipboard.state === 2) {
    const id = toObjectIdOrUndefined(chipboard.id);
    if (id) {
      await repo.deleteChipboardById(id);
    } else {
      console.error(
        "handleSetChipboardInFindArea: Invalid chipboard ID for deletion:",
        chipboard.id,
      );
    }
  }

  return {
    newState: updatedState,
    effect: {type: FLASH_AND_SCROLL},
  };
}

function setItemWhichUnderReviewOnTopOfList(
  chipboards: ChipboardUI[],
): ChipboardUI[] {
  const underReviewItem = chipboards.find(it => it.isUnderReview);
  if (!underReviewItem) return chipboards;

  const list = chipboards.filter(it => it !== underReviewItem);
  return [underReviewItem, ...list];
}
