import {createStore} from "zustand";
import {MeasureAndCountRepository} from "../../../data/repository/MeasureAndCountRepository";
import {ListsEffect} from "../ListsEffect";
import {ListsIntent} from "../ListsIntent";
import {ListsState} from "../ListsState ";
import {handleListsIntent} from "./handleListsIntent";
import {listsReducer} from "../ListsReducer";

export const initialListsState: ListsState = {
  listOfUnions: [],
};

export interface ListsStore {
  state: ListsState;
  currentEffect: ListsEffect | null;
  processIntent: (intent: ListsIntent) => void;
  consumeEffect: () => void;
}

export const createListsStore = (repo: MeasureAndCountRepository) => {
  return createStore<ListsStore>((set, get) => ({
    state: initialListsState,
    currentEffect: null,
    // use a handler for intents that require special processing
    processIntent: async (intent: ListsIntent) => {
      const handledResult = await handleListsIntent(intent, get, set, repo);

      if (handledResult?.handled) {
        set({state: handledResult.newState});
        if (handledResult.effect) {
          set({currentEffect: handledResult.effect});
        }
        return;
      }

      // use reducer only if new state can be derived from intent
      const {newState, effect} = listsReducer(get().state, intent);
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
