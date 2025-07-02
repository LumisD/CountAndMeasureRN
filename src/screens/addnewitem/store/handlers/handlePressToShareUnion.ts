import {
  AddNewItemEffect,
  SHOW_SHARE_UNION_DIALOG,
  SHOW_SNACKBAR,
} from "../../AddNewItemEffect";
import {AddNewItemState} from "../../AddNewItemState";

export async function handlePressToShareUnion(
  get: () => {state: AddNewItemState},
  t: (key: string) => string,
): Promise<{newState: AddNewItemState; effect?: AddNewItemEffect}> {
  console.log("MaC handlePressedToShareUnion started");
  const currentState = get().state;

  if (currentState.createdChipboards.length === 0) {
    console.log("MaC handlePressedToShareUnion: No chipboards to share");
    return {
      newState: currentState,
      effect: {type: SHOW_SNACKBAR, message: t("no_chipboards_to_share")},
    };
  }
  console.log("MaC handlePressedToShareUnion finished");

  return {
    newState: currentState,
    effect: {type: SHOW_SHARE_UNION_DIALOG},
  };
}
