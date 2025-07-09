import {CountState} from "../CountState";
import {CountEffect} from "../CountEffect";
import {
  CountIntent,
  START,
  CLEANUP,
  TITLE_OF_UNION_CHANGED,
  SIZE_CHANGED,
  REAL_SIZE_CHANGED,
  QUANTITY_CHANGED,
  COLOR_CHANGED,
} from "../CountIntent";
import {MeasureAndCountRepository} from "../../../data/repository/MeasureAndCountRepository";
import {CountStore} from "./CountStore";
import {handleStart} from "./handlers/handleStart";
import {handleUpdateUnionTitle} from "./handlers/handleUpdateUnionTitle";
import {
  handleSortBySize,
  handleUpdateChipboardSize,
} from "./handlers/handleUpdateChipboardSize";
import {handleUpdateRealSizeForSize} from "./handlers/handleUpdateRealSizeForSize";
import {handleChangedQuantity} from "./handlers/handleChangedQuantity";
import {handleUpdateColor} from "./handlers/handleUpdateColor";

let unsubscribeChipboards: (() => void) | null = null;

export async function handleCountIntent(
  intent: CountIntent,
  get: () => CountStore,
  set: (fn: (store: CountStore) => CountStore) => void,
  repo: MeasureAndCountRepository,
): Promise<{
  handled: true;
  newState: CountState;
  effect?: CountEffect;
} | null> {
  let newState: CountState | undefined;
  let effect: CountEffect | undefined;

  switch (intent.type) {
    case START: {
      const result = await handleStart(
        intent.unionId,
        repo,
        get,
        set,
        unsubscribeChipboards,
        newUnsub => {
          unsubscribeChipboards = newUnsub;
        },
      );

      newState = result.newState;
      effect = result.effect;
      break;
    }

    case CLEANUP: {
      unsubscribeChipboards?.();
      unsubscribeChipboards = null;

      newState = get().state;
      effect = undefined;
      break;
    }

    case TITLE_OF_UNION_CHANGED: {
      const result = await handleUpdateUnionTitle(intent.newTitle, repo, get);
      newState = result.newState;
      effect = result.effect;
      break;
    }

    case SIZE_CHANGED: {
      const resultSort = await handleSortBySize(
        intent.newSizeAsString,
        intent.dimension,
        get,
      );

      const result = await handleUpdateChipboardSize(
        intent.newSizeAsString,
        intent.dimension,
        resultSort.newState,
      );

      newState = result.newState;
      effect = resultSort.effect;
      break;
    }

    case REAL_SIZE_CHANGED: {
      const result = await handleUpdateRealSizeForSize(
        intent.newDiffAsString,
        intent.dimension,
        get,
      );

      newState = result.newState;
      effect = result.effect;
      break;
    }

    case QUANTITY_CHANGED: {
      const result = await handleChangedQuantity(
        intent.newQuantityAsString,
        repo,
        get,
      );

      newState = result.newState;
      effect = result.effect;
      break;
    }

    case COLOR_CHANGED: {
      const result = await handleUpdateColor(
        intent.newColorName,
        intent.newColor,
        get,
      );

      newState = result.newState;
      effect = result.effect;
      break;
    }

    default:
      return null;
  }

  return {
    handled: true,
    newState: newState!,
    effect,
  };
}
