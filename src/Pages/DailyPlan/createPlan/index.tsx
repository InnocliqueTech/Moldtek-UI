import { Box, Typography, Grid } from '@mui/material';
import React from 'react'
import ReusableInput from '../../../Components/ReUsable/TextField';
import DropdownComponent from '../../../Components/ReUsable/Dropdown';
// import ButtonComponent from '../../../Components/ReUsable/Button';


const CreatePlan: React.FC = () => {
    return (
        <>
            <Box className="bg-white rounded-xl px-5 py-6">
                <Box className="mb-3">
                    <Typography sx={{ fontSize: "1.25rem", fontWeight: "600" }}>Add Indent Number</Typography>
                    {/* <Box>
                        <ButtonComponent text={"Add New Job"} textColor="#0073B7"
                            color="white"
                            borderRadius="100px"
                            p={2}
                            border="1px solid #0073B7" />
                        <ButtonComponent text={"Save"} textColor="#0073B7"
                            color="white"
                            borderRadius="100px"
                            p={2}
                            border="1px solid #0073B7" />
                    </Box> */}
                </Box>
                <Grid container spacing={2} pt={1}>
                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                        <ReusableInput
                            label="Unit Effectivity Number"
                            value={"hello"}
                            // value={formData.unitEffectivityNumber}
                            onChange={() => { }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                        <Box >
                            <DropdownComponent
                                label="Type of Label"
                                options={["KitKat 50g Wrapper"]}
                                value={"hello"}
                                onChange={() => { }}
                                // value={formData.typeOfLabel}
                                // onChange={(e) => handleChange("typeOfLabel", e)}
                                isMultiSelect={false}
                                checkbox={false}
                            />
                        </Box>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                        <Box >
                            <DropdownComponent
                                label="Jar/Cap"
                                options={["N/A (For flexible packaging)", "JAR", "CAP"]}
                                value={"hello"}
                                onChange={() => { }}
                                // value={formData.jarCap}
                                // onChange={(value: any) => handleChange("jarCap", value)}
                                isMultiSelect={false}
                                checkbox={false}
                            />
                        </Box>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                        <ReusableInput
                            label="Unit Effectivity Number"
                            value={"hello"}
                            // value={formData.unitEffectivityNumber}
                            onChange={() => { }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                        <ReusableInput
                            label="Unit Effectivity Number"
                            value={"hello"}
                            // value={formData.unitEffectivityNumber}
                            onChange={() => { }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                        <ReusableInput
                            label="Unit Effectivity Number"
                            value={"hello"}
                            // value={formData.unitEffectivityNumber}
                            onChange={() => { }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                        <ReusableInput
                            label="Unit Effectivity Number"
                            value={"hello"}
                            // value={formData.unitEffectivityNumber}
                            onChange={() => { }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                        <ReusableInput
                            label="Unit Effectivity Number"
                            value={"hello"}
                            // value={formData.unitEffectivityNumber}
                            onChange={() => { }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                        <ReusableInput
                            label="Unit Effectivity Number"
                            value={"hello"}
                            // value={formData.unitEffectivityNumber}
                            onChange={() => { }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                        <ReusableInput
                            label="Unit Effectivity Number"
                            value={"hello"}
                            // value={formData.unitEffectivityNumber}
                            onChange={() => { }}
                        />
                    </Grid>
                </Grid>


            </Box>
        </>
    )
}

export default CreatePlan;