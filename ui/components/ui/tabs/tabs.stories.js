import React from 'react';
import Tab from './tab/tab.component';
import Tabs from './tabs.component';

const tabs = [
  { key: "tab1", name: "Tab 1", tabKey: "tab1", content: "Content 1" },
  { key: "tab2", name: "Tab 2", tabKey: "tab2", content: "Content 2" },
  { key: "tab3", name: "Tab 3", tabKey: "tab3", content: "Content 3" },
];

export default {
  title: 'Components/UI/Tabs',
  component: Tabs,
};

export const Default = {
  args: {
    children: tabs.map((tab) => <Tab key={tab.key} name={tab.name} tabKey={tab.tabKey}>{tab.content}</Tab>),
  },
};

export const Disabled = {
  args: {
    children: tabs.map((tab, index) => (
      <Tab 
        key={index === 1 ? 'disabled-tab' : tab.key} 
        name={index === 1 ? `${tab.name} (Disabled)` : tab.name} 
        tabKey={index === 1 ? 'disabled-tab' : tab.tabKey}
        disabled={index === 1}
      >
        {index === 1 ? `${tab.content} (Disabled)` : tab.content}
      </Tab>
    )),
  },
};
