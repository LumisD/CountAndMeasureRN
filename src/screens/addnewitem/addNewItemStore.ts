import {createStore} from "zustand";
import {AddNewItemState} from "./AddNewItemState";
import {AddNewItemEffect} from "./AddNewItemEffect";
import {AddNewItemIntent} from "./AddNewItemIntent";
import {addNewItemReducer} from "./AddNewItemReducer";
import {createDefaultUnionOfChipboardsUI} from "../models/UnionOfChipboardsUI";
import {createDefaultChipboardUI} from "./models/ChipboardUI";
import {MeasureAndCountRepository} from "../../data/repository/MeasureAndCountRepository";
import {createNewUnion} from "./effects/createNewUnion";

const initialState: AddNewItemState = {
  unionOfChipboards: createDefaultUnionOfChipboardsUI(),
  createdChipboards: [],
  newOrEditChipboard: createDefaultChipboardUI(),
  isAddAreaOpen: true,
  isAddButtonAvailable: false,
};

interface AddNewItemStore {
  state: AddNewItemState;
  currentEffect: AddNewItemEffect | null;
  processIntent: (intent: AddNewItemIntent) => void;
  consumeEffect: () => void;
}

export const createAddNewItemStore = (repo: MeasureAndCountRepository) => {
  return createStore<AddNewItemStore>((set, get) => ({
    state: initialState,
    currentEffect: null,

    processIntent: async (intent: AddNewItemIntent) => {
      console.log("AddNewItemStore processIntent called with:", intent);
      const {newState, effect} = addNewItemReducer(get().state, intent);
      set({state: newState});

      if (effect?.type === "CreateNewUnion") {
        console.log("Creating new union");
        const result = await createNewUnion(repo);
        set(state => ({
          state: {
            ...state.state,
            unionOfChipboards: result.unionOfChipboards,
            newOrEditChipboard: {
              ...state.state.newOrEditChipboard,
              unionId: result.newOrEditChipboard.unionId,
              colorName: result.newOrEditChipboard.colorName,
            },
          },
        }));
      } else if (effect) {
        console.log("Other effect triggered:", effect);
        set({currentEffect: effect});
      }
    },

    consumeEffect: () => {
      set({currentEffect: null});
    },
  }));
};
