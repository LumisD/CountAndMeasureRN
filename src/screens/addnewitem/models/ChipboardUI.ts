import {Chipboard} from "../../../data/db/schemas/Chipboard";
import {White} from "../../../theme/colors";
import {UnionOfChipboardsUI} from "../../models/UnionOfChipboardsUI";

export type ChipboardUI = {
  id: string;
  unionId: string;
  quantity: number;
  colorName: string;
  color: string;
  size1: string;
  size2: string;
  size3: string;

  quantityAsString: string;
  size1AsString: string;
  size2AsString: string;
  size3AsString: string;
  chipboardAsString: string;
};

export function createDefaultChipboardUI(): ChipboardUI {
  return {
    id: "0",
    unionId: "0",
    quantity: 1,
    colorName: "White",
    color: White, // e.g. white ARGB
    size1: "0",
    size2: "0",
    size3: "0",
    quantityAsString: "1",
    size1AsString: "",
    size2AsString: "",
    size3AsString: "",
    chipboardAsString: "",
  };
}

export function mapChipboardUIToChipboard(ui: ChipboardUI): Chipboard {
  return {
    id: ui.id,
    unionId: ui.unionId,
    state: 0, // default state
    quantity: ui.quantity,
    colorName: ui.colorName,
    color: ui.color,
    size1: ui.size1,
    realSize1: "0",
    size2: ui.size2,
    realSize2: "0",
    size3: ui.size3,
    realSize3: "0",
  };
}

export function mapChipboardToChipboardUi(chip: Chipboard): ChipboardUI {
  return {
    id: chip.id,
    unionId: chip.unionId,
    quantity: chip.quantity,
    colorName: chip.colorName,
    color: chip.color,
    size1: chip.size1,
    size2: chip.size2,
    size3: chip.size3,

    quantityAsString: chip.quantity.toString(),
    size1AsString: chip.size1,
    size2AsString: chip.size2,
    size3AsString: chip.size3,
    chipboardAsString: "",
  };
}

export function getShareableString(
  chipboard: ChipboardUI,
  union: UnionOfChipboardsUI,
): string {
  const {size1, size2, size3, quantity, colorName} = chipboard;
  const {dimensions, direction, hasColor} = union;

  const builder: string[] = [];

  for (let i = 1; i <= dimensions; i++) {
    if (i === direction) builder.push("↑");

    switch (i) {
      case 1:
        builder.push(size1);
        break;
      case 2:
        builder.push(size2);
        break;
      case 3:
        builder.push(size3);
        break;
    }

    if (i < dimensions) builder.push(" x ");
  }

  builder.push(" - " + quantity.toString());

  if (hasColor && colorName.trim() !== "") {
    builder.push(` (${colorName})`);
  }

  return builder.join("");
}
