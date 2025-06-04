import {ColorItem} from "../models/ColorItem";
import {NewScreenType} from "../models/NewScreenType";
import {
  White,
  Black,
  Red,
  Green,
  Blue,
  Yellow,
  Cyan,
  Magenta,
  Gray,
  DarkGray,
  LightGray,
  Orange,
  Purple,
  Pink,
  Brown,
  Teal,
  Lime,
  Indigo,
  Amber,
  DeepOrange,
} from "../../theme/colors";

export const defaultScreenTypes: NewScreenType[] = [
  // Width x Length 12.5 x 54.0
  {
    hasColor: false,
    directionColumn: 0,
    columnNames: ["width_column", "length_column"],
  },
  // ↑Width x Length ↑12.5 x 54.0
  {
    hasColor: false,
    directionColumn: 1,
    columnNames: ["width_column", "length_column"],
  },
  // Width x ↑Length 12.5 x ↑54.0
  {
    hasColor: false,
    directionColumn: 2,
    columnNames: ["width_column", "length_column"],
  },
  // Width x Length x Color 12.5 x 54.0 x Blue
  {
    hasColor: true,
    directionColumn: 0,
    columnNames: ["width_column", "length_column"],
  },
  // ↑Width x Length x Color ↑12.5 x 54.0 x Blue
  {
    hasColor: true,
    directionColumn: 1,
    columnNames: ["width_column", "length_column"],
  },
  // Width x ↑Length x Color 12.5 x ↑54.0 x Blue
  {
    hasColor: true,
    directionColumn: 2,
    columnNames: ["width_column", "length_column"],
  },
  // Width x Length x Height 12.5 x 54.0 x 10.0
  {
    hasColor: false,
    directionColumn: 0,
    columnNames: ["width_column", "length_column", "height_column"],
  },
  // Length 54.0
  {
    hasColor: false,
    directionColumn: 0,
    columnNames: ["length_column"],
  },
  // Length x Color 54.0 x Blue
  {
    hasColor: true,
    directionColumn: 0,
    columnNames: ["length_column"],
  },
];

export const colorListWithNames: ColorItem[] = [
  {name: "color_white", color: White},
  {name: "color_black", color: Black},
  {name: "color_red", color: Red},
  {name: "color_green", color: Green},
  {name: "color_blue", color: Blue},
  {name: "color_yellow", color: Yellow},
  {name: "color_cyan", color: Cyan},
  {name: "color_magenta", color: Magenta},
  {name: "color_gray", color: Gray},
  {name: "color_dark_gray", color: DarkGray},
  {name: "color_light_gray", color: LightGray},
  {name: "color_orange", color: Orange},
  {name: "color_purple", color: Purple},
  {name: "color_pink", color: Pink},
  {name: "color_brown", color: Brown},
  {name: "color_teal", color: Teal},
  {name: "color_lime", color: Lime},
  {name: "color_indigo", color: Indigo},
  {name: "color_amber", color: Amber},
  {name: "color_deep_orange", color: DeepOrange},
];
