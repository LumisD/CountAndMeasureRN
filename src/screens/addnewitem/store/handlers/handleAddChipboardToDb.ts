import {MeasureAndCountRepository} from "../../../../data/repository/MeasureAndCountRepository";
import {AddNewItemEffect, SHOW_SNACKBAR} from "../../AddNewItemEffect";
import {AddNewItemState} from "../../AddNewItemState";
import {mapChipboardUIToChipboard} from "../../models/ChipboardUI";
import {getChipboardAsString} from "../utils";

export async function handleAddChipboardToDb(
  repo: MeasureAndCountRepository,
  get: () => {state: AddNewItemState},
  t: (key: string) => string,
): Promise<{newState: AddNewItemState; effect?: AddNewItemEffect}> {
  console.log("MaC handleAddChipboardToDb started");
  const currentState = get().state;

  await repo.insertChipboard(
    mapChipboardUIToChipboard(currentState.newOrEditChipboard),
  );

  const newChipboard = {
    ...currentState.newOrEditChipboard,
    id: "0",
    quantity: 1,
    quantityAsString: "1",
    size1: 0,
    size1AsString: "",
    size2: 0,
    size2AsString: "",
    size3: 0,
    size3AsString: "",
  };

  const chipboardAsString = getChipboardAsString(
    newChipboard,
    currentState.unionOfChipboards.dimensions,
    currentState.unionOfChipboards.direction,
  );

  const newChipboard2 = {
    ...newChipboard,
    chipboardAsString,
  };

  const newState: AddNewItemState = {
    ...currentState,
    newOrEditChipboard: newChipboard2,
    isAddButtonAvailable: false,
  };
  console.log("MaC handleAddChipboardToDb finished");

  return {
    newState,
    effect: {type: SHOW_SNACKBAR, message: t("new_item_added")},
  };
}
