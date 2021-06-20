import { ChangeEvent, ChangeEventHandler } from "react";
import { useState } from "react";

type TuseForm = <T>(initialState: T) => {
  values: T;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  reset: () => void;
};

const useForm: TuseForm = (initialState) => {
  const [values, setValues] = useState(initialState);

  const reset = () => setValues(initialState);

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    setValues({ ...values, [target.name]: target.value });
  };

  return { values, handleInputChange, reset };
};

export default useForm;
