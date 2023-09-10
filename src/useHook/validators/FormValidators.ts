/* eslint-disable no-magic-numbers */
import { IFormValidateData } from '../interfaces/Forms.interface';
import {
  IFormValidations,
  IFormValidationsErrors,
} from '../interfaces/Validator.interface';

export const FormValidator = (
  actual: IFormValidationsErrors,
  name: string,
  value: string | number | boolean,
  validations?: IFormValidateData,
  optional?: string | number | boolean,
  customMessagges?: IFormValidationsErrors,
): IFormValidationsErrors => {
  if (!validations) return {};
  const rules: IFormValidations = validations[name];
  if (!rules) {
    return actual;
  }

  const rulesByInput: string[] = Object.keys(rules);

  if (!actual[name]) {
    actual[name] = {};
  }

  if (
    rulesByInput.includes('required') &&
    rules['required'] &&
    String(value).length === 0
  ) {
    actual[name].required =
      customMessagges && customMessagges[name]?.required
        ? customMessagges![name].required
        : defaultErrorMessagge(name).required.messagge;
  } else {
    delete actual[name].required;
  }

  if (rulesByInput.includes('regex') && !rules['regex']!.test(String(value))) {
    actual[name].regex =
      customMessagges && customMessagges[name]?.regex
        ? customMessagges![name].regex
        : defaultErrorMessagge(name).regex.messagge;
  } else {
    delete actual[name].regex;
  }

  if (
    rulesByInput.includes('email') &&
    rules['email'] &&
    !emailRegex.test(String(value))
  ) {
    actual[name].email =
      customMessagges && customMessagges[name]?.email
        ? customMessagges![name].email
        : defaultErrorMessagge(name).email.messagge;
  } else {
    delete actual[name].email;
  }

  if (rulesByInput.includes('min') && String(value).length <= rules['min']!) {
    actual[name].min =
      customMessagges && customMessagges[name]?.min
        ? customMessagges![name].min
        : defaultErrorMessagge(name, rules['min']).min.messagge;
  } else {
    delete actual[name].min;
  }

  if (rulesByInput.includes('max') && String(value).length >= rules['max']!) {
    actual[name].max =
      customMessagges && customMessagges[name]?.max
        ? customMessagges![name].max
        : defaultErrorMessagge(name, rules['max']).max.messagge;
  } else {
    delete actual[name].max;
  }

  if (rulesByInput.includes('equalTo') && !isEqualTo(value, optional)) {
    actual[name].equalTo =
      customMessagges && customMessagges[name]?.equalTo
        ? customMessagges![name].equalTo
        : defaultErrorMessagge(name, rules['equalTo']).equalTo.messagge;
  } else {
    delete actual[name].equalTo;
  }

  return actual;
};

const isEqualTo = (
  value: string | number | boolean,
  toCompare?: string | number | boolean,
): boolean => {
  if (!toCompare) return true;
  if (toCompare != value) return false;

  return true;
};

const defaultErrorMessagge = (
  name: string,
  value?: string | number,
): IFormValidationsErrors => {
  return {
    required: { messagge: `${name} field is requiered` },
    regex: { messagge: `${name} not match the regex` },
    email: { messagge: 'this field is not a valid email' },
    min: { messagge: `${name} must have more than ${value} characters` },
    max: { messagge: `${name} must have less than ${value} characters` },
    equalTo: { messagge: `${name} must have equal to ${value}` },
  };
};

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
