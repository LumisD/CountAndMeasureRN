import {toObjectIdOrUndefined} from "../../../../data/db/utils";
import {MeasureAndCountRepository} from "../../../../data/repository/MeasureAndCountRepository";
import {CountEffect} from "../../CountEffect";
import {CountState} from "../../CountState";
import {ChipboardUI} from "../../models/ChipboardUI";

export async function handleSetChipboardAsNotFound(
  chipboard: ChipboardUI,
  repo: MeasureAndCountRepository,
  get: () => {state: CountState},
): Promise<{newState: CountState; effect?: CountEffect}> {
  //find chipboard in the list and set chipboard.state = 0
  //update state.chipboards and real sizes
  //update chipboard in db
  console.log("MaC handleSetChipboardAsNotFound started");
  const currentState = get().state;

  const updatedChipboards = currentState.chipboards.map(it => {
    if (it.id === chipboard.id) {
      return {
        ...it,
        state: 0,
        realSize1: "",
        realSize2: "",
        realSize3: "",
        real1AsString: "",
        real2AsString: "",
        real3AsString: "",
      };
    } else {
      return it;
    }
  });

  const chipboardId = toObjectIdOrUndefined(chipboard.id);
  if (!chipboardId) {
    console.error(
      "handleSetChipboardAsNotFound: invalid chipboard ID:",
      chipboard.id,
    );
    return {newState: currentState};
  }

  const updatedChipboard = {
    ...chipboard,
    state: 0,
    realSize1: "",
    realSize2: "",
    realSize3: "",
    real1AsString: "",
    real2AsString: "",
    real3AsString: "",
  };

  await repo.updateChipboard(updatedChipboard);
  console.log("MaC handleSetChipboardAsNotFound finished");

  return {
    newState: {
      ...currentState,
      chipboards: updatedChipboards,
    },
  };
}
