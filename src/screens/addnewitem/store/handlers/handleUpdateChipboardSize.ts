import {AddNewItemEffect} from "../../AddNewItemEffect";
import {AddNewItemState} from "../../AddNewItemState";
import {getChipboardAsString, setAddButtonAvailability} from "../utils";

export async function handleUpdateChipboardSize(
  newSizeAsString: string,
  dimension: number,
  get: () => {state: AddNewItemState},
): Promise<{newState: AddNewItemState; effect?: AddNewItemEffect}> {
  console.log("MaC handleUpdateChipboardSize started");
  const currentState = get().state;
  const currentChipboard = currentState.newOrEditChipboard;

  const newSizeAsFloat = parseFloat(newSizeAsString);
  const size = isNaN(newSizeAsFloat) ? 0 : newSizeAsFloat;

  const updatedChipboard = (() => {
    switch (dimension) {
      case 1:
        return {
          ...currentChipboard,
          size1AsString: newSizeAsString,
          size1: size,
        };
      case 2:
        return {
          ...currentChipboard,
          size2AsString: newSizeAsString,
          size2: size,
        };
      case 3:
        return {
          ...currentChipboard,
          size3AsString: newSizeAsString,
          size3: size,
        };
      default:
        return currentChipboard;
    }
  })();

  const finalChipboard = {
    ...updatedChipboard,
    chipboardAsString: getChipboardAsString(
      updatedChipboard,
      currentState.unionOfChipboards.dimensions,
      currentState.unionOfChipboards.direction,
    ),
  };

  const dimensions = currentState.unionOfChipboards.dimensions;
  const isAddButtonAvailable = setAddButtonAvailability(
    finalChipboard,
    dimensions,
  );

  const newState: AddNewItemState = {
    ...currentState,
    newOrEditChipboard: finalChipboard,
    isAddButtonAvailable,
  };
  console.log("MaC handleUpdateChipboardSize finished");

  return {newState, effect: undefined};
}
