import React from "react";
import {ExpandHideFieldInternal} from "../../common/components/ExpandHideFieldInternal";
import {
  CountIntent,
  PRESS_TO_DELETE_OR_RESTORE_UNION,
  PRESS_TO_SHARE_UNION,
  TOGGLE_FIND_AREA_VISIBILITY,
} from "../CountIntent";

type Props = {
  isFoundAreaOpen: boolean;
  isRestoreIconShown: boolean;
  processIntent: (intent: CountIntent) => void;
};

export const ExpandHideCountField: React.FC<Props> = ({
  isFoundAreaOpen,
  isRestoreIconShown,
  processIntent,
}) => {
  return (
    <ExpandHideFieldInternal
      isAreaOpen={isFoundAreaOpen}
      isRestoreIconShown={isRestoreIconShown}
      processIntent={processIntent}
      intentFactory={() => ({type: TOGGLE_FIND_AREA_VISIBILITY})}
      onShareClick={processIntent}
      shareFactory={() => ({type: PRESS_TO_SHARE_UNION})}
      onDeleteClick={processIntent}
      deleteFactory={() => ({type: PRESS_TO_DELETE_OR_RESTORE_UNION})}
    />
  );
};
