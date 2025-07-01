import {AddNewItemState} from "../AddNewItemState";
import {AddNewItemEffect} from "../AddNewItemEffect";
import {
  ADD_CHIPBOARD_TO_DB,
  AddNewItemIntent,
  COLOR_CHANGED,
  CREATE_NEW_UNION,
  DELETE_CHIPBOARD_CONFIRMED,
  DELETING_UNION_CONFIRMED,
  EDIT_CHIPBOARD_CONFIRMED,
  HANDLE_SCREEN_EXIT,
  PRESS_TO_DELETE_UNION,
  PRESS_TO_SHARE_UNION,
  QUANTITY_CHANGED,
  SET_ITEM_TYPE,
  SHARING_UNION_CONFIRMED,
  SIZE_CHANGED,
  TITLE_OF_UNION_CHANGED,
} from "../AddNewItemIntent";
import {MeasureAndCountRepository} from "../../../data/repository/MeasureAndCountRepository";
import {t} from "i18next";
import {AddNewItemStore} from "./AddNewItemStore";
import {handleSetInitialCharacteristics} from "./handlers/handleSetInitialCharacteristics";
import {handleCreateNewUnion} from "./handlers/handleCreateNewUnion";
import {handleUpdateUnionTitle} from "./handlers/handleUpdateUnionTitle";
import {handlePressedToDeleteUnion} from "./handlers/handlePressedToDeleteUnion";
import {handleDeleteUnion} from "./handlers/handleDeleteUnion";
import {handleUpdateChipboardSize} from "./handlers/handleUpdateChipboardSize";
import {handleUpdateChipboardColor} from "./handlers/handleUpdateChipboardColor";
import {handleUpdateChipboardQuantity} from "./handlers/handleUpdateChipboardQuantity";
import {handleAddChipboardToDb} from "./handlers/handleAddChipboardToDb";
import {handlePressToShareUnion} from "./handlers/handlePressToShareUnion";
import {handleDeleteChipboardFromDb} from "./handlers/handleDeleteChipboardFromDb";
import {handleEditChipboardInAddAreaAndRemoveFromDb} from "./handlers/handleEditChipboardInAddAreaAndRemoveFromDb";
import {handleShareUnion} from "./handlers/handleShareUnion";
import {handleScreenExit} from "./handlers/handleScreenExit";

export async function handleAddNewItemIntent(
  intent: AddNewItemIntent,
  get: () => AddNewItemStore,
  repo: MeasureAndCountRepository,
): Promise<{
  handled: true;
  newState: AddNewItemState;
  effect?: AddNewItemEffect;
} | null> {
  let newState: AddNewItemState | undefined;
  let effect: AddNewItemEffect | undefined;

  switch (intent.type) {
    case CREATE_NEW_UNION: {
      const result = await handleCreateNewUnion(repo, get);
      newState = result.newState;
      effect = result.effect;
      break;
    }

    case SET_ITEM_TYPE: {
      const result = await handleSetInitialCharacteristics(
        intent.itemType,
        repo,
        get,
      );
      newState = result.newState;
      effect = result.effect;
      break;
    }

    case TITLE_OF_UNION_CHANGED: {
      const result = await handleUpdateUnionTitle(intent.newTitle, repo, get);
      newState = result.newState;
      effect = result.effect;
      break;
    }

    case PRESS_TO_DELETE_UNION: {
      const result = await handlePressedToDeleteUnion(repo, get);
      newState = result.newState;
      effect = result.effect;
      break;
    }

    case DELETING_UNION_CONFIRMED: {
      const result = await handleDeleteUnion(true, repo, get);
      newState = result.newState;
      effect = result.effect;
      break;
    }

    case SIZE_CHANGED: {
      const result = await handleUpdateChipboardSize(
        intent.newSizeAsString,
        intent.dimension,
        get,
      );
      newState = result.newState;
      effect = result.effect;
      break;
    }

    case COLOR_CHANGED: {
      const result = await handleUpdateChipboardColor(
        intent.newColorName,
        intent.newColor,
        get,
      );
      newState = result.newState;
      effect = result.effect;
      break;
    }

    case QUANTITY_CHANGED: {
      const result = await handleUpdateChipboardQuantity(
        intent.newQuantityAsString,
        get,
      );
      newState = result.newState;
      effect = result.effect;
      break;
    }

    case ADD_CHIPBOARD_TO_DB: {
      const result = await handleAddChipboardToDb(repo, get, t);
      newState = result.newState;
      effect = result.effect;
      break;
    }

    case PRESS_TO_SHARE_UNION: {
      const result = await handlePressToShareUnion(get, t);
      newState = result.newState;
      effect = result.effect;
      break;
    }

    case EDIT_CHIPBOARD_CONFIRMED: {
      const result = await handleEditChipboardInAddAreaAndRemoveFromDb(
        intent.chipboard,
        repo,
        get,
      );
      newState = result.newState;
      effect = result.effect;
      break;
    }

    case DELETE_CHIPBOARD_CONFIRMED: {
      const result = await handleDeleteChipboardFromDb(
        intent.chipboardId,
        repo,
        get,
        t,
      );
      newState = result.newState;
      effect = result.effect;
      break;
    }

    case SHARING_UNION_CONFIRMED: {
      const result = await handleShareUnion(repo, get, t);
      newState = result.newState;
      effect = result.effect;
      break;
    }

    case HANDLE_SCREEN_EXIT: {
      const result = await handleScreenExit(repo, get);
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
