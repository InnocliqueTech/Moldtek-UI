import React, { useEffect, useRef, useState } from "react";
import { Box, Stack } from "@mui/material";
import TabsComponent from "../../Components/ReUsable/Tabs";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/index";
import {
  setSelectedTab,
  setSaveFormData,
  setIsMasterDetailsDataSave,
  setIsPrintingDataSave,
  setSavePrintingFormData,
  setIsLaminatingDataSave,
  setLaminationFormData,
  setRequestPayload,
  setPrintingTab,
  setLaminationTab,
  setIsMasterDetailsData,
  setIsPrintingData,
  setIsLaminatingData,
  setSaveButtonMasterData,
} from "../../store/slices/masterDataSlice";
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
import MasterDataDetails from "./MasterDataDetails";
import DyeCutting from "./DyeCutting";
import Printing from "./Printing";
import Lamination from "./Lamination";
import MasterDataFooter from "../../Components/ReUsable/MasterDataFooter";
import { toast } from "react-toastify";
import { useViewMasterDataQuery } from "../../store/services/api";
import Loader from "../../Loader";
import { useParams } from "react-router-dom";
import { DyeCuttingFormData, LaminatingTableRow, LaminationFormData, MasterFormData, PrintingFormValues, PrintingTableRow } from "../../store/slices/masterDataInterface";

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
    saveMasterDataDetailsData,
    saveButtonMasterData,
    saveButtonPrintingData,
    saveButtonLaminatingData,
    saveLaminatingData,
    savePrintingData,
    customerLogoFile
  } = useSelector((state: RootState) => state.masterData);
  const {
viewMasterDataDetails
  } = useSelector((state: RootState) => state.viewMasterData);

  const [formData, setFormData] = useState<MasterFormData>({
    job_master_id: 0,
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
    segment: "",
  });

  const [tableData, setTableData] = useState<PrintingTableRow[]>([]);
  const [formValues, setFormValues] = useState<PrintingFormValues>({
    printingDetails: {
      machine_settings_id: 0,
      job_master_id: 0,
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
      station_id: 0,
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
      lamination_id: 0,
      job_master_id: 0,
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
      substrate_id: 0,
      lamination_id: 0,
      substrate_type: "",
      supplier: "",
      dyne_level: "",
      width: "",
      thickness: "",
      density: "",
    },
    bondingMaterials: [
      {
        bonding_id: 0,
        lamination_id: 0,
        type: "Adhesive",
        code: "",
        brand: "",
        ratio: "",
      },
      {
        bonding_id: 0,
        lamination_id: 0,
        type: "Hardner",
        code: "",
        brand: "",
        ratio: "",
      },
      {
        bonding_id: 0,
        lamination_id: 0,
        type: "Ethyl",
        code: "",
        brand: "",
        ratio: "",
      },
    ],
  });

  const [dyeFormData, setDyeFormData] = useState<DyeCuttingFormData>({
    dye_cutting_id: 0,
    job_master_id: 0,
    machine_type: "",
    machine_name: "",
    dye_code: "",
    run_speed: "",
  });

  const handleSaveMasterData = () => {
    dispatch(setSaveFormData(formData));
    dispatch(setIsMasterDetailsDataSave(true));
    if (id) {
      dispatch(setIsMasterDetailsData(true));
      dispatch(setSaveButtonMasterData(true));
    } else {
      dispatch(setIsMasterDetailsData(false));
      dispatch(setSaveButtonMasterData(false));
    }
    toast.success(
      id
        ? "Your data has been temporarily saved. Please click 'Update And Pubish' at the end to save permanently."
        : "Your data has been temporarily saved. Please click 'Submit And Pubish' at the end to save permanently."
    );
  };

  const handleSavePrinting = () => {
    const finalSaveData = { ...formValues, stationWiseMetrics: tableData };
    dispatch(setSavePrintingFormData(finalSaveData));
    dispatch(setIsPrintingDataSave(true));
    if (id) {
      dispatch(setIsPrintingData(true));
    } else {
      dispatch(setIsPrintingData(false));
    }
    toast.success(
      id
        ? "Your data has been temporarily saved. Please click 'Update And Pubish' at the end to save permanently."
        : "Your data has been temporarily saved. Please click 'Submit And Pubish' at the end to save permanently."
    );
  };

  const handleSaveLamination = () => {
    const finalSaveData = {
      ...lamiFormData,
      bondingMaterials: LaminationTableData,
    };
    dispatch(setLaminationFormData(finalSaveData));
    dispatch(setIsLaminatingDataSave(true));
    if (id) {
      dispatch(setIsLaminatingData(true));
    } else {
      dispatch(setIsLaminatingData(false));
    }
    toast.success(
      id
        ? "Your data has been temporarily saved. Please click 'Update And Pubish' at the end to save permanently."
        : "Your data has been temporarily saved. Please click 'Submit And Pubish' at the end to save permanently."
    );
  };

  const handleSaveDyeCutting = () => {
    const finalMasterDataDetails =
      data?.data.masterDataDetails && !masterDataDataTouched
        ? data?.data.masterDataDetails
        : !id && saveButtonMasterData
        ? saveMasterDataDetailsData
        : saveFormData;
    const finalPrintingData =
      data?.data.masterDataPrinting && !printingDataTouched
        ? data?.data.masterDataPrinting
        : !id && saveButtonPrintingData
        ? savePrintingData
        : printingSaveFormData;
    const finalLaminationData =
      data?.data.masterDataLamination && !laminationDataTouched
        ? data?.data.masterDataLamination
        : !id && saveButtonLaminatingData
        ? saveLaminatingData
        : laminaionFormData;
    const finalDyeCuttingData =
      data?.data.masterDataDyeCutting && !dyeCuttingDataTouched
        ? data?.data.masterDataDyeCutting
        : dyeCuttingFormData;
    const skipLamination =
      finalMasterDataDetails.label_type === "Thin Wall" ||
      finalMasterDataDetails.segment === "TW";

    let masterDataLamination;
    if (skipLamination) {
      masterDataLamination = {
        laminationConditions: {
          lamination_id: 0,
          job_master_id: 0,
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
          substrate_id: 0,
          lamination_id: 0,
          substrate_type: "",
          supplier: "",
          dyne_level: "",
          width: "",
          thickness: "",
          density: "",
        },
        bondingMaterials: [
          {
            bonding_id: 0,
            lamination_id: 0,
            type: "Adhesive",
            code: "",
            brand: "",
            ratio: "",
          },
          {
            bonding_id: 0,
            lamination_id: 0,
            type: "Hardner",
            code: "",
            brand: "",
            ratio: "",
          },
          {
            bonding_id: 0,
            lamination_id: 0,
            type: "Ethyl",
            code: "",
            brand: "",
            ratio: "",
          },
        ],
      };
    } else {
      masterDataLamination = {
        ...finalLaminationData,
        laminationConditions: {
          ...finalLaminationData.laminationConditions,
          zone1_temp: Number(
            finalLaminationData.laminationConditions.zone1_temp
          ),
          zone2_temp: Number(
            finalLaminationData.laminationConditions.zone2_temp
          ),
          nip_pressure_bar: Number(
            finalLaminationData.laminationConditions.nip_pressure_bar
          ),
          speed: Number(finalLaminationData.laminationConditions.speed),
          lami_set_tension: Number(
            finalLaminationData.laminationConditions.lami_set_tension
          ),
          rewinder_tension: Number(
            finalLaminationData.laminationConditions.rewinder_tension
          ),
          printed_film_tension: Number(
            finalLaminationData.laminationConditions.printed_film_tension
          ),
          laminate_film_tension: Number(
            finalLaminationData.laminationConditions.laminate_film_tension
          ),
          adhesive_gsm: Number(
            finalLaminationData.laminationConditions.adhesive_gsm
          ),
        },
        laminationSubstrate: {
          ...finalLaminationData.laminationSubstrate,
          dyne_level: Number(
            finalLaminationData.laminationSubstrate.dyne_level
          ),
          thickness: String(finalLaminationData.laminationSubstrate.thickness),
          width: Number(finalLaminationData.laminationSubstrate.width),
          density: Number(finalLaminationData.laminationSubstrate.density),
        },
      };
    }
    const convertedMasterDataPrinting = {
      ...finalPrintingData,
      printingDetails: {
        ...finalPrintingData.printingDetails,
        cylinder_teeth: String(finalPrintingData.printingDetails.cylinder_teeth),
        tension: Number(finalPrintingData.printingDetails.tension),
        infeed: Number(finalPrintingData.printingDetails.infeed),
        outfeed: Number(finalPrintingData.printingDetails.outfeed),
        rewinder: String(finalPrintingData.printingDetails.rewinder),
        unwinder: Number(finalPrintingData.printingDetails.unwinder),
      },
      printingSubstrateSettings: {
        ...finalPrintingData.printingSubstrateSettings,
        dyne_level: Number(finalPrintingData.printingSubstrateSettings.dyne_level),
        thickness: String(finalPrintingData.printingSubstrateSettings.thickness),
        width: Number(finalPrintingData.printingSubstrateSettings.width),
        density: Number(finalPrintingData.printingSubstrateSettings.density),
      },
      stationWiseMetrics: finalPrintingData.stationWiseMetrics.map((station:any) => ({
        ...station,
        volume: Number(station.volume) || "",
        uv_led_intensity: Number(station.uv_led_intensity) || "",
        lf_value: Number(station.lf_value) || "",
      })),
    };
    
const masterDataDetails = {...finalMasterDataDetails,unit_effectivity_number:Number(finalMasterDataDetails.unit_effectivity_number),customer_logo:customerLogoFile?.name}
    const updatedPayload = {
      ...requestPayload,
       masterDataDetails,
      masterDataPrinting: convertedMasterDataPrinting,
      masterDataLamination,
      masterDataDyeCutting: finalDyeCuttingData,
    };

    dispatch(setRequestPayload(updatedPayload));
  };

  const UEN = localStorage.getItem("selectedUEN");
  const version = localStorage.getItem("selectedVersionNo");
  const { id } = useParams();
  const { data, isLoading } = useViewMasterDataQuery(
    { ueNumber: UEN || "", versionNo: version || "" },
    { skip: !id }
  );

  const tabs = [
    "Master Data Details",
    "Master Data - Printing",
    ...((saveFormData.label_type === "Thin Wall" || saveFormData.segment === "TW") ||(id &&viewMasterDataDetails.label_type === "Thin Wall" || viewMasterDataDetails.segment === "TW")
      ? []
      : ["Master Data - Lamination"]),
    "Master Data - Dye Cutting",
  ];


  const contentRef = useRef<HTMLDivElement>(null);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    if (newValue === 1) {
      dispatch(setPrintingTab(true));
    } else if (newValue === 2) {
      dispatch(setLaminationTab(true));
    }
    dispatch(setSelectedTab(newValue));
  
    // Reset the scroll position to top
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  };
  

  useEffect(() => {
    if (id && data) {
      dispatch(
        setRequestPayload({
          ...requestPayload,
          masterDataLamination: !laminationDataTouched
            ? data?.data.masterDataLamination
            : laminaionFormData,
          masterDataDyeCutting: !dyeCuttingDataTouched
            ? data?.data.masterDataDyeCutting
            : dyeCuttingFormData,
          masterDataDetails: !masterDataDataTouched
            ? data?.data.masterDataDetails
            : saveFormData,
          masterDataPrinting: !printingDataTouched
            ? data?.data.masterDataPrinting
            : printingSaveFormData,
        })
      );
    }
  }, [
    id,
    data,
    laminationDataTouched,
    dyeCuttingDataTouched,
    masterDataDataTouched,
    printingDataTouched,
  ]);

  useEffect(() => {
    if (id && data) {
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
        setPrintingInkStationData(
          data?.data.masterDataPrinting.stationWiseMetrics
        )
      );
      dispatch(setDyeCuttingSettings(data?.data.masterDataDyeCutting));
      dispatch(
        setLaminationSettings(
          data?.data.masterDataLamination.laminationConditions
        )
      );
      dispatch(
        setLaminatingSubstrate(
          data?.data.masterDataLamination.laminationSubstrate
        )
      );
      dispatch(
        setLaminationAdhesiveDetails(
          data?.data.masterDataLamination.bondingMaterials
        )
      );
    }
  }, [id, data, dispatch]);

  return (
    <Box 
      sx={{
        display: "flex",
        flexDirection: "column",
        height: selectedTab !== 3 ? "calc(100vh - 74px)" : "auto",
        width: "100%",
      }}
    >
      {id && isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Loader />
        </Box>
      ) : (
        <>
          <Box 
            sx={{
              position: "sticky",
              top: { xs: "96.5px", sm: "52.5px", md: "50.9px" },
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

          <Box  ref={contentRef}
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
              <MasterDataDetails
                formData={formData}
                setFormData={setFormData}
              />
            )}
            {selectedTab === 1 && (
              <Printing
                tableData={tableData}
                setTableData={setTableData}
                formValues={formValues}
                setFormValues={setFormValues}
              />
            )}
            {selectedTab === 2 &&
              !(saveFormData.label_type === "Thin Wall" || saveFormData.segment === "TW" ||
                (id && viewMasterDataDetails.label_type === "Thin Wall" || viewMasterDataDetails.segment === "TW"  )) ? (
                <Lamination
                  tableData={LaminationTableData}
                  setTableData={setLaminationTableData}
                  formData={lamiFormData}
                  setFormData={setLamiFormData}
                />
              ):selectedTab !== 0  && selectedTab !== 1&& <DyeCutting formData={dyeFormData} setFormData={setDyeFormData} />}

            {/* {selectedTab === 3 && (
              <DyeCutting formData={dyeFormData} setFormData={setDyeFormData} />
            )} */}
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
                  selectedTab === 0
                    ? handleSaveMasterData
                    : selectedTab === 1
                    ? handleSavePrinting
                    : selectedTab === 2 &&               !(saveFormData.label_type === "Thin Wall" || saveFormData.segment === "TW" ||
                      (id && viewMasterDataDetails.label_type === "Thin Wall" || viewMasterDataDetails.segment === "TW"  ))
                    ? handleSaveLamination
                    : handleSaveDyeCutting
                }
              />
            </Stack>
          </Box>
        </>
      )}
    </Box>
  );
};

export default CreateMasterData;
