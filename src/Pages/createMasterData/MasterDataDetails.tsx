import { Box, Grid, Typography } from "@mui/material";
import ReusableInput from "../../Components/ReUsable/TextField";
import DropdownComponent from "../../Components/ReUsable/Dropdown";
import customerPicture from "../../assets/Images/customerPicture.png";
import TextArea from "../../Components/ReUsable/TextArea";
import { InfoOutline } from "@mui/icons-material";
import MasterDataFooter from "../../Components/ReUsable/MasterDataFooter";
import { useSelector} from "react-redux";
import { RootState } from "../../store";
import { useState } from "react";
import { SelectChangeEvent } from "@mui/material";

const MasterDataDetails: React.FC = () => {
  const { selectedTab } = useSelector((state: RootState) => state.masterData);
  const [formData, setFormData] = useState({
    unitEffectivityNumber: "UEN-20240401",
    typeOfLabel: "KitKat 50g Wrapper",
    jarCap: "N/A (For flexible packaging)",
    customer: "Nestlé",
    itemCode: "KK-50G-123",
    structure: "PET",
    brandDescription:
      "0 LTR_AP_DTS_L_WT <APEX ULTIMA PROTEK TOPCOAT> [CODE:P34779.J] (IML) ASIAN PAINTS",
    repeat: "53",
    ups: "273",
    tracks: "246",
    labelsPerMeter: "121",
    substrateType: "PET",
    supplier: "U-Flex Ltd.",
    dyneLevel: "1200",
    width: "12",
    thickness: "16.4",
    density: "16.4",
    gsm: "16.4",
  });

  const handleChange = (
    field: string,
    value: string | string[] | SelectChangeEvent<string | string[]>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: Array.isArray(value)
        ? value
        : typeof value === "string"
        ? value
        : value.target.value,
    }));
  };

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
              label="Unit Effectivity Number"
              value={formData.unitEffectivityNumber}
              onChange={(e) =>
                handleChange("unitEffectivityNumber", e.target.value)
              }
            />
            <Box sx={{ mt: 2 }}>
              <DropdownComponent
                label="Type of Label"
                options={["KitKat 50g Wrapper"]}
                value={formData.typeOfLabel}
                onChange={(e) => handleChange("typeOfLabel", e)}
                isMultiSelect={false}
                checkbox={false}
              />
            </Box>
            <Box sx={{ mt: 2 }}>
              <DropdownComponent
                label="Jar/Cap"
                options={["N/A (For flexible packaging)", "JAR", "CAP"]}
                value={formData.jarCap}
                onChange={(value: any) => handleChange("jarCap", value)}
                isMultiSelect={false}
                checkbox={false}
              />
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <ReusableInput
              label="Customer"
              value={formData.customer}
              onChange={(e) => handleChange("customer", e.target.value)}
            />
            <Box sx={{ mt: 2 }} />
            <ReusableInput
              label="ITEM Code"
              value={formData.itemCode}
              onChange={(e) => handleChange("itemCode", e.target.value)}
            />
            <Box sx={{ mt: 2 }}>
              <DropdownComponent
                label="Structure"
                options={["PET"]}
                value={formData.structure}
                onChange={(value) => handleChange("structure", value)}
                isMultiSelect={false}
                checkbox={false}
              />
            </Box>
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
            <Box sx={{ mt: 2 }}>
              <TextArea
                label="Brand Name & Pack Description"
                value={formData.brandDescription}
                onChange={(e) =>
                  handleChange("brandDescription", e.target.value)
                }
                placeholder="Enter your text..."
                rows={4}
              />
            </Box>
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
            <ReusableInput
              label="Repeat"
              value={formData.repeat}
              onChange={(e) => handleChange("repeat", e.target.value)}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <ReusableInput
              label="UPs"
              value={formData.ups}
              onChange={(e) => handleChange("ups", e.target.value)}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <ReusableInput
              label="Tracks"
              value={formData.tracks}
              onChange={(e) => handleChange("tracks", e.target.value)}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <ReusableInput
              label="# Labels/Meter"
              value={formData.labelsPerMeter}
              onChange={(e) => handleChange("labelsPerMeter", e.target.value)}
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
                  options={["PET"]}
                  value={formData.substrateType}
                  onChange={(value) => handleChange("substrateType", value)}
                  isMultiSelect={false}
                  checkbox={false}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <DropdownComponent
                  label="Supplier"
                  options={["U-Flex Ltd.","Huhtamaki","Huhtamaki","Gulf Pack Supplier"]}
                  value={formData.supplier}
                  onChange={(value) => handleChange("supplier", value)}
                  isMultiSelect={false}
                  checkbox={false}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <ReusableInput
                  label="Dyne Level"
                  value={formData.dyneLevel}
                  onChange={(e) =>
                    handleChange("dyneLevel", e.target.value)
                  }
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <ReusableInput
                  label="Width (mm)"
                  value={formData.width}
                  onChange={(e) =>
                    handleChange("width", e.target.value)
                  }
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <ReusableInput
                  label="Thickness (micrones)"
                  value={formData.thickness}
                  onChange={(e) =>
                    handleChange("thickness", e.target.value)
                  }
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <ReusableInput
                  label="Density (g/cm)"
                  value={formData.density}
                  onChange={(e) =>
                    handleChange("density", e.target.value)
                  }
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <ReusableInput
                  label="GSM"
                  value={formData.gsm}
                  onChange={(e) =>
                    handleChange("gsm", e.target.value)
                  }
                />
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
                  options={["PET"]}
                  value={formData.substrateType}
                  onChange={(value) => handleChange("substrateType", value)}
                  isMultiSelect={false}
                  checkbox={false}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <DropdownComponent
                  label="Supplier"
                  options={["U-Flex Ltd.","Huhtamaki","Huhtamaki","Gulf Pack Supplier"]}
                  value={formData.supplier}
                  onChange={(value) => handleChange("supplier", value)}
                  isMultiSelect={false}
                  checkbox={false}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <ReusableInput
                  label="Dyne Level"
                  value={formData.dyneLevel}
                  onChange={(e) =>
                    handleChange("dyneLevel", e.target.value)
                  }
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <ReusableInput
                  label="Width (mm)"
                  value={formData.width}
                  onChange={(e) =>
                    handleChange("width", e.target.value)
                  }
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <ReusableInput
                  label="Thickness (micrones)"
                  value={formData.thickness}
                  onChange={(e) =>
                    handleChange("thickness", e.target.value)
                  }
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <ReusableInput
                  label="Density (g/cm)"
                  value={formData.density}
                  onChange={(e) =>
                    handleChange("density", e.target.value)
                  }
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <ReusableInput
                  label="GSM"
                  value={formData.gsm}
                  onChange={(e) =>
                    handleChange("gsm", e.target.value)
                  }
                />
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
