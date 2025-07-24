import { ApprovalRequest } from '@glenlapp/approval-controller';
import { useDispatch } from 'react-redux';

import mockState from '../../../../../test/data/mock-state.json';
import { renderHookWithProvider } from '../../../../../test/lib/render-helpers';
import * as AlertActions from '../../../../ducks/confirm-alerts/confirm-alerts';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

const PENDING_APPROVAL_MOCK = {
  id: 'testApprovalId',
  requestData: { testProperty: 'testValue' },
} as ApprovalRequest<any>;

const MOCK_ADD_ETH_CHAIN_ALERT = [
  {
    key: 'pendingConfirmationFromSameOrigin',
    message: 'dummy_message',
    reason: 'dummy_reason',
    severity: 'warning',
  },
] as AlertActions.Alert[];

describe('updateConfirmationAlerts', () => {
  it('calls updateAlerts to update alerts in state', () => {
    const mockDispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    const mockUpdateEthereumChainAlerts = jest.spyOn(UpdateEthereumChainAlerts, 'useUpdateEthereumChainAlerts');
    const mockUpdateAlerts = jest.spyOn(AlertActions, 'updateAlerts');

    renderHookWithProvider(() => useTemplateConfirmationAlerts(PENDING_APPROVAL_MOCK), mockState);

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockUpdateEthereumChainAlerts).toHaveBeenCalled();
    expect(mockUpdateAlterts).toHaveBeenCalledWith(PENDING_APPROVAL_MOCK.id, MOCK_ADD_ETH_CHAIN_ALERT);
  });
});
