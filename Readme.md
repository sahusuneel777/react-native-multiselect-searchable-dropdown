# React Native Multi-Select Search Dropdown

React Native Multi-Select Search Dropdown library is ideal for the search with multi select dropdown values.


- can select multi options from dropdwon
- search included

## Features

- Allows users to filter the options by searching through the available items
- Users can select multiple options from the dropdown list.
- Offers customization for placeholder text, label display, and the ability to toggle between single and multi-select modes

## Installation

To install the package in your project, run:

```sh
npm i react-native-multi-select-search-dropdown
```

## Props

Instructions on how to use them in your own application are listed below.

| prop | value | |
| ------ | ------ | ------ |
| disable | boolean | Mandatory
| value | array | Mandatory
| multiSelect | boolean | Optional
| isSearchNeeded | boolean| Mandatory
| options | array | Mandatory
| placeHolder | string | optional
| onChange | function | Mandatory
## Example

```
import SearchableDropDown from 'react-native-multi-select-search-dropdown';

const options = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
];

const App = () => {
  const [selectedValues, setSelectedValues] = useState([]); 
  const [dropDownptions, setDropdownOptions] = [{
    name: "15 days",
    id: 15
  },
  {
    name: "30 days",
    id: 30
  },
  {
    name: "2 months",
    id: 60
  }];
  
  function onchange(){
      //function to handle dropdown select/change
  }
  
  return (
    <SearchableDropDown
        disable={false}
        value={selectedValues} 
        multiSelect={true}
        isSearchNeeded={true} 
        options={dropDownptions}
        placeHolder='Select'
        onChange={this.onchange} />
  );
};
```
## License

ISC
