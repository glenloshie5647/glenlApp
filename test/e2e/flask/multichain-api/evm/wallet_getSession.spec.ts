import { strict as assert } from 'assert';
import { withFixtures } from '../../../helpers';
import FixtureBuilder from '../../../fixture-builder';
import { DEFAULT_FIXTURE_ACCOUNT } from '../../../constants';
import TestDappMultichain from '../../../page-objects/pages/test-dapp-multichain';
import { loginWithBalanceValidation } from '../../../page-objects/flows/login.flow';
import {
  DEFAULT_MULTICHAIN_TEST_DAPP_FIXTURE_OPTIONS,
  getExpectedSessionScope,
  type FixtureCallbackArgs,
} from '../testHelpers';

describe('Multichain API', function () {
  const runTest = async (
    fixtureBuilder: FixtureBuilder,
    validateSession: (parsedResult: any) => void,
    testTitle?: string,
  ) => {
    await withFixtures(
      {
        title: testTitle || this.test?.fullTitle(),
        fixtures: fixtureBuilder.build(),
        ...DEFAULT_MULTICHAIN_TEST_DAPP_FIXTURE_OPTIONS,
      },
      async ({ driver, extensionId }: FixtureCallbackArgs) => {
        await loginWithBalanceValidation(driver);
        const testDapp = new TestDappMultichain(driver);
        await testDapp.openTestDappPage();
        await testDapp.check_pageIsLoaded();
        await testDapp.connectExternallyConnectable(extensionId);
        const parsedResult = await testDapp.getSession();
        validateSession(parsedResult);
      },
    );
  };

  it('should receive empty session scopes when no existing session', async function () {
    await runTest(
      new FixtureBuilder().withPopularNetworks(),
      (parsedResult) => assert.deepStrictEqual(parsedResult.sessionScopes, {}, 'Should receive empty session scopes'),
      this.test?.fullTitle(),
    );
  });

  it('should receive expected session scopes when there is an existing session', async function () {
    const DEFAULT_SCOPE = 'eip155:1337';

    await runTest(
      new FixtureBuilder().withPopularNetworks().withPermissionControllerConnectedToTestDapp(),
      (parsedResult) => {
        const sessionScope = parsedResult.sessionScopes[DEFAULT_SCOPE];
        const expectedSessionScope = getExpectedSessionScope(DEFAULT_SCOPE, [DEFAULT_FIXTURE_ACCOUNT]);
  
        assert.deepStrictEqual(
          sessionScope,
          expectedSessionScope,
          `Should receive result that specifies expected session scopes for ${DEFAULT_SCOPE}`,
        );
      },
      this.test?.fullTitle(),
    );
  });
});
