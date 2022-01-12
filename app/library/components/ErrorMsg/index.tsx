import * as React from "react";
import { P } from "../Typography";

const ErrorMsg: React.FC = ({ children }) => {
  return (
    <P style={{ color: "red", fontSize: ".875rem", marginTop: ".25rem" }}>
      {children}
    </P>
  );
};

export default ErrorMsg;
