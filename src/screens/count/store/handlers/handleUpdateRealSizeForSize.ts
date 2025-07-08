import {CountEffect} from "../../CountEffect";
import {CountState} from "../../CountState";
import {getAllRealsAsString} from "../utils";

export async function handleUpdateRealSizeForSize(
  newRealSizeAsString: string,
  dimension: number,
  get: () => {state: CountState},
): Promise<{newState: CountState; effect?: CountEffect}> {
  console.log(
    "MaC handleUpdateRealSizeForSize started with newRealSizeAsString:",
    newRealSizeAsString,
  );
  const currentState = get().state;
  const chip = currentState.chipboardToFind;

  if (chip.state !== 0) return {newState: currentState};

  const parsedRealSize = parseFloat(newRealSizeAsString) || 0;
  const newRealSizeAsFloat = (
    isNaN(parsedRealSize) ? 0 : parsedRealSize
  ).toString();

  const updatedChipboard = (() => {
    switch (dimension) {
      case 1:
        return {
          ...chip,
          real1AsString: newRealSizeAsString,
          realSize1: newRealSizeAsFloat,
        };
      case 2:
        return {
          ...chip,
          real2AsString: newRealSizeAsString,
          realSize2: newRealSizeAsFloat,
        };
      case 3:
        return {
          ...chip,
          real3AsString: newRealSizeAsString,
          realSize3: newRealSizeAsFloat,
        };
      default:
        return chip;
    }
  })();

  const allRealsAsString = getAllRealsAsString(
    updatedChipboard,
    currentState.unionOfChipboards.dimensions,
    currentState.unionOfChipboards.direction,
  );

  const updatedChipboard2 = {...updatedChipboard, allRealsAsString};
  console.log("MaC handleUpdateRealSizeForSize finished");

  return {
    newState: {
      ...currentState,
      chipboardToFind: updatedChipboard2,
    },
  };
}
