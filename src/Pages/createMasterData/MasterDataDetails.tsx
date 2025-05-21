import {
  Box,
  Grid,
  IconButton,
  Modal,
  Tooltip,
  Typography,
} from "@mui/material";
import ReusableInput from "../../Components/ReUsable/TextField";
import DropdownComponent from "../../Components/ReUsable/Dropdown";
import TextArea from "../../Components/ReUsable/TextArea";
import { Close, Delete, Edit, Visibility } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useEffect, useMemo, useState } from "react";
import { SelectChangeEvent } from "@mui/material";
import {
  setCustomerLogoFile,
  setDyeCuttingDetails,
  setLaminatingDetails,
  setMasterDataDataTouched,
  setMasterDataDetailsSave,
  setMasterDataFormErros,
  setPrintingDetails,
  setSaveFormData,
  setSaveMasterDataDetailsData,
  setStructureDropDownValues,
  setSubmitAndPublishButtonMasterData,
} from "../../store/slices/masterDataSlice";
import { useLocation, useParams } from "react-router-dom";
import {
  useGetLabelTypesQuery,
  useSegmentsDropdownMutation,
  useStructureDropdownMutation,
  useUploadCustomerFileMutation,
  useViewMasterDataQuery,
} from "../../store/services/api";
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
import { MasterDataFormErrors, MasterFormData } from "../../store/slices/masterDataInterface";
import DropdownTextComponent from "../../Components/ReUsable/DropdownText";

interface MasterDataProps {
  formData: MasterFormData;
  setFormData: React.Dispatch<React.SetStateAction<MasterFormData>>;
}

const MasterDataDetails: React.FC<MasterDataProps> = ({
  formData,
  setFormData,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { saveFormData, masterDataFormErrors,updateButton, masterDataDataTouched,saveMasterDataDetailsData,saveButtonMasterData,dropDownValuesStructure } =
  useSelector((state: RootState) => state.masterData);
  const { id } = useParams();
  const location = useLocation();
  
  const UEN = localStorage.getItem(!updateButton?"selectedUEN":"actionSelectedUEN");
  let selectedUEN: any;
  if (UEN) {
    selectedUEN = UEN;
  }
  const version = localStorage.getItem(!updateButton?"selectedVersionNo":"actionVersionNo");
  let versionNo: any;
  if (version) {
    versionNo = version;
  }

  const { data } = useViewMasterDataQuery(
    {
      ueNumber: selectedUEN,
      versionNo: versionNo,
    },
    {
      skip: !id,
      refetchOnMountOrArgChange: true,
    }
  );



  const isUpdatePage = useMemo(
    () => location.pathname.includes("/updateMasterData"),
    [location.pathname]
  );


  const masterData = useMemo(() => data?.data ?? null, [data]);

  useEffect(() => {
    if (
      id &&
      isUpdatePage &&
      !masterDataDataTouched &&
      masterData
    ) {
      dispatch(setViewMasterDataDetails(masterData.masterDataDetails));
      dispatch(setPrintingDetails(masterData.masterDataPrinting));
      dispatch(setLaminatingDetails(masterData.masterDataLamination));
      dispatch(setDyeCuttingDetails(masterData.masterDataDyeCutting));

      dispatch(
        setPrintingMachineSettingsData(
          masterData.masterDataPrinting.printingDetails
        )
      );
      dispatch(
        setPrintingSubstrate(
          masterData.masterDataPrinting.printingSubstrateSettings
        )
      );
      dispatch(
        setPrintingInkStationData(
          masterData.masterDataPrinting.stationWiseMetrics
        )
      );

      dispatch(setDyeCuttingSettings(masterData.masterDataDyeCutting));
      dispatch(
        setLaminationSettings(
          masterData.masterDataLamination.laminationConditions
        )
      );
      dispatch(
        setLaminatingSubstrate(
          masterData.masterDataLamination.laminationSubstrate
        )
      );
      dispatch(
        setLaminationAdhesiveDetails(
          masterData.masterDataLamination.bondingMaterials
        )
      );

      setFormData(masterData.masterDataDetails);
    }
  }, [
    id,
    isUpdatePage,
    masterDataDataTouched,
    masterData,
    dispatch,
  ]);
  const { viewMasterDataDetails } = useSelector(
    (state: RootState) => state.viewMasterData
  );
  const [segmentsDropdown,{data:segmentData}] = useSegmentsDropdownMutation();

  useEffect(()=>{
segmentsDropdown({
  segment: ""
})
  },[])
  const segmentNames = segmentData?.statusCode === 200 ? segmentData?.data?.map((item: any) => item.segment) : [];
  const [structureDropdown] = useStructureDropdownMutation();


  
    useEffect(() => {
      const fetchDropdownValues = async () => {
        const response = await structureDropdown({
          structure: ""
    }).unwrap();
        const structureList = response?.data?.map((item: any) => item.structure);
        dispatch(setStructureDropDownValues(structureList));
      };
  
      fetchDropdownValues();
    }, [structureDropdown, dispatch]);



  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [formInitialized, setFormInitialized] = useState(false); 

  const [errors, setErrors] = useState<MasterDataFormErrors>({
    job_master_id: "",
    repeat_length: "",
    ups: "",
    tracks: "",
    unit_effectivity_number: "",
    customer_name: "",
    customer_logo: "",
    jar_cap: "",
    item_code: "",
    structure: "",
    brand_description: "",
    label_type: "",
    segment:"",
  });

  const numericFields: (keyof MasterFormData)[] = [
    "repeat_length",
    "ups",
    "unit_effectivity_number",
    "tracks"
  ];
  
  const importantFields: (keyof MasterFormData)[] = [
    "unit_effectivity_number",
    "customer_name",
    "brand_description",
    "label_type",
    "jar_cap",
    "repeat_length",
    "ups",
  ];
  const characterFields: (keyof MasterFormData)[] = ["customer_name"];
  const freeTextFields: (keyof MasterFormData)[] = [
    "brand_description",
    "item_code",
  ];

  const handleChange = (
    field: keyof MasterFormData,
    value: string | string[] | SelectChangeEvent<string | string[]>
  ) => {
    if (id) {
      dispatch(setMasterDataDataTouched(true));
    }

    let newValue: string | string[] =
      Array.isArray(value) ? value : typeof value === "string" ? value : value.target.value;
    
    // Convert to string if it's an array (especially for 'structure' field)
    if (field === "structure") {
      if (Array.isArray(newValue)) {
        // Remove empty strings, trim, then join if needed
        newValue = newValue.filter(Boolean).map(v => v.trim()).join(" ");
      } else {
        newValue = newValue.trim();
      }
    }
    
    let finalValue: string | number = newValue as string;
    let errorMessage = "";
    
    const trimmed = (newValue as string).trim();
    
    const isImportant = importantFields.includes(field);
  
    if (numericFields.includes(field)) {
      const numericValue = trimmed.replace('%', ''); // Remove percentage sign if it exists
    
      // Handle empty fields with `isImportant`
      if (isImportant && trimmed === "") {
        errorMessage = "This field cannot be empty.";
      } 
      // Ensure the value is a valid number or percentage, including `0` and decimals
      else if (trimmed !== "" && isNaN(Number(numericValue))) {
        errorMessage = "Please enter a valid number.";
      } else {
        // If the field is empty, set finalValue to an empty string
        finalValue = trimmed === ""
          ? ""
          : trimmed.includes('%') // If there's a '%' sign, keep it as percentage
          ? `${parseFloat(numericValue)}%` // Keep the percentage as string (e.g., "12%")
          : Number(numericValue); // Otherwise, keep it as a number (e.g., "12" becomes 12)
      }
    }
     else if (characterFields.includes(field)) {
      const onlyLettersRegex = /^[A-Za-z\s]+$/;
      if (isImportant && trimmed === "") {
        errorMessage = "This field cannot be empty.";
      } else if (trimmed !== "" && !onlyLettersRegex.test(trimmed)) {
        errorMessage = "Only letters and spaces are allowed.";
      }
    } else if (freeTextFields.includes(field)) {
      if (isImportant && trimmed === "") {
        errorMessage = "This field cannot be empty.";
      }
    } else if (field === "label_type" || field === "jar_cap" || field === "structure") {
      finalValue = Array.isArray(newValue) ? newValue[0] : newValue;
    }
  
    const updatedErrors = {
      ...errors,
      [field]: errorMessage,
    };
  
    const updatedFormData = {
      ...formData,
      [field]: finalValue,
    };
  
    setFormData(updatedFormData);
    dispatch(setSaveFormData(updatedFormData));
    dispatch(setMasterDataFormErros(updatedErrors));
    if(!id){
      dispatch(setSaveMasterDataDetailsData(updatedFormData));
    }
  };
  

const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  dispatch(setMasterDataDataTouched(true));
  const file = e.target.files?.[0];

  if (!file) return;

  // Validate image type
  const validImageTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
  if (!validImageTypes.includes(file.type)) {
    alert("Only image files (JPEG, PNG, WEBP) are allowed.");
    return;
  }
  dispatch(setCustomerLogoFile(file)); 

  const reader = new FileReader();
  reader.onloadend = () => {
    const base64Image = reader.result as string;
    const updatedFormData = {
      ...formData,
      customer_logo: base64Image,
    };

    setFormData(updatedFormData);
    dispatch(setSaveFormData(updatedFormData));
  };

  reader.readAsDataURL(file);
};


  useEffect(() => {
    if (formInitialized) return;
    if (!id && saveFormData && !saveButtonMasterData) {
      setFormData(saveFormData);
      setFormInitialized(true);
    }
    if (masterDataFormErrors) {
      setErrors(masterDataFormErrors);
    }
    if(!id && saveButtonMasterData && saveMasterDataDetailsData ){
      setFormData(saveMasterDataDetailsData)
      setFormInitialized(true);
    }
  }, [ id,
    saveFormData,
    saveButtonMasterData,
    saveMasterDataDetailsData,
    masterDataFormErrors,
    formInitialized]);

  function sanitizeMasterData(data: any): MasterFormData {
    return {
      job_master_id: data?.job_master_id || 0,
      unit_effectivity_number: data?.unit_effectivity_number || "",
      customer_name: data?.customer_name || "",
      customer_logo: data?.customer_logo ?? "",
      jar_cap: data?.jar_cap || "",
      item_code: data?.item_code ?? "",
      structure: data?.structure ?? "",
      brand_description: data?.brand_description || "",
      label_type: data?.label_type || "",
      repeat_length: data?.repeat_length || 0,
      ups: data?.ups || 0,
      tracks: data?.tracks || 0,
      segment:data?.segment || "",
    };
  }

  useEffect(() => {
    if (id && viewMasterDataDetails && !masterDataDataTouched) {
      setFormData(sanitizeMasterData(viewMasterDataDetails));
    }
  }, [id, viewMasterDataDetails]);
  const { data: LabelTyepsData } = useGetLabelTypesQuery();
  const dropdownOptions =
    LabelTyepsData &&
    LabelTyepsData?.map((option: any) => option.labelTypeName);
  useEffect(() => {

    const hasErrors = importantFields.some(
      (field) =>
        errors[field] !== "" ||
        formData[field] === "" ||
        formData[field] === null ||
        formData[field] === undefined
    );

    dispatch(setSubmitAndPublishButtonMasterData(hasErrors));
  }, [formData, errors]);

  useEffect(() => {
    const importantFields: (keyof MasterFormData)[] = [
      "unit_effectivity_number",
      "customer_name",
      "brand_description",
      "label_type",
      "jar_cap",
      "repeat_length",
      "ups",
    ];

    const { job_master_id, ...formDataWithoutJobId } = formData;

    const anyValuePresent = Object.values(formDataWithoutJobId).some(
      (value) => value !== "" && value !== null && value !== undefined
    );


    const anyErrors = importantFields.some((field) => errors[field] !== "");

    const canSubmit = anyValuePresent && !anyErrors;

    dispatch(setMasterDataDetailsSave(!canSubmit));

  }, [formData, errors, dispatch]);

  const handleRemoveImage = () => {

    setFormData((prev) => ({
      ...prev,
      customer_logo: "",
    }));
  };
  const row1HasError =
  !!errors.unit_effectivity_number || !!errors.customer_name;
  const row2HasError = !!errors.item_code  || !!errors.brand_description
  return (
    <Box sx={{ borderRadius: "0px " }}>
      <Box sx={{ border: "1px solid #ECECEC", borderRadius: "16px", p: 2 }}>
        <Typography
          sx={{ color: "#2F2FF", fontWeight: 600, fontSize: "16px" }}
          gutterBottom
        >
          SKU Master Data
        </Typography>

        <Grid container spacing={2} pt={1}>
          <Grid size={{ xs: 12, md: 4 }}>
            <ReusableInput
              label="Unit Effective Number"
              value={formData.unit_effectivity_number}
              onChange={(e) =>
                handleChange("unit_effectivity_number", e.target.value)
              }
              error={!!errors.unit_effectivity_number}
              helperText={errors.unit_effectivity_number}
              disabled={id ? true : false}
              required
            />
            <Box sx={{ minHeight: row1HasError && !errors.unit_effectivity_number ? 8 : 0 }} />
            <Box sx={{ mt: (row1HasError&&!!errors.unit_effectivity_number) ? 0 : 2 }}>
              <DropdownComponent
                label="Type of Label"
                options={dropdownOptions ? dropdownOptions : []}
                value={formData.label_type}
                onChange={(e) => handleChange("label_type", e.target.value)}
                isMultiSelect={false}
                checkbox={false}
                required
              />
            </Box>
            <Box sx={{ mt: 2 }}>
              <DropdownComponent
                label="Jar/Cap"
                options={["JAR", "CAP","JAR&CAP"]}
                value={formData.jar_cap}
                onChange={(e) => handleChange("jar_cap", e.target.value)}
                isMultiSelect={false}
                checkbox={false}
                required
              />
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <ReusableInput
              label="Customer"
              value={formData.customer_name}
              onChange={(e) => handleChange("customer_name", e.target.value)}
              error={!!errors.customer_name}
              helperText={errors.customer_name}
              required
            />
           <Box sx={{ minHeight: row1HasError && !errors.customer_name ? 8 : 0 }} />
           <Box sx={{ mt: (row1HasError&&!!errors.customer_name) ? 0 : 2 }}/>
            <ReusableInput
              label="ITEM Code"
              value={formData.item_code}
              onChange={(e) => handleChange("item_code", e.target.value)}
              error={!!errors.item_code}
              helperText={errors.item_code}
            />
            <Box sx={{ minHeight: row2HasError && !errors.item_code ? 8 : 0 }} />
            <Box sx={{ mt: (row2HasError&&!!errors.item_code) ? 0 : 2 }}>
              <DropdownTextComponent
                label="Structure"
                options={dropDownValuesStructure}
                value={formData.structure}
                onChange={(e) => handleChange("structure", e.target.value)}
                isMultiSelect={false}
                checkbox={false}
                allowNewOption
                dropdown='structure'
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

              <Box display="flex" alignItems="center" gap={2} mt={0.4}>
                {formData.customer_logo ? (
                  <>
                    {/* Uploaded Image Preview */}
                    <Box
                      component="img"
                      src={formData.customer_logo}
                      alt="Uploaded"
                      sx={{
                        width: 150,
                        height: 35,
                        borderRadius: "8px",
                        objectFit: "cover",
                        flexShrink: 0,
                      }}
                    />

                    {/* Action Icons */}
                    <Box display="flex" gap={1} alignItems="center">
                      {/* Eye Icon */}
                      <Tooltip title="View">
                        <IconButton
                          onClick={() => setIsPreviewOpen(true)}
                          color="primary"
                        >
                          <Visibility />
                        </IconButton>
                      </Tooltip>

                      {/* Edit Icon (re-upload) */}
                      <label htmlFor="reupload-image">
                        <input
                          accept="image/*"
                          type="file"
                          id="reupload-image"
                          style={{ display: "none" }}
                          onChange={handleImageUpload}
                        />
                        <Tooltip title="Edit">
                          <IconButton component="span" color="warning">
                            <Edit />
                          </IconButton>
                        </Tooltip>
                      </label>

                      {/* Delete Icon */}
                      <Tooltip title="Delete">
                        <IconButton onClick={handleRemoveImage} color="error">
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </Box>

                    {/* Image Preview Modal */}
                    <Modal
                      open={isPreviewOpen}
                      onClose={() => setIsPreviewOpen(false)}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Box
                        sx={{
                          bgcolor: "background.paper",
                          borderRadius: 2,
                          boxShadow: 24,
                          p: 2,
                          outline: "none",
                          maxWidth: "90%",
                          maxHeight: "90%",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        {/* Modal Header */}
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                          width="100%"
                          mb={2}
                        >
                          <Typography variant="h6" component="h2">
                            Preview of Image
                          </Typography>
                          <IconButton onClick={() => setIsPreviewOpen(false)}>
                            <Close />
                          </IconButton>
                        </Box>

                        {/* Image Preview */}
                        <Box
                          component="img"
                          src={formData.customer_logo}
                          alt="Full Image"
                          sx={{
                            maxWidth: "100%",
                            maxHeight: "75vh",
                            borderRadius: "8px",
                            objectFit: "contain",
                          }}
                        />
                      </Box>
                    </Modal>

                  </>
                ) : (
                  // Upload button when no image
                  <label htmlFor="upload-image">
                    <Box
                      component="span"
                      sx={{
                        background: "#1976d2",
                        color: "#fff",
                        px: 2,
                        py: 0.7,
                        borderRadius: "6px",
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 150,
                        height: 35,
                        textAlign: "center",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Upload Image
                    </Box>
                    <input
                      accept="image/*"
                      type="file"
                      id="upload-image"
                      style={{ display: "none" }}
                      onChange={handleImageUpload}
                    />
                  </label>
                )}
              </Box>
            </Box>
            <Box sx={{ minHeight: row1HasError && !errors.customer_name ? 8 : 0 }} />

            <Box sx={{ mt: 2 }}>
              <TextArea
                label="Brand Name & Pack-Description"
                value={formData.brand_description}
                onChange={(e) =>
                  handleChange("brand_description", e.target.value)
                }
                placeholder="Enter your text..."
                rows={0}
                error={!!errors.brand_description}
                helperText={errors.brand_description}
                required
                multiline={false}
              />
            </Box>
            <Box sx={{ mt: (row2HasError&&!!errors.brand_description) ? 0 : 2 }}>
              <DropdownComponent
                label="Segment"
                options={segmentNames}
                value={formData.segment}
                onChange={(e) => handleChange("segment", e.target.value)}
                isMultiSelect={false}
                checkbox={false}
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
          Repeat & Label Metrics
        </Typography>
        <Grid container spacing={2} pt={1}>
          <Grid size={{ xs: 12, md: 3 }}>
            <ReusableInput
              label="Repeat"
              value={formData.repeat_length}
              onChange={(e) => handleChange("repeat_length", e.target.value)}
              error={!!errors.repeat_length}
              helperText={errors.repeat_length}
              required
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <ReusableInput
              label="UPs"
              value={formData.ups}
              onChange={(e) => handleChange("ups", e.target.value)}
              error={!!errors.ups}
              helperText={errors.ups}
              required
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <ReusableInput
              label="Tracks"
              value={formData.tracks}
              onChange={(e) => handleChange("tracks", e.target.value)}
              error={!!errors.tracks}
              helperText={errors.tracks}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default MasterDataDetails;
