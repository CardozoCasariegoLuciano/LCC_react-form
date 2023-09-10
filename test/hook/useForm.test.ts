import { renderHook } from '@testing-library/react';
import { ChangeEvent } from 'react';
import { act } from 'react-dom/test-utils';
import { useForm } from './../../src/useHook/useForm';

describe('useForm test cases', () => {
  describe('When have NOT validations object', () => {
    test('Should show the initial values', () => {
      const initialForm = {
        name: 'Test',
        email: 'email@mail.com',
      };
      const {
        result: { current },
      } = renderHook(() => useForm(initialForm));

      expect(current.name).toBe(initialForm.name);
      expect(current.email).toBe(initialForm.email);
      expect(current.formState).toBe(initialForm);
    });

    test('on blur and input have no error', () => {
      const initialForm = {
        name: 'Test',
        email: 'email@mail.com',
      };
      const {
        result: { current },
      } = renderHook(() => useForm(initialForm));

      /* eslint-disable indent */
      const mockEventBlur:
        | ChangeEvent<HTMLInputElement>
        | ChangeEvent<HTMLTextAreaElement> = {
        target: { name: 'name', value: '' },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any;
      /* eslint-enable indent */

      act(() => {
        current.onBlur(mockEventBlur);
      });

      expect(current.formErrors).toEqual({ name: {}, email: {} });
      expect(current.hasErrors()).toBeFalsy();
    });

    test('should Change the input', () => {
      const initialForm = {
        nombre: '',
      };
      const { result } = renderHook(() => useForm(initialForm));
      const { onInputChange } = result.current;

      act(() => {
        onInputChange({
          target: { name: 'nombre', value: '123123' },
        } as ChangeEvent<HTMLInputElement>);
      });

      expect(result.current.nombre).toBe('123123');
    });

    test('Should restore the form with the initial values', () => {
      const initialForm = {
        nombre: 'initialValue',
      };
      const { result } = renderHook(() => useForm(initialForm));
      const { onInputChange, onResetForm } = result.current;

      act(() => {
        onInputChange({
          target: { name: 'nombre', value: '123123' },
        } as ChangeEvent<HTMLInputElement>);
      });

      expect(result.current.nombre).toBe('123123');

      act(() => {
        onResetForm();
      });

      expect(result.current.nombre).toBe(initialForm.nombre);
    });
  });

  describe('When have validation object', () => {
    test('the form have no errors at the beginner', () => {
      const initialForm = {
        name: 'Test',
      };
      const validation = {
        name: { required: true },
      };
      const { result } = renderHook(() => useForm(initialForm, validation));
      const { formErrors, hasErrors } = result.current;

      expect(formErrors).toEqual({ name: {} });
      expect(hasErrors()).toBeFalsy();
    });

    test('The form must find any error at blur (Required validation)', () => {
      const initialForm = {
        name: 'Test',
      };
      const validation = {
        name: { required: true },
      };
      const { result } = renderHook(() => useForm(initialForm, validation));
      const { onBlur, hasErrors } = result.current;

      act(() => {
        onBlur({
          target: { name: 'name', value: '' },
        } as ChangeEvent<HTMLInputElement>);
      });

      expect(hasErrors()).toBeTruthy();
    });

    test('The form could have more that one validation', () => {
      const initialForm = {
        nombre: 'Test',
      };
      const validation = {
        nombre: { required: true, email: true, regex: /$test/ },
      };
      const { result } = renderHook(() => useForm(initialForm, validation));
      const { onBlur, formErrors } = result.current;

      act(() => {
        onBlur({
          target: { name: 'nombre', value: '' },
        } as ChangeEvent<HTMLInputElement>);
      });

      expect(formErrors.nombre).toEqual({
        required: expect.any(String),
        email: expect.any(String),
        regex: expect.any(String),
      });
    });

    test('The form must find any error at write (Min validation)', () => {
      const initialForm = {
        name: 'Test',
      };
      const validation = {
        name: { min: 2 },
      };
      const { result } = renderHook(() => useForm(initialForm, validation));
      const { onInputChange, hasErrors } = result.current;

      act(() => {
        onInputChange({
          target: { name: 'name', value: 'a' },
        } as ChangeEvent<HTMLInputElement>);
      });

      expect(hasErrors()).toBeTruthy();
    });

    test('If the input is empty after text must show no errors', () => {
      const initialForm = {
        name: 'Test',
      };
      const validation = {
        name: { min: 2 },
      };
      const { result } = renderHook(() => useForm(initialForm, validation));
      const { onInputChange, hasErrors } = result.current;

      act(() => {
        onInputChange({
          target: { name: 'name', value: '' },
        } as ChangeEvent<HTMLInputElement>);
      });

      expect(hasErrors()).toBeFalsy();
    });

    test('onCleanInput just clean the input target (value and errors)', () => {
      const initialForm = {
        name: 'init',
        email: 'init',
      };
      const validations = {
        name: { min: 20 },
        email: { min: 20 },
      };

      const { result } = renderHook(() => useForm(initialForm, validations));
      const { onInputChange, onCleanInput } = result.current;

      act(() => {
        onInputChange({
          target: { name: 'name', value: 'nameText' },
        } as ChangeEvent<HTMLInputElement>);

        onInputChange({
          target: { name: 'email', value: 'emailText' },
        } as ChangeEvent<HTMLInputElement>);

        onCleanInput('name');
      });

      expect(result.current.name).toBe('');
      expect(result.current.email).toBe('emailText');

      expect(result.current.formErrors.name).toEqual({});
      expect(result.current.formErrors.email).not.toEqual({});
    });

    test('The form must find any error (Max validation)', () => {
      const initialForm = {
        name: '',
      };
      const validation = {
        name: { max: 4 },
      };
      const { result } = renderHook(() => useForm(initialForm, validation));
      const { onBlur, hasErrors } = result.current;

      act(() => {
        onBlur({
          target: { name: 'name', value: '1234567' },
        } as ChangeEvent<HTMLInputElement>);
      });

      expect(hasErrors()).toBeTruthy();
    });

    test('The form must find any error (Email validation)', () => {
      const initialForm = {
        userEmail: '',
      };
      const validation = {
        userEmail: { email: true },
      };
      const { result } = renderHook(() => useForm(initialForm, validation));
      const { onBlur, hasErrors } = result.current;

      act(() => {
        onBlur({
          target: { name: 'userEmail', value: 'notValidEmail' },
        } as ChangeEvent<HTMLInputElement>);
      });

      expect(hasErrors()).toBeTruthy();
    });

    test('The form must find any error (Regex validation)', () => {
      const initialForm = {
        password: '',
      };
      const validation = {
        password: { regex: /$123abc/ },
      };
      const { result } = renderHook(() => useForm(initialForm, validation));
      const { onBlur, hasErrors } = result.current;

      act(() => {
        onBlur({
          target: { name: 'password', value: 'notJust123abc' },
        } as ChangeEvent<HTMLInputElement>);
      });

      expect(hasErrors()).toBeTruthy();
    });

    test('The form must find any error (Regex validation)', () => {
      const initialForm = {
        password: '123123',
        confirmPassword: '',
      };
      const validation = {
        password: { require: true },
        confirmPassword: { equalTo: 'password' },
      };
      const { result } = renderHook(() => useForm(initialForm, validation));
      const { onBlur, hasErrors } = result.current;

      act(() => {
        onBlur({
          target: { name: 'confirmPassword', value: 'asdasd' },
        } as ChangeEvent<HTMLInputElement>);
      });

      expect(hasErrors()).toBeTruthy();
    });
  });

  describe('When have NOT validations custom messages', () => {
    test('Default msg for required validation must be "[fieldName] field is required"', () => {
      const initialForm = {
        nombre: '',
      };
      const validation = {
        nombre: { required: true },
      };
      const { result } = renderHook(() => useForm(initialForm, validation));
      const { onBlur, formErrors } = result.current;

      act(() => {
        onBlur({
          target: { name: 'nombre', value: '' },
        } as ChangeEvent<HTMLInputElement>);
      });

      expect(formErrors.nombre).toEqual({
        required: 'nombre field is requiered',
      });
    });

    test('Default msg for min validation must be "[fieldName] must have more than [fieldValue] characters"', () => {
      const initialForm = {
        nombre: '',
      };
      const validation = {
        nombre: { min: 4 },
      };
      const { result } = renderHook(() => useForm(initialForm, validation));
      const { onBlur, formErrors } = result.current;

      act(() => {
        onBlur({
          target: { name: 'nombre', value: '' },
        } as ChangeEvent<HTMLInputElement>);
      });

      expect(formErrors.nombre).toEqual({
        min: 'nombre must have more than 4 characters',
      });
    });

    test('Default msg for max validation must be "[fieldName] must have less than [fieldValue] characters"', () => {
      const initialForm = {
        nombre: '',
      };
      const validation = {
        nombre: { max: 4 },
      };
      const { result } = renderHook(() => useForm(initialForm, validation));
      const { onBlur, formErrors } = result.current;

      act(() => {
        onBlur({
          target: { name: 'nombre', value: '123456' },
        } as ChangeEvent<HTMLInputElement>);
      });

      expect(formErrors.nombre).toEqual({
        max: 'nombre must have less than 4 characters',
      });
    });

    test('Default msg for regex validation must be "[fieldName] not match the regex"', () => {
      const initialForm = {
        nombre: '',
      };
      const validation = {
        nombre: { regex: /$123123/ },
      };
      const { result } = renderHook(() => useForm(initialForm, validation));
      const { onBlur, formErrors } = result.current;

      act(() => {
        onBlur({
          target: { name: 'nombre', value: 'asdasd' },
        } as ChangeEvent<HTMLInputElement>);
      });

      expect(formErrors.nombre).toEqual({
        regex: 'nombre not match the regex',
      });
    });

    test('Default msg for email validation must be "this field is not a valid email"', () => {
      const initialForm = {
        nombre: '',
      };
      const validation = {
        nombre: { email: true },
      };
      const { result } = renderHook(() => useForm(initialForm, validation));
      const { onBlur, formErrors } = result.current;

      act(() => {
        onBlur({
          target: { name: 'nombre', value: 'asdasd' },
        } as ChangeEvent<HTMLInputElement>);
      });

      expect(formErrors.nombre).toEqual({
        email: 'this field is not a valid email',
      });
    });

    test('Default msg for equalTO validation must be "[fieldName] must have equal to [fieldValue]"', () => {
      const initialForm = {
        nombre: 'test',
        nombre2: '',
      };
      const validation = {
        nombre2: { equalTo: 'nombre' },
      };
      const { result } = renderHook(() => useForm(initialForm, validation));
      const { onBlur, formErrors } = result.current;

      act(() => {
        onBlur({
          target: { name: 'nombre2', value: '123123' },
        } as ChangeEvent<HTMLInputElement>);
      });

      expect(formErrors.nombre2).toEqual({
        equalTo: 'nombre2 must have equal to nombre',
      });
    });
  });

  describe('When have a custom messages', () => {
    test('Must show the custom msg', () => {
      const initialForm = {
        nombre: '',
      };
      const validation = {
        nombre: { required: true },
      };
      const customMessagges = {
        nombre: { required: 'Custom error msg' },
      };

      const { result } = renderHook(() =>
        useForm(initialForm, validation, customMessagges),
      );
      const { onBlur, formErrors } = result.current;

      act(() => {
        onBlur({
          target: { name: 'nombre', value: '' },
        } as ChangeEvent<HTMLInputElement>);
      });

      expect(formErrors.nombre).toEqual({
        required: 'Custom error msg',
      });
    });
  });
});
