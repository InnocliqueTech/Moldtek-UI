import { Box, Grid, SelectChangeEvent, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import MasterDataFooter from "../../Components/ReUsable/MasterDataFooter";
import ReusableInput from "../../Components/ReUsable/TextField";
import { InfoOutline } from "@mui/icons-material";
import DataTable from "../../Components/ReUsable/MasterDataTable";
import DropdownComponent from "../../Components/ReUsable/Dropdown";
import { useEffect, useState } from "react";
import { PrintingFormValues, PrintingTableRow, setSavePrintingFormData } from "../../store/slices/masterDataSlice";

const Printing: React.FC = () => {
  const { selectedTab,printingSaveFormData } = useSelector((state: RootState) => state.masterData);
  const dispatch = useDispatch<AppDispatch>()

  const columns = [
    { id: "stationNo", label: "Station No" },
    { id: "colorPantone", label: "Color Pantone",edit:true  },
    { id: "lfValue", label: "LF Value",edit:true  },
    {
      id: "inkSupplier",
      label: "Ink Supplier",
      // isDropdown: true,
      options: ["Siegwerk", "Flint Group"],
      editSelect:true
    },
    { id: "lpcm", label: "LPCM" ,edit:true },
    { id: "volume", label: "Volume",edit:true  },
    { id: "uvLed", label: "UV/LED", isDropdown: true, options: ["LED", "UV"] },
  ];

  const [tableData, setTableData] = useState<PrintingTableRow[]>([]);
  const [formValues, setFormValues] = useState<PrintingFormValues>({
    mountingType: "",
    cylinderTeeth: "",
    tension: "",
    unwinder: "",
    infeed: "",
    outfeed: "",
    rewinder: "",
    staticCharge: "",
    formatCorrect: "",
    printingTableData: [
      {
        stationNo: 1,
        colorPantone: '',
        lfValue: 0,
        inkSupplier:"",
        lpcm: 0,
        volume: '',
        uvLed: '',
      },
      {
        stationNo: 2,
        colorPantone: '',
        lfValue: 0,
        inkSupplier:"",
        lpcm: 0,
        volume: '',
        uvLed: '',
      },
      {
        stationNo: 3,
        colorPantone: '',
        lfValue: 0,
        inkSupplier:"",
        lpcm: 0,
        volume: '',
        uvLed: '',
      },
      {
        stationNo: 4,
        colorPantone: '',
        lfValue: 0,
        inkSupplier:"",
        lpcm: 0,
        volume: '',
        uvLed: '',
      },
      {
        stationNo: 5,
        colorPantone: '',
        lfValue: 0,
        inkSupplier:"",
        lpcm: 0,
        volume: '',
        uvLed: '',
      },
      {
        stationNo: 6,
        colorPantone: '',
        lfValue: 0,
        inkSupplier:"",
        lpcm: 0,
        volume: '',
        uvLed: '',
      },
      {
        stationNo: 7,
        colorPantone: '',
        lfValue: 0,
        inkSupplier:"",
        lpcm: 0,
        volume: '',
        uvLed: '',
      },
      {
        stationNo: 8,
        colorPantone: '',
        lfValue: 0,
        inkSupplier:"",
        lpcm: 0,
        volume: '',
        uvLed: '',
      },
      {
        stationNo: 9,
        colorPantone: '',
        lfValue: 0,
        inkSupplier:"",
        lpcm: 0,
        volume: '',
        uvLed: '',
      },
      {
        stationNo: 10,
        colorPantone: '',
        lfValue: 0,
        inkSupplier:"",
        lpcm: 0,
        volume: '',
        uvLed: '',
      }
    ]
  });
  const handleSave = () => {
    const finalSaveData = {
      ...formValues,
      printingTableData: tableData,
    };
    dispatch(setSavePrintingFormData(finalSaveData));
  };
  useEffect(() => {
    if (printingSaveFormData) {
      setFormValues(printingSaveFormData);
      if (printingSaveFormData.printingTableData) {
        setTableData(printingSaveFormData.printingTableData);
      }
    }
  }, [printingSaveFormData]);
  
    

  const handleChange = (
    field: string,
    value: string | string[] | SelectChangeEvent<string | string[]>
  ) => {
    setFormValues((prev) => ({
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
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Typography
              sx={{ color: "#2F2FF", fontWeight: 600, fontSize: "16px" }}
            >
              Machine Settings
            </Typography>
            <InfoOutline
              sx={{ color: "#9F9F9F", width: "20px", height: "20px" }}
            />
          </Box>
          <Grid container spacing={2} pt={1}>
            <Grid size={{ xs: 12, md: 4 }}>
              <DropdownComponent
                label="Mounting Type"
                value={formValues.mountingType}
                onChange={(value) =>  handleChange("mountingType", value)}
                options={["Standard", "Actual"]}
                isMultiSelect={false}
                checkbox={false}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <ReusableInput
                label="Cylinder Teeth"
                value={formValues.cylinderTeeth}
                onChange={(e) => handleChange("cylinderTeeth", e.target.value)}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <ReusableInput
                label="Tension"
                value={formValues.tension}
                onChange={(e) => handleChange("tension", e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <ReusableInput
                label="Unwinder"
                value={formValues.unwinder}
                onChange={(e) => handleChange("unwinder", e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <ReusableInput
                label="Infeed"
                value={formValues.infeed}
                onChange={(e) => handleChange("infeed", e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <ReusableInput
                label="Outfeed"
                value={formValues.outfeed}
                onChange={(e) => handleChange("outfeed", e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <ReusableInput
                label="Rewinder"
                value={formValues.rewinder}
                onChange={(e) => handleChange("rewinder", e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <ReusableInput
                label="Static Charge"
                value={formValues.staticCharge}
                onChange={(e) => handleChange("staticCharge", e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <ReusableInput
                label="Format Correct"
                value={formValues.formatCorrect}
                onChange={(e) => handleChange("formatCorrect", e.target.value)}
              />
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{ border: "1px solid #ECECEC", borderRadius: "16px", p: 2, mt: 2 }}
      >
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography
              sx={{ color: "#2F2FF", fontWeight: 600, fontSize: "16px" }}
            >
              Station-wise Metric
            </Typography>
            <InfoOutline
              sx={{ color: "#9F9F9F", width: "20px", height: "20px" }}
            />
          </Box>
          <Box sx={{ mt: 2 }}>
          <DataTable columns={columns} data={tableData} setData={setTableData} />

          </Box>
        </Grid>
      </Box>
      <Box mt={1} display="flex" justifyContent="flex-end">
        <MasterDataFooter selectedTab={selectedTab} handleSave={handleSave} />
      </Box>
    </Box>
  );
};
export default Printing;
