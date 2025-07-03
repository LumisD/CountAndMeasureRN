import {NewScreenType} from "../../models/NewScreenType";

export function convertToNewScreenType(
  serializedItemType: string,
): NewScreenType | null {
  try {
    const parsed = JSON.parse(serializedItemType);
    if (isValidNewScreenType(parsed)) {
      return parsed;
    } else {
      console.warn(
        "MaC convertToNewScreenType Parsed object is not a valid NewScreenType",
        parsed,
      );
    }
  } catch (e) {
    console.error(
      "MaC convertToNewScreenType Failed to parse serializedItemType",
      e,
    );
  }
  return null;
}

function isValidNewScreenType(obj: any): obj is NewScreenType {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.hasColor === "boolean" &&
    typeof obj.directionColumn === "number" &&
    Array.isArray(obj.columnNames) &&
    obj.columnNames.every((el: unknown) => typeof el === "string")
  );
}
