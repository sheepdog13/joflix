import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export default function about({ params: { id } }: { params: { id: string } }) {
  return (
    <div>
      <h1>post {id}</h1>
    </div>
  );
}
