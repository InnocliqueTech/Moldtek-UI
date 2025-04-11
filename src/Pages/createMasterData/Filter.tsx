
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import DynamicSlider from "../../Components/ReUsable/Slider";
import { setOpenSlider } from "../../store/slices/masterDataSlice";
import FilterForm from "./GlobalSearch";
// import SearchComponent from "./GenAiSearch";

interface FilterProps {
  filterTitle: string;
}

const Filter: React.FC<FilterProps> = ({ filterTitle }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { openSider } = useSelector((state: RootState) => state.masterData);
  // const tabs = [
  //   { label: "Filter", content: <FilterForm/> },
  //   { label: "Gen AI Search", content: <SearchComponent/> },
  // ];

   const content = <FilterForm/>

  // const searchOptions = ["Indent No", "Order ID", "Customer Name"];
  return (
    openSider && (
      <DynamicSlider
        open={openSider}
        onClose={() => dispatch(setOpenSlider(false))}
        title={filterTitle} content={content} />
    )
  );
};
export default Filter;
