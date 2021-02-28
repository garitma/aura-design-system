import { useState, useEffect } from "react"
import { useInputValue } from "./useInputValue"

export const useInputValue = initialValue => {
  const [value, setValue] = useState(initialValue)
  const [error, setError] = useState("")
  const [touch, setTouch] = useState(false)

  const onChange = e => {
    setValue(e.target.value), setTouch(true)
  }
  const reset = () => setValue("")
  const dialog = setError

  return { value, onChange, error, touch, reset, dialog, setTouch, setValue }
}

export const useForm = initialValues => {
  let data = {}

  for (const value in initialValues) {
    data = {
      ...data,
      [value]: useInputValue(initialValues[value]),
    }
  }

  return data
}

export const useFormReset = data => {
  for (const value in data) {
    data[value].reset(), data[value].setTouch(false)
  }
}

export const useFormIsValid = (data, schema) => {
  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    setIsValid(schema(data))
  }, [data])

  return isValid
}
