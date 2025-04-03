import { Box, Grid, Typography } from "@mui/material";
import ReusableInput from "../Components/ReUsable/TextField";
import DropdownComponent from "../Components/ReUsable/Dropdown";
import customerPicture from "../assets/Images/customerPicture.png";
import TextArea from "../Components/ReUsable/TextArea";
import { InfoOutline } from "@mui/icons-material";
import MasterDataFooter from "../Components/ReUsable/MasterDataFooter";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const MasterDataDetails: React.FC = () => {
  const { selectedTab } = useSelector((state: RootState) => state.masterData);

  return (
    <Box sx={{ borderRadius: "0px " }}>
      <Box sx={{ border: "1px solid #ECECEC", borderRadius: "16px", p: 2 }}>
        <Typography
          sx={{ color: "#2F2FF", fontWeight: 600, fontSize: "16px" }}
          gutterBottom
        >
          Basic Information
        </Typography>
        <Grid container spacing={2} pt={1}>
          <Grid size={{ xs: 12, md: 4 }}>
            <ReusableInput
              label="Unity Effectivity Number"
              value="20240401"
              onChange={() => {}}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <ReusableInput
              label="Customer"
              value="Nestlé"
              onChange={() => {}}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box display="flex" flexDirection="column" alignItems="flex-start">
              <Typography
                variant="body2"
                sx={{ fontWeight: 500 }}
                color="#656565"
              >
                Customer Picture
              </Typography>
              <Box component="img" src={customerPicture} alt="Customer" />
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <ReusableInput
              label="Type of Label"
              value="KitKat 50g Wrapper"
              onChange={() => {}}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <ReusableInput
              label="ITEM Code"
              value="KK-50G-123"
              onChange={() => {}}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextArea
              label="Brand Name & Pack DEscription"
              value="KK-50G-123"
              onChange={() => {}}
              placeholder="Enter your text..."
              rows={0}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <DropdownComponent
              label="Jar/Cap"
              options={["N/A (For flexible packaging)"]}
              value="N/A (For flexible packaging)"
              onChange={() => {}}
              isMultiSelect={false}
              checkbox={false}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <DropdownComponent
              label="Structure"
              options={["PET"]}
              value="PET"
              onChange={() => {}}
              isMultiSelect={false}
              checkbox={false}
            />
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{ border: "1px solid #ECECEC", borderRadius: "16px", p: 2, mt: 2 }}
      >
        <Typography
          sx={{ color: "#2F2FF", fontWeight: 600, fontSize: "16px" }}
          gutterBottom
        >
          Additional Information
        </Typography>
        <Grid container spacing={2} pt={1}>
          <Grid size={{ xs: 12, md: 3 }}>
            <ReusableInput label="Repeat" value="53" onChange={() => {}} />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <ReusableInput label="UPs" value="273" onChange={() => {}} />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <ReusableInput label="Tracks" value="246" onChange={() => {}} />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <ReusableInput
              label="# Labels/Meter"
              value="121"
              onChange={() => {}}
            />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ display: "flex", gap: 1 }} mt={4} p={1}>
        {" "}
        <Typography
          sx={{ color: "#2F2FF", fontWeight: 600, fontSize: "16px" }}
          gutterBottom
        >
          Substrate
        </Typography>
        <InfoOutline sx={{ color: "#9F9F9F", width: "20px", height: "20px" }} />
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexDirection: { md: "row", xs: "column" },
        }}
      >
        <Box sx={{ border: "1px solid #ECECEC", borderRadius: "16px", p: 2 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              sx={{ color: "#2F2FF", fontWeight: 600, fontSize: "16px" }}
            >
              Printing Substrate
            </Typography>
            <Grid container spacing={2} pt={1}>
              <Grid size={{ xs: 12, md: 6 }}>
                <DropdownComponent
                  label="Substrate Type"
                  options={["U-Flex Ltd."]}
                  value="U-Flex Ltd."
                  onChange={() => {}}
                  isMultiSelect={false}
                  checkbox={false}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <DropdownComponent
                  label="Supplier"
                  options={["U-Flex Ltd."]}
                  value="42 Dynes"
                  onChange={() => {}}
                  isMultiSelect={false}
                  checkbox={false}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <ReusableInput
                  label="Dyne Level"
                  value="1200"
                  onChange={() => {}}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <ReusableInput
                  label="Width (mm)"
                  value="12"
                  onChange={() => {}}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <ReusableInput
                  label="Thickness (micrones)"
                  value="16.4"
                  onChange={() => {}}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <ReusableInput
                  label="Density (g/cm)"
                  value="16.4"
                  onChange={() => {}}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <ReusableInput label="GSM" value="16.4" onChange={() => {}} />
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ border: "1px solid #ECECEC", borderRadius: "16px", p: 2 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              sx={{ color: "#2F2FF", fontWeight: 600, fontSize: "16px" }}
            >
              Lamination Substrate
            </Typography>
            <Grid container spacing={2} pt={1}>
              <Grid size={{ xs: 12, md: 6 }}>
                <DropdownComponent
                  label="Substrate Type"
                  options={["U-Flex Ltd."]}
                  value="U-Flex Ltd."
                  onChange={() => {}}
                  isMultiSelect={false}
                  checkbox={false}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <DropdownComponent
                  label="Supplier"
                  options={["U-Flex Ltd."]}
                  value="42 Dynes"
                  onChange={() => {}}
                  isMultiSelect={false}
                  checkbox={false}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <ReusableInput
                  label="Dyne Level"
                  value="1200"
                  onChange={() => {}}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <ReusableInput
                  label="Width (mm)"
                  value="12"
                  onChange={() => {}}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <ReusableInput
                  label="Thickness (micrones)"
                  value="16.4"
                  onChange={() => {}}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <ReusableInput
                  label="Density (g/cm)"
                  value="16.4"
                  onChange={() => {}}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <ReusableInput label="GSM" value="16.4" onChange={() => {}} />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box mt={1} display="flex" justifyContent="flex-end">
        <MasterDataFooter selectedTab={selectedTab} />
      </Box>
    </Box>
  );
};

export default MasterDataDetails;
