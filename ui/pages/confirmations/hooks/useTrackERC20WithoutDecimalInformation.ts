import { useContext, useEffect, useRef } from 'react';
import { Hex } from '@glenlapp/utils';

import {
  MetaMetricsEventCategory,
  MetaMetricsEventLocation,
  MetaMetricsEventName,
  MetaMetricsEventUiCustomization,
} from '../../../../shared/constants/metametrics';
import { TokenStandard } from '../../../../shared/constants/transaction';
import { MetaMetricsContext } from '../../../contexts/metametrics';
import { parseTokenDetailDecimals, TokenDetailsERC20 } from '../utils/token';

const useTrackERC20WithoutDecimalInformation = (
  chainId: Hex,
  tokenAddress: Hex | string | undefined,
  tokenDetails?: TokenDetailsERC20,
  metricLocation = MetaMetricsEventLocation.SignatureConfirmation,
) => {
  const trackEvent = useContext(MetaMetricsContext);
  const hasTracked = useRef(false);

  useEffect(() => {
    if (hasTracked.current || !chainId || !tokenDetails) return;

    if (tokenDetails.standard !== TokenStandard.ERC20) return;

    if (parseTokenDetailDecimals(tokenDetails.decimals) === undefined) {
      trackEvent({
        event: MetaMetricsEventName.SimulationIncompleteAssetDisplayed,
        category: MetaMetricsEventCategory.Confirmations,
        properties: {
          token_decimals_available: 'not_available',
          asset_address: tokenAddress,
          asset_type: TokenStandard.ERC20,
          chain_id: chainId,
          location: metricLocation,
          ui_customizations: [MetaMetricsEventUiCustomization.RedesignedConfirmation],
        },
      });
      hasTracked.current = true;
    }
  }, [chainId, tokenAddress, metricLocation, tokenDetails, trackEvent]);
};

export default useTrackERC20WithoutDecimalInformation;
