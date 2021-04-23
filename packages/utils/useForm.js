import { useState, useEffect } from "react"

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

export const useStatus = () => {
  const [status, setStatus] = useState({
    isWaiting: false,
    isSubmited: false,
    info: { isError: false, msg: null },
  })

  const isWaiting = event =>
    setStatus(prevStatus => ({ ...prevStatus, isWaiting: event }))

  const toggleIsWaiting = () =>
    setStatus(prevStatus => ({
      ...prevStatus,
      isWaiting: !status.isWaiting,
    }))

  const isSubmited = event =>
    setStatus(prevStatus => ({ ...prevStatus, isSubmited: event }))

  const toggleIsSubmited = () =>
    setStatus(prevStatus => ({
      ...prevStatus,
      isSubmited: !status.isSubmited,
    }))

  const isError = event =>
    setStatus(prevStatus => ({
      ...prevStatus,
      info: {
        error: event,
        ...prevStatus.info,
      },
    }))

  const toggleIsError = () =>
    setStatus(prevStatus => ({
      ...prevStatus,
      info: {
        error: !prevStatus.info.isError,
        ...prevStatus.info,
      },
    }))

  const setMessage = message =>
    setStatus(prevStatus => ({
      ...prevStatus,
      info: {
        message: message,
        ...prevStatus.info,
      },
    }))

  const message = status.info.msg

  return {
    state: status,
    setStatus,
    message,
    setMessage,
    isWaiting,
    isSubmited,
    isError,
    toggleIsWaiting,
    toggleIsSubmited,
    toggleIsError,
  }
}
