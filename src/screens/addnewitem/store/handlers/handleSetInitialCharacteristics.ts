import {toObjectIdOrUndefined} from "../../../../data/db/utils";
import {MeasureAndCountRepository} from "../../../../data/repository/MeasureAndCountRepository";
import {NewScreenType} from "../../../models/NewScreenType";
import {AddNewItemEffect} from "../../AddNewItemEffect";
import {AddNewItemState} from "../../AddNewItemState";
import {getChipboardAsString} from "../utils";

export async function handleSetInitialCharacteristics(
  itemType: NewScreenType | null,
  repo: MeasureAndCountRepository,
  get: () => {state: AddNewItemState},
): Promise<{newState: AddNewItemState; effect?: AddNewItemEffect}> {
  console.log("MaC handleSetInitialCharacteristics started");
  if (!itemType) {
    return {newState: get().state, effect: undefined};
  }

  const currentState = get().state;
  const union = currentState.unionOfChipboards;

  const dimensions = Math.min(itemType.columnNames.length, 3);
  const directionColumn = Math.min(itemType.directionColumn, 3);
  const titles = itemType.columnNames;

  const objectId = toObjectIdOrUndefined(union.id);
  if (!objectId) {
    console.error(
      `MaC handleSetInitialCharacteristics: Invalid union.id: ${union.id} , objectId: ${objectId}`,
    );
    return {newState: currentState, effect: undefined};
  }

  await repo.updateUnionCharacteristics(
    objectId,
    dimensions,
    directionColumn,
    itemType.hasColor,
    titles[0] ?? "",
    titles[1] ?? "",
    titles[2] ?? "",
    Date.now(),
  );

  const updatedUnion = {
    ...union,
    dimensions,
    direction: directionColumn,
    hasColor: itemType.hasColor,
  };

  const updatedChipboard = {
    ...currentState.newOrEditChipboard,
    chipboardAsString: getChipboardAsString(
      currentState.newOrEditChipboard,
      updatedUnion?.dimensions ?? currentState.unionOfChipboards.dimensions,
      updatedUnion?.direction ?? currentState.unionOfChipboards.direction,
    ),
  };

  const newState: AddNewItemState = {
    ...currentState,
    unionOfChipboards: updatedUnion,
    newOrEditChipboard: updatedChipboard,
  };
  console.log("MaC handleSetInitialCharacteristics finished");

  return {newState, effect: undefined};
}
