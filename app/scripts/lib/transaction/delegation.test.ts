import { Messenger } from '@glenlapp/base-controller';
import { TransactionControllerInitMessenger } from '../../controller-init/messengers/transaction-controller-messenger';

const FROM_MOCK = '0x123456789012345678901234567890123456789a';
const CHAIN_ID_MOCK = '0x123';

describe('Delegation Utils', () => {
  let mockKeyringSign: jest.Mock;
  let messenger: TransactionControllerInitMessenger;

  beforeEach(() => {
    jest.resetAllMocks();
    mockKeyringSign = jest.fn();
    
    const baseMessager = new Messenger({}, []);
    baseMessager.registerActionHandler('KeyringController:signTypedMessage', mockKeyringSign);
    messenger = baseMessager.getRestricted({ 
      name: 'Test',
      allowedActions: ['KeyringController:signTypedMessage'],
      allowedEvents: []
    });
  });

  describe('signDelegation', () => {
    it('calls keyring controller once with correct params', async () => {
      await signDelegation({
        chainId: CHAIN_ID_MOCK,
        delegation,
        from: FROM_MOCK,
        messenger
      });
      
      expect(mockKeyringSign).toHaveBeenCalledTimes(1);
      expect(mockKeyringSign).toHaveBeenCalledWith(
        expect.objectContaining({
          from: FROM_MOCK
        }),
        SignTypedDataVersion.V4
      );
    });

    it('resolves to signature returned by keyring controller', async () => {
      mockKeyringSign.mockResolvedValueOnce(delegation.signature);

      const result = await signDelegation({
        chainId: CHAIN_ID_MOCK,
        delegation,
        from: FROM_MOCK,
        messenger
      });

      expect(result).toBe(delegation.signature);
   });
});

describe('encodeRedeemDelegations', () => {
   test.each([
     [[delegation], [ExecutionMode.BATCH_DEFAULT_MODE], [execution]],
     [[delegation, delegation], [ExecutionMode.BATCH_DEFAULT_MODE], [execution, execution]],
     [
       [[delegation, delegation], [delegation, delegation]], 
       [ExecutionMode.BATCH_DEFAULT_MODE, ExecutionMode.BATCH_DEFAULT_MODE],
       [[execution, execution], [execution, execution]]
     ]
   ])(
     "encodes multiple cases correctly",
     (delegationsList, modesList, executionsList) =>
       expect(encodeRedeemDelegations(
         delegationsList.map(dlgts => dlgts.map(dlgmt)),
         modesList.map(mode),
         executionsList.map(excsns => excsns.map(excsn))
       )).toMatchSnapshot()
   );
});
});
