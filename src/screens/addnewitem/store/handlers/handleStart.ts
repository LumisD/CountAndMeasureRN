import {ObjectId} from "bson";
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
import {mapChipboardToChipboardUi} from "../../models/ChipboardUI";
import {AddNewItemStore} from "../AddNewItemStore";

export async function handleStart(
  itemType: NewScreenType | null,
  repo: MeasureAndCountRepository,
  get: () => AddNewItemStore,
  set: (fn: (store: AddNewItemStore) => AddNewItemStore) => void,
  previousUnsubscribe?: (() => void) | null,
  saveUnsubscribe?: (unsub: () => void) => void,
): Promise<{
  newState: AddNewItemState;
  effect?: AddNewItemEffect;
  unionId?: ObjectId;
}> {
  // This function consists of trhee parts:
  // 1. Create a new union of chipboards in the db
  // 2. Set union's characteristics based on itemType
  // 3. Subscribe to chipboards by unionId

  console.log("MaC handleStart started");
  const currentState = get().state;
  if (!itemType) {
    console.log("MaC handleStart itemType is null");
    return {newState: currentState, effect: undefined, unionId: undefined};
  }

  // 1. Create a new union of chipboards in the db
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

  // 2. Set union's characteristics based on itemType
  const dimensions = Math.min(itemType.columnNames.length, 3);
  const directionColumn = Math.min(itemType.directionColumn, 3);
  const titles = itemType.columnNames;

  const objectId = toObjectIdOrUndefined(unionId);
  if (!objectId) {
    console.error(
      `MaC handleStart: Invalid unionId: ${unionId} , objectId: ${objectId}`,
    );
    return {newState: initialState, effect: undefined, unionId: undefined};
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
    ...initialState.unionOfChipboards,
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

  // 3. Subscribe to chipboards by unionId
  if (unionId && saveUnsubscribe) {
    // Unsubscribe from previous
    previousUnsubscribe?.();

    // Subscribe to new chipboards
    const unsub = repo.subscribeToChipboardsByUnionId(objectId, chipboards => {
      console.log(
        "MaC handleStart chipboards updated length): ",
        chipboards.length,
      );
      const updated = chipboards
        .sort((a, b) => b.id.localeCompare(a.id))
        .map(it => {
          const chipboardUI = mapChipboardToChipboardUi(it);
          return {
            ...chipboardUI,
            quantityAsString: it.quantity.toString(),
            size1AsString: it.size1.toString(),
            size2AsString: it.size2.toString(),
            size3AsString: it.size3.toString(),
            chipboardAsString: getChipboardAsString(
              chipboardUI,
              updatedUnion?.dimensions ??
                initialState.unionOfChipboards.dimensions,
              updatedUnion?.direction ??
                initialState.unionOfChipboards.direction,
            ),
          };
        });

      set(store => ({
        ...store,
        state: {
          ...store.state,
          createdChipboards: updated,
        },
      }));

      saveUnsubscribe(unsub); // save for cleanup
    });
  }

  const newState: AddNewItemState = {
    ...initialState,
    unionOfChipboards: updatedUnion,
    newOrEditChipboard: updatedChipboard,
  };
  console.log("MaC handleStart finished");

  return {newState, effect: undefined, unionId: objectId};
}
