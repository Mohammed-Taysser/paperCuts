import React from 'react';

// helpers

const InvalidFeedback = (props) => {
  const { invalidFeedback: invalid, label } = props.inputProps;
  let textContent =
    typeof invalid === 'string' ? invalid : `${label} can't be empty`;

  return invalid ? (
    <div className='invalid-feedback'>{textContent}</div>
  ) : (
    <></>
  );
};

const ValidFeedback = (props) => {
  const { validFeedback: valid } = props.inputProps;
  let textContent = typeof valid === 'string' ? valid : `looks good!`;

  return valid ? <div className='valid-feedback'>{textContent}</div> : <></>;
};

const Label = (props) => {
  const { required, id, label, labelClass } = props.inputProps;
  const labelProps = {
    className: `${labelClass ? labelClass : 'form-label'} ${
      required ? 'require' : ''
    }`,
    htmlFor: id,
  };

  return label ? <label {...labelProps}>{label}</label> : <></>;
};

// default init

const INIT = (props) => ({
  name: props.name,
  value: props.value,
  id: props.id,
  required: props.required,
  disabled: props.disabled,
  readOnly: props.readOnly,
  onChange: props.onChange ? props.onChange : (data) => console.log(data),
});

// components

function SegmentWrapper(props) {
  const { inputProps } = props;
  return (
    <div className={inputProps.outer}>
      {inputProps.type === 'radio' ? (
        <>
          {props.children}
          <Label inputProps={inputProps} />
        </>
      ) : (
        <>
          <Label inputProps={inputProps} />
          {props.children}
        </>
      )}
      <InvalidFeedback inputProps={inputProps} />
      <ValidFeedback inputProps={inputProps} />
    </div>
  );
}

function InputField(props) {
  const inputProps = {
    ...INIT(props),
    type: props.type ? props.type : 'text',
    placeholder: props.placeholder,
    minLength: props.minLength,
    className: `form-control ${props.className ? props.className : ''} ${
      props.sm ? 'form-control-sm' : ''
    } ${props.lg ? 'form-control-lg' : ''}`,
  };

  return (
    <SegmentWrapper inputProps={props}>
      <input {...inputProps} />
    </SegmentWrapper>
  );
}

function SelectField(props) {
  const selectProps = {
    ...INIT(props),
    multiple: props.multiple,
    size: props.size,
    placeholder: props.placeholder,
    'aria-label': props.label,
    className: `form-select ${props.className ? props.className : ''} ${
      props.sm ? 'form-select-sm' : ''
    } ${props.lg ? 'form-select-lg' : ''}`,
  };

  const SelectOptions = () => {
    if (props.options) {
      let select_options = props.options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ));

      return <> {select_options} </>;
    }
    return <></>;
  };

  return (
    <SegmentWrapper inputProps={props}>
      <select {...selectProps}>
        <SelectOptions />
      </select>
    </SegmentWrapper>
  );
}

function Textarea(props) {
  const inputProps = {
    ...INIT(props),
    placeholder: props.placeholder,
    minLength: props.minLength,
    maxLength: props.maxLength,
    rows: props.rows,
    className: `form-control ${props.className ? props.className : ''}`,
  };

  return (
    <SegmentWrapper inputProps={props}>
      <textarea {...inputProps} />
    </SegmentWrapper>
  );
}

// function CheckBox(props) {
//   const checkboxProps = {
//     type: 'checkbox',
//     name: props.name,
//     id: props.id,
//     required: props.required,
//     disabled: props.disabled,
//     readOnly: props.readOnly,
//     checked: props.checked,
//     className: `form-check-input ${props.className ? props.className : ''}`,
//     value: props.value,
//     onChange: props.onChange,
//   };

//   return (
//     <div className={props.outer}>
//       <div className='form-check'>
//         <input {...checkboxProps} />
//         <label className='form-check-label' htmlFor={props.id}>
//           {props.label}
//         </label>
//         <InvalidFeedback props={props} />
//         <ValidFeedback props={props} />
//       </div>
//     </div>
//   );
// }

// CheckBox.defaultProps = {
//   name: 'checkbox-name',
//   id: 'checkbox-id',
//   outer: '',
//   value: 'checkbox-value',
//   onchange: (e) => console.log(e.target.value),
// };

function RadioField(props) {
  const radioProps = {
    ...INIT(props),
    type: 'radio',
    checked: props.checked,
    className: `form-check-input ${props.className ? props.className : ''}`,
  };

  return (
    <SegmentWrapper
      inputProps={{ ...props, labelClass: 'form-check-label', type: 'radio' }}
    >
      <input {...radioProps} />
    </SegmentWrapper>
  );
}

// function Switch(props) {
//   const switchProps = {
//     type: 'checkbox',
//     role: 'switch',
//     name: props.name,
//     id: props.id,
//     required: props.required,
//     disabled: props.disabled,
//     readOnly: props.readOnly,
//     checked: props.checked,
//     className: `form-check-input ${props.className ? props.className : ''}`,
//     value: props.value,
//     onChange: props.onChange,
//   };

//   return (
//     <div className={props.col}>
//       <div className='form-check form-switch'>
//         <input {...switchProps} />
//         <label className='form-check-label' htmlFor={props.id}>
//           {props.label}
//         </label>
//         <InvalidFeedback props={props} />
//         <ValidFeedback props={props} />
//       </div>
//     </div>
//   );
// }

// Switch.defaultProps = {
//   name: 'switch-name',
//   id: 'switch-id',
//   outer: '',
//   value: 'switch-value',
//   onchange: (e) => console.log(e.target.value),
// };

export { InputField, SelectField, Textarea, RadioField };
