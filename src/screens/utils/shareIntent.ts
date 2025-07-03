import {Platform} from "react-native";
import {PlatformShareIntent} from "../common/shareUnion";

export function createPlatformShareIntent(
  text: string,
  title: string,
  t: (key: string) => string,
): PlatformShareIntent {
  if (Platform.OS === "android") {
    return {
      action: "ACTION_SEND",
      extras: {
        EXTRA_TEXT: text,
        EXTRA_SUBJECT: title,
      },
      type: "text/plain",
      chooserTitle: t("share_chipboards"),
    };
  } else {
    return {
      message: text,
      title,
      subject: title,
    };
  }
}
