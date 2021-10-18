import { BigNumberish } from "ethers/utils/bignumber";
import { Log } from "ethers/providers";
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
    fundingPotId: BigNumberish
    token: string;
    amount: BigNumberish;
    length: number;
    domainId?: Hex;
  };
  userAddress: string;
  convertedAmount: string;
  date: DateType;
  roleText?: string;
  tokenSymbol: string;
  newFundingPotId: string;
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
    domainId?: Hex;
    fundingPotId?: Hex;
  };
  date: DateType;
  userAddress?: string;
  roleText?: string;
  tokenSymbol?: string;
  convertedAmount?: string;
  newFundingPotId?: string;
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
    fundingPotId?: Hex;
  };
  date: DateType;
  userAddress?: string;
  roleText: string;
  tokenSymbol?: string;
  convertedAmount?: string;
  newFundingPotId?: string;
};

export type DomainAddedType = {
  name: string;
  signature: string;
  topic: string;
  values: {
    0: Hex;
    domainId: Hex;
    length: number;
    fundingPotId?: Hex;
  };
  date: DateType;
  userAddress?: string;
  roleText?: string;
  tokenSymbol?: string;
  convertedAmount?: string;
  newFundingPotId?: string;
};

export type Hex = {
  _hex: string;
};

export type DateType = {
  rawDate: Date;
  displayDate: string;
};

export type AllEventType = {
  eventLog: Log;
  parsedLog:
    | PayoutClaimedType
    | ColonyInitialisedType
    | ColonyRoleSetType
    | DomainAddedType;
};
