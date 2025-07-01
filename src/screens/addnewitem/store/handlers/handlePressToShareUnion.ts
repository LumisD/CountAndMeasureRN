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
  const currentState = get().state;

  if (currentState.createdChipboards.length === 0) {
    return {
      newState: currentState,
      effect: {type: SHOW_SNACKBAR, message: t("no_chipboards_to_share")},
    };
  }

  return {
    newState: currentState,
    effect: {type: SHOW_SHARE_UNION_DIALOG},
  };
}
