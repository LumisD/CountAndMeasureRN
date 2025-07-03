import {Platform, Share} from "react-native";

export async function shareUnion(intent: PlatformShareIntent) {
  try {
    if (Platform.OS === "android") {
      // Narrow to AndroidShareIntent
      const androidIntent = intent as AndroidShareIntent;
      await Share.share(
        {
          message: androidIntent.extras.EXTRA_TEXT,
          title: androidIntent.extras.EXTRA_SUBJECT,
        },
        {
          dialogTitle: androidIntent.chooserTitle,
        },
      );
    } else {
      // Narrow to IOSShareIntent
      const iosIntent = intent as IOSShareIntent;
      await Share.share({
        message: iosIntent.message,
        title: iosIntent.title,
      });
    }
  } catch (error) {
    console.warn("Share failed", error);
  }
}

type AndroidShareIntent = {
  action: "ACTION_SEND";
  extras: {
    EXTRA_TEXT: string;
    EXTRA_SUBJECT: string;
  };
  type: "text/plain";
  chooserTitle: string;
};

type IOSShareIntent = {
  message: string;
  title: string;
  subject: string;
};

export type PlatformShareIntent = AndroidShareIntent | IOSShareIntent;
