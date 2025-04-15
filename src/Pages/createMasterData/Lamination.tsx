import { Box, Grid, SelectChangeEvent, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import ReusableInput from "../../Components/ReUsable/TextField";
import { InfoOutline } from "@mui/icons-material";
import { useEffect } from "react";
import {
  LaminatingTableRow,
  LaminationFormData,
  setIsLaminatingDataSave,
  setLaminationFormData,
} from "../../store/slices/masterDataSlice";
import DropdownComponent from "../../Components/ReUsable/Dropdown";
import DataTable from "../../Components/ReUsable/MasterDataTable";
import { useParams } from "react-router-dom";

interface LaminationProps {
  tableData: LaminatingTableRow[],
  setTableData: React.Dispatch<React.SetStateAction<LaminatingTableRow[]>>,
  formData:LaminationFormData,
  setFormData: React.Dispatch<React.SetStateAction<LaminationFormData>>,
}

const Lamination: React.FC<LaminationProps> = ({
  tableData,setTableData,setFormData,formData
}) => {
  const { laminaionFormData } = useSelector(
    (state: RootState) => state.masterData
  );
  const {
    laminatingSubstrateSettings,
    laminationAdhesive,
    laminationSettings,
  } = useSelector((state: RootState) => state.viewMasterData);
  const dispatch = useDispatch<AppDispatch>();
  const bondingMaterialColumns = [
    { id: "type", label: "Field" },
    { id: "code", label: "Code", edit: true },
    { id: "brand", label: "Brand", edit: true },
    { id: "ratio", label: "Ratio", edit: true },
  ];
  useEffect(() => {
    if (laminaionFormData) {
      setFormData(laminaionFormData);
      if (laminaionFormData.bondingMaterials) {
        setTableData(laminaionFormData.bondingMaterials);
      }
    }
  }, [laminaionFormData]);

  const numericFields = new Set([
    "zone1_temp",
    "zone2_temp",
    "nip_pressure_bar",
    "speed",
    "width",
    "thickness",
    "density",
    "ratio",
  ]);

  function sanitizeMasterData(data: any): LaminationFormData {
    return {
      laminationConditions: {
        zone1_temp: data.zone1_temp || 0,
        zone2_temp: data.zone2_temp || 0,
        nip_pressure_bar: data.nip_pressure_bar || 0,
        speed: data.speed || 0,
        last_set_tension: data.last_set_tension || "",
        rewinder_tension: data.rewinder_tension || "",
        printed_film_tension: data.printed_film_tension || "",
        laminate_film_tension: data.laminate_film_tension || "",
        viscosity_range: data.viscosity_range || "",
        adhesive_gsm: data.adhesive_gsm || "",
      },
      laminationSubstrate: {
        substrate_type: data.substrate_type || "",
        supplier: data.supplier || "",
        dyne_level: data.dyne_level || "",
        width: data.width || 0,
        thickness: data.thickness || 0,
        density: data.density || 0,
      },
      bondingMaterials: data || [
        { type: "Adhesive", code: "", brand: "", ratio: 0 },
        { type: "Hardener", code: "", brand: "", ratio: 0 },
        { type: "Ethyl Acetate", code: "", brand: "", ratio: 0 },
      ],
    };
  }

  const { id } = useParams();

  const handleChange = (
    section: string,
    field: string,
    value: string | string[] | SelectChangeEvent<string | string[]>
  ) => {
    const newValue = Array.isArray(value)
      ? value
      : typeof value === "string"
      ? value
      : value.target.value;

    const finalValue = numericFields.has(field) ? Number(newValue) : newValue;

    const updatedFormData = {
      ...formData,
      [section]: {
        ...(formData as any)[section],
        [field]: finalValue,
      },
    };

    setFormData(updatedFormData);
    dispatch(setLaminationFormData(updatedFormData));
  };

  useEffect(() => {
    if(id){
    const sanitizedLaminationData = sanitizeMasterData(laminationSettings);
    const sanitizedSubstrateData = sanitizeMasterData(
      laminatingSubstrateSettings
    );

    const combinedValues: LaminationFormData = {
      ...sanitizedLaminationData,
      laminationSubstrate: sanitizedSubstrateData.laminationSubstrate,
    };

    setFormData(combinedValues);
    const sanitizedBondingMaterials = sanitizeMasterData(laminationAdhesive);
    const adhesiveDetails: LaminatingTableRow[] =
      sanitizedBondingMaterials.bondingMaterials;
    setTableData(adhesiveDetails);
  }
  }, [id, laminationSettings, laminatingSubstrateSettings, laminationAdhesive]);

  return (
    <Box sx={{ borderRadius: "0px " }}>
      <Box sx={{ border: "1px solid #ECECEC", borderRadius: "16px", p: 2 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Typography
              sx={{ color: "#2F2FF", fontWeight: 600, fontSize: "16px" }}
            >
              Lamination Zone Settings
            </Typography>
            <InfoOutline
              sx={{ color: "#9F9F9F", width: "20px", height: "20px" }}
            />
          </Box>
          <Grid container spacing={2} pt={1}>
            <Grid size={{ xs: 12, md: 4 }}>
              <ReusableInput
                label="Zone-1 Temp (°C)"
                value={formData.laminationConditions.zone1_temp}
                onChange={(e) =>
                  handleChange(
                    "laminationConditions",
                    "zone1_temp",
                    e.target.value as string
                  )
                }
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <ReusableInput
                label="Zone-2 Temp (°C)"
                value={formData.laminationConditions.zone2_temp}
                onChange={(e) =>
                  handleChange(
                    "laminationConditions",
                    "zone2_temp",
                    e.target.value
                  )
                }
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <ReusableInput
                label="Nip Pressure (bar)"
                value={formData.laminationConditions.nip_pressure_bar}
                onChange={(e) =>
                  handleChange(
                    "laminationConditions",
                    "nip_pressure_bar",
                    e.target.value
                  )
                }
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <ReusableInput
                label="Speed (m/min)"
                value={formData.laminationConditions.speed}
                onChange={(e) =>
                  handleChange("laminationConditions", "speed", e.target.value)
                }
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <ReusableInput
                label="Lami Set Tension"
                value={formData.laminationConditions.last_set_tension}
                onChange={(e) =>
                  handleChange(
                    "laminationConditions",
                    "last_set_tension",
                    e.target.value
                  )
                }
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <ReusableInput
                label="Rewinder Tension"
                value={formData.laminationConditions.rewinder_tension}
                onChange={(e) =>
                  handleChange(
                    "laminationConditions",
                    "rewinder_tension",
                    e.target.value
                  )
                }
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <ReusableInput
                label="Printed Film Tension"
                value={formData.laminationConditions.printed_film_tension}
                onChange={(e) =>
                  handleChange(
                    "laminationConditions",
                    "printed_film_tension",
                    e.target.value
                  )
                }
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <ReusableInput
                label="Laminated Film Tension"
                value={formData.laminationConditions.laminate_film_tension}
                onChange={(e) =>
                  handleChange(
                    "laminationConditions",
                    "laminate_film_tension",
                    e.target.value
                  )
                }
              />
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexDirection: { md: "row", xs: "column" },
          mt: 1.5,
        }}
      >
        <Box sx={{ border: "1px solid #ECECEC", borderRadius: "16px", p: 2 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              sx={{ color: "#2F2FF", fontWeight: 600, fontSize: "16px" }}
            >
              Lamination Substrate
            </Typography>
            <Grid container spacing={2} pt={1}>
              <Grid size={{ xs: 12, md: 4 }}>
                <DropdownComponent
                  label="Substrate Type"
                  options={["PET"]}
                  value={formData.laminationSubstrate.substrate_type}
                  onChange={(value) =>
                    handleChange("laminationSubstrate", "substrate_type", value)
                  }
                  isMultiSelect={false}
                  checkbox={false}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <DropdownComponent
                  label="Supplier"
                  options={[
                    "U-Flex Ltd.",
                    "Huhtamaki",
                    "Huhtamaki",
                    "Gulf Pack Supplier",
                  ]}
                  value={formData.laminationSubstrate.supplier}
                  onChange={(value) =>
                    handleChange("laminationSubstrate", "supplier", value)
                  }
                  isMultiSelect={false}
                  checkbox={false}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <ReusableInput
                  label="Dyne Level"
                  value={formData.laminationSubstrate.dyne_level}
                  onChange={(e) =>
                    handleChange(
                      "laminationSubstrate",
                      "dyne_level",
                      e.target.value
                    )
                  }
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <ReusableInput
                  label="Width (mm)"
                  value={formData.laminationSubstrate.width}
                  onChange={(e) =>
                    handleChange("laminationSubstrate", "width", e.target.value)
                  }
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <ReusableInput
                  label="Thickness"
                  value={formData.laminationSubstrate.thickness}
                  onChange={(e) =>
                    handleChange(
                      "laminationSubstrate",
                      "thickness",
                      e.target.value
                    )
                  }
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <ReusableInput
                  label="Density (g/cm)"
                  value={formData.laminationSubstrate.density}
                  onChange={(e) =>
                    handleChange(
                      "laminationSubstrate",
                      "density",
                      e.target.value
                    )
                  }
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box
        sx={{
          border: "1px solid #ECECEC",
          borderRadius: "16px",
          pY: 1,
          mt: 1.5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 1,
          }}
        >
          <Typography
            sx={{ color: "#2F2FF", fontWeight: 600, fontSize: "16px" }}
            gutterBottom
          >
            Bonding Material Specifications
          </Typography>
          <InfoOutline sx={{ color: "#9F9F9F", width: 20, height: 20 }} />
        </Box>
        <DataTable
          columns={bondingMaterialColumns}
          data={tableData}
          tableTitle={true}
          setData={setTableData}
          firstRow={true}
          id={"lamination"}
        />
      </Box>
      <Box
        sx={{ border: "1px solid #ECECEC", borderRadius: "16px", p: 2, mt: 2 }}
      >
        <Box sx={{ display: "flex", gap: 1 }}>
          {" "}
          <Typography
            sx={{ color: "#2F2FF", fontWeight: 600, fontSize: "16px" }}
            gutterBottom
          >
            Material Details
          </Typography>
          <InfoOutline
            sx={{ color: "#9F9F9F", width: "20px", height: "20px" }}
          />
        </Box>
        <Grid container spacing={2} pt={1}>
          {[
            { label: "Viscocity Range", key: "viscosity_range" },
            { label: "Adhesive GSM", key: "adhesive_gsm" },
          ].map(({ label, key }) => (
            <Grid size={{ xs: 12, md: 6 }} key={key}>
              <ReusableInput
                label={label}
                value={
                  typeof formData.laminationConditions?.[
                    key as keyof typeof formData.laminationConditions
                  ] === "string"
                    ? (formData.laminationConditions[
                        key as keyof typeof formData.laminationConditions
                      ] as string)
                    : ""
                }
                onChange={(e) =>
                  handleChange("laminationConditions", key, e.target.value)
                }
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Lamination;
