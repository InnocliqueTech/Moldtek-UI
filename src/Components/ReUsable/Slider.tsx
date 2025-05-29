import React, { useState } from "react";
import {
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  useTheme,
  useMediaQuery,
  Divider,
} from "@mui/material";
import closeIcon from "../../assets/Images/close.png";

interface TabData {
  label: string;
  content: React.ReactNode;
}

interface SliderProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  tabs?: TabData[];
  content?: React.ReactNode;
  footer?: React.ReactNode;
}

const Slider: React.FC<SliderProps> = ({
  open,
  onClose,
  title = "Master Data Filter",
  tabs,
  content,
  footer,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: isMobile ? "100%" : isTablet ? 300 : 400,
          borderTopLeftRadius: 12,
          borderBottomLeftRadius: 12,
          p: 0,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      {/* Fixed Header */}
      <AppBar position="static" color="inherit" elevation={0}>
        <Toolbar sx={{ px: 2, py: 1 }}>
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              fontSize: isMobile ? "1rem" : "1.25rem",
              fontWeight: 600,
            }}
          >
            {title}
          </Typography>
          <img
            src={closeIcon}
            alt="close"
            onClick={onClose}
            style={{ width: "30px", height: "30px", cursor: "pointer" }}
          />
        </Toolbar>
      </AppBar>
      <Box sx={{ borderBottom: 1, borderColor: "#ddd" }} />
      {/* Scrollable Content */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          px: 2,
          py: 1,
          backgroundColor: "#fff",
        }}
      >
        {/* Tabs */}
        {tabs && tabs.length > 0 && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              border: "2px solid #0073B7",
              borderRadius: "260px",
              overflow: "hidden",
              mt: 2,
              backgroundColor: "#F5FAFF",
              p: 1,
              gap: isMobile ? 1 : 0,
            }}
          >
            {tabs.map((tab, index) => (
              <Button
                key={index}
                fullWidth
                onClick={() => setActiveTab(index)}
                sx={{
                  textTransform: "none",
                  backgroundColor:
                    activeTab === index ? "#0073B7" : "transparent",
                  color: activeTab === index ? "white" : "#656565",
                  borderRadius: "2000px",
                  fontWeight: 500,
                  fontSize: isMobile ? "0.85rem" : "1rem",
                  "&:hover": {
                    backgroundColor:
                      activeTab === index ? "#0056b3" : "#e6f2ff",
                  },
                }}
              >
                {tab.label}
              </Button>
            ))}
          </Box>
        )}

        {/* Tab Content */}
        {tabs && tabs[activeTab]?.content && (
          <Box mt={2}>{tabs[activeTab].content}</Box>
        )}

        {/* Optional Additional Content */}
        {content && <Box mt={2}>{content}</Box>}
      </Box>

      {/* Fixed Footer */}
      {footer && (
        <>
          <Divider />
          <Box
            sx={{
              p: 2,
              borderTop: "1px solid #ddd",
              backgroundColor: "#fff",
            }}
          >
            {footer}
          </Box>
        </>
      )}
    </Drawer>
  );
};

export default Slider;
