import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import FilterForm from "./FilterForm";
import Slider from "../../Components/ReUsable/Slider";

import { toast } from "react-toastify";
import { Box, Grid } from "@mui/material";
import ButtonComponent from "../../Components/ReUsable/Button";
import { useMemo, useState } from "react";
import { format } from "date-fns";
import {
  FiltersPayload,
  setFiltersPayload,
  setIsSearchTriggered,
  setOpenSliderUser,
  setSelectedLabelTypeIds,
} from "../../store/slices/userSlice";

interface FilterProps {
  filterTitle: string;
}
export interface LocalDatePayload {
  fromDate: Date | null;
  toDate: Date | null;
}

const Filter: React.FC<FilterProps> = ({ filterTitle }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { openSliderUser, filtersPayload, selectedLabelTypeIds } = useSelector(
    (state: RootState) => state.user
  );

  const [selectedrole, setSelectedRole] = useState<string[]>(
    filtersPayload.roles || []
  );

  const [searchField, setSearchField] = useState<string>("");
  const [localDates, setLocalDates] = useState<LocalDatePayload>({
    fromDate: filtersPayload.fromDate
      ? new Date(filtersPayload.fromDate)
      : null,
    toDate: filtersPayload.toDate ? new Date(filtersPayload.toDate) : null,
  });

  const isSearchEnabled = useMemo(() => {
    const hasValidDates =
      localDates.fromDate !== null && localDates.toDate !== null;
    const hasRole = selectedrole.length > 0;
    const hasLabels = selectedLabelTypeIds.length > 0;

    return hasValidDates || hasRole || hasLabels;
  }, [localDates, selectedrole, selectedLabelTypeIds]);

  const handleSubmit = () => {
    if (!isSearchEnabled) {
      toast.error("Please select a Customer or both From and To dates!");
      return;
    }


    const finalSearchPayload: FiltersPayload = {
      fromDate:
        localDates.fromDate && localDates.toDate
          ? format(localDates.fromDate, "yyyy-MM-dd")
          : "",
      toDate:
        localDates.toDate && localDates.toDate
          ? format(localDates.toDate, "yyyy-MM-dd")
          : "",
      roles: selectedLabelTypeIds.map((item) => item.labelTypeName),
       labelType: selectedLabelTypeIds.map(item => item.labelTypeName),
       email:filtersPayload.email
    };

    dispatch(setFiltersPayload(finalSearchPayload));
    dispatch(setIsSearchTriggered(true));
    dispatch(setOpenSliderUser(false));
    toast.success("Search submitted successfully!");
  };

  const handleClear = () => {
    setLocalDates({ fromDate: null, toDate: null });
    dispatch(setSelectedLabelTypeIds([]));
    dispatch(
      setFiltersPayload({
        roles: [],
        fromDate: "",
        toDate: "",
        labelType:[],
        email:filtersPayload.email
      })
    );

    dispatch(setIsSearchTriggered(true));
    dispatch(setOpenSliderUser(false));
    toast.success("Filters cleared!");
  };

  const content = (
    <FilterForm
      localDates={localDates}
      setLocalDates={setLocalDates}
      selectedRole={selectedrole}
      setSelectedRole={setSelectedRole}
      searchField={searchField}
      setSearchField={setSearchField}
    />
  );
  const sliderButtons = (
    <Grid size={{ xs: 12 }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
        <ButtonComponent
          text="Search"
          borderRadius="100px"
          onClick={handleSubmit}
          color="#0073B7"
          textColor="white"
          p={2}
          disabled={!isSearchEnabled}
        />
        <ButtonComponent
          text="Clear"
          borderRadius="100px"
          onClick={handleClear}
          color="#f44336"
          textColor="white"
          p={2}
        />
      </Box>
    </Grid>
  );
  return (
    openSliderUser && (
      <Slider
        open={openSliderUser}
        onClose={() => dispatch(setOpenSliderUser(false))}
        title={filterTitle}
        content={content}
        footer={sliderButtons}
      />
    )
  );
};
export default Filter;
