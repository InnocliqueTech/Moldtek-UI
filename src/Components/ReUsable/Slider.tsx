import React, { useState } from "react";
import {
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button,
} from "@mui/material";
import closeIcon from '../../assets/Images/close.png'

interface TabData {
  label: string;
  content: React.ReactNode;
}

interface SliderProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  tabs?: TabData[];
  searchOptions?: string[];
  dateLabels?: { from: string; to: string };
}

const Slider: React.FC<SliderProps> = ({ open, onClose, title = "Master Data Filter", tabs, searchOptions, dateLabels }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 400,
          borderTopLeftRadius: 12,
          borderBottomLeftRadius: 12,
          p: 2,
         
        },
      }}
    >
      {/* Header */}
      <AppBar position="static" color="inherit" elevation={0}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <img src={closeIcon} alt='close' onClick={onClose} style={{width:'35px',height:'35px',cursor:'pointer'}}/>
        </Toolbar>
      </AppBar>
      <Box  sx={{borderBottom: 1, borderColor: "#ddd"}} ></Box>
      {/* Custom Tabs */}
      {tabs && tabs.length > 0 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            border: "2px solid #0073B7",
            borderRadius: "260px",
            overflow: "hidden",
            mt: 2,
            backgroundColor:'#F5FAFF',
            p:1
          }}
        >
          {tabs.map((tab, index) => (
            <Button
              key={index}
              fullWidth
              onClick={() => setActiveTab(index)}
              sx={{
                textTransform: "none",
                backgroundColor: activeTab === index ? "#0073B7" : "transparent",
                color: activeTab === index ? "white" : "#656565",
                borderRadius: '2000px',
                fontWeight: 500,
                "&:hover": { backgroundColor: activeTab === index ? "#0056b3" : "#f0f8ff" },
                "&:focus": {
                  outline: "none",
                  boxShadow: "none",
                },
              }}
            >
              {tab.label}
            </Button>
          ))}
        </Box>
      )}

      {/* Tab Content */}
      {tabs && tabs[activeTab]?.content &&
        tabs[activeTab].content}

    </Drawer>
  );
};

export default Slider;
