import {CountEffect, SCROLL_TO_TOP} from "../../CountEffect";
import {CountState} from "../../CountState";
import {ChipboardUI} from "../../models/ChipboardUI";
import {getChipboardAsString, setUnknownButtonAvailability} from "../utils";

//sort not found chipboard by this side (simpleSort) OR by several sizes (complicatedSort):
//here is a logic for simpleSort:
//find a size by dimension (dimension = 1 -> size1, dimension = 2 -> size2, dimension = 3 -> size3)
//then sort only those with state = 0
//and sorting logic is: for example findSizeAsFloat = 1.0
//a) first find a size with full findSizeAsFloat - "1.0" and place them on top (if more than one chipboard is found)
//b) then take a findSizeAsFloat without last number and find a size which starts with "1." and place them below found in a) section
//c) then reduce a findSizeAsFloat one more - so result is "1" and find a size which starts with "1"  and place them below found in b) section
//general logic is - first find exact size and place on top, then reduce a findSizeAsFloat on one figure from the end and find a size which starts with this string
//and do the same until findSizeAsFloat ends with figures
//for example, if findSizeAsFloat is 123.45 - so, chipboards have to be aligned next order:
//a)on top those which size is exactly 123.45
//b)then those which size start with "123.4"
//c)then those which size start with "123."
//d)then those which size start with "123"
//e)then those which size start with "12"
//f)then those which size start with "1"
//g)then rest of chipboards
//The logic has to be applied only to not found chipboards (state = 0) and only to chipboards with same dimension
export async function handleSortBySize(
  findSizeAsString: string,
  dimension: number,
  get: () => {state: CountState},
): Promise<{newState: CountState; effect?: CountEffect}> {
  console.log("MaC handleSortBySize started: ", findSizeAsString);
  const currentState = get().state;
  const chipboardsToSort = currentState.chipboards.filter(cb => cb.state === 0);
  const otherChipboards = currentState.chipboards.filter(cb => cb.state !== 0);
  const direction = currentState.unionOfChipboards.direction;
  const dimensions = currentState.unionOfChipboards.dimensions;

  // Build list of matching prefixes: "123.45" => ["123.45", "123.4", "123.", "123", "12", "1"]
  const matchingPrefixes: string[] = [];
  let currentPrefix = findSizeAsString;
  while (currentPrefix.length > 0) {
    matchingPrefixes.push(currentPrefix);
    currentPrefix = currentPrefix.slice(0, -1);
  }

  function getBestMatchIndex(sizeStr: string): number {
    return matchingPrefixes.findIndex(prefix => sizeStr.startsWith(prefix));
  }

  function getBestMatchIndexOverall(chipboard: ChipboardUI): number {
    if (dimensions === 1 || (direction !== 0 && dimensions === 2)) {
      // simpleSort: sort by a specific dimension
      const str =
        dimension === 1
          ? chipboard.size1AsString
          : dimension === 2
          ? chipboard.size2AsString
          : chipboard.size3AsString;
      return getBestMatchIndex(str);
    } else {
      // complicatedSort: try to match across all active dimensions
      const strs: string[] = [];
      if (dimensions >= 1) strs.push(chipboard.size1AsString);
      if (dimensions >= 2) strs.push(chipboard.size2AsString);
      if (dimensions >= 3) strs.push(chipboard.size3AsString);

      let best = Number.MAX_SAFE_INTEGER;
      for (const str of strs) {
        if (str) {
          const idx = getBestMatchIndex(str);
          if (idx !== -1 && idx < best) best = idx;
        }
      }
      return best;
    }
  }

  const sortedChipboards = chipboardsToSort.sort(
    (a, b) => getBestMatchIndexOverall(a) - getBestMatchIndexOverall(b),
  );

  const finalSortedList = [...sortedChipboards, ...otherChipboards];

  const newState: CountState = {
    ...currentState,
    chipboards: finalSortedList,
  };
  console.log("MaC handleSortBySize finished");

  return {newState, effect: {type: SCROLL_TO_TOP}};
}

// Update chipboard's size field by dimension (1, 2, or 3)
// Set both numeric and string values
// Recalculate chipboardAsString and unknown button availability
export async function handleUpdateChipboardSize(
  newSizeAsString: string,
  dimension: number,
  state: CountState,
): Promise<{newState: CountState; effect?: CountEffect}> {
  console.log("MaC handleUpdateChipboardSize started: ", newSizeAsString);
  const chip = state.chipboardToFind;
  if (chip.state !== 2) return {newState: state, effect: undefined};

  const newSizeAsFloat = parseFloat(newSizeAsString);
  const size = (isNaN(newSizeAsFloat) ? 0 : newSizeAsFloat).toString();

  const updatedChipboard = {
    ...chip,
    ...(dimension === 1
      ? {size1AsString: newSizeAsString, size1: size}
      : dimension === 2
      ? {size2AsString: newSizeAsString, size2: size}
      : dimension === 3
      ? {size3AsString: newSizeAsString, size3: size}
      : {}),
  };

  const updatedChipboard2 = {
    ...updatedChipboard,
    chipboardAsString: getChipboardAsString(
      updatedChipboard,
      state.unionOfChipboards.dimensions,
      state.unionOfChipboards.direction,
    ),
  };

  const newState: CountState = {
    ...state,
    chipboardToFind: updatedChipboard2,
    isUnknownButtonAvailable: setUnknownButtonAvailability(
      updatedChipboard2,
      state.unionOfChipboards.dimensions,
    ),
  };
  console.log("MaC handleUpdateChipboardSize finished");

  return {newState, effect: undefined};
}
