import {ChipboardUI} from "../models/ChipboardUI";

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

export function setAddButtonAvailability(
  chipboard: ChipboardUI,
  dimensions: number,
): boolean {
  let isAddButtonAvailable = true;

  for (let i = 1; i <= dimensions; i++) {
    switch (i) {
      case 1:
        if (chipboard.size1 === 0) isAddButtonAvailable = false;
        break;
      case 2:
        if (chipboard.size2 === 0) isAddButtonAvailable = false;
        break;
      case 3:
        if (chipboard.size3 === 0) isAddButtonAvailable = false;
        break;
    }
  }

  if (chipboard.quantity === 0) isAddButtonAvailable = false;

  return isAddButtonAvailable;
}
