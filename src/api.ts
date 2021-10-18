//@ts-nocheck
import { getLogs } from "@colony/colony-js";
import { Log } from 'ethers/providers';
import { getColonyClient, getUserAddress, getAmount, getDate, getRole } from "./utils";
import { TokenSymbol } from './contants'

import {
  PayoutClaimedType,
  ColonyInitialisedType,
  ColonyRoleSetType,
  DomainAddedType,
  DateType,
  AllEventType
} from "./types";

// Log is not exported from colony-js
/* 
  @Note: I choose to create objects for merging raw logs and parsed logs, 
  because it provides more clarity when consuming the object.

*/

export const getPayoutClaimed = async () => {
  const colonyClient = await getColonyClient();
  const eventFilter = colonyClient.filters.PayoutClaimed(null, null, null);
  const eventLogs: Log[] = await getLogs(colonyClient, eventFilter);

  const parsedLogs: PayoutClaimedType[] = eventLogs.map((event) =>
    colonyClient.interface.parseLog(event)
  );

  const userAddresses: string[] = await Promise.all(
    parsedLogs.map(async (parsedLog) => {
      const userAddress = await getUserAddress(parsedLog, colonyClient);
      return userAddress;
    })
  );

  const eventsDate: DateType[] = await getDate(eventLogs);

  const convertedAmounts: string[] = parsedLogs.map((parsedLog) =>
    getAmount(parsedLog)
  );

  const parsedLogsUpdated = parsedLogs.map((p, index) => {
    return {
      ...p,
      userAddress: userAddresses[index],
      convertedAmount: convertedAmounts[index],
      date: eventsDate[index],
      tokenSymbol: TokenSymbol[p.values.token],
      newFundingPotId: p.values.fundingPotId._hex
    };
  });

  const combined = eventLogs.map((p, index) => {
    return { eventLog: p, parsedLog: parsedLogsUpdated[index] };
  });

  // console.log(combined);
  // getColonyInitialised();
  return combined;
};

export const getColonyInitialised = async () => {
  const colonyClient = await getColonyClient();
  const eventFilter = colonyClient.filters.ColonyInitialised(null, null);
  const eventLogs = await getLogs(colonyClient, eventFilter);

  const parsedLogs: ColonyInitialisedType[] = eventLogs.map((event) =>
    colonyClient.interface.parseLog(event)
  );

  const eventsDate: DateType[] = await getDate(eventLogs);
  const parsedLogsUpdated = parsedLogs.map((p, index) => {
    return {
      ...p,
      date: eventsDate[index],
    };
  });
  // console.log(eventLogs);
  // console.log(parsedLogs);

  const combined = eventLogs.map((p, index) => {
    return { eventLog: p, parsedLog: parsedLogsUpdated[index] };
  });

  // console.log(combined)
  // getColonyRoleSet();
  return combined;
};

export const getColonyRoleSet = async () => {
  const colonyClient = await getColonyClient();

  const eventFilter = colonyClient.filters.ColonyRoleSet(
    null,
    null,
    null,
    null
  );
  const eventLogs = await getLogs(colonyClient, eventFilter);

  const parsedLogs: ColonyRoleSetType[] = eventLogs.map((event) =>
    colonyClient.interface.parseLog(event)
  );

  const eventsDate: DateType[] = await getDate(eventLogs);
  
  const rolesText: string[] = getRole(parsedLogs);


  const parsedLogsUpdated = parsedLogs.map((p, index) => {
    return {
      ...p,
      date: eventsDate[index],
      roleText: rolesText[index]
    };
  });

  // console.log(eventLogs);
  // console.log(parsedLogs);

  

  const combined = eventLogs.map((p, index) => {
    return { eventLog: p, parsedLog: parsedLogsUpdated[index] };
  });

  // console.log(combined);
  // getDomainAdded();

  return combined;
};

export const getDomainAdded = async () => {
  const colonyClient = await getColonyClient();

  const eventFilter = colonyClient.filters.DomainAdded(null);
  const eventLogs = await getLogs(colonyClient, eventFilter);

  const parsedLogs: DomainAddedType[] = eventLogs.map((event) =>
    colonyClient.interface.parseLog(event)
  );

  // console.log(eventLogs);
  // console.log(parsedLogs);

  const eventsDate: DateType[] = await getDate(eventLogs);
  const parsedLogsUpdated = parsedLogs.map((p, index) => {
    return {
      ...p,
      date: eventsDate[index],
    };
  });

  const combined = eventLogs.map((p, index) => {
    return { eventLog: p, parsedLog: parsedLogsUpdated[index] };
  });

  // console.log(combined);
  // getAllEvents()
  return combined;
};

export const getAllEvents = async (): Promise<AllEventType[]> => {
  const paymentClaimed = await getPayoutClaimed()
  const colonyInitialised =  await getColonyInitialised()
  const domainAdded = await getDomainAdded()
  const colonyRoleSet = await getColonyRoleSet()

  const allEvents = [...paymentClaimed, ... colonyRoleSet, ... domainAdded, ...colonyInitialised]

  const sortedEvents: AllEventType[] = allEvents.sort((a, b) => b.parsedLog.date.rawDate.valueOf() - a.parsedLog.date.rawDate.valueOf()) 
  // console.log(sortedEvents)
  return sortedEvents
}
