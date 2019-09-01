import React, { useContext } from "react";
import ConvertForm from "../conversion/ConvertForm";
import ConversionDisplay from "../conversion/ConversionDisplay";
import ConversionContext from "../../context/conversion/conversionContext";

const Main = () => {
  const conversionContext: any = useContext(ConversionContext);
  const { result } = conversionContext;

  return (
    <div>
      <ConvertForm></ConvertForm>
      {result && <ConversionDisplay />}
    </div>
  );
};

export default Main;
