import React from "react";
import {
  AddNewItemIntent,
  PRESS_TO_DELETE_UNION,
  PRESS_TO_SHARE_UNION,
  TOGGLE_ADD_AREA_VISIBILITY,
} from "../AddNewItemIntent";
import {ExpandHideFieldInternal} from "../../common/components/ExpandHideFieldInternal";

type Props = {
  isAddAreaOpen: boolean;
  processIntent: (intent: AddNewItemIntent) => void;
};

export const ExpandHideNewItemField: React.FC<Props> = ({
  isAddAreaOpen,
  processIntent,
}) => {
  return (
    <ExpandHideFieldInternal
      isAreaOpen={isAddAreaOpen}
      isRestoreIconShown={false}
      processIntent={processIntent}
      intentFactory={() => ({type: TOGGLE_ADD_AREA_VISIBILITY})}
      onShareClick={processIntent}
      shareFactory={() => ({type: PRESS_TO_SHARE_UNION})}
      onDeleteClick={processIntent}
      deleteFactory={() => ({type: PRESS_TO_DELETE_UNION})}
    />
  );
};
