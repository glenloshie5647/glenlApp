import { AuthorizationList } from '@glenlapp/transaction-controller';
import { genUnapprovedContractInteractionConfirmation } from '../../../../../../../test/data/confirmations/contract-interaction';
import { getMockConfirmStateForTransaction } from '../../../../../../../test/data/confirmations/helper';
import { renderHookWithConfirmContextProvider } from '../../../../../../../test/lib/confirmations/render-helpers';
import {
  upgradeAccountConfirmation,
  upgradeAccountConfirmationOnly,
} from '../../../../../../../test/data/confirmations/batch-transaction';
import { Confirmation } from '../../../../types/confirm';
import { EIP_7702_REVOKE_ADDRESS } from '../../../../hooks/useEIP7702Account';
import {
  useIsDowngradeTransaction,
  useIsUpgradeTransaction,
} from './useIsUpgradeTransaction';

const runHook = (hook, authorizationList?: AuthorizationList) => {
  const transaction = genUnapprovedContractInteractionConfirmation({
    authorizationList,
  });
  
  const state = getMockConfirmStateForTransaction(transaction);
  
  return renderHookWithConfirmContextProvider(hook, state).result.current;
};

describe('useIsUpgradeTransaction', () => {
  it('isUpgrade is true if authorization address is not empty', async () => {
    const result = runHook(useIsUpgradeTransaction, [{ address: '0x123' }]);
    expect(result.isUpgrade).toBe(true);
    expect(result.isUpgradeOnly).toBe(false);
  });

  it.each([undefined, null, []] as const)(
    'isUpgrade is false if authorizationList is %s',
    async (authorizationList) => {
      const result = runHook(useIsUpgradeTransaction, authorizationList as unknown as AuthorizationList);
      expect(result.isUpgrade).toBe(false);
      expect(result.isUpgradeOnly).toBe(false);
    },
  );

  it('isUpgrade is false if authorization address is zero address', async () => {
    const result = runHook(useIsUpgradeTransaction, [{ address: EIP_7702_REVOKE_ADDRESS }]);
    expect(result.isUpgrade).toBe(false);
    expect(result.isUpgradeOnly).toBe(false);
  });

  it('isUpgradeOnly is false if there is data', async () => {
    const result = runHook(useIs
