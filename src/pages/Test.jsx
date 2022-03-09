import React, { useState } from 'react';
import {
  CheckBox,
  InputField,
  Ratio,
  Switch,
} from '../components/bootstrap-component/Form';

function Test() {
  const [val, setVal] = useState('');
  const [check, setCheck] = useState(false);
  const [ratio, setRatio] = useState('dd');
  const [switchInput, setSwitchInput] = useState(false)

  return (
    <div>
      <div className='container my-5 py-5'>
        <form
          action=''
          noValidate
          className='needs-validation was-validated'
          onSubmit={(e) => e.preventDefault()}
        >
          <InputField
            value={val}
            label='sex'
            required
            onChange={(e) => setVal(e.target.value)}
            outer='sex'
            id='sex'
            validFeedback
            invalidFeedback
          />
          <CheckBox
            checked={check}
            required
            validFeedback
            invalidFeedback
            onChange={(e) => setCheck(e.target.checked)}
            id='op-op'
            name='sex-sex'
            label='sex - sex'
          />
          <Ratio
            required
            name='old'
            label='old-1'
            id='old-1'
            value='dd'
            checked={ratio === 'dd' ? true : false}
            onChange={(e) => setRatio(e.target.value)}
          />
          <Ratio
            required
            name='old'
            label='old-2'
            id='old-2'
            value='ss'
            checked={ratio === 'ss' ? true : false}
            onChange={(e) => setRatio(e.target.value)}
          />
          <Ratio
            required
            name='old'
            label='old-3'
            id='old-3'
            value='tt'
            checked={ratio === 'tt' ? true : false}
            onChange={(e) => setRatio(e.target.value)}
            validFeedback
            invalidFeedback
          />
          <Switch checked={switchInput}
            required
            validFeedback
            invalidFeedback
            onChange={(e) => setSwitchInput(e.target.checked)}
            id='www-op'
            name='wwww-sex'
            label='wwwww - sex' />
          <input type='submit' value='sex' />
        </form>
      </div>
    </div>
  );
}

export default Test;
