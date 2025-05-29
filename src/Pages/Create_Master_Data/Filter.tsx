
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import DynamicSlider from "../../Components/ReUsable/Slider";
import { setFiltersPayload, setIsSearchTriggered, setOpenSlider, setSelectedCustomers, setSelectedLabelTypeIds } from "../../store/slices/masterDataSlice";
import FilterForm from "./GlobalSearch";
import { Box, Grid } from "@mui/material";
import ButtonComponent from "../../Components/ReUsable/Button";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { useMemo, useState } from "react";
import { FiltersPayload } from "../../store/slices/masterDataInterface";


interface FilterProps {
  filterTitle: string;
}
export interface LocalDatePayload {
  fromDate: Date | null;
  toDate: Date | null;
}


const Filter: React.FC<FilterProps> = ({ filterTitle }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { openSider,    selectedCustomers,
    selectedLabelTypeIds, filtersPayload } = useSelector((state: RootState) => state.masterData);
  // const tabs = [
  //   { label: "Filter", content: <FilterForm/> },
  //   { label: "Gen AI Search", content: <SearchComponent/> },
  // ];
    const [localDates, setLocalDates] = useState<LocalDatePayload>({
      fromDate: filtersPayload.fromDate
        ? new Date(filtersPayload.fromDate)
        : null,
      toDate: filtersPayload.toDate ? new Date(filtersPayload.toDate) : null,
    });
      const [searchField, setSearchField] = useState(
        filtersPayload.searchField || ""
      );

  const isSearchEnabled = useMemo(() => {
    const hasCustomer = selectedCustomers.length > 0;
    const hasLabelTypes = selectedLabelTypeIds.length > 0;
    const hasValidDates =
      localDates.fromDate !== null && localDates.toDate !== null;
    return (
      hasCustomer || hasValidDates || hasLabelTypes || searchField.trim() !== ""
    );
  }, [selectedCustomers, localDates, selectedLabelTypeIds, searchField]);

    const onSubmit = () => {
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
          localDates.fromDate && localDates.toDate
            ? format(localDates.toDate, "yyyy-MM-dd")
            : "",
        labelType,
        searchField: searchField.trim(),
      };
  
      dispatch(setFiltersPayload(finalSearchPayload));
      dispatch(setIsSearchTriggered(true));
      dispatch(setOpenSlider(false));
      toast.success("Search submitted successfully!");
    };
  
    const handleClear = () => {
      setLocalDates({ fromDate: null, toDate: null });
      setSearchField("");
  
      dispatch(
        setFiltersPayload({
          customerName: [],
          fromDate: "",
          toDate: "",
          labelType: [],
          searchField: "",
        })
      );
  
      dispatch(setSelectedCustomers([]));
      dispatch(setSelectedLabelTypeIds([]));
      dispatch(setIsSearchTriggered(true));
      dispatch(setOpenSlider(false));
      toast.success("Filters cleared!");
    };
  

  const sliderButtons = (
      <Grid size={{ xs: 12 }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <ButtonComponent
            text="Search"
            borderRadius="100px"
            onClick={onSubmit}
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
      </Grid>)

   const content = <FilterForm localDates={localDates}
      setLocalDates={setLocalDates}
      searchField={searchField}
      setSearchField={setSearchField} />

  // const searchOptions = ["Indent No", "Order ID", "Customer Name"];
  return (
    openSider && (
      <DynamicSlider
        open={openSider}
        onClose={() => dispatch(setOpenSlider(false))}
        title={filterTitle} content={content} footer={sliderButtons} />
    )
  );
};
export default Filter;
