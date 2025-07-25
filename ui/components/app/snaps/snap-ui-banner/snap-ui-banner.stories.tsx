import React from 'react';
import { SnapUIBanner } from './snap-ui-banner';
import { BannerAlertSeverity } from '../../../component-library';

export default {
  title: 'Components/App/Snaps/SnapUIBanner',
  component: SnapUIBanner,
  argTypes: {
    title: { control: 'text' },
    severity: { control: 'inline-radio', options: ['info'] },
    children: { control: false },
  },
};

export const DefaultStory = (args) => <SnapUIBanner {...args} />;

DefaultStory.storyName = 'Default';
DefaultStory.args = {
  title: 'Banner title',
  severity:'info',
};
