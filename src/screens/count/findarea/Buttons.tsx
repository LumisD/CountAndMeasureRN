import {StyleSheet, View} from "react-native";
import {CommonButton} from "../../common/components/CommonButton";
import {
  CountIntent,
  CREATE_UNKNOWN_CHIPBOARD,
  SET_FOUND_CHIPBOARD,
  SHOW_WHAT_IS_FOUND,
  SHOW_WHAT_IS_UNKNOWN,
} from "../CountIntent";
import {useTranslation} from "react-i18next";
import {WhatIsIconButton} from "./WhatIsIconButton";
import {hideKeyboard} from "../../common/components/UiElements";

type Props = {
  isFoundButtonAvailable: boolean;
  isUnknownButtonAvailable: boolean;
  processIntent: (intent: CountIntent) => void;
};

export const Buttons: React.FC<Props> = ({
  isFoundButtonAvailable,
  isUnknownButtonAvailable,
  processIntent,
}) => {
  const {t} = useTranslation();

  return (
    <>
      <View style={styles.row}>
        <CommonButton
          text={t("found")}
          enabled={isFoundButtonAvailable}
          onPress={() => {
            hideKeyboard();
            processIntent({type: SET_FOUND_CHIPBOARD});
          }}
        />
        <View style={{width: 8}} />
        <WhatIsIconButton
          processIntent={() => processIntent({type: SHOW_WHAT_IS_FOUND})}
          contentDescription={t("what_is_found_question")}
        />
      </View>

      <View style={{height: 8}} />

      <View style={styles.row}>
        <CommonButton
          text={t("unknown")}
          enabled={isUnknownButtonAvailable}
          onPress={() => {
            hideKeyboard();
            processIntent({type: CREATE_UNKNOWN_CHIPBOARD});
          }}
        />
        <View style={{width: 8}} />
        <WhatIsIconButton
          processIntent={() => processIntent({type: SHOW_WHAT_IS_UNKNOWN})}
          contentDescription={t("what_is_unknown_question")}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});
