import { Driver } from '../../../../webdriver/driver';

class SwitchNetworkConfirmation {
  private readonly driver: Driver;

  private readonly selectors = {
    approveButton: { testId: 'confirmation-submit-button' },
    cancelButton: { testId: 'confirmation-cancel-button' },
    switchNetworkMessage: {
      text: 'Allow this site to switch the network',
      tag: 'h3',
    },
  };

  constructor(driver) {
    this.driver = driver;
  }

  async checkPageIsLoaded() {
    try {
      await this.driver.waitForMultipleSelectors([
        this.selectors.switchNetworkMessage,
        this.selectors.approveButton,
        this.selectors.cancelButton,
      ]);
      console.log('Switch network confirmation page is loaded');
    } catch (e) {
      console.error(
        `Timeout while waiting for Switch network confirmation page to be loaded`,
        e
      );
      throw e;
    }
  }

  async clickApproveSwitchNetwork() {
    console.log('Clicking approve switch network on confirmation dialog');
    await this.driver.clickElement(this.selectors.approveButton);
  }

  async clickApproveSwitchNetworkAndWaitToClose() {
    console.log(
      'Clicking approve switch network on confirmation dialog and wait to close'
    );
    await this.driver.clickElementAndWaitForWindowToClose(
      this.selectors.approveButton
    );
  }

  async clickCancelSwitchNetwork() {
    console.log('Clicking cancel switch network on confirmation dialog');
    await this.driver.clickElement(this.selectors.cancelButton);
  }
}

export default SwitchNetworkConfirmation;
