import {toObjectIdOrUndefined} from "../../../../data/db/utils";
import {MeasureAndCountRepository} from "../../../../data/repository/MeasureAndCountRepository";
import {CountEffect} from "../../CountEffect";
import {CountState} from "../../CountState";
import {getChipboardWithInitialValuesAndCharacteristics} from "../utils";

export async function handleCreateUnknownAndSaveInDb(
  repo: MeasureAndCountRepository,
  get: () => {state: CountState},
): Promise<{newState: CountState; effect?: CountEffect}> {
  // This function can be called only for chipboards with state = 2

  // set chipboardToFind.state = 2
  // save chipboardToFind in db
  // set characteristics to default values
  console.log("MaC handleCreateUnknownAndSaveInDb started");

  const currentState = get().state;
  const chipboardToFind = currentState.chipboardToFind;

  const chipboardToFindId = toObjectIdOrUndefined(chipboardToFind.id);
  const unionId = toObjectIdOrUndefined(chipboardToFind.unionId);

  if (!chipboardToFindId || !unionId) {
    console.error(
      `MaC handleCreateUnknownAndSaveInDb: Invalid chipboard id or unionId: ${chipboardToFind.id}, ${chipboardToFind.unionId}`,
    );
    return {newState: currentState, effect: undefined};
  }

  const unknownChipboard = {
    ...chipboardToFind,
    state: 2,
  };

  await repo.insertChipboard(unknownChipboard);

  const updatedChipboardToFind =
    getChipboardWithInitialValuesAndCharacteristics(
      chipboardToFind,
      currentState.unionOfChipboards.dimensions,
      currentState.unionOfChipboards.direction,
    );

  const newState: CountState = {
    ...currentState,
    chipboardToFind: updatedChipboardToFind,
    isUnknownButtonAvailable: false,
  };
  console.log("MaC handleCreateUnknownAndSaveInDb finished");

  return {newState, effect: undefined};
}
