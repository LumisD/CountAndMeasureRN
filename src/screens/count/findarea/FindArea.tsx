import React, {useEffect, useState} from "react";
import {View, StyleSheet} from "react-native";
import {CountState} from "../CountState";
import {CountIntent} from "../CountIntent";
import {t} from "i18next";
import {WidthLengthFields} from "./WidthLengthFields";
import {DisabledOverlay} from "../../common/components/DisabledOverlay";
import {AddCountColorField} from "./AddCountColorField";
import {QuantityCountEditor} from "./QuantityCountEditor";
import {Buttons} from "./Buttons";
import {ChipboardAsStringField} from "../../common/components/UiElements";

type Props = {
  state: CountState;
  shouldFlash: boolean;
  setShouldFlash: (val: boolean) => void;
  processIntent: (intent: CountIntent) => void;
};

export const FindArea: React.FC<Props> = ({
  state,
  shouldFlash,
  setShouldFlash,
  processIntent,
}) => {
  const [flashColor, setFlashColor] = useState("transparent");

  useEffect(() => {
    if (shouldFlash) {
      setFlashColor("rgba(0, 122, 255, 0.5)");
      const timeout = setTimeout(() => {
        setFlashColor("transparent");
        setShouldFlash(false);
      }, 1200);
      return () => clearTimeout(timeout);
    }
  }, [shouldFlash]);

  return (
    <View style={[styles.container, {backgroundColor: flashColor}]}>
      <WidthLengthFields
        union={state.unionOfChipboards}
        chipboard={state.chipboardToFind}
        processIntent={processIntent}
      />

      <View style={styles.row}>
        <View style={styles.leftColumn}>
          {state.unionOfChipboards.hasColor && (
            <DisabledOverlay
              isEnabled={!state.chipboardToFind.isUnderReview}
              onDisabledClick={() => processIntent({type: "FieldDisabled"})}
              content={
                <AddCountColorField
                  colorName={state.chipboardToFind.colorName}
                  processIntent={processIntent}
                />
              }
            />
          )}

          <QuantityCountEditor
            label={t("quantity")}
            value={state.chipboardToFind.quantityAsString}
            onQuantityChanged={processIntent}
          />
        </View>

        <View style={styles.rightColumn}>
          <Buttons
            isFoundButtonAvailable={state.isFoundButtonAvailable}
            isUnknownButtonAvailable={state.isUnknownButtonAvailable}
            processIntent={processIntent}
          />
        </View>
      </View>

      <ChipboardAsStringField
        chipboardAsString={state.chipboardToFind.chipboardAsString}
        hasColor={state.unionOfChipboards.hasColor}
        color={state.chipboardToFind.color}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: 8,
  },
  row: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftColumn: {
    flex: 1,
    justifyContent: "flex-start",
  },
  rightColumn: {
    flex: 1,
    justifyContent: "flex-start",
  },
});
