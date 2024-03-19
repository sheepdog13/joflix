import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export default function search(params: Params) {
  console.log(params);
  return <div>page</div>;
}
