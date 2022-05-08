import React from 'react';
import { MdContentCopy } from 'react-icons/md';
import { copyToClipboard } from '../ManipulateData';

function IdCard(props) {
  const { id } = props;

  return (
    <div className="col-md-5">
      <div className='input-group input-group-sm'>
      <input
        className='form-control'
        type='text'
        placeholder='ID'
        aria-label='your id'
        disabled
        value={id}
      />
      <button
        className='btn btn-aurora css-tooltip'
        type='button'
        data-tooltip='Copy To Clipboard'
        onClick={() => {
          copyToClipboard(id);
        }}
      >
        <MdContentCopy />
      </button>
    </div>
    </div>
  );
}

export default IdCard;
