import React from "react";

import { AllEventType } from "../../../types";

import Avatar from "../Avatar/Avatar";

import styles from "./Events.module.css";

interface ColonyRoleSetProp {
  colonyRoleSet: AllEventType;
}

const ColonyRoleSet: React.FC<ColonyRoleSetProp> = ({ colonyRoleSet }) => {
  return (
    <div className={styles.ListItemWrapper}>
      <div className={styles.ListItem}>
        <Avatar address={colonyRoleSet.eventLog.address} />
        <div className={styles.ListItemDetails}>
          <p className={styles.ListItemDescription}>
            <span className={styles.Bold}>
              {colonyRoleSet.parsedLog.roleText}
            </span>
            {" "} role assigned to user {" "}
            <span className={styles.Bold}>
               {colonyRoleSet.eventLog.address}
            </span>
            {" "} in domain {" "}
            <span className={styles.Bold}>
            {colonyRoleSet.parsedLog.values.domainId?._hex}
            </span>.
          </p>
          <p className={styles.Date}>
            {colonyRoleSet.parsedLog.date.displayDate}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ColonyRoleSet;
