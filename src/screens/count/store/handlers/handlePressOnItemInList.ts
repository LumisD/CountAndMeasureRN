import {
  CountEffect,
  SHOW_REMOVE_NOT_FOUND_FROM_FIND_AREA_CONFIRMATION_DIALOG,
  SHOW_SELECT_NOT_FOUND_TO_FIND_AREA_CONFIRMATION_DIALOG,
  SHOW_UNCHECK_CONFIRMATION_DIALOG,
  SHOW_SELECT_UNKNOWN_TO_FIND_AREA_CONFIRMATION_DIALOG,
} from "../../CountEffect";
import {CountState} from "../../CountState";
import {ChipboardUI} from "../../models/ChipboardUI";

export async function handlePressOnItemInList(
  chipboard: ChipboardUI,
  get: () => {state: CountState},
): Promise<{newState: CountState; effect?: CountEffect}> {
  console.log("MaC handlePressOnItemInList started");
  const currentState = get().state;

  switch (chipboard.state) {
    case 0: // Not found
      if (chipboard.isUnderReview) {
        return {
          newState: currentState,
          effect: {
            type: SHOW_REMOVE_NOT_FOUND_FROM_FIND_AREA_CONFIRMATION_DIALOG,
            chipboard,
          },
        };
      } else {
        return {
          newState: currentState,
          effect: {
            type: SHOW_SELECT_NOT_FOUND_TO_FIND_AREA_CONFIRMATION_DIALOG,
            chipboard,
          },
        };
      }

    case 1: // Found
      return {
        newState: currentState,
        effect: {
          type: SHOW_UNCHECK_CONFIRMATION_DIALOG,
          chipboard,
        },
      };

    case 2: // Unknown
      return {
        newState: currentState,
        effect: {
          type: SHOW_SELECT_UNKNOWN_TO_FIND_AREA_CONFIRMATION_DIALOG,
          chipboard,
        },
      };

    default:
      return {newState: currentState};
  }
}
