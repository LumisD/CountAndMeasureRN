import {CountState} from "../../CountState";
import {getChipboardAsString} from "../utils";

export async function handleUpdateColor(
  colorName: string, // e.g. "White"
  newColor: string,
  get: () => {state: CountState},
): Promise<{newState: CountState; effect?: undefined}> {
  // sort not found chipboard by colorName among those only with state = 0
  // and sorting logic is: for example colorName = "White"
  // a) first find a colorName with  "White" and place them on top (if more than one chipboard is found)
  // b) then rest of chipboards
  // The logic has to be applied only to not found chipboards (state = 0)
  // chipboardToFind must have state == 2 (unknown) to be updated
  console.log(
    `MaC handleUpdateColor started colorName: ${colorName}, newColor: ${newColor}`,
  );

  const currentState = get().state;

  const chipboardToFind = currentState.chipboardToFind;

  if (chipboardToFind.state !== 2) return {newState: currentState};

  const chipboardsToSort = currentState.chipboards.filter(it => it.state === 0);
  const otherChipboards = currentState.chipboards.filter(it => it.state !== 0);

  const sortedChipboards = chipboardsToSort.sort((a, b) => {
    const aPriority = a.colorName === colorName ? 0 : 1;
    const bPriority = b.colorName === colorName ? 0 : 1;
    return aPriority - bPriority;
  });

  const updatedChipboard = {
    ...chipboardToFind,
    colorName,
    color: newColor,
  };

  const updatedChipboard2 = {
    ...updatedChipboard,
    chipboardAsString: getChipboardAsString(
      updatedChipboard,
      currentState.unionOfChipboards.dimensions,
      currentState.unionOfChipboards.direction,
    ),
  };

  const newState: CountState = {
    ...currentState,
    chipboards: [...sortedChipboards, ...otherChipboards],
    chipboardToFind: updatedChipboard2,
  };
  console.log(`MaC handleUpdateColor finished`);

  return {newState};
}
