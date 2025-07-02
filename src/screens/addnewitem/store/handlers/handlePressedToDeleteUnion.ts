import {MeasureAndCountRepository} from "../../../../data/repository/MeasureAndCountRepository";
import {
  AddNewItemEffect,
  SHOW_REMOVE_UNION_DIALOG,
} from "../../AddNewItemEffect";
import {AddNewItemState} from "../../AddNewItemState";
import {handleDeleteUnion} from "./handleDeleteUnion";

export async function handlePressedToDeleteUnion(
  repo: MeasureAndCountRepository,
  get: () => {state: AddNewItemState},
): Promise<{newState: AddNewItemState; effect?: AddNewItemEffect}> {
  console.log("MaC handlePressedToDeleteUnion started");
  const currentState = get().state;

  // IF there are chipboards in the union
  if (currentState.createdChipboards.length > 0) {
    console.log("MaC handleCreateNewUnion SHOW_REMOVE_UNION_DIALOG");
    // Show confirmation dialog
    return {
      newState: currentState,
      effect: {type: SHOW_REMOVE_UNION_DIALOG},
    };
  } else {
    // Delete permanently
    return await handleDeleteUnion(true, repo, get);
  }
}
