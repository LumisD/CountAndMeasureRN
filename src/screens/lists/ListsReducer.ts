import {ListsEffect, NAVIGATE_TO_COUNT_SCREEN} from "./ListsEffect";
import {ListsIntent, PRESS_ON_ITEM_IN_LIST} from "./ListsIntent";
import {ListsState} from "./ListsState ";

export const listsReducer = (
  state: ListsState,
  intent: ListsIntent,
): {newState: ListsState; effect?: ListsEffect} => {
  console.log("MaC listsReducer started with intent:", intent);
  switch (intent.type) {
    case PRESS_ON_ITEM_IN_LIST: {
      return {
        newState: state,
        effect: {
          type: NAVIGATE_TO_COUNT_SCREEN,
          unionId: intent.union.id,
        },
      };
    }

    default:
      console.warn("MaC listsReducer Unhandled intent:", intent);
      return {newState: state};
  }
};
