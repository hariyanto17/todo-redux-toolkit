import { ReactElement, ReactNode } from "react";

const ShowIf = ({
  children,
  show,
}: {
  children: ReactNode;
  show: boolean;
}) => {
  if (show) return children as ReactElement
  return <div />;
};

export default ShowIf;
