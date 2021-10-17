import { BigNumberish } from "ethers/utils/bignumber";

export type ColonyClient = {
  getFundingPot: Function;
  getPayment: Function;
  // interface: Function;
};

export type EventLog = {
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

export type PayoutClaimed = {
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

export type ColonyInitialised = {
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

export type ColonyRoleSet = {
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

// export type Values = {

//   fundingPotId?: any; //Take another look at this
//   token?: string;
//   amount?: Hex;
//   length?: number;
//   colonyNetwork?: string;
//   userAddress?: string;
//   convertedAmount?: string;
// };

export type Hex = {
  _hex: string;
};
