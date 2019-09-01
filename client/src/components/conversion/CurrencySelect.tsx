import React from "react";
import AsyncSelect from "react-select/async";

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
  // Filter results from API based on user input
  // Inefficient since we're grabbing ALL results in the response, but openexchange doesn't support
  // pagination or query params
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
  // If this form ever gets more complex, it should get its own context so we can avoid prop mining
  const onChange = (selectedOption: any) => {
    if (selectedOption == null) return;
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
