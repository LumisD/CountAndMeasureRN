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
  console.log("MaC handleSetChipboardInFindArea started");

  if (chipboard.state === 0) {
    return await logicForState0(chipboard, repo, get);
  } else if (chipboard.state === 2) {
    return await logicForState2(chipboard, repo, get);
  }

  // Fallback: return unchanged state
  return {newState: get().state};
}

async function logicForState0(
  chipboard: ChipboardUI,
  repo: MeasureAndCountRepository,
  get: () => {state: CountState},
): Promise<{newState: CountState; effect?: CountEffect}> {
  const currentState = get().state;

  const updatedChipboards = currentState.chipboards.map(it => {
    if (it.isUnderReview) {
      return {...it, isUnderReview: false}; //clear isUnderReview to avoid two chipboard under review
    } else if (it.id === chipboard.id) {
      return {...chipboard, isUnderReview: true}; //set isUnderReview for our chipboard
    }
    return it;
  });

  const chipboardsWithUnderReviewOnTop =
    setItemWhichUnderReviewOnTopOfList(updatedChipboards);

  const updatedState: CountState = {
    ...currentState,
    chipboards: chipboardsWithUnderReviewOnTop,
    chipboardToFind: {...chipboard, isUnderReview: true},
    isUnknownButtonAvailable: false,
    isFoundButtonAvailable: true,
    isFoundAreaOpen: true,
  };

  return {
    newState: updatedState,
    effect: {type: FLASH_AND_SCROLL},
  };
}

async function logicForState2(
  chipboard: ChipboardUI,
  repo: MeasureAndCountRepository,
  get: () => {state: CountState},
): Promise<{newState: CountState; effect?: CountEffect}> {
  const currentState = get().state;

  const updatedChipboards = currentState.chipboards.map(it =>
    it.isUnderReview ? {...it, isUnderReview: false} : it,
  );

  const chipboardsWithUnderReviewOnTop =
    setItemWhichUnderReviewOnTopOfList(updatedChipboards);

  const updatedState: CountState = {
    ...currentState,
    chipboards: chipboardsWithUnderReviewOnTop,
    chipboardToFind: {...chipboard, isUnderReview: false},
    isUnknownButtonAvailable: true,
    isFoundButtonAvailable: false,
    isFoundAreaOpen: true,
  };

  const id = toObjectIdOrUndefined(chipboard.id);
  if (id) {
    await repo.deleteChipboardById(id);
  } else {
    console.error(
      "handleSetChipboardInFindArea: Invalid chipboard ID for deletion:",
      chipboard.id,
    );
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
