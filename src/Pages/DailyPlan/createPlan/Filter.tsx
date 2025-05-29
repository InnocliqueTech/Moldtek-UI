import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import FilterForm from "./FilterForm";
import Slider from "../../../Components/ReUsable/Slider";
import {
  FiltersPayload,
  setFiltersPayload,
  setIsSearchTriggered,
  setOpenSliderDaily,
  setSelectedCustomers,
  setSelectedLabelTypeIds,
} from "../../../store/slices/viewDailyPlanSlice";
import { toast } from "react-toastify";
import { Box, Grid } from "@mui/material";
import ButtonComponent from "../../../Components/ReUsable/Button";
import { useMemo, useState } from "react";
import { format } from "date-fns";



interface FilterProps {
  filterTitle: string;
}
export interface LocalDatePayload {
  fromDate: Date | null;
  toDate: Date | null;
}

const Filter: React.FC<FilterProps> = ({ filterTitle }) => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    selectedCustomers,
    selectedLabelTypeIds,
    filtersPayload,
    openSliderDaily,
  } = useSelector((state: RootState) => state.viewDailyPlan);

  const [localDates, setLocalDates] = useState<LocalDatePayload>({
    fromDate: filtersPayload.fromDate
      ? new Date(filtersPayload.fromDate)
      : null,
    toDate: filtersPayload.toDate ? new Date(filtersPayload.toDate) : null,
  });

  const [searchField, setSearchField] = useState(
    filtersPayload.searchField || ""
  );
  const [searchType, setSearchType] = useState(filtersPayload.searchType || "");
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>(
    filtersPayload.status || []
  );

  const isSearchEnabled = useMemo(() => {
    const hasCustomer = selectedCustomers.length > 0;
    const hasLabelTypes = selectedLabelTypeIds.length > 0;
    const hasValidDates =
      localDates.fromDate !== null && localDates.toDate !== null;
    return (
      hasCustomer ||
      hasValidDates ||
      hasLabelTypes ||
      searchField.trim() !== "" ||
      searchType !== "" ||
      selectedStatuses.length > 0
    );
  }, [
    selectedCustomers,
    localDates,
    selectedLabelTypeIds,
    searchField,
    searchType,
    selectedStatuses,
  ]);

  const handleSubmit = () => {
    if (!isSearchEnabled) {
      toast.error("Please select a Customer or both From and To dates!");
      return;
    }

    const customerName = selectedCustomers.map(
      (customer: any) => customer.fullName
    );
    const labelType = selectedLabelTypeIds.map(
      (label: any) => label.labelTypeName
    );

    const finalSearchPayload: FiltersPayload = {
      customerName,
      fromDate:
        localDates.fromDate && localDates.toDate
          ? format(localDates.fromDate, "yyyy-MM-dd")
          : "",
      toDate:
        localDates.toDate && localDates.toDate
          ? format(localDates.toDate, "yyyy-MM-dd")
          : "",
      labelType,
      searchField: searchField.trim(),
      searchType,
      status: selectedStatuses,
    };

    dispatch(setFiltersPayload(finalSearchPayload));
    localStorage.setItem("dailyPlanDataPage", "0");
    dispatch(setIsSearchTriggered(true));
    dispatch(setOpenSliderDaily(false));
    toast.success("Search submitted successfully!");
  };

  const handleClear = () => {
    setLocalDates({ fromDate: null, toDate: null });
    setSearchField("");
    setSearchType("");

    dispatch(
      setFiltersPayload({
        customerName: [],
        fromDate: "",
        toDate: "",
        labelType: [],
        searchField: "",
        searchType: "",
        status: [],
      })
    );

    dispatch(setSelectedCustomers([]));
    dispatch(setSelectedLabelTypeIds([]));
    dispatch(setIsSearchTriggered(true));
    dispatch(setOpenSliderDaily(false));
    toast.success("Filters cleared!");
  };

  const content = (
    <FilterForm
      localDates={localDates}
      setLocalDates={setLocalDates}
      searchField={searchField}
      setSearchField={setSearchField}
      searchType={searchType}
      setSearchType={setSearchType}
      selectedStatuses={selectedStatuses}
      setSelectedStatuses={setSelectedStatuses}
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
    openSliderDaily && (
      <Slider
        open={openSliderDaily}
        onClose={() => dispatch(setOpenSliderDaily(false))}
        title={filterTitle}
        content={content}
        footer={sliderButtons}
      />
    )
  );
};
export default Filter;
