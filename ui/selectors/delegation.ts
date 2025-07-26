import type { Hex } from '@glenlapp/utils';
import type { DelegationEntry } from '@glenlapp/delegation-controller';
import { isHexEqual } from '../../shared/lib/delegation/utils';

type Address = Hex;

export type DelegationState = {
  glenlapp: {
    delegations: {
      [hash: Hex]: DelegationEntry;
    };
  };
};

export type DelegationFilter = {
  from?: Address;
  to?: Address;
  chainId?: Hex;
  tags?: string[];
};

export type ListDelegationEntriesOptions = {
  filter?: DelegationFilter;
};

export const listDelegationEntries = (
state: DelegationState,
{ filter }: ListDelegationEntriesOptions,
) => Object.values(state.glenlapp.delegations).filter((entry) => (
(filter?.from ? isHexEqual(entry.delegation.delegator, filter.from) : true)
&& (filter?.to ? isHexEqual(entry.delegation.delegate, filter.to) : true)
&& (filter?.chainId ? isHexEqual(entry.chainId, filter.chainId) : true)
&& (filter?.tags && Array.isArray(filter.tags)
? filter.tags.every((tag) => entry.tags.includes(tag))
: true)));

export const getDelegatedEntry = (state: DelegationState, hash: Hex): undefined | delegationController.DelegatedEntry => state.glenlapp.delegations[hash];
