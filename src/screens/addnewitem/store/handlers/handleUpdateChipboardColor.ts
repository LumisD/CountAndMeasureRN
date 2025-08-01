import {AddNewItemEffect} from "../../AddNewItemEffect";
import {AddNewItemState} from "../../AddNewItemState";
import {getChipboardAsString} from "../utils";

export async function handleUpdateChipboardColor(
  newColorName: string,
  newColor: string,
  get: () => {state: AddNewItemState},
): Promise<{newState: AddNewItemState; effect?: AddNewItemEffect}> {
  console.log("MaC handleUpdateChipboardColor started");
  const currentState = get().state;

  const updatedChipboard = {
    ...currentState.newOrEditChipboard,
    colorName: newColorName,
    color: newColor,
  };

  const updatedChipboard2 = {
    ...updatedChipboard,
    chipboardAsString: getChipboardAsString(
      updatedChipboard,
      currentState.unionOfChipboards.dimensions,
      currentState.unionOfChipboards.direction,
    ),
  };

  const newState: AddNewItemState = {
    ...currentState,
    newOrEditChipboard: updatedChipboard2,
  };
  console.log("MaC handleUpdateChipboardColor finished");

  return {newState, effect: undefined};
}
