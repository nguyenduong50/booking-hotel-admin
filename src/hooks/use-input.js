import { useReducer } from "react";

const initalInputState = {
    value: '',
    isTouched: false
}
  
const inputStateReducer = (state, action) => {
  if(action.type === 'INPUT'){
    return {
        value: action.value,
        isTouched: state.isTouched
    }
  }

  if(action.type === 'BLUR'){
    return {
        value: state.value,
        isTouched: true
    }
  }

  if(action.type === 'RESET'){
    return{
        value: '',
        isTouched: false
    }
  }
}

const useInput = (validateValue) => {
    const [inputState, dispatchInputState] = useReducer(inputStateReducer, initalInputState);

    const valueIsValid = validateValue(inputState.value);
    const hasError = !valueIsValid && inputState.isTouched;

    const valueChangeHandler = (value) => {
        dispatchInputState({type: 'INPUT', value: value});
    }

    const inputBlurHandler = () => {
        dispatchInputState({type: 'BLUR'});
    }

    const reset = () => {
        dispatchInputState({type: 'RESET'});
    }

    return{
        value: inputState.value,
        isValid: valueIsValid,
        hasError,
        valueChangeHandler,
        inputBlurHandler,
        reset
    }
}

export default useInput;