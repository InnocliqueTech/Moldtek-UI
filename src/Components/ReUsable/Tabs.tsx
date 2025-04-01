import React from 'react';
import { Tabs as MUITabs, Tab, TabProps } from '@mui/material';

interface TabsComponentProps {
  tabs: string[]; // List of tab labels
  value: number; // Currently selected tab index
  onChange: (event: React.SyntheticEvent, newValue: number) => void; // Function to handle tab change
  color?: string; // Background color of the tab selected
  textColor?: string; // Text color of the tab selected
  width?: string; // Width of the tab
  height?: string; // Height of the tab
  border?: string; // Border style of the tab
}

const TabsComponent: React.FC<TabsComponentProps> = ({
  tabs,
  value,
  onChange,
  color = 'blue',
  textColor = 'white',
  width = 'auto',
  height = '40px',
  border = 'none',
}) => {
  return (
    <MUITabs value={value} onChange={onChange} sx={{ width: width, height: height }}>
      {tabs.map((tab, index) => (
        <Tab
          key={index}
          label={tab}
          value={index}
          sx={{
            backgroundColor: value === index ? color : 'transparent',
            color: value === index ? textColor : 'black',
            width: width,
            height: height,
            border: border,
            '&:hover': {
              backgroundColor: value === index ? `${color}D9` : 'transparent',
            },
          }}
        />
      ))}
    </MUITabs>
  );
};

export default TabsComponent;
