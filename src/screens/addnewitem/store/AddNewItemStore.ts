import {createStore} from "zustand";
import {AddNewItemState} from "../AddNewItemState";
import {AddNewItemEffect} from "../AddNewItemEffect";
import {AddNewItemIntent} from "../AddNewItemIntent";
import {addNewItemReducer} from "../AddNewItemReducer";
import {createDefaultUnionOfChipboardsUI} from "../../models/UnionOfChipboardsUI";
import {createDefaultChipboardUI} from "../models/ChipboardUI";
import {MeasureAndCountRepository} from "../../../data/repository/MeasureAndCountRepository";
import {handleAddNewItemIntent} from "./handleAddNewItemIntent";

const initialState: AddNewItemState = {
  unionOfChipboards: createDefaultUnionOfChipboardsUI(),
  createdChipboards: [],
  newOrEditChipboard: createDefaultChipboardUI(),
  isAddAreaOpen: true,
  isAddButtonAvailable: false,
};

export interface AddNewItemStore {
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
      // use a handler for intents that require special processing
      const handledResult = await handleAddNewItemIntent(intent, get, repo);

      if (handledResult?.handled) {
        set({state: handledResult.newState});
        if (handledResult.effect) {
          set({currentEffect: handledResult.effect});
        }
        return;
      }

      // use reducer only if new state can be derived from intent
      const {newState, effect} = addNewItemReducer(get().state, intent);
      set({state: newState});

      if (effect) {
        set({currentEffect: effect});
      }
    },

    consumeEffect: () => {
      set({currentEffect: null});
    },
  }));
};
