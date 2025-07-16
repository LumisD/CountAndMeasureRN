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

  const {fixedInput, newRealSizeAsFloat} =
    sanitizeRealSizeInput(newRealSizeAsString);

  const updatedChipboard = (() => {
    switch (dimension) {
      case 1:
        return {
          ...chip,
          real1AsString: fixedInput,
          realSize1: newRealSizeAsFloat,
        };
      case 2:
        return {
          ...chip,
          real2AsString: fixedInput,
          realSize2: newRealSizeAsFloat,
        };
      case 3:
        return {
          ...chip,
          real3AsString: fixedInput,
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

function sanitizeRealSizeInput(input: string): {
  fixedInput: string;
  newRealSizeAsFloat: string;
} {
  // 1. Add "0" if starts with "."
  if (input.startsWith(".")) {
    input = "0" + input;
  }

  // 2. Keep only the first dot, remove all others
  const firstDotIndex = input.indexOf(".");
  if (firstDotIndex !== -1) {
    const beforeDot = input.slice(0, firstDotIndex + 1);
    const afterDot = input.slice(firstDotIndex + 1).replace(/\./g, ""); // remove all remaining dots
    input = beforeDot + afterDot;
  }

  // 3. Remove redundant leading zeros before the dot
  // 3. Remove redundant leading zeros
  if (input.includes(".")) {
    const [intPart, decPart] = input.split(".");
    let newInt = "";

    if (/^0+$/.test(intPart)) {
      newInt = "0"; // all zeros → keep one
    } else {
      newInt = intPart.replace(/^0+/, ""); // trim only before first non-zero
    }

    input = decPart !== undefined ? `${newInt}.${decPart}` : newInt;
  } else {
    if (input.length === 1) {
      // single digit, keep as is
    } else {
      input = input.replace(/^0+/, ""); // trim leading zeros
      if (input === "") input = "0"; // in case all were zeros
    }
  }

  // 4. Convert to float and back to string
  const parsedRealSize = parseFloat(input) || 0;
  const newRealSizeAsFloat = isNaN(parsedRealSize)
    ? "0"
    : parsedRealSize.toString();

  return {fixedInput: input, newRealSizeAsFloat};
}
