// @ts-nocheck
import {
  getLogs,
  ColonyRole,
  getColonyNetworkClient,
  Network,
} from "@colony/colony-js";
import { Wallet, utils } from "ethers";
import { getColonyClient, getUserAddress, getAmount, getDate } from "./utils";

import { EventLog, PayoutClaimed, ColonyInitialised, ColonyRoleSet } from "./types";

/* 
  @Note: I choose to create objects for merging raw logs and parsed logs, 
  because it provides more clarity when consuming the object.

*/

export const getPayoutClaimed = async () => {
  const colonyClient = await getColonyClient();
  const eventFilter = colonyClient.filters.PayoutClaimed(null, null, null);
  const eventLogs: EventLog[] = await getLogs(colonyClient, eventFilter);

  const parsedLogs: PayoutClaimed[] = eventLogs.map((event) =>
    colonyClient.interface.parseLog(event)
  );

  const userAddresses: string[] = await Promise.all(
    parsedLogs.map(async (parsedLog) => {
      const userAddress = await getUserAddress(parsedLog, colonyClient);
      return userAddress;
    })
  );

  const eventDates: string[] = await Promise.all(
    eventLogs.map(async (eventLog) => {
      const eventDate = await getDate(eventLog);
      return eventDate;
    })
  );

  const convertedAmounts: string[] = parsedLogs.map((parsedLog) =>
    getAmount(parsedLog, colonyClient)
  );

  // console.log(a)

  const parsedLogsUpdated = parsedLogs.map((p, index) => {
    return {
      ...p,
      userAddress: userAddresses[index],
      convertedAmount: convertedAmounts[index],
    };
  });

  const combined = eventLogs.map((p, index) => {
    return { eventLog: p, parsedLog: parsedLogsUpdated[index] };
  });

  // console.log(combined)
  getColonyInitialised();
};

export const getColonyInitialised = async () => {
  const colonyClient = await getColonyClient();
  const eventFilter = colonyClient.filters.ColonyInitialised(null, null);
  const eventLogs: EventLog[] = await getLogs(colonyClient, eventFilter);

  const parsedLogs: ColonyInitialised[] = eventLogs.map((event) =>
    colonyClient.interface.parseLog(event)
  );

  // console.log(eventLogs);
  // console.log(parsedLogs);

  const combined = eventLogs.map((p, index) => {
    return { eventLog: p, parsedLog: parsedLogs[index] };
  });

  // console.log(combined)
  getColonyRoleSet();
};

export const getColonyRoleSet = async () => {
  const colonyClient = await getColonyClient();

  const eventFilter = colonyClient.filters.ColonyRoleSet(
    null,
    null,
    null,
    null
  );
  const eventLogs: EventLog[] = await getLogs(colonyClient, eventFilter);

  const parsedLogs: ColonyRoleSet[] = eventLogs.map((event) =>
    colonyClient.interface.parseLog(event)
  );

  // console.log(eventLogs);
  // console.log(parsedLogs);

  const combined = eventLogs.map((p, index) => {
    return { eventLog: p, parsedLog: parsedLogs[index] };
  });

  // console.log(combined);
  getDomainAdded();
};

export const getDomainAdded = async () => {
  const colonyClient = await getColonyClient();

  const eventFilter = colonyClient.filters.DomainAdded(null);
  const eventLogs = await getLogs(colonyClient, eventFilter);

  const parsedLogs = eventLogs.map((event) =>
    colonyClient.interface.parseLog(event)
  );

  // console.log(eventLogs);
  // console.log(parsedLogs);

  const combined = eventLogs.map((p, index) => {
    return { eventLog: p, parsedLog: parsedLogs[index] };
  });

  console.log(combined);
};
