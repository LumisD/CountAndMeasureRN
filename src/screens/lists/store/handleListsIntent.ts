import {MeasureAndCountRepository} from "../../../data/repository/MeasureAndCountRepository";
import {ListsEffect} from "../ListsEffect";
import {CLEANUP, ListsIntent, START} from "../ListsIntent";
import {ListsState} from "../ListsState ";
import {handleStart} from "./handlers/handleStart";
import {ListsStore} from "./ListsStore";

let unsubscribeUnions: (() => void) | null = null;

export async function handleListsIntent(
  intent: ListsIntent,
  get: () => ListsStore,
  set: (fn: (store: ListsStore) => ListsStore) => void,
  repo: MeasureAndCountRepository,
): Promise<{
  handled: true;
  newState: ListsState;
  effect?: ListsEffect;
} | null> {
  let newState: ListsState | undefined;
  let effect: ListsEffect | undefined;

  switch (intent.type) {
    case START: {
      const result = await handleStart(
        repo,
        get,
        set,
        unsubscribeUnions,
        newUnsub => {
          unsubscribeUnions = newUnsub;
        },
      );

      newState = result.newState;
      effect = result.effect;
      break;
    }

    case CLEANUP: {
      unsubscribeUnions?.();
      unsubscribeUnions = null;

      newState = get().state;
      effect = undefined;
      break;
    }

    // Add other intent cases here as needed

    default:
      return null;
  }

  return {
    handled: true,
    newState: newState!,
    effect,
  };
}
