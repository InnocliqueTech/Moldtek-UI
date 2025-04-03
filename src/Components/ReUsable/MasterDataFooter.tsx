import { Box } from "@mui/material";
import ReusableButton from "./Button";

interface MasterDataFooterProps {
  selectedTab: number;
}

const MasterDataFooter: React.FC<MasterDataFooterProps> = ({ selectedTab }) => {
  const buttonText = ["Next:Master Data:Printing", "Next", "Continue"];

  return (
    <Box display="flex" justifyContent="center" gap={2} p={2}>
      {selectedTab === 3 ? (
        <ReusableButton text="Submit and Publish" color="#0073B7" borderRadius="100px" border="1px solid #0073B7" textColor="white" p={2} />
      ) : (
        <>
          <ReusableButton text={buttonText[selectedTab] || "Next:Master Data:Printing"} color="" borderRadius="100px" border="1px solid #ECECEC" textColor="#656565" p={2} />
          <ReusableButton text="Save" color="" borderRadius="100px" border="1px solid #0073B7" textColor="#0073B7" p={2} />
          <ReusableButton text="Submit" color="#0073B7" borderRadius="100px" border="1px solid #0073B7" textColor="white" p={2} />
        </>
      )}
    </Box>
  );
};

export default MasterDataFooter;
