import {AddNewItemEffect} from "./AddNewItemEffect";
import {AddNewItemIntent} from "./AddNewItemIntent";
import {AddNewItemState} from "./AddNewItemState";

export const addNewItemReducer = (
  state: AddNewItemState,
  intent: AddNewItemIntent,
): {newState: AddNewItemState; effect?: AddNewItemEffect} => {
  switch (intent.type) {
    case "TitleOfUnionChanged":
      return {
        newState: {
          ...state,
          unionOfChipboards: {
            ...state.unionOfChipboards,
            title: intent.newTitle,
          },
        },
      };
    case "Back":
      return {
        newState: state,
        effect: {type: "NavigateBack"},
      };

    case "PressToDeleteUnion":
      return {
        newState: state,
        effect: {type: "ShowRemoveUnionDialog"},
      };

    default:
      console.warn("Unhandled intent:", intent);
      return {newState: state};
  }
};
