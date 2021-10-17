import {
  getLogs,
  ColonyRole,
  getColonyNetworkClient,
  Network,
} from "@colony/colony-js";
import { Wallet, utils } from "ethers";
import { getColonyClient, getUserAddress } from "./utils";

export const getPayoutClaimed = async () => {
  const colonyClient = await getColonyClient();

  const eventFilter = colonyClient.filters.PayoutClaimed(null, null, null);

  const eventLogs = await getLogs(colonyClient, eventFilter);

  const parsedLogs = eventLogs.map((event) =>
    colonyClient.interface.parseLog(event)
  );

  const userAddresses = await Promise.all(
    parsedLogs.map(async (parsedLog) => {
      const userAddress = await getUserAddress(parsedLog, colonyClient);
      return userAddress;
    })
  );

  const parsedLogsWithUserAddress = parsedLogs.map((p, index) => {
    return { ...p, userAddress: userAddresses[index] };
  });

  const combined = eventLogs.map((p, index) => {
    return { eventLog: p, parsedLog: parsedLogsWithUserAddress[index] };
  });

  // console.log(combined)
};
