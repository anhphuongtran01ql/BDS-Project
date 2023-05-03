import { useLocation } from "react-router-dom";

function FilterPost() {
  const { state } = useLocation();
  console.log("state", state);
  return <>FilterPost</>;
}

export default FilterPost;
