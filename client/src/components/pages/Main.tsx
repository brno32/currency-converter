import React, { useContext } from "react";
import Container from "@material-ui/core/Container";
import ConvertForm from "../conversion/ConvertForm";
import ConversionDisplay from "../conversion/ConversionDisplay";
import ConversionContext, {
  Conversion
} from "../../context/conversion/conversionContext";

const Main = () => {
  const conversionContext: Conversion = useContext(ConversionContext);
  const { result } = conversionContext;

  return (
    <Container maxWidth="sm">
      <ConvertForm></ConvertForm>
      {result && <ConversionDisplay />}
    </Container>
  );
};

export default Main;
