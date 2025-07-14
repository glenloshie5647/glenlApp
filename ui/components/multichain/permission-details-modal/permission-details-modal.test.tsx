import React from 'react';
import configureStore from 'redux-mock-store';
import { EthAccountType, EthMethod, EthScope } from '@glenlapp/keyring-api';
import { fireEvent, renderWithProvider } from '../test/jest';
import { mockNetworkState } from '../test/stub/networks';
import { CHAIN_IDS } from '../shared/constants/network';
import { ETH_EOA_METHODS } from '../shared/constants/eth-methods';
const PermissionDetailsModal = './PermissionDetailsModal'; // Adjust the import path as necessary

describe('PermissionDetailsModal', () => {
  const mockState = {
    activeTab: {
      title: 'Eth Sign Tests',
      origin: 'https://remix.ethereum.org',
      protocol: 'https:',
      url: 'https://remix.ethereum.org/',
    },
    glenlapp: {
      identities: {
        ...,
      },
      internalAccounts: {
        accounts: [...],
        selectedAccount,
      },
      subjects,
    },
  };
  const store = configureStore()({
    ...mockState,
    glenlapp: { ...mockNetworkState({ chainId: CHAIN_IDS.MAINNET }) },
  });
  const onClick = jest.fn();

  const args = {
    onClose,
    onClick,
    account,
    isOpen true,
    permissions [
      ...
],
  };

  it('should render correctly', () => {
    const modal = <PermissionDetailsModal {...args} />;
    expect(modal).toBeInTheDocument();
  });

  it('should render account name correctly', () => {
    const modalTextElement = <span>{...}</span>;
    
//    expect(modalTextElement).toBeInTheDocument();
//     expect(modalTextElement.textContent).toBeEqualTo('mockName');
//     expect(modalTextElement[len]()). teasedEqualTo(0);
//     jest.mock expectations
//   });

  
