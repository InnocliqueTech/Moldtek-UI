import React, { useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import TabsComponent from "../../Components/ReUsable/Tabs";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/index";
import {
  setSelectedTab,
  setSaveFormData,
  setIsMasterDetailsDataSave,
} from "../../store/slices/masterDataSlice";
import MasterDataDetails from "./MasterDataDetails";
import DyeCutting from "./DyeCutting";
import Printing from "./Printing";
import Lamination from "./Lamination";
import { mockData } from "./data";
import {
  setDyeCuttingSettings,
  setLaminatingSubstrate,
  setLaminationAdhesiveDetails,
  setLaminationSettings,
  setPrintingInkStationData,
  setPrintingMachineSettingsData,
  setPrintingSubstrate,
  setViewMasterDataDetails,
} from "../../store/slices/viewMasterDataSlice";
import MasterDataFooter from "../../Components/ReUsable/MasterDataFooter";
import {
  MasterFormData,
  PrintingFormValues,
  PrintingTableRow,
  setIsPrintingDataSave,
  setSavePrintingFormData,
  LaminatingTableRow,
  LaminationFormData,
  setIsLaminatingDataSave,
  setLaminationFormData,
  DyeCuttingFormData,
  setDyeCuttingFormData,
  setIsDyeCuttingSave,
  setRequestPayload,
} from "./../../store/slices/masterDataSlice";
import { toast } from "react-toastify";

const tabs = [
  "Master Data Details",
  "Master Data - Printing",
  "Master Data - Lamination",
  "Master Data - Dye Cutting",
];

const CreateMasterData: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    selectedTab,
    requestPayload,
    saveFormData,
    printingSaveFormData,
    laminaionFormData,
    dyeCuttingFormData,
  } = useSelector((state: RootState) => state.masterData);
  const [formData, setFormData] = useState<MasterFormData>({
    unit_effectivity_number: "",
    customer_name: "",
    customer_logo: "",
    jar_cap: "",
    item_code: "",
    structure: "",
    brand_description: "",
    label_type: "",
    repeat_length: 0,
    ups: 0,
    tracks: 0,
  });

  const [tableData, setTableData] = useState<PrintingTableRow[]>([]);
  const [formValues, setFormValues] = useState<PrintingFormValues>({
    printingDetails: {
      mounting_tape: "",
      cylinder_teeth: 0,
      tension: 0,
      unwinder: 0,
      infeed: 0,
      outfeed: 0,
      rewinder: 0,
      static_charge: 0,
      format_correct: 0,
    },
    printingSubstrateSettings: {
      print_substrate_id: 1,
      machine_settings_id: 1,
      substrate_type: "",
      supplier: "",
      dyne_level: "",
      width: 0,
      thickness: 0,
      density: 0,
    },
    stationWiseMetrics: Array.from({ length: 10 }, (_, i) => ({
      station_no: i + 1,
      color_pantone: "",
      lf_value: 0,
      ink_supplier: "",
      lpcm: 0,
      volume: "",
      uv_led: "",
      uv_led_intensity: "",
    })),
  });

  const [LaminationTableData, setLaminationTableData] = useState<
    LaminatingTableRow[]
  >([]);
  const [lamiFormData, setLamiFormData] = useState<LaminationFormData>({
    laminationConditions: {
      zone1_temp: 0,
      zone2_temp: 0,
      nip_pressure_bar: 0,
      speed: 0,
      last_set_tension: "",
      rewinder_tension: "",
      printed_film_tension: "",
      laminate_film_tension: "",
      viscosity_range: "",
      adhesive_gsm: "",
    },
    laminationSubstrate: {
      substrate_type: "",
      supplier: "",
      dyne_level: "",
      width: 0,
      thickness: 0,
      density: 0,
    },
    bondingMaterials: [
      {
        type: "Adhesive",
        code: "",
        brand: "",
        ratio: 0,
      },
      {
        type: "Hardener",
        code: "",
        brand: "",
        ratio: 0,
      },
      {
        type: "Ethyl Acetate",
        code: "",
        brand: "",
        ratio: 0,
      },
    ],
  });

  const [dyeFormData, setDyeFormData] = useState<DyeCuttingFormData>({
    machine_type: "",
    machine_name: "",
    dye_code: "",
    run_speed: 0,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSaveMasterData = () => {
    dispatch(setSaveFormData(formData));
    dispatch(setIsMasterDetailsDataSave(true));
    toast.success("Data Saved successfully!");
  };

  const handleSavePrinting = () => {
    const finalSaveData = {
      ...formValues,
      stationWiseMetrics: tableData,
    };
    dispatch(setSavePrintingFormData(finalSaveData));
    dispatch(setIsPrintingDataSave(true));
  };

  const handleSaveLamination = () => {
    const finalSaveData = {
      ...lamiFormData,
      laminaionFormData: tableData,
    };
    dispatch(setLaminationFormData(finalSaveData));
    dispatch(setIsLaminatingDataSave(true));
  };

  const handleSaveDyeCutting = () => {
    const newErrors: { [key: string]: string } = {};
    const updated: typeof dyeFormData = { ...dyeFormData };

    if (!dyeFormData.machine_type.trim()) {
      newErrors.machine_type = "Machine type is required";
    }

    if (!dyeFormData.machine_name.trim()) {
      newErrors.machine_name = "Machine name is required";
    }

    if (!dyeFormData.dye_code.trim()) {
      newErrors.dye_code = "Dye code is required";
    }

    if (
      !dyeFormData.run_speed ||
      isNaN(dyeFormData.run_speed) ||
      dyeFormData.run_speed <= 0
    ) {
      newErrors.run_speed = "Run speed must be a valid number greater than 0";
      updated.run_speed = 0;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    dispatch(setDyeCuttingFormData(dyeFormData));
    dispatch(setIsDyeCuttingSave(true));
    const updatedPayload = {
      ...requestPayload,
      masterDataDetails: {
        ...requestPayload.masterDataDetails,
        ...saveFormData,
      },
      masterDataPrinting: {
        ...requestPayload.masterDataPrinting,
        ...printingSaveFormData,
      },
      masterDataLamination: {
        ...requestPayload.masterDataLamination,
        ...laminaionFormData,
      },
      masterDataDyeCutting: {
        ...requestPayload.masterDataDyeCutting,
        ...dyeCuttingFormData,
      },
    };

    dispatch(setRequestPayload(updatedPayload));
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    dispatch(setSelectedTab(newValue));
  };
  useEffect(() => {
    dispatch(setViewMasterDataDetails(mockData.masterDataDetails));
    dispatch(
      setPrintingMachineSettingsData(
        mockData.masterDataPrinting.printingDetails
      )
    );
    dispatch(
      setPrintingSubstrate(
        mockData.masterDataPrinting.printingSubstrateSettings
      )
    );
    dispatch(
      setPrintingInkStationData(mockData.masterDataPrinting.stationWiseMetrics)
    );
    dispatch(setDyeCuttingSettings(mockData.masterDataDyeCutting));
    dispatch(
      setLaminationSettings(mockData.masterDataLamination.laminationConditions)
    );
    dispatch(
      setLaminatingSubstrate(mockData.masterDataLamination.laminationSubstrate)
    );
    dispatch(
      setLaminationAdhesiveDetails(
        mockData.masterDataLamination.bondingMaterials
      )
    );
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: selectedTab !== 3 ? "calc(100vh - 74px)" : "auto", // or 100% if wrapped by a parent with set height
        width: "100%",
      }}
    >
      {/* Fixed Tabs */}
      <Box
        sx={{
          position: "sticky",
          top: {
            xs: "96.5px", // for small screens and below
            sm: "52.5px",
            md: "50.9px", // for medium screens and up
          },
          zIndex: 100,
          backgroundColor: "white",
        }}
      >
        <TabsComponent
          tabs={tabs}
          value={selectedTab}
          onChange={handleTabChange}
        />
      </Box>

      {/* Scrollable content */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          backgroundColor: "white",
          padding: 2,
          borderBottomLeftRadius: "10px",
          borderBottomRightRadius: "10px",
        }}
      >
        {selectedTab === 0 && (
          <MasterDataDetails formData={formData} setFormData={setFormData} />
        )}
        {selectedTab === 1 && (
          <Printing
            tableData={tableData}
            setTableData={setTableData}
            formValues={formValues}
            setFormValues={setFormValues}
          />
        )}
        {selectedTab === 2 && (
          <Lamination
            tableData={LaminationTableData}
            setTableData={setLaminationTableData}
            formData={lamiFormData}
            setFormData={setLamiFormData}
          />
        )}
        {selectedTab === 3 && (
          <DyeCutting
            formData={dyeFormData}
            setFormData={setDyeFormData}
            errors={errors}
            setErrors={setErrors}
          />
        )}
      </Box>
      <Box
        sx={{
          flexShrink: 0,
          backgroundColor: "white",
          padding: 1,
          borderTop: "1px solid #e0e0e0",
          boxShadow: "0px -2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <MasterDataFooter
            selectedTab={selectedTab}
            handleSave={
              selectedTab == 0
                ? handleSaveMasterData
                : selectedTab == 1
                ? handleSavePrinting
                : selectedTab == 2
                ? handleSaveLamination
                : handleSaveDyeCutting
            }
          />
        </Stack>
      </Box>
    </Box>
  );
};

export default CreateMasterData;
