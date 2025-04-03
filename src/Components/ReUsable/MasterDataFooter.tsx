import { Box } from "@mui/material";
import ReusableButton from "./Button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { setSelectedTab } from "../../store/slices/masterDataSlice";

interface MasterDataFooterProps {
  selectedTab: number;
}

const MasterDataFooter: React.FC<MasterDataFooterProps> = ({ selectedTab }) => {
     const dispatch = useDispatch<AppDispatch>();
  const buttonText = [
    "Next: Master Data - Printing",
    "Next: Master Data - Lamination",
    "Next: Master Data - Dye Printing",
  ];

  const handleNextClick = () => {
    if (selectedTab < 3) {
      dispatch(setSelectedTab(selectedTab + 1));
    }
  };

  return (
    <Box display="flex" justifyContent="center" gap={2} p={2}>
      {selectedTab === 3 ? (
        <ReusableButton
          text="Submit and Publish"
          color="#0073B7"
          borderRadius="100px"
          border="1px solid #0073B7"
          textColor="white"
          p={2}
        />
      ) : (
        <>
          <ReusableButton
            text={buttonText[selectedTab] || "Next: Master Data - Printing"}
            color=""
            borderRadius="100px"
            border="1px solid #ECECEC"
            textColor="#656565"
            p={2}
            onClick={handleNextClick} // Handle tab change on click
          />
          <ReusableButton
            text="Save"
            color=""
            borderRadius="100px"
            border="1px solid #0073B7"
            textColor="#0073B7"
            p={2}
          />
          <ReusableButton
            text="Submit"
            color="#0073B7"
            borderRadius="100px"
            border="1px solid #0073B7"
            textColor="white"
            p={2}
          />
        </>
      )}
    </Box>
  );
};

export default MasterDataFooter;
