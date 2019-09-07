import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Autosuggest from "react-autosuggest";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import axios from "axios";

interface CurrencyOption {
  label: string;
  value: string;
}

interface SelectProps {
  label: string;
  className: string;
  onSelect: (currency: string) => void;
}

const currenciesEndpoint = "https://openexchangerates.org/api/currencies.json";

// Matches options against user input
const matches = (text: string, input: string): boolean => {
  return text.toLowerCase().includes(input.toLowerCase());
};

function renderInputComponent(inputProps: any) {
  const { classes, inputRef = () => {}, ref, ...other } = inputProps;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputRef: node => {
          ref(node);
          inputRef(node);
        },
        classes: {
          input: classes.input
        }
      }}
      {...other}
    />
  );
}

function renderSuggestion(
  suggestion: CurrencyOption,
  { query, isHighlighted }: Autosuggest.RenderSuggestionParams
) {
  const matches = match(suggestion.label, query);
  const parts = parse(suggestion.label, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map(part => (
          <span
            key={part.text}
            style={{ fontWeight: part.highlight ? 500 : 400 }}
          >
            {part.text}
          </span>
        ))}
      </div>
    </MenuItem>
  );
}

function getSuggestionValue(suggestion: CurrencyOption) {
  return suggestion.value;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 250,
      flexGrow: 1
    },
    container: {
      position: "relative"
    },
    suggestionsContainerOpen: {
      position: "absolute",
      zIndex: 1,
      marginTop: theme.spacing(1),
      left: 0,
      right: 0
    },
    suggestion: {
      display: "block"
    },
    suggestionsList: {
      margin: 0,
      padding: 0,
      listStyleType: "none"
    },
    divider: {
      height: theme.spacing(2)
    }
  })
);

const CurrencySelect = (props: SelectProps) => {
  let [options, setOptions] = useState<CurrencyOption[]>([]);
  let [filteredOptions, setFilteredOptions] = useState<CurrencyOption[]>([]);
  let [selected, setSelected] = useState<string>("");

  const classes = useStyles();

  useEffect(() => {
    fetchOptions();
    // eslint-disable-next-line
  }, []);

  const handleSuggestionsFetchRequested = ({ value }: any) => {
    setFilteredOptions(filterOptions(value));
  };

  const handleSuggestionsClearRequested = () => {
    setFilteredOptions(options);
  };

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
  const filterOptions = (inputValue: string): CurrencyOption[] => {
    return options
      .filter((country: CurrencyOption) => {
        // Value is the currency code, label is the name. Allow both
        return (
          matches(country.label, inputValue) ||
          matches(country.value, inputValue)
        );
      })
      .splice(0, 10);
  };

  const onChange = (
    event: React.ChangeEvent<{}>,
    { newValue }: Autosuggest.ChangeEvent
  ) => {
    props.onSelect(newValue);
    setSelected(newValue);
  };

  return (
    <Autosuggest
      renderInputComponent={renderInputComponent}
      suggestions={filteredOptions}
      onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
      onSuggestionsClearRequested={handleSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      theme={{
        container: classes.container,
        suggestionsContainerOpen: classes.suggestionsContainerOpen,
        suggestionsList: classes.suggestionsList,
        suggestion: classes.suggestion
      }}
      renderSuggestionsContainer={options => (
        <Paper {...options.containerProps} square>
          {options.children}
        </Paper>
      )}
      inputProps={{
        classes,
        // id: "react-autosuggest-simple",
        label: props.label,
        placeholder: "Type a currency code or country name",
        value: selected,
        onChange: onChange
      }}
    />
  );
};

export default CurrencySelect;
