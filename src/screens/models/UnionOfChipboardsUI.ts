import {UnionOfChipboards} from "../../data/db/schemas/UnionOfChipboards";

export type UnionOfChipboardsUI = {
  id: string;
  title: string;
  dimensions: number;
  direction: number;
  hasColor: boolean;
  titleColumn1: string;
  titleColumn2: string;
  titleColumn3: string;
  isFinished: boolean;
  isMarkedAsDeleted: boolean;
  createdAt: number;
  updatedAt: number;
};

export const createDefaultUnionOfChipboardsUI = (): UnionOfChipboardsUI => ({
  id: "0",
  title: "",
  dimensions: 1, // qty of dimensions starts from 1
  direction: 0, // 0 - no direction, 1 to n - direction column
  hasColor: false,
  titleColumn1: "",
  titleColumn2: "",
  titleColumn3: "",
  isFinished: false,
  isMarkedAsDeleted: false,
  createdAt: 0, // timestamp in milliseconds
  updatedAt: 0, // timestamp in milliseconds
});

export function toUnionOfChipboards(
  ui: UnionOfChipboardsUI,
): UnionOfChipboards {
  return {
    id: ui.id,
    title: ui.title,
    dimensions: ui.dimensions,
    direction: ui.direction,
    hasColor: ui.hasColor,
    titleColumn1: ui.titleColumn1,
    titleColumn2: ui.titleColumn2,
    titleColumn3: ui.titleColumn3,
    isFinished: ui.isFinished,
    isMarkedAsDeleted: ui.isMarkedAsDeleted,
    createdAt: ui.createdAt,
    updatedAt: ui.updatedAt,
  };
}

export function toUnionOfChipboardsUI(
  db: UnionOfChipboards,
): UnionOfChipboardsUI {
  return {
    id: db.id,
    title: db.title,
    dimensions: db.dimensions,
    direction: db.direction,
    hasColor: db.hasColor,
    titleColumn1: db.titleColumn1,
    titleColumn2: db.titleColumn2,
    titleColumn3: db.titleColumn3,
    isFinished: db.isFinished,
    isMarkedAsDeleted: db.isMarkedAsDeleted,
    createdAt: db.createdAt,
    updatedAt: db.updatedAt,
  };
}
