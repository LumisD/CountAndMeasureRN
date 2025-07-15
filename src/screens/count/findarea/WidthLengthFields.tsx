import {StyleSheet, View} from "react-native";
import {UnionOfChipboardsUI} from "../../models/UnionOfChipboardsUI";
import {
  CountIntent,
  FIELD_DISABLED,
  SHOW_WHAT_IS_REAL_SIZE,
} from "../CountIntent";
import {ChipboardUI} from "../models/ChipboardUI";
import {UpArrowIcon} from "../../common/components/UiElements";
import React from "react";
import {DisabledOverlay} from "../../common/components/DisabledOverlay";
import {SizeCountEditor} from "./SizeCountEditor";
import {RealSizeInput} from "./RealSizeInput";
import {t} from "i18next";
import {WhatIsIconButton} from "./WhatIsIconButton";

type Props = {
  union: UnionOfChipboardsUI;
  chipboard: ChipboardUI;
  processIntent: (intent: CountIntent) => void;
};

export const WidthLengthFields: React.FC<Props> = ({
  union,
  chipboard,
  processIntent,
}) => {
  return (
    <>
      {[...Array(union.dimensions)].map((_, i) => {
        const dim = i + 1;
        const isDirection = union.direction === dim;

        const name =
          dim === 1
            ? t(union.titleColumn1)
            : dim === 2
            ? t(union.titleColumn2)
            : dim === 3
            ? t(union.titleColumn3)
            : "";

        const sizeOfDim = getSizeForIndex(dim, chipboard);
        const realSizeOfDim = getRealSizeForIndex(dim, chipboard);

        return (
          <View key={dim} style={styles.outerRow}>
            <View style={styles.arrowRow}>
              {isDirection ? (
                <UpArrowIcon style={{marginBottom: 18}} />
              ) : (
                <View style={styles.spacer} />
              )}

              <View style={styles.inputsRow}>
                <View style={{alignSelf: "flex-end"}}>
                  <DisabledOverlay
                    isEnabled={!chipboard.isUnderReview}
                    onDisabledClick={() =>
                      processIntent({type: FIELD_DISABLED})
                    }
                    content={
                      <SizeCountEditor
                        label={name}
                        value={sizeOfDim}
                        dimension={dim}
                        onSizeChanged={processIntent}
                      />
                    }
                  />
                </View>

                <View style={{alignSelf: "flex-end"}}>
                  <DisabledOverlay
                    isEnabled={chipboard.isUnderReview}
                    onDisabledClick={() =>
                      processIntent({type: FIELD_DISABLED})
                    }
                    content={
                      <RealSizeInput
                        value={realSizeOfDim}
                        label={t("real_size")}
                        dimension={dim}
                        isEnabled={chipboard.isUnderReview}
                        onValueChange={processIntent}
                      />
                    }
                  />
                </View>
              </View>

              {dim === 1 && (
                <View style={styles.iconWrapper}>
                  <WhatIsIconButton
                    processIntent={() =>
                      processIntent({type: SHOW_WHAT_IS_REAL_SIZE})
                    }
                    contentDescription={t("what_is_diff_question")}
                  />
                </View>
              )}
            </View>
          </View>
        );
      })}
    </>
  );
};

const styles = StyleSheet.create({
  outerRow: {
    width: "100%",
  },
  arrowRow: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  inputsRow: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  spacer: {
    width: 24,
  },
  iconWrapper: {
    width: 32,
    marginLeft: 8,
  },
  verticalSpacer: {
    height: 16,
  },
});

function getSizeForIndex(index: number, chipboard: ChipboardUI | null): string {
  if (!chipboard) return "";
  switch (index) {
    case 1:
      return chipboard.size1AsString;
    case 2:
      return chipboard.size2AsString;
    case 3:
      return chipboard.size3AsString;
    default:
      return "";
  }
}

function getRealSizeForIndex(
  index: number,
  chipboard: ChipboardUI | null,
): string {
  if (!chipboard) return "";
  switch (index) {
    case 1:
      return chipboard.realSize1;
    case 2:
      return chipboard.realSize2;
    case 3:
      return chipboard.realSize3;
    default:
      return "";
  }
}
