import React, {ChangeEventHandler, useState} from "react";

interface FormInputProps {
  id: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}


const FormInput: React.FC<FormInputProps> = ({ id, type, value, onChange, placeholder }) => (
  <input
    id={id}
    name={id}
    type={type}
    required
    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
    placeholder={placeholder}
    value={value}
    onChange={onChange}
  />
);



export const useFormInput = (initialValue: string) => {
    const [value, setValue] = useState<string>(initialValue);
    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setValue(e.target.value);
    };
    return {
        value,
        onChange: handleChange,
    };
};

export default FormInput
