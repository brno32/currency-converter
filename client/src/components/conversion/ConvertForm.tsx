import React from "react";
import CurrencySelect from "./CurrencySelect";

const ConvertForm = () => {
  return (
    <div>
      <CurrencySelect placeholder="Starting currency" />
      <CurrencySelect placeholder="Target currency" />
    </div>
  );
};

export default ConvertForm;
