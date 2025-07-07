import {CountEffect, NAVIGATE_BACK} from "./CountEffect";
import {CountIntent, TOGGLE_FIND_AREA_VISIBILITY, BACK} from "./CountIntent";
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

    default:
      console.warn("MaC countReducer Unhandled intent:", intent);
      return {newState: state};
  }
};
