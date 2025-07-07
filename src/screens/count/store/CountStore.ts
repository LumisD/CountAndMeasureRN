import {createStore} from "zustand";
import {CountState} from "../CountState";
import {CountEffect} from "../CountEffect";
import {CountIntent} from "../CountIntent";
import {countReducer} from "../CountReducer";
import {createDefaultUnionOfChipboardsUI} from "../../models/UnionOfChipboardsUI";
import {MeasureAndCountRepository} from "../../../data/repository/MeasureAndCountRepository";
import {handleCountIntent} from "./handleCountIntent";
import {createDefaultChipboardUI} from "../models/ChipboardUI";

const initialState: CountState = {
  unionOfChipboards: createDefaultUnionOfChipboardsUI(),
  chipboards: [],
  chipboardToFind: createDefaultChipboardUI(),
  isFoundAreaOpen: true,
  isUnknownButtonAvailable: false,
  isFoundButtonAvailable: false,
  messageForEmptyList: null,
  isBackButtonVisible: false,
};

export interface CountStore {
  state: CountState;
  currentEffect: CountEffect | null;
  processIntent: (intent: CountIntent) => void;
  consumeEffect: () => void;
}

export const createCountStore = (repo: MeasureAndCountRepository) => {
  return createStore<CountStore>((set, get) => ({
    state: initialState,
    currentEffect: null,
    // use a handler for intents that require special processing
    processIntent: async (intent: CountIntent) => {
      const handledResult = await handleCountIntent(intent, get, set, repo);

      if (handledResult?.handled) {
        set({state: handledResult.newState});
        if (handledResult.effect) {
          set({currentEffect: handledResult.effect});
        }
        return;
      }

      // use reducer only if new state can be derived from intent
      const {newState, effect} = countReducer(get().state, intent);
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
