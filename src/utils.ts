import { Wallet, utils } from "ethers";
import { InfuraProvider } from "ethers/providers";
import {
  getLogs,
  ColonyRole,
  getColonyNetworkClient,
  Network,
  getBlockTime,
} from "@colony/colony-js";
import {
  MAINNET_BETACOLONY_ADDRESS,
  MAINNET_NETWORK_ADDRESS,
} from "./contants";

import { EventLog, ColonyClient, PayoutClaimed } from './types'

// Get a new Infura provider (don't worry too much about this)
const provider = new InfuraProvider();

// Get a random wallet
// You don't really need control over it, since you won't be firing any trasactions out of it
const wallet = Wallet.createRandom();
// Connect your wallet to the provider
const connectedWallet = wallet.connect(provider);

export const getColonyClient = async (): Promise<ColonyClient> => {
  const networkClient = await getColonyNetworkClient(
    Network.Mainnet,
    connectedWallet,
    {
      networkAddress: MAINNET_NETWORK_ADDRESS,
    }
  );

  const colonyClient = await networkClient.getColonyClient(
    MAINNET_BETACOLONY_ADDRESS
  );
  return colonyClient;
};

export const getUserAddress = async (singleLog: PayoutClaimed, colonyClient: ColonyClient) => {
  const humanReadableFundingPotId: string = new utils.BigNumber(
    singleLog.values.fundingPotId
  ).toString();
    
  const { associatedTypeId } = await colonyClient.getFundingPot(
    humanReadableFundingPotId
  );

  const { recipient: userAddress } = await colonyClient.getPayment(
    associatedTypeId
  );

  return userAddress;
};

export const getAmount = (singleLog: PayoutClaimed, colonyClient: ColonyClient) => {
  const wei = new utils.BigNumber(10);

  const humanReadableAmount = new utils.BigNumber(singleLog.values.amount);

  const convertedAmount = humanReadableAmount.div(wei.pow(18));

  return convertedAmount.toString();
};

export const getDate = async (singleLog: EventLog) => {
  const provider = new InfuraProvider();
  // console.log(singleLog.blockHash)
  const logTime = await getBlockTime(provider, singleLog.blockHash);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  const logDate = new Date(logTime);
  
  const getDate = logDate.getDate();
  const getMonth = months[logDate.getMonth()];

  const newDate = `${getDate} ${getMonth}`

  return newDate;
};
