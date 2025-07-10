import {
  CountEffect,
  NAVIGATE_BACK,
  SHOW_DELETE_UNION_DIALOG,
  SHOW_RESTORE_UNION_DIALOG,
} from "./CountEffect";
import {
  CountIntent,
  TOGGLE_FIND_AREA_VISIBILITY,
  BACK,
  PRESS_TO_SHARE_UNION,
  PRESS_TO_DELETE_OR_RESTORE_UNION,
} from "./CountIntent";
import {CountState} from "./CountState";

export const countReducer = (
  state: CountState,
  intent: CountIntent,
): {newState: CountState; effect?: CountEffect} => {
  console.log("MaC countReducer started with intent:", intent);
  switch (intent.type) {
    case TOGGLE_FIND_AREA_VISIBILITY:
      return {
        newState: {
          ...state,
          isFoundAreaOpen: !state.isFoundAreaOpen,
        },
      };

    case BACK:
      return {
        newState: state,
        effect: {type: NAVIGATE_BACK},
      };

    case PRESS_TO_DELETE_OR_RESTORE_UNION: {
      const {unionOfChipboards} = state;

      return {
        newState: state,
        effect: {
          type: unionOfChipboards.isMarkedAsDeleted
            ? SHOW_RESTORE_UNION_DIALOG
            : SHOW_DELETE_UNION_DIALOG,
        },
      };
    }

    default:
      console.warn("MaC countReducer Unhandled intent:", intent);
      return {newState: state};
  }
};
