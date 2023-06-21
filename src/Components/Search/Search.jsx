import { useSearchParams } from "react-router-dom";

export default function Search() {
  const [params] = useSearchParams();
  const query = params.get("q");
  return (
    <h2>
      {" "}
      You searched for <strong> {query} </strong>
    </h2>
  );
}
