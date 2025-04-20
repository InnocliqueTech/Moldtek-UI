import { Box, Grid, IconButton, Modal, Tooltip, Typography } from "@mui/material";
import ReusableInput from "../../Components/ReUsable/TextField";
import DropdownComponent from "../../Components/ReUsable/Dropdown";
import TextArea from "../../Components/ReUsable/TextArea";
import { Close, Delete, Edit, Visibility } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useEffect, useState } from "react";
import { SelectChangeEvent } from "@mui/material";
import {
  MasterDataFormErrors,
  setDyeCuttingDetails,
  setLaminatingDetails,
  setMasterDataDataTouched,
  setMasterDataDetailsSave,
  setMasterDataFormErros,
  setPrintingDetails,
  setSaveFormData,
  setSubmitAndPublishButtonMasterData,
} from "../../store/slices/masterDataSlice";
import { MasterFormData } from "./../../store/slices/masterDataSlice";
import { useLocation, useParams } from "react-router-dom";
import { useGetLabelTypesQuery, useViewMasterDataQuery } from "../../store/services/api";
import { setDyeCuttingSettings, setLaminatingSubstrate, setLaminationAdhesiveDetails, setLaminationSettings, setPrintingInkStationData, setPrintingMachineSettingsData, setPrintingSubstrate, setViewMasterDataDetails } from "../../store/slices/viewMasterDataSlice";

interface MasterDataProps {
  formData: MasterFormData;
  setFormData: React.Dispatch<React.SetStateAction<MasterFormData>>;
}

const MasterDataDetails: React.FC<MasterDataProps> = ({
  formData,
  setFormData,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const { id } = useParams();
  const location = useLocation();
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
  
  
    const { data} = useViewMasterDataQuery({
      ueNumber: selectedUEN,
      versionNo: versionNo,
    },    {
      skip: !id,
      refetchOnMountOrArgChange: true,
    });


    
    useEffect(()=>{
      if(id&&location.pathname.includes('/updateMasterData')){
     dispatch(setViewMasterDataDetails(data?.data?.masterDataDetails));
     dispatch(setPrintingDetails(data?.data.masterDataPrinting));
     dispatch(setLaminatingDetails(data?.data.masterDataLamination));
     dispatch(setDyeCuttingDetails(data?.data.masterDataDyeCutting));
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
         setFormData(data?.data?.masterDataDetails)
      }

    },[id])

  const { saveFormData, masterDataFormErrors,masterDataDataTouched } = useSelector(
    (state: RootState) => state.masterData
  );
  const { viewMasterDataDetails } = useSelector(
    (state: RootState) => state.viewMasterData
  );
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [errors, setErrors] = useState<MasterDataFormErrors>({
    job_master_id:"",
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
  });

  const handleChange = (
    field: keyof MasterFormData,
    value: string | string[] | SelectChangeEvent<string | string[]>
  ) => {
    dispatch(setMasterDataDataTouched(true))
    let newValue: string | string[] = Array.isArray(value)
      ? value
      : typeof value === "string"
      ? value
      : value.target.value;
  
    let finalValue: string | number = newValue as string;  // store user input directly
    let errorMessage = "";
  
    const numericFields: (keyof MasterFormData)[] = [
      "repeat_length",
      "ups",
      "tracks",
      "unit_effectivity_number",
    ];
    const characterFields: (keyof MasterFormData)[] = ["customer_name"];
    const alphanumericFields: (keyof MasterFormData)[] = ["item_code"];
    const freeTextFields: (keyof MasterFormData)[] = ["brand_description"];
  
    if (numericFields.includes(field)) {
      if ((newValue as string).trim() === "") {
        errorMessage = "This field cannot be empty.";
      } else if (isNaN(Number(newValue))) {
        errorMessage = "Please enter a valid number.";
      } else {
        // valid numeric input
        finalValue = Number(newValue);
        errorMessage = "";
      }
  
    } else if (characterFields.includes(field)) {
      const trimmed = (newValue as string).trim();
      const onlyLettersRegex = /^[A-Za-z\s]+$/;
  
      if (trimmed === "") {
        errorMessage = "This field cannot be empty.";
      } else if (!onlyLettersRegex.test(trimmed)) {
        errorMessage = "Only characters and spaces are allowed.";
      } else {
        errorMessage = "";
      }
  
    } else if (alphanumericFields.includes(field)) {
      const trimmed = (newValue as string).trim();
      const alphanumericRegex = /^[A-Za-z0-9\s]+$/;
  
      if (trimmed === "") {
        errorMessage = "This field cannot be empty.";
      } else if (!alphanumericRegex.test(trimmed)) {
        errorMessage = "Only letters, numbers, and spaces are allowed.";
      } else {
        errorMessage = "";
      }
  
    } else if (freeTextFields.includes(field)) {
      const trimmed = (newValue as string).trim();
  
      if (trimmed === "") {
        errorMessage = "This field cannot be empty.";
      } else {
        errorMessage = "";
      }
  
    } else if (
      field === "label_type" ||
      field === "jar_cap" ||
      field === "structure"
    ) {
      if (Array.isArray(newValue)) {
        finalValue = newValue[0];
      } else {
        finalValue = newValue as string;
      }
      errorMessage = "";
    }
  
    const updatedErrors = {
      ...errors,
      [field]: errorMessage,
    };
  
    const updatedFormData = {
      ...formData,
      [field]: finalValue,  // always store the current user-typed value
    };
  
    setFormData(updatedFormData);
    dispatch(setSaveFormData(updatedFormData));
    dispatch(setMasterDataFormErros(updatedErrors));
  };
  

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setMasterDataDataTouched(true))
    const file = e.target.files?.[0];  // Get the file from the event
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result as string;
        const updatedFormData = {
          ...formData,
          customer_logo: base64Image, // <-- Set image
        };
  
        setFormData(updatedFormData);
        dispatch(setSaveFormData(updatedFormData));
      };
  
      reader.readAsDataURL(file); // Read the file as DataURL
    }
  };


  useEffect(() => {
    if ( !id && saveFormData) {
      setFormData(saveFormData);
    }
    if (masterDataFormErrors) {
      setErrors(masterDataFormErrors);
    }
  }, [saveFormData, masterDataFormErrors,id]);

  function sanitizeMasterData(data: any): MasterFormData {
    return {
      job_master_id:data?.job_master_id||0,
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
    };
  }

  useEffect(() => {
    if (id && viewMasterDataDetails&&!masterDataDataTouched) {
      setFormData(sanitizeMasterData(viewMasterDataDetails));
    }
  }, [id, viewMasterDataDetails]);
  const {data:LabelTyepsData} = useGetLabelTypesQuery();
  const dropdownOptions = LabelTyepsData && LabelTyepsData?.map((option:any) => option.labelTypeName);
  useEffect(() => {
    const importantFields = [
      "unit_effectivity_number",
      "customer_name",
      "brand_description",
      "label_type",
      "jar_cap",
      "repeat_length",
      "ups",
    ] as (keyof MasterFormData)[];

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
      "customer_logo",
      "brand_description",
      "label_type",
      "jar_cap",
      "repeat_length",
      "ups",
      "item_code",
      "structure",
      "tracks"
    ];
  
    const anyValuePresent = importantFields.some(
      (field) =>
        formData[field] !== "" &&
        formData[field] !== null &&
        formData[field] !== undefined
    );
  
    const anyErrors = importantFields.some((field) => errors[field] !== "");
  
    // Enable only if any value is present and there are no errors
    const canSubmit = anyValuePresent && !anyErrors;
  
    dispatch(setMasterDataDetailsSave(!canSubmit)); 
    // I assume your slice uses: true = disable, false = enable
  }, [formData, errors, dispatch]);
  


  const handleRemoveImage = () => {
    // clear the uploaded image from formData
    setFormData(prev => ({
      ...prev,
      customer_logo: ''
    }));
  };

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
              label="Unit Effectivity Number"
              value={formData.unit_effectivity_number}
              onChange={(e) =>
                handleChange("unit_effectivity_number", e.target.value)
              }
              error={!!errors.unit_effectivity_number}
              helperText={errors.unit_effectivity_number}
              disabled={id ? true : false}
            />
            <Box sx={{ mt: 2 }}>
              <DropdownComponent
                label="Type of Label"
                options={dropdownOptions?dropdownOptions:[]}
                value={formData.label_type}
                onChange={(e) => handleChange("label_type", e.target.value)}
                isMultiSelect={false}
                checkbox={false}
              />
            </Box>
            <Box sx={{ mt: 2 }}>
              <DropdownComponent
                label="Jar/Cap"
                options={[ "JAR", "CAP"]}
                value={formData.jar_cap}
                onChange={(e) => handleChange("jar_cap", e.target.value)}
                isMultiSelect={false}
                checkbox={false}
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
            />
            <Box sx={{ mt: 2 }} />
            <ReusableInput
              label="ITEM Code"
              value={formData.item_code}
              onChange={(e) => handleChange("item_code", e.target.value)}
              error={!!errors.item_code}
              helperText={errors.item_code}
            />
            <Box sx={{ mt: 2 }}>
              <DropdownComponent
                label="Structure"
                options={["PET"]}
                value={formData.structure}
                onChange={(e) => handleChange("structure", e.target.value)}
                isMultiSelect={false}
                checkbox={false}
              />
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
          <Box display="flex" flexDirection="column" alignItems="flex-start">
  <Typography variant="body2" sx={{ fontWeight: 500 }} color="#656565">
    Customer Picture
  </Typography>

  <Box display="flex" alignItems="center" gap={2} mt={0}>
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
              <IconButton onClick={() => setIsPreviewOpen(true)} color="primary">
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



            <Box sx={{ mt: 2 }}>
              <TextArea
                label="Brand Name & Pack-Description"
                value={formData.brand_description}
                onChange={(e) =>
                  handleChange("brand_description", e.target.value)
                }
                placeholder="Enter your text..."
                rows={4}
                error={!!errors.brand_description}
                helperText={errors.brand_description}
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
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <ReusableInput
              label="UPs"
              value={formData.ups}
              onChange={(e) => handleChange("ups", e.target.value)}
              error={!!errors.ups}
              helperText={errors.ups}
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
