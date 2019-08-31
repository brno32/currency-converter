import React from "react";
import AsyncSelect from "react-select/async";
import axios from "axios";

interface OptionType {
  label: string;
  value: string;
}

const currenciesEndpoint = "https://openexchangerates.org/api/currencies.json";

const CurrencySelect = () => {
  const currencyOptions = async (inputValue: string) => {
    const results = await axios.get(currenciesEndpoint);

    let options: OptionType[] = [];
    for (let currency in results.data) {
      options.push({
        value: currency,
        label: results.data[currency]
      });
    }

    return options.filter((country: OptionType) => {
      return country.label.toLowerCase().includes(inputValue.toLowerCase());
    });
  };

  return (
    <div>
      <AsyncSelect
        placeholder="Search a country"
        loadOptions={currencyOptions}
      />
    </div>
  );
};

export default CurrencySelect;
