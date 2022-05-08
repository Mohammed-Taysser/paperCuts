import React from 'react';
import { Textarea } from '../bootstrap/Form';

function InfoCard(props) {
  const { formData, onInputChange } = props;

  return (
    <>
      <Textarea
        outer='col-md-6'
        rows={3}
        value={formData['info'] ? formData['info'] : ''}
        name='info'
        placeholder='info'
        onChange={onInputChange}
      />
      <Textarea
        outer='col-md-6'
        rows={3}
        placeholder='extra info'
        value={formData['extraInfo'] ? formData['extraInfo'] : ''}
        name='extraInfo'
        onChange={onInputChange}
      />
    </>
  );
}

export default InfoCard;
