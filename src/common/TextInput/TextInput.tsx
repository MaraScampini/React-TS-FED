import { errorCheck } from '../../services/useful';

interface InputProps {
    name: string,
    type: string,
    placeholder: string,
    design: string,
    state: Function,
    errorState: Function,
    password1: string
}

export const TextInput = ({name, type, placeholder, design, state, errorState, password1} : InputProps) => {

    const inputHandler = ({ target }: React.ChangeEvent<HTMLInputElement>, state:Function) => {
        const { name, value } = target;
        state((prevState : any) => ({
          ...prevState,
          [name]: value,
        }));
      };

      const errorHandler = ({ target }: React.FocusEvent<HTMLInputElement>, errorState: Function, password1: string) => {
        const { name, value } = target;
        let message = errorCheck(name, value, password1);
        errorState((prevState: any) => ({
          ...prevState,
          [name]: message,
        }));
      };

  return (
    <input
    type={type}
    placeholder={placeholder}
    name={name}
    className={design}
    onChange={(e)=>inputHandler(e, state)}
    onBlur={(e)=>errorHandler(e, errorState, password1)}
    />
  )
}
