
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import DynamicSlider from "../../Components/ReUsable/Slider";
import { setOpenSlider } from "../../store/slices/masterDataSlice";
import FilterForm from "./GlobalSearch";
// import SearchComponent from "./GenAiSearch";


const Filter: React.FC = () => {
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
        title="Master Data Filter" content={content} />
    )
  );
};
export default Filter;
