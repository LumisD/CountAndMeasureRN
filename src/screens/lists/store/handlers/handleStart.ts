import {t} from "i18next";
import {toObjectIdOrUndefined} from "../../../../data/db/utils";
import {MeasureAndCountRepository} from "../../../../data/repository/MeasureAndCountRepository";
import {ListsEffect} from "../../ListsEffect";
import {ListsState} from "../../ListsState ";
import {ListsStore} from "../ListsStore";
import {toUnionOfChipboardsUI} from "../../../models/UnionOfChipboardsUI";

export async function handleStart(
  repo: MeasureAndCountRepository,
  get: () => ListsStore,
  set: (fn: (store: ListsStore) => ListsStore) => void,
  previousUnsubscribe?: (() => void) | null,
  saveUnsubscribe?: (unsub: () => void) => void,
): Promise<{
  newState: ListsState;
  effect?: ListsEffect;
}> {
  console.log("Lists handleStart started");

  const currentState = get().state;

  // Unsubscribe previous listener if any
  previousUnsubscribe?.();

  // Subscribe to all unions flow
  const unsub = repo.subscribeToAllUnions(unionsFromDb => {
    console.log(
      "Lists handleStart subscribeToAllUnions unionsFromDb.length: ",
      unionsFromDb.length,
    );
    const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000; // 30 days in ms

    // Partition unions into those to delete and potentially kept
    const unionsToDelete = unionsFromDb.filter(
      union =>
        union.isMarkedAsDeleted &&
        Math.max(union.createdAt, union.updatedAt) < thirtyDaysAgo,
    );
    const potentiallyKeptUnionsFromDb = unionsFromDb.filter(
      union => !unionsToDelete.includes(union),
    );

    const currentTime = Date.now();

    // Update blank titles
    const processedUnions = potentiallyKeptUnionsFromDb.map(union => {
      if (!union.title || union.title.trim() === "") {
        const objectUnionId = toObjectIdOrUndefined(union.id);
        if (objectUnionId) {
          // update title in repo
          repo.updateUnionOfChipboardsTitle(
            objectUnionId,
            t("no_title"),
            currentTime,
          );
          return {...union, title: "No title", updatedAt: currentTime};
        }
      }
      return union;
    });

    // Sort unions: deleted last, finished after unfinished, then by updated/created desc
    const sortedUnionsForUI = processedUnions
      .slice()
      .sort((a, b) => {
        const aPriority = a.isMarkedAsDeleted ? 2 : a.isFinished ? 1 : 0;
        const bPriority = b.isMarkedAsDeleted ? 2 : b.isFinished ? 1 : 0;
        if (aPriority !== bPriority) return aPriority - bPriority;

        const aTime = Math.max(a.createdAt, a.updatedAt);
        const bTime = Math.max(b.createdAt, b.updatedAt);
        return bTime - aTime; // descending
      })
      .map(u => toUnionOfChipboardsUI(u));

    // Update state with sorted list
    set(store => ({
      ...store,
      state: {
        ...store.state,
        listOfUnions: sortedUnionsForUI,
      },
    }));

    // Delete old unions and their chipboards
    unionsToDelete.forEach(union => {
      const objectUnionId = toObjectIdOrUndefined(union.id);
      if (objectUnionId) {
        repo.deleteUnionOfChipboards(objectUnionId);
        repo.deleteAllChipboardsByUnionId(objectUnionId);
      }
    });
  });

  // Save unsubscribe callback
  if (saveUnsubscribe) {
    saveUnsubscribe(unsub);
  }

  console.log("Lists handleStart finished");

  return {
    newState: currentState, // state will be updated asynchronously in subscription
    effect: undefined,
  };
}
