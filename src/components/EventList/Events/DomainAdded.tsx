import React from "react";

import { AllEventType } from "../../../types";

interface DomainAddedProp {
  domainAdded: AllEventType;
}

const DomainAdded: React.FC<DomainAddedProp> = ({domainAdded}) => {
  
  return (
    <div>
      <p>Domain {domainAdded.parsedLog.values.domainId?._hex} added.</p>
      <p>{domainAdded.parsedLog.date.displayDate}</p>
    </div>
  )
}

export default DomainAdded
