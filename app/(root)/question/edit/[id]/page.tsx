import { URLProps } from "@/types";

const page = ({ params }: URLProps) => {
  const { id } = params;

  return <div>{id}</div>;
};

export default page;
