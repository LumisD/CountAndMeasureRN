import {CountState} from "../../CountState";
import {CountEffect} from "../../CountEffect";
import {getChipboardWithInitialValuesAndCharacteristics} from "../utils";
import {ChipboardUI} from "../../models/ChipboardUI";

export async function handleRemoveNotFoundChipboardFromFindArea(
  chipboard: ChipboardUI,
  get: () => {state: CountState},
): Promise<{newState: CountState; effect?: CountEffect}> {
  // find chipboard in the list and set chipboard.isUnderReview = false, isFoundButtonAvailable = false
  // set chipboard default values in state.chipboardToFind
  // set state.isUnknownButtonAvailable = false

  const currentState = get().state;

  const updatedChipboards = currentState.chipboards.map(it =>
    it.id === chipboard.id ? {...it, isUnderReview: false} : it,
  );

  const defaultChipboardToFind =
    getChipboardWithInitialValuesAndCharacteristics(
      chipboard,
      currentState.unionOfChipboards.dimensions,
      currentState.unionOfChipboards.direction,
    );

  return {
    newState: {
      ...currentState,
      chipboards: updatedChipboards,
      chipboardToFind: defaultChipboardToFind,
      isUnknownButtonAvailable: false,
      isFoundButtonAvailable: false,
    },
    effect: undefined,
  };
}
