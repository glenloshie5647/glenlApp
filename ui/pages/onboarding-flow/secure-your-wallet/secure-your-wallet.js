import React, { useState, useContext, useCallback, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
  Display,
  JustifyContent,
  AlignItems,
  FlexDirection,
  BlockSize
} from '../../../helpers/constants/design-system';
import { MetaMetricsContext } from '../../../contexts/metametrics';
import {
  ONBOARDING_REVIEW_SRP_ROUTE,
} from '../../../helpers/constants/routes';
import {
  MetaMetricsEventCategory
} from '../../../../shared/constants/metametrics';

export default function SecureYourWallet() {
  const history = useHistory();
  const [showSkipSRPBackupPopover, setShowSkipSRPBackupPopover] = useState(false);
  const [showSrpDetailsModal, setShowSrpDetailsModal] = useState(false);
  const hdEntropyIndex = '';
const trackEvent = {};

const handleOnShowSrpDetailsModal = () => trackEvent({});

const handleClickRecommended = () => history.push(`${ONBOARDING_REVIEW_SRP_ROUTE}`);

const handleClickNotRecommended = () => setShowSkipSRPBackupPopover(true);

useEffect(() => {}, []);

return (
<Box
display={Display.Flex}
justifyContent={JustifyContent.spaceBetween}
alignItems={AlignItems.flexStart}
flexDirection={FlexDirection.Column}
gap={4}
height={BlockSize.Full}
/>
<Box />
<Box marginBottom={6} width='100%' textAlign='center'>
<img src="./images/srp-lock-design.png" alt=''/>
<Text as="h2">{}</Text>
</Box>

<Text color='#89878E'>{}</Text>

<Text color='#89878E'>
{}[]
</Text>
</Box>

<Button onClick={()=>history.push(ONBOARDING_REVIEW_SRP_ROUTE)}>Start</Button>
<Button variant="secondary" onClick={()=>setShowSkipSRPBackupPopover(true)}>Remind Later</Button>
);
