import * as React from "react";
import Header from "~/components/Header";

const StaticLayout: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      <main style={{ margin: "2rem 0" }}>{children}</main>
    </>
  );
};

export default StaticLayout;
