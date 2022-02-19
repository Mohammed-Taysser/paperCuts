import React from 'react';

const TypesSelect = (props) => {
  const { types, onSelectChange } = props;

  return (
    <select
      className='form-select w-auto'
      aria-label='choose book type'
      defaultValue={types[0]}
      onChange={onSelectChange}
    >
      {types.map((type, index) => {
        return (
          <option value={type} key={index}>
            {type}
          </option>
        );
      })}
    </select>
  );
};

TypesSelect.defaultProps = {
  types: [],
  onSelectChange: (data) => {
    console.log(data);
  },
};

export default TypesSelect;
