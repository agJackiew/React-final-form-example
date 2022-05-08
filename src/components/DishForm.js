import React, { useState } from 'react';
import Styles from '../styles/Styles';
import { Form, Field } from 'react-final-form';
import useHttp from '../hooks/useHttp';
import Message from './Message';

const Error = ({ name }) => (
  <Field name={name} subscription={{ error: true, touched: true }}>
    {({ meta: { error, touched } }) =>
      error && touched ? <span>{error}</span> : null
    }
  </Field>
);

const Condition = ({ when, is, children }) => (
  <Field name={when} subscription={{ value: true }}>
    {({ input: { value } }) => (value === is ? children : null)}
  </Field>
);

const DishForm = () => {
  const dishTypes = ['pizza', 'soup', 'sandwich'];
  const dishesUrl = 'https://frosty-wood-6558.getsandbox.com:443/dishes';

  const { loading, httpError, sendRequest } = useHttp();

  const [reload, setReload] = useState(false);

  const backHandler = () => {
    setReload(false);
  };

  const required = (value) => (value ? undefined : 'Required');
  const mustBeNumber = (value) =>
    isNaN(value) ? 'Must be a number' : undefined;
  const minValue = (min) => (value) =>
    isNaN(value) || value >= min ? undefined : `Minimum value is ${min}`;
  const maxValue = (max) => (value) =>
    isNaN(value) || value <= max ? undefined : `Maximum value is ${max}`;
  const followsPattern = (regex, pattern) => (value) =>
    new RegExp(regex).test(value)
      ? undefined
      : `Please follow pattern ${pattern}`;

  const composeValidators =
    (...validators) =>
    (value) =>
      validators.reduce(
        (error, validator) => error || validator(value),
        undefined
      );

  const onSubmit = (values) => {
    const reqObj = {
      ...values,
      ...(values.diameter && { diameter: parseFloat(values.diameter) }),
      ...(values.no_of_slices && {
        no_of_slices: parseInt(values.no_of_slices)
      }),
      ...(values.spiciness_scale > 0
        ? {
            spiciness_scale: parseInt(values.spiciness_scale)
          }
        : delete values.spiciness_scale),
      ...(values.slices_of_bread && {
        slices_of_bread: parseInt(values.slices_of_bread)
      })
    };
    const headers = {
      'Content-Type': 'application/json'
    };
    sendRequest(dishesUrl, 'POST', headers, reqObj, backHandler);
  };

  return (
    <Styles>
      {loading && <p>Loading...</p>}
      {!reload && (
        <Form
          onSubmit={onSubmit}
          initialValues={{
            type: 'pizza'
          }}
        >
          {({ handleSubmit, form, submitting, pristine, values }) => {
            const rangeValue = values['spiciness_scale'];
            const onReset = () => {
              form.restart();
            };
            return (
              <form onSubmit={handleSubmit} autoComplete='off'>
                <div>
                  <label>Dish Name:</label>
                  <div>
                    <Field
                      name='name'
                      component='input'
                      type='text'
                      placeholder='Please enter name of your dish'
                      validate={required}
                    />
                    <Error name='name' />
                  </div>
                </div>
                <div>
                  <label>Preparation Time:</label>
                  <div>
                    <Field
                      name='preparation_time'
                      component='input'
                      type='text'
                      placeholder='hh:mm:ss'
                      validate={composeValidators(
                        required,
                        followsPattern(
                          `^([0-9]{1}[0-9]{1}:[0-5]{1}[0-9]{1}:[0-5]{1}[0-9]{1}$)`,
                          'hh:mm:ss'
                        )
                      )}
                    />
                    <Error name='preparation_time' />
                  </div>
                </div>
                <div>
                  <label>Type:</label>
                  <div>
                    <Field name='type' component='select' validate={required}>
                      {dishTypes.map((type, index) => (
                        <option key={index} value={type}>
                          {type}
                        </option>
                      ))}
                    </Field>
                    <Error name='type' />
                  </div>
                </div>
                <Condition when='type' is='pizza'>
                  <div>
                    <label>Number of slices:</label>
                    <div>
                      <Field
                        name='no_of_slices'
                        component='input'
                        type='number'
                        min='1'
                        step='1'
                        placeholder='Please enter number of slices'
                        validate={composeValidators(
                          required,
                          mustBeNumber,
                          minValue(1),
                          maxValue(12)
                        )}
                      />
                      <Error name='no_of_slices' />
                    </div>
                  </div>
                  <div>
                    <label>Diameter (cm):</label>
                    <div>
                      <Field
                        name='diameter'
                        component='input'
                        type='number'
                        min='20'
                        placeholder='How large should be your pizza?'
                        validate={composeValidators(
                          required,
                          mustBeNumber,
                          minValue(20),
                          maxValue(60)
                        )}
                      />
                      <Error name='diameter' />
                    </div>
                  </div>
                </Condition>
                <Condition when='type' is='soup'>
                  <div>
                    <label>
                      Spiciness: <span>{rangeValue ? rangeValue : '?'}</span>
                    </label>
                    <div>
                      <Field
                        name='spiciness_scale'
                        component='input'
                        type='range'
                        min='1'
                        max='10'
                        step='1'
                        defaultValue={1}
                        validate={required}
                      />
                      <Error name='spiciness_scale' />
                    </div>
                  </div>
                </Condition>
                <Condition when='type' is='sandwich'>
                  <div>
                    <label>Number of bread slices:</label>
                    <div>
                      <Field
                        name='slices_of_bread'
                        component='input'
                        type='number'
                        placeholder='How many slices of bread shoud be used?'
                        validate={composeValidators(
                          required,
                          mustBeNumber,
                          minValue(1)
                        )}
                      />
                      <Error name='slices_of_bread' />
                    </div>
                  </div>
                </Condition>
                {httpError && <div className='error'>{httpError}</div>}
                <div className='buttons'>
                  <button type='submit' disabled={submitting || pristine}>
                    Submit
                  </button>
                  <button type='button' onClick={onReset} disabled={submitting}>
                    Reset
                  </button>
                </div>
              </form>
            );
          }}
        </Form>
      )}
      {reload && (
        <Message
          onClick={backHandler}
          buttonLabel={'New Dish'}
          message={'Your dish was succesfully created!'}
        />
      )}
    </Styles>
  );
};

export default DishForm;
