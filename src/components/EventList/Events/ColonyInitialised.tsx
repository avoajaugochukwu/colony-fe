import React from "react";

import { AllEventType } from "../../../types";

interface ColonyInitialisedProp {
  colonyInitialized: AllEventType;
}

const ColonyInitialised: React.FC<ColonyInitialisedProp> = ({
  colonyInitialized,
}) => {
  
  return (
    <div>
      <p>Congratulations! It's a beautiful baby colony!</p>
      <p className="date">{colonyInitialized.parsedLog.date.displayDate}</p>
    </div>
  );
};

export default ColonyInitialised;
