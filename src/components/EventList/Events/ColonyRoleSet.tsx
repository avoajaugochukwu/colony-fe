import React from "react";

import { AllEventType } from "../../../types";

import Blockies from "react-blockies";

import blockies from '../../../blockies';

interface ColonyRoleSetProp {
  colonyRoleSet: AllEventType;
}

const ColonyRoleSet: React.FC<ColonyRoleSetProp> = ({ colonyRoleSet }) => {

  const canvasElm = blockies({
    size: 5,
    scale: 100 ? Math.floor(100 / 5) : 10,
    seed: '0x0dd7b8f3d1fa88FAbAa8a04A0c7B52FC35D4312c',
  });
  console.log(canvasElm)
  console.log(canvasElm?.toDataURL())
  const a = canvasElm && canvasElm.toDataURL();
  console.log(a)


  return (
    <div>
      <p>
        <img src={canvasElm?.toDataURL()} />
        {`${colonyRoleSet.parsedLog.roleText} 
        role assigned to user 
        ${colonyRoleSet.eventLog.address} 
        in domain 
        ${colonyRoleSet.parsedLog.values.domainId}.`}
      </p>
      <p className="date">{colonyRoleSet.parsedLog.date.displayDate}</p>
    </div>
  );
};

export default ColonyRoleSet;
