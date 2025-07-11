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
  processIntent: (intent: CountIntent) => void;
};

export const ExpandHideCountField: React.FC<Props> = ({
  isFoundAreaOpen,
  processIntent,
}) => {
  return (
    <ExpandHideFieldInternal
      isAreaOpen={isFoundAreaOpen}
      isRestoreIconShown={false}
      processIntent={processIntent}
      intentFactory={() => ({type: TOGGLE_FIND_AREA_VISIBILITY})}
      onShareClick={processIntent}
      shareFactory={() => ({type: PRESS_TO_SHARE_UNION})}
      onDeleteClick={processIntent}
      deleteFactory={() => ({type: PRESS_TO_DELETE_OR_RESTORE_UNION})}
    />
  );
};
