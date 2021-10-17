import { Wallet, utils } from "ethers";
import { InfuraProvider } from "ethers/providers";
import {
  getLogs,
  ColonyRole,
  getColonyNetworkClient,
  Network,
} from "@colony/colony-js";
import {
  MAINNET_BETACOLONY_ADDRESS,
  MAINNET_NETWORK_ADDRESS,
} from "./contants";

// Get a new Infura provider (don't worry too much about this)
const provider = new InfuraProvider();

// Get a random wallet
// You don't really need control over it, since you won't be firing any trasactions out of it
const wallet = Wallet.createRandom();
// Connect your wallet to the provider
const connectedWallet = wallet.connect(provider);

export const getColonyClient = async () => {
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

export const getUserAddress = async (singleLog, colonyClient) => {
  const humanReadableFundingPotId = new utils.BigNumber(
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


