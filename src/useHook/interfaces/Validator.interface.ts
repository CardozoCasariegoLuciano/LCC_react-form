export interface IFormValidations {
  [key: string]: string | boolean | number | undefined | RegExp;
  required?: boolean;
  email?: boolean;
  regex?: RegExp;
  min?: number;
  max?: number;
  equalTo?: string;
}

export interface IFormValidationsErrors {
  [key: string]: { [key: string]: string };
}
