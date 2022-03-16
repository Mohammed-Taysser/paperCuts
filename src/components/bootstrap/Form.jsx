import React from 'react';

const InvalidFeedback = (props) => {
  const { invalidFeedback, label } = props.props;
  let textContent =
    typeof invalidFeedback === 'string'
      ? invalidFeedback
      : `${label} can't be empty`;
  return invalidFeedback ? (
    <div className='invalid-feedback'>{textContent}</div>
  ) : (
    <></>
  );
};

const ValidFeedback = (props) => {
  const { validFeedback } = props.props;
  let textContent =
    typeof validFeedback === 'string' ? validFeedback : `looks good!`;

  return validFeedback ? (
    <div className='valid-feedback'>{textContent}</div>
  ) : (
    <></>
  );
};

function InputField(props) {
  const inputProps = {
    name: props.name,
    type: props.type,
    id: props.id,
    required: props.required,
    disabled: props.disabled,
    readOnly: props.readOnly,
    placeholder: props.placeholder,
    className: `form-control ${props.className ? props.className : ''}`,
    value: props.value,
    onChange: props.onChange,
    onBlur: props.onBlur,
    onFocus: props.onFocus,
  };

  function Label() {
    const labelProps = {
      className: `form-label ${props.required ? 'require' : ''}`,
      htmlFor: props.id,
    };

    return props.label ? <label {...labelProps}>{props.label}</label> : <></>;
  }

  return (
    <div className={props.outer}>
      <Label />
      <input {...inputProps} />
      <InvalidFeedback props={props} />
      <ValidFeedback props={props} />
    </div>
  );
}

InputField.defaultProps = {
  type: 'text',
  name: 'input-name',
  id: 'input-id',
  outer: '',
  value: '',
  onchange: (e) => console.log(e.target.value),
};

function CheckBox(props) {
  const checkboxProps = {
    type: 'checkbox',
    name: props.name,
    id: props.id,
    required: props.required,
    disabled: props.disabled,
    readOnly: props.readOnly,
    checked: props.checked,
    className: `form-check-input ${props.className ? props.className : ''}`,
    value: props.value,
    onChange: props.onChange,
  };

  return (
    <div className={props.outer}>
      <div className='form-check'>
        <input {...checkboxProps} />
        <label className='form-check-label' htmlFor={props.id}>
          {props.label}
        </label>
        <InvalidFeedback props={props} />
        <ValidFeedback props={props} />
      </div>
    </div>
  );
}

CheckBox.defaultProps = {
  name: 'checkbox-name',
  id: 'checkbox-id',
  outer: '',
  value: 'checkbox-value',
  onchange: (e) => console.log(e.target.value),
};

function Ratio(props) {
  const ratioProps = {
    type: 'radio',
    name: props.name,
    id: props.id,
    required: props.required,
    disabled: props.disabled,
    readOnly: props.readOnly,
    checked: props.checked,
    className: `form-check-input ${props.className ? props.className : ''}`,
    value: props.value,
    onChange: props.onChange,
  };

  return (
    <div className={props.col}>
      <div className='form-check'>
        <input {...ratioProps} />
        <label className='form-check-label' htmlFor={props.id}>
          {props.label}
        </label>
        <InvalidFeedback props={props} />
        <ValidFeedback props={props} />
      </div>
    </div>
  );
}

Ratio.defaultProps = {
  name: 'ratio-name',
  id: 'ratio-id',
  outer: '',
  value: 'ratio-value',
  onchange: (e) => console.log(e.target.value),
};

function Switch(props) {
  const switchProps = {
    type: 'checkbox',
    role: 'switch',
    name: props.name,
    id: props.id,
    required: props.required,
    disabled: props.disabled,
    readOnly: props.readOnly,
    checked: props.checked,
    className: `form-check-input ${props.className ? props.className : ''}`,
    value: props.value,
    onChange: props.onChange,
  };

  return (
    <div className={props.col}>
      <div className='form-check form-switch'>
        <input {...switchProps} />
        <label className='form-check-label' htmlFor={props.id}>
          {props.label}
        </label>
        <InvalidFeedback props={props} />
        <ValidFeedback props={props} />
      </div>
    </div>
  );
}

Switch.defaultProps = {
  name: 'switch-name',
  id: 'switch-id',
  outer: '',
  value: 'switch-value',
  onchange: (e) => console.log(e.target.value),
};

export { InputField, CheckBox, Ratio, Switch };
