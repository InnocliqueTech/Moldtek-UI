import { Box, Typography, Grid } from '@mui/material';
import React from 'react'
import ReusableInput from '../../../Components/ReUsable/TextField';
import DropdownComponent from '../../../Components/ReUsable/Dropdown';
import ButtonComponent from '../../../Components/ReUsable/Button';


const CreatePlan: React.FC = () => {
    return (
        <>
            <Box className="bg-white rounded-xl px-5 py-6">
                <Box className="mb-3 flex justify-between">
                    <Typography sx={{ fontSize: "1rem", fontWeight: "600" }}>Add Indent Number</Typography>
                    <Box>
                        <ButtonComponent text={"Add New Job"} textColor="#0073B7"
                            color="white"
                            borderRadius="100px"
                            p={2}
                            border="1px solid #0073B7" 
                            styles={{marginRight:".5rem"}}
                            />
                        <ButtonComponent text={"Save"} textColor="#0073B7"
                            color="white"
                            borderRadius="100px"
                            p={2}
                            border="1px solid #0073B7"
                             />
                    </Box>
                </Box>
                <Grid container spacing={2} pt={1}>
                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                        <ReusableInput
                            label="Indent Number:"
                            value={"2024-25-852/A"}
                            // value={formData.unitEffectivityNumber}
                            onChange={() => { }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                        <ReusableInput
                            label="PPC Indent Qty (NOS):"
                            value={"5035"}
                            // value={formData.unitEffectivityNumber}
                            onChange={() => { }}
                        />
                    </Grid>
                   
                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                        <ReusableInput
                            label="No of Colors for settings"
                            value={"hello"}
                            // value={formData.unitEffectivityNumber}
                            onChange={() => { }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                        <ReusableInput
                            label="No Of Colours for Cir match"
                            value={"hello"}
                            // value={formData.unitEffectivityNumber}
                            onChange={() => { }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                        <ReusableInput
                            label="1 Web Length for Colours Match"
                            value={"hello"}
                            // value={formData.unitEffectivityNumber}
                            onChange={() => { }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                        <ReusableInput
                            label="Colour Matching"
                            value={"hello"}
                            onChange={() => { }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                        <ReusableInput
                            label="Shade Matchings"
                            value={"hello"}
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
                                isMultiSelect={false}
                                checkbox={false}
                            />
                        </Box>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                        <ReusableInput
                            label="Bat to Print Indent Qty (Mtrs) planned"
                            value={"hello"}
                            onChange={() => { }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                        <ReusableInput
                            label="Die-Cut Wastage"
                            value={"hello"}
                            onChange={() => { }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                        <ReusableInput
                            label="Lamination Wastage"
                            value={"hello"}
                            onChange={() => { }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                        <ReusableInput
                            type="date"
                            label="Job Run Date"
                            value={""}
                            onChange={() => { }}
                        />
                    </Grid>
                </Grid>


            </Box>
        </>
    )
}

export default CreatePlan;