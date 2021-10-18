import React from "react";

import { AllEventType } from "../../../types";

import Avatar from "../Avatar/Avatar";

import styles from "./Events.module.css";

interface DomainAddedProp {
  domainAdded: AllEventType;
}

const DomainAdded: React.FC<DomainAddedProp> = ({ domainAdded }) => {
  return (
    <div className={styles.ListItemWrapper}>
      <div className={styles.ListItem}>
        <Avatar address={domainAdded.eventLog.address} />
        <div className={styles.ListItemDetails}>
          <p className={styles.ListItemDescription}>
            Domain{" "}
            <span className={styles.Bold}>
              {domainAdded.parsedLog.values.domainId?._hex}
            </span>{" "}
            added.
          </p>
          <p className={styles.Date}>
            {domainAdded.parsedLog.date.displayDate}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DomainAdded;
