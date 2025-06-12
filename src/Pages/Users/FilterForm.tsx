import React, { useState, useEffect, useRef } from "react";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
    Box,
    InputAdornment,
    IconButton,
    Grid
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import {
    setFiltersPayload,
} from "../../store/slices/userSlice";
import {
    ArrowForward,
    CalendarToday,
    Clear as ClearIcon,
} from "@mui/icons-material";
import { LocalDatePayload } from "./Filter";
import LabelTypeSelector from "./LabelTypes";


interface FilterFormProps {
    setLocalDates: React.Dispatch<React.SetStateAction<LocalDatePayload>>;
    localDates: LocalDatePayload;
    searchField: string;
    setSearchField: React.Dispatch<React.SetStateAction<string>>;
    selectedRole: string[];
    setSelectedRole: React.Dispatch<React.SetStateAction<string[]>>;

}


const FilterForm: React.FC<FilterFormProps> = ({
    setLocalDates,
    localDates,
    setSearchField,

}) => {
    const dispatch = useDispatch();
    const {
        openSliderUser,
        isSearchTriggered,
    } = useSelector((state: RootState) => state.user);

    const [openFrom, setOpenFrom] = useState(false);

    const [openTo, setOpenTo] = useState(false);


    const hasInitialized = useRef(false);

    useEffect(() => {
        if (openSliderUser && !hasInitialized.current) {
            hasInitialized.current = true;

            if (!isSearchTriggered) {
                dispatch(
                    setFiltersPayload({
                        fromDate: "",
                        toDate: "",
                        roles: [],
                        labelType: [],
                        email:""
                    })
                );
                setLocalDates({ fromDate: null, toDate: null });
                setSearchField("");
            }
        }
    }, [openSliderUser, dispatch, isSearchTriggered]);

    const handleDateChange = (
        date: Date | null,
        field: keyof LocalDatePayload
    ) => {
        setLocalDates((prev) => ({ ...prev, [field]: date }));
    };


    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Box>
                    <Box
                        sx={{
                            display: "flex",
                            gap: "2px",
                            flexDirection: { md: "row", sm: "column" },
                        }}
                    >
                        <Box
                            display="flex"
                            flexDirection="column"
                            flex="1"
                            maxWidth="170px"
                        >
                            <DatePicker
                                label="From Date"
                                open={openFrom}
                                onOpen={() => setOpenFrom(true)}
                                onClose={() => setOpenFrom(false)}
                                value={localDates.fromDate}
                                onChange={(newValue) => handleDateChange(newValue, "fromDate")}
                                format="dd/MM/yyyy"
                                slotProps={{
                                    textField: {
                                        placeholder: "dd/MM/yyyy",
                                        onClick: () => setOpenFrom(true),
                                        sx: {
                                            "& .MuiOutlinedInput-root": {
                                                borderWidth: "2px",
                                                border: "#f0f0f0",
                                                "& fieldset": { borderWidth: "2px" },
                                                "&:hover fieldset": { borderWidth: "2px" },
                                                "&.Mui-focused fieldset": {
                                                    borderWidth: "2px",
                                                    border: "#f0f0f0",
                                                },
                                            },
                                        },
                                        InputProps: {
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    {localDates.fromDate ? (
                                                        <IconButton
                                                            onClick={(event) => {
                                                                event.stopPropagation();
                                                                setLocalDates((prev) => ({
                                                                    ...prev,
                                                                    fromDate: null,
                                                                }));
                                                            }}
                                                        >
                                                            <ClearIcon />
                                                        </IconButton>
                                                    ) : (
                                                        <IconButton onClick={() => setOpenFrom(true)}>
                                                            <CalendarToday />
                                                        </IconButton>
                                                    )}
                                                </InputAdornment>
                                            ),
                                        },
                                    },
                                }}
                            />
                        </Box>

                        <ArrowForward sx={{ alignSelf: "center" }} />

                        <Box
                            display="flex"
                            flexDirection="column"
                            flex="1"
                            maxWidth="170px"
                        >
                            <DatePicker
                                label="To Date"
                                open={openTo}
                                onOpen={() => setOpenTo(true)}
                                onClose={() => setOpenTo(false)}
                                value={localDates.toDate}
                                onChange={(newValue) => handleDateChange(newValue, "toDate")}
                                format="dd/MM/yyyy"
                                shouldDisableDate={(date) => {
                                    if (!localDates.fromDate) return false;
                                    const from = new Date(localDates.fromDate);
                                    const check = new Date(date);
                                    return check.setHours(0, 0, 0, 0) < from.setHours(0, 0, 0, 0);
                                }}
                                minDate={localDates.fromDate || undefined}
                                slotProps={{
                                    textField: {
                                        placeholder: "dd/MM/yyyy",
                                        onClick: () => setOpenTo(true),
                                        sx: {
                                            "& .MuiOutlinedInput-root": {
                                                borderWidth: "2px",
                                                border: "#f0f0f0",
                                                "& fieldset": { borderWidth: "2px" },
                                                "&:hover fieldset": { borderWidth: "2px" },
                                                "&.Mui-focused fieldset": {
                                                    borderWidth: "2px",
                                                    border: "#f0f0f0",
                                                },
                                            },
                                        },
                                        InputProps: {
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    {localDates.toDate ? (
                                                        <IconButton
                                                            onClick={(event) => {
                                                                event.stopPropagation();
                                                                setLocalDates((prev) => ({
                                                                    ...prev,
                                                                    toDate: null,
                                                                }));
                                                            }}
                                                        >
                                                            <ClearIcon />
                                                        </IconButton>
                                                    ) : (
                                                        <IconButton onClick={() => setOpenTo(true)}>
                                                            <CalendarToday />
                                                        </IconButton>
                                                    )}
                                                </InputAdornment>
                                            ),
                                        },
                                    },
                                }}
                            />
                        </Box>
                    </Box>
                </Box>
            </LocalizationProvider>
            <Box
                display="flex"
                flexDirection="column"
                flex="1"
                sx={{ mt: 2 }}
            >

                <Grid size={{ xs: 12 }}>
                    <LabelTypeSelector />
                </Grid>
            </Box>

        </>
    );
};

export default FilterForm;
