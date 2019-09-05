import React, { useState, useEffect } from "react";
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

// Reusable function for matching options against user input
const matches = (text: string, input: string): boolean => {
  return text.toLowerCase().includes(input.toLowerCase());
};

const CurrencySelect = (props: SelectProps) => {
  let [options, setOptions] = useState<CurrencyOption[]>([]);

  useEffect(() => {
    fetchOptions();
    // eslint-disable-next-line
  }, []);

  const fetchOptions = async () => {
    const results = await axios.get(currenciesEndpoint);

    let options: CurrencyOption[] = [];
    for (let currency in results.data) {
      options.push({
        value: currency,
        label: `${results.data[currency]} (${currency})` // Users will expect to also see code
      });
    }
    setOptions(options);
  };

  // Called when user types
  const filterOptions = async (
    inputValue: string
  ): Promise<CurrencyOption[]> => {
    return options.filter((country: CurrencyOption) => {
      // Value is the currency code, label is the name. Allow both
      return (
        matches(country.label, inputValue) || matches(country.value, inputValue)
      );
    });
  };

  // Send chosen value up to parent through callback
  const onChange = (selectedOption: any) => {
    props.onSelect(selectedOption.value);
  };

  return (
    <AsyncSelect
      defaultOptions={options}
      placeholder={props.placeholder}
      loadOptions={filterOptions}
      onChange={onChange}
      className={props.className}
    />
  );
};

export default CurrencySelect;
