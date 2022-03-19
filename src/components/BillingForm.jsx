import React, { useContext, useState } from 'react';
import { Context as AuthContext } from '../context/auth';
import {
  InputField,
  RadioField,
  SelectField,
  Textarea,
} from './bootstrap/Form';
import { FaCcMastercard } from 'react-icons/fa';
import { FcInTransit } from 'react-icons/fc';
import { BsPaypal } from 'react-icons/bs';
import { RiVisaFill } from 'react-icons/ri';
import Spinner from './bootstrap/Spinner';

function BillingForm(props) {
  const auth_context = useContext(AuthContext);
  const { loading } = props;

  const INIT_VALUES = {
    firstName: auth_context.userData.firstName,
    lastName: auth_context.userData.lastName,
    country: '',
    address: '',
    phone: '',
    email: auth_context.userData.email,
    additionalNote: '',
    paymentMethod: 'masterCard',
  };

  const [formData, setFormData] = useState(INIT_VALUES);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const PaymentMethod = () => {
    return (
      <div className='mt-4'>
        <RadioField
          name='paymentMethod'
          id='payment-method-cash'
          value='cash'
          onChange={onInputChange}
          label={
            <>
              <FcInTransit className='h4 my-0 mx-2 ' />
              Cash on delivery
            </>
          }
          checked={formData['paymentMethod'] === 'cash' ? true : false}
        />
        <RadioField
          name='paymentMethod'
          id='payment-method-master-card'
          value='masterCard'
          onChange={onInputChange}
          label={
            <>
              <FaCcMastercard className='h4 my-0 mx-2 ' />
              master card
            </>
          }
          checked={formData['paymentMethod'] === 'masterCard' ? true : false}
        />
        <RadioField
          name='paymentMethod'
          id='payment-method-visa'
          value='visa'
          onChange={onInputChange}
          label={
            <>
              <RiVisaFill className='h4 my-0 mx-2 ' />
              visa
            </>
          }
          checked={formData['paymentMethod'] === 'visa' ? true : false}
        />
        <RadioField
          name='paymentMethod'
          id='payment-method-paypal'
          value='paypal'
          onChange={onInputChange}
          label={
            <>
              <BsPaypal className='h4 my-0 mx-2 ' />
              paypal
            </>
          }
          checked={formData['paymentMethod'] === 'paypal' ? true : false}
        />
        <hr />
        <div className='small text-muted'>
          Your personal data will be used to process your order, support your
          experience throughout this website, and for other purposes described
          in our privacy policy.
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <button className='btn btn-aurora btn-lg mt-3' type='submit'>
            Place Order
          </button>
        )}
      </div>
    );
  };

  const onInputChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const onFormSubmit = (evt) => {
    evt.preventDefault();
    setIsSubmitted(true);
    props.onFormSubmit(formData);
  };

  return (
    <form
      onSubmit={onFormSubmit}
      noValidate
      className={`needs-validation ${isSubmitted ? 'was-validated' : ''}`}
    >
      <div className='row justify-content-center'>
        <InputField
          outer='col-lg-6 my-3'
          id='firstName-input-id'
          label='first name'
          name='firstName'
          value={formData['firstName']}
          onChange={onInputChange}
          placeholder='first name'
          required
        />
        <InputField
          outer='col-lg-6 my-3'
          id='lastName-input-id'
          label='last name'
          name='lastName'
          value={formData['lastName']}
          onChange={onInputChange}
          placeholder='last name'
          required
        />
        <SelectField
          outer='col-lg-6 my-3'
          id='country-input-id'
          label='country'
          name='country'
          value={formData['country']}
          onChange={onInputChange}
          placeholder='country'
          required
          options={[
            { value: '', label: 'Select Country' },
            { value: 'egypt', label: 'egypt' },
            { value: 'india', label: 'India' },
            { value: 'usa', label: 'USA' },
          ]}
          invalidFeedback
          validFeedback
        />
        <InputField
          outer='col-lg-6 my-3'
          id='address-input-id'
          label='address'
          name='address'
          value={formData['address']}
          onChange={onInputChange}
          placeholder='address'
          required
          invalidFeedback
          validFeedback
        />
        <InputField
          outer='col-lg-6 my-3'
          id='phone-input-id'
          label='phone'
          name='phone'
          value={formData['phone']}
          onChange={onInputChange}
          placeholder='phone'
          required
          invalidFeedback
          validFeedback
        />
        <InputField
          outer='col-lg-6 my-3'
          type='email'
          id='register-email'
          label='email address'
          name='email'
          value={formData['email']}
          onChange={onInputChange}
          placeholder='email address'
          required
          invalidFeedback
          validFeedback
        />
        <Textarea
          outer='col-12 my-3'
          id='register-additional-note'
          label='additional note'
          name='additionalNote'
          value={formData['additionalNote']}
          onChange={onInputChange}
          placeholder='additional note'
          rows={3}
          invalidFeedback
          validFeedback={
            formData['additionalNote'] ? 'looks good !' : 'empty, no problems !'
          }
        />
      </div>
      <PaymentMethod />
    </form>
  );
}

export default BillingForm;
