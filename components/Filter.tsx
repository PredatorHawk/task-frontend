import { useState } from 'react';
import Select, { MultiValue } from 'react-select';

interface Option {
  value: string;
  label: string;
}

const Filter: React.FC = () => {
  const [selectedOptions, setSelectedOptions] = useState<MultiValue<Option>>([]);

  const options: Option[] = [
    { value: 'Numbers', label: 'Numbers' },
    { value: 'Letters', label: 'Letters' },
    { value: 'SpecialCharacters', label: 'Special Characters' },
  ];

  const handleChange = (selected: MultiValue<Option>) => {
    setSelectedOptions(selected);
  };

  const removeOption = (optionToRemove: Option) => {
    setSelectedOptions(selectedOptions.filter(option => option.value !== optionToRemove.value));
  };

  return (
    <div className="filter-component p-4 bg-gray-100 w-full rounded-lg shadow">
      <Select
        isMulti
        name="filters"
        options={options}
        value={selectedOptions}
        onChange={handleChange}
        className="w-full mb-4"
        classNamePrefix="select"
      />

      <div className="selected-options flex flex-wrap">
        {selectedOptions.map(option => (
          <div key={option.value} className="option-tag flex items-center bg-blue-100 text-blue-800 rounded-full px-4 py-2 m-1">
            {option.label}
            <button
              className="ml-2 text-red-500"
              onClick={() => removeOption(option)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
