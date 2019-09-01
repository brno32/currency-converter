import React from "react";
import AsyncSelect from "react-select/async";

import axios from "axios";

interface CurrencyOption {
  label: string;
  value: string;
}

interface SelectProps {
  placeholder: string;
  className: string;
  onSelect: (currency: string) => void;
}

const currenciesEndpoint = "https://openexchangerates.org/api/currencies.json";

const CurrencySelect = (props: SelectProps) => {
  // Filter results from API based on user input
  // Inefficient since ALL results are in the response, but openexchange doesn't support pagination or query params
  const currencyOptions = async (inputValue: string) => {
    const results = await axios.get(currenciesEndpoint);

    let options: CurrencyOption[] = [];
    for (let currency in results.data) {
      options.push({
        value: currency,
        label: results.data[currency]
      });
    }

    return options.filter((country: CurrencyOption) => {
      return country.label.toLowerCase().includes(inputValue.toLowerCase());
    });
  };

  // Send chosen value up to parent through callback
  const onChange = (selectedOption: any) => {
    if (selectedOption == null) return;
    props.onSelect(selectedOption.value);
  };

  return (
    <AsyncSelect
      placeholder={props.placeholder}
      loadOptions={currencyOptions}
      onChange={onChange}
      className={props.className}
    />
  );
};

export default CurrencySelect;
