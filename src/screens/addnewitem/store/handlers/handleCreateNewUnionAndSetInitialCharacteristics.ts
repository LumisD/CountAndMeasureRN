import {toObjectIdOrUndefined} from "../../../../data/db/utils";
import {MeasureAndCountRepository} from "../../../../data/repository/MeasureAndCountRepository";
import {NewScreenType} from "../../../models/NewScreenType";
import {
  createDefaultUnionOfChipboardsUI,
  UnionOfChipboardsUI,
} from "../../../models/UnionOfChipboardsUI";
import {getDefaultUnionTitle} from "../../../utils/generalUtils";
import {AddNewItemEffect} from "../../AddNewItemEffect";
import {AddNewItemState} from "../../AddNewItemState";
import {getChipboardAsString} from "../utils";

export async function handleCreateNewUnionAndSetInitialCharacteristics(
  itemType: NewScreenType | null,
  repo: MeasureAndCountRepository,
  get: () => {state: AddNewItemState},
): Promise<{newState: AddNewItemState; effect?: AddNewItemEffect}> {
  console.log("MaC handleCreateNewUnionAndSetInitialCharacteristics started");
  const currentState = get().state;
  if (!itemType) {
    console.log(
      "MaC handleCreateNewUnionAndSetInitialCharacteristics itemType is null",
    );
    return {newState: currentState, effect: undefined};
  }

  const newUnion: UnionOfChipboardsUI = {
    ...createDefaultUnionOfChipboardsUI(),
    title: getDefaultUnionTitle(),
    isFinished: false,
    createdAt: Date.now(),
  };

  // Create a new union in db
  const unionId = await repo.insertUnionOfChipboards(newUnion);

  const initialState: AddNewItemState = {
    ...currentState,
    unionOfChipboards: {
      ...newUnion,
      id: unionId,
    },
    newOrEditChipboard: {
      ...currentState.newOrEditChipboard,
      unionId,
      colorName: "White",
    },
  };

  const union = initialState.unionOfChipboards;

  const dimensions = Math.min(itemType.columnNames.length, 3);
  const directionColumn = Math.min(itemType.directionColumn, 3);
  const titles = itemType.columnNames;

  const objectId = toObjectIdOrUndefined(union.id);
  if (!objectId) {
    console.error(
      `MaC handleCreateNewUnionAndSetInitialCharacteristics: Invalid union.id: ${union.id} , objectId: ${objectId}`,
    );
    return {newState: initialState, effect: undefined};
  }

  // Update union in db
  const date = Date.now();
  await repo.updateUnionCharacteristics(
    objectId,
    dimensions,
    directionColumn,
    itemType.hasColor,
    titles[0] ?? "",
    titles[1] ?? "",
    titles[2] ?? "",
    date,
  );

  const updatedUnion = {
    ...union,
    dimensions,
    direction: directionColumn,
    hasColor: itemType.hasColor,
    titleColumn1: titles[0] ?? "",
    titleColumn2: titles[1] ?? "",
    titleColumn3: titles[2] ?? "",
    updatedAt: date,
  };

  const updatedChipboard = {
    ...initialState.newOrEditChipboard,
    chipboardAsString: getChipboardAsString(
      initialState.newOrEditChipboard,
      updatedUnion?.dimensions ?? initialState.unionOfChipboards.dimensions,
      updatedUnion?.direction ?? initialState.unionOfChipboards.direction,
    ),
  };

  const newState: AddNewItemState = {
    ...initialState,
    unionOfChipboards: updatedUnion,
    newOrEditChipboard: updatedChipboard,
  };
  console.log("MaC handleCreateNewUnionAndSetInitialCharacteristics finished");

  return {newState, effect: undefined};
}
