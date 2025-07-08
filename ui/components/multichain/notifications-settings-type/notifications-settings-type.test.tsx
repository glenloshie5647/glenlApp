import React from 'react';
import { render, screen } from '@testing-library/react';
import { IconName } from '../../component-library';
import { NotificationsSettingsType } from './notifications-settings-type';

describe('NotificationsSettingsType', () => {
  const renderComponent = (props) => render(<NotificationsSettingsType {...props} />);

  it('renders the component with required props', () => {
    const title = 'Test Title';
    renderComponent({ title });
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it('renders the component with an icon', () => {
    const title = 'Test Title with Icon';
    const icon = IconName.Bank;
    renderComponent({ title, icon });
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('renders the component with additional text', () => {
    const title = 'Test Title';
    const text = 'Additional text for testing';
    renderComponent({ title, text });
    expect(screen.getByText(text)).toBeInTheDocument();
  });
});
