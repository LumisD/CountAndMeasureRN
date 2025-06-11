import {Chipboard} from "../../../data/db/schemas/Chipboard";

export type ChipboardUI = {
  id: string;
  unionId: string;
  quantity: number;
  colorName: string;
  color: number;
  size1: number;
  size2: number;
  size3: number;

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
    color: 0xffffffff, // e.g. white ARGB
    size1: 0,
    size2: 0,
    size3: 0,
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
    state: 0, // default state, can be changed later
    quantity: ui.quantity,
    colorName: ui.colorName,
    color: ui.color,
    size1: ui.size1,
    realSize1: 0,
    size2: ui.size2,
    realSize2: 0,
    size3: ui.size3,
    realSize3: 0,
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
    size1AsString: chip.size1.toString(),
    size2AsString: chip.size2.toString(),
    size3AsString: chip.size3.toString(),
    chipboardAsString: "", // can be composed elsewhere
  };
}
