import React from "react";
import { Tabs as MUITabs, Tab } from "@mui/material";

interface TabsComponentProps {
  tabs: string[];
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const TabsComponent: React.FC<TabsComponentProps> = ({
  tabs,
  value,
  onChange,
}) => {
  return (
    <MUITabs
      value={value}
      onChange={onChange}
      variant="scrollable"
      scrollButtons="auto"
      allowScrollButtonsMobile
      sx={{
        minHeight: "50px",
        borderRadius: "8px 8px 0 0",
        display: "flex",
        backgroundColor: "white",
        paddingTop: 2,
        paddingX: 2,
        borderBottom: "1px solid #ECECEC",
      }}
    >
      {tabs.map((tab, index) => (
        <Tab
          key={index}
          label={tab}
          value={index}
          sx={{
            textTransform: "none",
            fontSize: "14px",
            fontWeight: 500,
            minHeight: "40px",
            flexShrink: 0,
            whiteSpace: "nowrap",
            borderRadius: "8px 8px 0 0",
            backgroundColor: value === index ? "white" : "#E0E0E0",
            color: value === index ? "#0073B7" : "#656565",
            marginLeft: index===0 ?"0px":"5px",
            border:value === index ? "2px solid #0073B7" : "3px solid transparent",
            borderBottom:'none',
            transition: "border 0.3s ease-in-out",
            boxShadow:
              value === index ? "0px 4px 6px rgba(0, 0, 0, 0.1)" : "none",
            "&:hover": {
              backgroundColor: value === index ? "white" : "#D0D0D0",
            },
            "&:focus": {
              outline: "none",
              boxShadow: "none",
            },
            // p:1
          }}
        />
      ))}
    </MUITabs>
  );
};

export default TabsComponent;
