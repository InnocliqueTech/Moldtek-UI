
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import FilterForm from "./FilterForm";
import Slider from "../../../Components/ReUsable/Slider";
import { setOpenSliderDaily } from "../../../store/slices/viewDailyPlanSlice";


// import SearchComponent from "./GenAiSearch";

interface FilterProps {
  filterTitle: string;
}

const Filter: React.FC<FilterProps> = ({ filterTitle }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { openSliderDaily } = useSelector((state: RootState) => state.viewDailyPlan);
  // const tabs = [
  //   { label: "Filter", content: <FilterForm/> },
  //   { label: "Gen AI Search", content: <SearchComponent/> },
  // ];

   const content = <FilterForm/>

  // const searchOptions = ["Indent No", "Order ID", "Customer Name"];
  return (
    openSliderDaily && (
      <Slider
        open={openSliderDaily}
        onClose={() => dispatch(setOpenSliderDaily(false))}
        title={filterTitle} content={content} />
    )
  );
};
export default Filter;
