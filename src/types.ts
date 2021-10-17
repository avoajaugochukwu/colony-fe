import { BigNumberish } from "ethers/utils/bignumber";

export type ColonyClientType = {
  getFundingPot: Function;
  getPayment: Function;
  // interface: Function;
};

export type EventLogType = {
  blockNumber: number;
  blockHash: string;
  transactionIndex: number;
  removed: boolean;
  address: string;
  data: string;
  topics: string | string[];
  transactionHash: string;
  logIndex: number;
};

// using type here even though we have some repeated properties, because extends doesn't
// show a nice pop up
export type PayoutClaimedType = {
  name: string;
  signature: string;
  topic: string;
  values: {
    0: Hex;
    1: string;
    2: Hex;
    fundingPotId: BigNumberish;
    token: string;
    amount: BigNumberish;
    length: number;
  };
  userAddress?: string;
  convertedAmount?: string;
};

export type ColonyInitialisedType = {
  name: string;
  signature: string;
  topic: string;
  values: {
    0: string;
    1: string;
    colonyNetwork: string;
    token: string;
    length: number;
  };
};

export type ColonyRoleSetType = {
  name: string;
  signature: string;
  topic: string;
  values: {
    0: string;
    1: Hex;
    2: number;
    3: boolean;
    user: string;
    domainId: Hex;
    role: number;
    setTo: true;
    length: number;
  };
};

export type DomainAddedType = {
  name: string;
  signature: string;
  topic: string;
  values: {
    0: Hex;
    domainId: Hex;
    length: number;
  }
}

export type Hex = {
  _hex: string;
};
