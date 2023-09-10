import { IFormValidations } from './Validator.interface';

export type IFormState = {
  [key: string]: string | number | boolean;
};

export type IFormValidateData = {
  [key: string]: IFormValidations;
};
