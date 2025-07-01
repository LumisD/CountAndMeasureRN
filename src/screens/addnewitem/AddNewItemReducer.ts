import {
  AddNewItemEffect,
  NAVIGATE_BACK,
  SHOW_DELETE_CONFIRMATION_DIALOG,
  SHOW_EDIT_CONFIRMATION_DIALOG,
  SHOW_SHARE_UNION_DIALOG,
  SHOW_SNACKBAR,
} from "./AddNewItemEffect";
import {
  AddNewItemIntent,
  ASK_DELETE_CHIPBOARD,
  ASK_EDIT_CHIPBOARD,
  PRESS_TO_SHARE_UNION,
  TOGGLE_ADD_AREA_VISIBILITY,
} from "./AddNewItemIntent";
import {AddNewItemState} from "./AddNewItemState";

import {BACK} from "./AddNewItemIntent";

export const addNewItemReducer = (
  state: AddNewItemState,
  intent: AddNewItemIntent,
): {newState: AddNewItemState; effect?: AddNewItemEffect} => {
  switch (intent.type) {
    case TOGGLE_ADD_AREA_VISIBILITY:
      return {
        newState: {
          ...state,
          isAddAreaOpen: !state.isAddAreaOpen,
        },
        effect: undefined,
      };

    case ASK_EDIT_CHIPBOARD:
      return {
        newState: state,
        effect: {
          type: SHOW_EDIT_CONFIRMATION_DIALOG,
          chipboard: intent.chipboard,
          hasColor: state.unionOfChipboards.hasColor,
        },
      };

    case ASK_DELETE_CHIPBOARD:
      return {
        newState: state,
        effect: {
          type: SHOW_DELETE_CONFIRMATION_DIALOG,
          chipboard: intent.chipboard,
          hasColor: state.unionOfChipboards.hasColor,
        },
      };

    case BACK:
      return {
        newState: state,
        effect: {type: NAVIGATE_BACK},
      };

    default:
      console.warn("Unhandled intent:", intent);
      return {newState: state};
  }
};
