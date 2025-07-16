import {ChipboardUI, createDefaultChipboardUI} from "../models/ChipboardUI";

export function getChipboardAsString(
  chipboard: ChipboardUI,
  dimensions: number,
  direction: number,
): string {
  const builder: string[] = [];

  for (let i = 1; i <= dimensions; i++) {
    if (direction === i) {
      builder.push("↑");
    }
    switch (i) {
      case 1:
        builder.push(`${chipboard.size1}`);
        break;
      case 2:
        builder.push(`${chipboard.size2}`);
        break;
      case 3:
        builder.push(`${chipboard.size3}`);
        break;
    }
    if (i < dimensions) {
      builder.push(" x ");
    }
  }

  builder.push(` - ${chipboard.quantity}`);
  return builder.join("");
}

export function getAllRealsAsString(
  chipboard: ChipboardUI,
  dimensions: number,
  direction: number,
): string {
  let builder = "";
  let isAllRealsEmpty = true;

  for (let i = 1; i <= dimensions; i++) {
    if (i === direction) {
      builder += " ";
    }

    const size = (() => {
      switch (i) {
        case 1:
          return chipboard.size1;
        case 2:
          return chipboard.size2;
        case 3:
          return chipboard.size3;
        default:
          return "";
      }
    })().trim();

    const realSize = (() => {
      switch (i) {
        case 1:
          return chipboard.realSize1;
        case 2:
          return chipboard.realSize2;
        case 3:
          return chipboard.realSize3;
        default:
          return "0";
      }
    })().trim();

    if (realSize !== "0" && realSize !== "0.0" && realSize !== "") {
      isAllRealsEmpty = false;
      const realSizeString = realSize;
      builder += realSizeString;

      if (size.length > realSizeString.length) {
        builder += " ".repeat(size.length - realSizeString.length);
      }
    } else {
      builder += " ".repeat(size.length);
    }

    //as real sizes have smaller font add additional spaces
    if (size.length > 5) {
      builder += "    ";
    } else if (size.length > 2) {
      builder += "  ";
    } else {
      builder += " ";
    }

    if (i < dimensions) {
      builder += "    ";
    }
  }

  return isAllRealsEmpty ? "" : builder;
}

export function getChipboardWithInitialValuesAndCharacteristics(
  chipboard: ChipboardUI | null,
  dimensions: number,
  direction: number,
): ChipboardUI {
  const defaultChipboardUI = createDefaultChipboardUI();
  if (chipboard === null) return defaultChipboardUI;

  const newChipboardToFind: ChipboardUI = {
    ...defaultChipboardUI,

    // Copy properties from the existing chipboard
    unionId: chipboard.unionId,
    colorName: chipboard.colorName,
    color: chipboard.color,
  };

  return {
    ...newChipboardToFind,
    chipboardAsString: getChipboardAsString(
      newChipboardToFind,
      dimensions,
      direction,
    ),
  };
}

export function setUnknownButtonAvailability(
  chipboard: ChipboardUI,
  dimensions: number,
): boolean {
  if (chipboard.state !== 2) return false;

  let isUnknownButtonAvailable = true;

  for (let i = 1; i <= dimensions; i++) {
    switch (i) {
      case 1:
        if (parseFloat(chipboard.size1) === 0) isUnknownButtonAvailable = false;
        break;
      case 2:
        if (parseFloat(chipboard.size2) === 0) isUnknownButtonAvailable = false;
        break;
      case 3:
        if (parseFloat(chipboard.size3) === 0) isUnknownButtonAvailable = false;
        break;
    }
    if (chipboard.quantity === 0) isUnknownButtonAvailable = false;
  }

  return isUnknownButtonAvailable;
}

export function setAddButtonAvailability(
  chipboard: ChipboardUI,
  dimensions: number,
): boolean {
  let isAddButtonAvailable = true;

  for (let i = 1; i <= dimensions; i++) {
    switch (i) {
      case 1:
        if (Number(chipboard.size1) === 0) isAddButtonAvailable = false;
        break;
      case 2:
        if (Number(chipboard.size2) === 0) isAddButtonAvailable = false;
        break;
      case 3:
        if (Number(chipboard.size3) === 0) isAddButtonAvailable = false;
        break;
    }
  }

  if (chipboard.quantity === 0) isAddButtonAvailable = false;

  return isAddButtonAvailable;
}
