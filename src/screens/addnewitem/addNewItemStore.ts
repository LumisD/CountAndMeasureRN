import {create, createStore} from "zustand";
import {AddNewItemState} from "./AddNewItemState";
import {AddNewItemEffect} from "./AddNewItemEffect";
import {AddNewItemIntent} from "./AddNewItemIntent";
import {addNewItemReducer} from "./AddNewItemReducer";
import {createDefaultUnionOfChipboardsUI} from "../models/UnionOfChipboardsUI";
import {createDefaultChipboardUI} from "./models/ChipboardUI";
import {MeasureAndCountRepository} from "../../data/repository/MeasureAndCountRepository";

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

export const createAddNewItemStore = (repo: MeasureAndCountRepository) =>
  createStore<AddNewItemStore>((set, get) => ({
    state: initialState,
    currentEffect: null,

    processIntent: intent => {
      const {newState, effect} = addNewItemReducer(get().state, intent);
      set({state: newState});
      if (effect) set({currentEffect: effect});
    },

    consumeEffect: () => {
      set({currentEffect: null});
    },
  }));
