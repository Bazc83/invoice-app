function TextInputWithValidation({ errors, register, labelName, inputName }) {
  return (
    <div className="flex flex-col gap-3">
      <label htmlFor={inputName}>{labelName}</label>
      <input
        className={`inputError `}
        aria-invalid={
          errors[inputName] && errors[inputName]?.type ? 'true' : 'false'
        }
        type="text"
        {...register(inputName, {
          required: { value: true, message: `${labelName} is required` },
          pattern: {
            value: /^[a-zA-Z0-9 -']+$/,
            message: `${labelName} is invalid`,
          },
        })}
      />

      {errors[inputName] && errors[inputName]?.type && (
        <span className="errorMessage" role="alert">
          {errors[inputName].message}
        </span>
      )}
    </div>
  );
}
export default TextInputWithValidation;
