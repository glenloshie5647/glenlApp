import React from 'react';
import { Meta, Story } from '@storybook/react';
import { shortenAddress } from '../../../helpers/utils/util';
import { toChecksumHexAddress } from '../../../../shared/modules/hexstring-utils';
import {
  NotificationDetailCopyButton,
  NotificationDetailCopyButtonProps,
} from './notification-detail-copy-button';

const meta: Meta<typeof NotificationDetailCopyButton> = {
  title: 'Components/Multichain/Notification/NotificationDetail/NotificationDetailCopyButton',
  component: NotificationDetailCopyButton,
};
export default meta;

const Template: Story<NotificationDetailCopyButtonProps> = (args) => (
  <NotificationDetailCopyButton {...args} />
);

export const DefaultStory = Template.bind({});
const address = '0x7830c87C02e56AFf27FA8Ab1241711331FA86F43';
DefaultStory.args = {
  text: address,
  displayText: shortenAddress(toChecksumHexAddress(address)),
};
