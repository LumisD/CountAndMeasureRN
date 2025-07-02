import {
  AddNewItemEffect,
  NAVIGATE_BACK,
  SHOW_DELETE_CONFIRMATION_DIALOG,
  SHOW_EDIT_CONFIRMATION_DIALOG,
} from "./AddNewItemEffect";
import {
  AddNewItemIntent,
  ASK_DELETE_CHIPBOARD,
  ASK_EDIT_CHIPBOARD,
  TOGGLE_ADD_AREA_VISIBILITY,
} from "./AddNewItemIntent";
import {AddNewItemState} from "./AddNewItemState";

import {BACK} from "./AddNewItemIntent";

export const addNewItemReducer = (
  state: AddNewItemState,
  intent: AddNewItemIntent,
): {newState: AddNewItemState; effect?: AddNewItemEffect} => {
  console.warn("MaC addNewItemReducer started with intent:", intent);
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
      console.warn("MaC addNewItemReducer Unhandled intent:", intent);
      return {newState: state};
  }
};
