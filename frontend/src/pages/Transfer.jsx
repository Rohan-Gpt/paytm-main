import { TransferCard } from "../components/TransferCard";
import queryString from "query-string";

export function Transfer() {
  const parsed = queryString.parse(location.search);
  return (
    <div className="bg-slate-300">
      <TransferCard toName={parsed.name} id={parsed.id} />
    </div>
  );
}
