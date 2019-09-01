import React, { useContext } from "react";
import ConvertForm from "../conversion/ConvertForm";
import ConversionDisplay from "../conversion/ConversionDisplay";
import ConversionContext from "../../context/conversion/conversionContext";

const Main = () => {
  const conversionContext: any = useContext(ConversionContext);
  const { conversions } = conversionContext;

  return (
    <div>
      <ConvertForm></ConvertForm>
      {conversions && <ConversionDisplay />}
    </div>
  );
};

export default Main;
