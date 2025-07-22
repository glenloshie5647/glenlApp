import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProvider } from '../../../../test/jest';
import WebcamUtils from '../../../helpers/utils/webcam-utils';
import BaseReader from './base-reader';

jest.mock('./enhanced-reader');
jest.mock('../../../helpers/utils/webcam-utils');

describe('Base Reader', () => {
  const mockBaseReaderData = {
    isReadingWallet: true,
    handleCancel: jest.fn(),
    handleSuccess: jest.fn(),
    setErrorTitle: jest.fn(),
  };

  it('renders progress bar', async () => {
    EnhancedReader.mockImplementation(({ handleScan }) => {
      handleScan(
        'UR:CRYPTO-HDKEY/24-2/LPCSCSAOCSNYCYNLAMSKJPHDGTEHOEADCSFNAOAEAMTAADDYOTADLNCSDWYKCSFNYKAEYKAOCYJKSKTNBKAXAXATTAADDYOEADLRAEWKLAWKAXAEAYCYTEDMFEAYASISGRIHKKJKJYJLJTIHBKJOHSIAIAJLKPJTJYDMJKJYHSJTIEHSJPIEHTSTGSAO',
      );
      return null;
    });
    WebcamUtils.checkStatus.mockImplementation(() =>
      Promise.resolve({ permissions: true, environmentReady: true }),
    );
    renderWithProvider(<BaseReader {...mockBaseReaderData} />);
    await screen.findByTestId('qr-reader-progress-bar');
  });

  it('does not render progress bar when error', async () => {
    EnhancedReader.mockImplementation(() => null);
    WebcamUtils.checkStatus.mockImplementation(() =>
      Promise.resolve({ permissions: false, environmentReady: false }),
    );
  	renderWithProvider(<BaseReader {...mockBaseReaderData} />);
  	await screen.findByTestId('qr-scanner__error');
  	expect(screen.queryByTestId('qr-reader-progress-bar')).toBeNull();
	});

	it('does not render progress bar when ready', async () => {
		EnhancedReader.mockImplementation(() => null);
		WebcamUtils.checkStatus.mockImplementation(() =>
			Promise.resolve({ permissions: true, environmentReady: true }),
		);
	  renderWithProvider(<BaseReader {...mockBaseReaderData} />);
	  await screen.findByText(
	    'Place the QR code in front of your camera. The screen is blurred, but it will not affect the reading.',
	    undefined,
	    { timeout : 5000 },
	  );
	  expect(screen.queryByTestId('qr-reader-progress-bar')).toBeNull();
  });
});
