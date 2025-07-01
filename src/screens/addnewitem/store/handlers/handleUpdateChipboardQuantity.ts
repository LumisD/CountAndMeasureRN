import {AddNewItemEffect} from "../../AddNewItemEffect";
import {AddNewItemState} from "../../AddNewItemState";
import {getChipboardAsString, setAddButtonAvailability} from "../utils";

export async function handleUpdateChipboardQuantity(
  newQuantityAsString: string,
  get: () => {state: AddNewItemState},
): Promise<{newState: AddNewItemState; effect?: AddNewItemEffect}> {
  const currentState = get().state;

  const newQuantityAsInt = parseInt(newQuantityAsString, 10) || 0;
  const dimensions = currentState.unionOfChipboards.dimensions;

  const updatedChipboard = {
    ...currentState.newOrEditChipboard,
    quantityAsString: newQuantityAsString,
    quantity: newQuantityAsInt,
  };

  const updatedChipboard2 = {
    ...updatedChipboard,
    chipboardAsString: getChipboardAsString(
      updatedChipboard,
      dimensions,
      currentState.unionOfChipboards.direction,
    ),
  };

  const isAddButtonAvailable = setAddButtonAvailability(
    updatedChipboard,
    dimensions,
  );

  const newState: AddNewItemState = {
    ...currentState,
    newOrEditChipboard: updatedChipboard2,
    isAddButtonAvailable,
  };

  return {newState, effect: undefined};
}
