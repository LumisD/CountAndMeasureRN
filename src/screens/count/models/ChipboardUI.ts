import {t} from "i18next";
import {Chipboard} from "../../../data/db/schemas/Chipboard";
import {UnionOfChipboardsUI} from "../../models/UnionOfChipboardsUI";

export type ChipboardUI = {
  id: string;
  unionId: string;
  state: number; // 0 = not found, 1 = found, 2 = unknown
  quantity: number;
  colorName: string;
  color: string;
  size1: string;
  realSize1: string; //diff between real measured size and size1
  size2: string;
  realSize2: string;
  size3: string;
  realSize3: string;

  quantityAsString: string;
  size1AsString: string;
  real1AsString: string;
  size2AsString: string;
  real2AsString: string;
  size3AsString: string;
  real3AsString: string;
  chipboardAsString: string;
  allRealsAsString: string;

  isUnderReview: boolean;
  //if true - enable: Found button, "real size" editors
  // AND disable: Unknown button,size editors, quantity editor, color editor
  //if false - all opposite
};

export function createDefaultChipboardUI(): ChipboardUI {
  return {
    id: "0",
    unionId: "0",
    state: 2,
    quantity: 1,
    colorName: "",
    color: "",
    size1: "0",
    realSize1: "",
    size2: "0",
    realSize2: "",
    size3: "0",
    realSize3: "",

    quantityAsString: "1",
    size1AsString: "",
    real1AsString: "",
    size2AsString: "",
    real2AsString: "",
    size3AsString: "",
    real3AsString: "",
    chipboardAsString: "",
    allRealsAsString: "",

    isUnderReview: false,
  };
}

export function mapChipboardToChipboardUi(chip: Chipboard): ChipboardUI {
  return {
    id: chip.id,
    unionId: chip.unionId,
    state: chip.state,
    quantity: chip.quantity,
    colorName: chip.colorName,
    color: chip.color,
    size1: chip.size1,
    realSize1: chip.realSize1,
    size2: chip.size2,
    realSize2: chip.realSize2,
    size3: chip.size3,
    realSize3: chip.realSize3,

    quantityAsString: chip.quantity.toString(),
    size1AsString: chip.size1,
    real1AsString: chip.realSize1,
    size2AsString: chip.size2,
    real2AsString: chip.realSize2,
    size3AsString: chip.size3,
    real3AsString: chip.realSize3,
    chipboardAsString: "",
    allRealsAsString: "",

    isUnderReview: false, //if true - enable: Found button, "real size" editors
    // AND disable: Unknown button,size editors, quantity editor, color editor
    //if false - all opposite
  };
}

export function mapChipboardUIToChipboard(ui: ChipboardUI): Chipboard {
  return {
    id: ui.id,
    unionId: ui.unionId,
    state: ui.state,
    quantity: ui.quantity,
    colorName: ui.colorName,
    color: ui.color,
    size1: ui.size1,
    realSize1: ui.realSize1,
    size2: ui.size2,
    realSize2: ui.realSize2,
    size3: ui.size3,
    realSize3: ui.realSize3,
  };
}

export function getShareableString(
  chipboard: ChipboardUI,
  union: UnionOfChipboardsUI,
): string {
  const builder: string[] = [];
  const realSizeBuilder: string[] = [];
  const {dimensions, direction, hasColor} = union;
  const {
    size1,
    size2,
    size3,
    realSize1,
    realSize2,
    realSize3,
    quantity,
    colorName,
    state,
  } = chipboard;

  let isAllRealsEmpty = true;

  for (let i = 1; i <= dimensions; i++) {
    if (i === direction) {
      builder.push("↑");
      realSizeBuilder.push(" ");
    }

    const sizeString = (() => {
      switch (i) {
        case 1:
          return size1;
        case 2:
          return size2;
        case 3:
          return size3;
        default:
          return "";
      }
    })();

    builder.push(sizeString);

    const real = (() => {
      switch (i) {
        case 1:
          return realSize1;
        case 2:
          return realSize2;
        case 3:
          return realSize3;
        default:
          return "0";
      }
    })();

    if (real !== "0" && real !== "" && real !== "0.0") {
      isAllRealsEmpty = false;
      realSizeBuilder.push(real);

      const diff = sizeString.length - real.length;
      if (diff > 0) {
        realSizeBuilder.push(" ".repeat(diff));
      }
    } else {
      realSizeBuilder.push(" ".repeat(sizeString.length));
    }

    if (i < dimensions) {
      builder.push(" x ");
      realSizeBuilder.push("    ");
    }
  }

  builder.push(" - " + quantity);

  if (hasColor && colorName.trim() !== "") {
    builder.push(` (${t(colorName)})`);
  }

  const stateText = (() => {
    switch (state) {
      case 0:
        return t("not_found_in_brackets"); // e.g. " (Not Found)"
      case 1:
        return t("found_in_brackets"); // e.g. " (Found)"
      default:
        return "";
    }
  })();

  builder.push(stateText);

  if (!isAllRealsEmpty) {
    realSizeBuilder.push("      <- " + t("real_size"));
    return builder.join("") + "\n" + realSizeBuilder.join("").trimEnd();
  }

  return builder.join("");
}
