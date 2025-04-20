import React, { useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import TabsComponent from "../../Components/ReUsable/Tabs";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/index";
import {
  setSelectedTab,
  setSaveFormData,
  setIsMasterDetailsDataSave
} from "../../store/slices/masterDataSlice";
import MasterDataDetails from "./MasterDataDetails";
import DyeCutting from "./DyeCutting";
import Printing from "./Printing";
import Lamination from "./Lamination";
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
  setRequestPayload,
} from "./../../store/slices/masterDataSlice";
import { toast } from "react-toastify";
import { useViewMasterDataQuery } from "../../store/services/api";
import Loader from "../../Loader";
import {  useParams } from "react-router-dom";

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
    laminationDataTouched,
    printingDataTouched,
    dyeCuttingDataTouched,
    masterDataDataTouched,
    printingDetails,laminatingDetails,dyeCuttingDetails
  } = useSelector((state: RootState) => state.masterData);
  const {viewMasterDataDetails} = useSelector((state: RootState) => state.viewMasterData);
  const [formData, setFormData] = useState<MasterFormData>(
    {
      job_master_id:0,
    unit_effectivity_number: "",
    customer_name: "",
    customer_logo: "",
    jar_cap: "",
    item_code: "",
    structure: "",
    brand_description: "",
    label_type: "",
    repeat_length: "",
    ups: "",
    tracks: "",
  });

  const [tableData, setTableData] = useState<PrintingTableRow[]>([]);
  const [formValues, setFormValues] = useState<PrintingFormValues>({
    printingDetails: {
      machine_settings_id:0, job_master_id:0,
      printing_machine_name: "",
      cylinder_teeth: "",
      tension: "",
      unwinder: "",
      infeed: "",
      outfeed: "",
      rewinder: "",
      static_charge: "",
      format_correct: "",
    },
    printingSubstrateSettings: {
      print_substrate_id: 0,
      machine_settings_id: 0,
      substrate_type: "",
      supplier: "",
      dyne_level: "",
      width: "",
      thickness: "",
      density: "",
    },
    stationWiseMetrics: Array.from({ length: 10 }, (_, i) => ({
      station_id:0,
      station_no: i + 1,
      color_pantone: "",
      lf_value: "",
      ink_supplier: "",
      lpcm: "",
      volume: "",
      uv_led: "",
      uv_led_intensity: "",
      mounting_tape: "",
      mptl_code: "",
      mixing_on_gec: "",
    })),
  });

  const [LaminationTableData, setLaminationTableData] = useState<
    LaminatingTableRow[]
  >([]);
  const [lamiFormData, setLamiFormData] = useState<LaminationFormData>({
    laminationConditions: {
      lamination_id:0, job_master_id:0,
      zone1_temp: "",
      zone2_temp: "",
      nip_pressure_bar: "",
      speed: "",
      lami_set_tension: "",
      rewinder_tension: "",
      printed_film_tension: "",
      laminate_film_tension: "",
      viscosity_range: "",
      adhesive_gsm: "",
    },
    laminationSubstrate: {
      substrate_id:0, lamination_id:0,
      substrate_type: "",
      supplier: "",
      dyne_level: "",
      width: "",
      thickness: "",
      density: "",
    },
    bondingMaterials: [
      {
        bonding_id:0, lamination_id:0,
        type: "Adhesive",
        code: "",
        brand: "",
        ratio: "",
      },
      {
        bonding_id:0, lamination_id:0,
        type: "Hardener",
        code: "",
        brand: "",
        ratio: "",
      },
      {
        bonding_id:0, lamination_id:0,
        type: "Ethyl Acetate",
        code: "",
        brand: "",
        ratio: "",
      },
    ],
  });

  const [dyeFormData, setDyeFormData] = useState<DyeCuttingFormData>({
    dye_cutting_id:0, job_master_id:0,
    machine_type: "",
    machine_name: "",
    dye_code: "",
    run_speed: "",
  });



  const handleSaveMasterData = () => {
    dispatch(setSaveFormData(formData));
    dispatch(setIsMasterDetailsDataSave(true));
    toast.success("Your data has been temporarily saved. Please click 'Submit And Pubish' at the end to save permanently.");
  };

  const handleSavePrinting = () => {
    const finalSaveData = {
      ...formValues,
      stationWiseMetrics: tableData,
    };
    dispatch(setSavePrintingFormData(finalSaveData));
    dispatch(setIsPrintingDataSave(true));
    toast.success("Your data has been temporarily saved. Please click 'Submit And Pubish' at the end to save permanently.");
  };

  const handleSaveLamination = () => {
    const finalSaveData = {
      ...lamiFormData,
      bondingMaterials: LaminationTableData,
    };
    dispatch(setLaminationFormData(finalSaveData));
    dispatch(setIsLaminatingDataSave(true));
    toast.success("Your data has been temporarily saved. Please click 'Submit And Pubish' at the end to save permanently.");
  };
  const UEN = localStorage.getItem("selectedUEN");
  let selectedUEN: any;
  if (UEN) {
    selectedUEN = UEN;
  }
  const version = localStorage.getItem("selectedVersionNo");
  let versionNo: any;
  if (version) {
    versionNo = version;
  }

const {id} = useParams();
  const { data, isLoading } = useViewMasterDataQuery(
    {
      ueNumber: selectedUEN,
      versionNo: versionNo,
    },
    { skip: !id } 
  );
  
  const handleSaveDyeCutting = () => {
    const finalMasterDataDetails =(data?.data.masterDataDetails&&!masterDataDataTouched) ? data?.data.masterDataDetails : (data?.data.masterDataDetails&&masterDataDataTouched&&id)? viewMasterDataDetails:saveFormData;
    const finalPrintingData =  (data?.data.masterDataPrinting&&!printingDataTouched) ?  data?.data.masterDataPrinting: (data?.data.masterDataPrinting&&printingDataTouched&&id)?printingDetails:printingSaveFormData
    const finalLaminationData = (data?.data.masterDataLamination&&!laminationDataTouched)? data?.data.masterDataLamination :(data?.data.masterDataLamination&&laminationDataTouched&&id)?laminatingDetails:laminaionFormData
    const finalDyeCuttingData = (data?.data.masterDataDyeCutting&&!dyeCuttingDataTouched) ? data?.data.masterDataDyeCutting : (data?.data.masterDataDyeCutting&&dyeCuttingDataTouched&&id)?dyeCuttingDetails:dyeCuttingFormData;
    const updatedPayload = {
      ...requestPayload,
      masterDataDetails: finalMasterDataDetails,
      masterDataPrinting: finalPrintingData,
      masterDataLamination: finalLaminationData,
      masterDataDyeCutting: finalDyeCuttingData,
    };
  
    dispatch(setRequestPayload(updatedPayload));
    console.log(requestPayload,data,"REQUESTPAYLOAD")
  };
  

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    dispatch(setSelectedTab(newValue));
  };





  useEffect(() => {
    if (id && data) {
      dispatch(setRequestPayload({
        ...requestPayload,
        masterDataLamination: !laminationDataTouched ? data?.data.masterDataLamination :laminaionFormData,
        masterDataDyeCutting: !dyeCuttingDataTouched ? data?.data.masterDataDyeCutting : dyeCuttingFormData,
        masterDataDetails: !masterDataDataTouched ? data?.data.masterDataDetails : saveFormData,
        masterDataPrinting: !printingDataTouched ? data?.data.masterDataPrinting: printingSaveFormData,
      }));
    }
  }, [id, data, laminationDataTouched, dyeCuttingDataTouched, masterDataDataTouched, printingDataTouched]);
  
  useEffect(() => {
    if(id){
    dispatch(setViewMasterDataDetails(data?.data.masterDataDetails));
    dispatch(
      setPrintingMachineSettingsData(
        data?.data.masterDataPrinting.printingDetails
      )
    );
    dispatch(
      setPrintingSubstrate(
        data?.data.masterDataPrinting.printingSubstrateSettings
      )
    );
    dispatch(
      setPrintingInkStationData(data?.data.masterDataPrinting.stationWiseMetrics)
    );
    dispatch(setDyeCuttingSettings(data?.data.masterDataDyeCutting));
    dispatch(
      setLaminationSettings(data?.data.masterDataLamination.laminationConditions)
    );
    dispatch(
      setLaminatingSubstrate(data?.data.masterDataLamination.laminationSubstrate)
    );
    dispatch(
      setLaminationAdhesiveDetails(
        data?.data.masterDataLamination.bondingMaterials
      )
    );
  }
  }, [id]);



  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: selectedTab !== 3 ? "calc(100vh - 74px)" : "auto", // or 100% if wrapped by a parent with set height
        width: "100%",
      }}
    >
{id && isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <Loader />
        </Box>
      ) : (
        <>
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
      </>)}
    </Box>
  );
};

export default CreateMasterData;
