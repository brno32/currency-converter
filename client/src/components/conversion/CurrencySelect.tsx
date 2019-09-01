import React, { useState } from "react";
import AsyncSelect from "react-select/async";
import { ValueType } from "react-select/src/types";

import axios from "axios";

interface CurrencyOption {
  label: string;
  value: string;
}

interface Props {
  placeholder: string;
  onSelect: (currency: string) => void;
}

const currenciesEndpoint = "https://openexchangerates.org/api/currencies.json";

const CurrencySelect = (props: Props) => {
  const [selectedCurrency, setSelectedCurrency] = useState<
    ValueType<CurrencyOption>
  >({
    label: "",
    value: ""
  });

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

  const onChange = (selectedOption: any) => {
    if (selectedOption == null) return;
    setSelectedCurrency({
      label: selectedOption.label,
      value: selectedOption.value
    });
    props.onSelect(selectedOption.value);
  };

  return (
    <div>
      <AsyncSelect
        placeholder={props.placeholder}
        loadOptions={currencyOptions}
        onChange={onChange}
      />
    </div>
  );
};

export default CurrencySelect;
