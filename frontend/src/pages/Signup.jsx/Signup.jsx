import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import FormSectionButton from '@/components/FormSectionButton';
import TextInputWithValidation from '@/components/TextInputWithValidation';
import { useSignup } from '@/hooks/useSignup';

export function Signup() {
  const { signup, isLoading, error } = useSignup();

  const handleFormSubmit = async (data) => {
    await signup(data.email, data.password);
  };

  const [currentForm, setCurrentForm] = useState('personal');

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({});

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  //   watch,
  // } = useForm();

  return (
    <div className="px-8 py-8">
      {/* todo remove Hidden  */}
      {/* todo remove Hidden  */}
      {/* todo remove Hidden  */}
      {/* todo remove Hidden  */}
      {/* todo remove Hidden  */}
      {/* todo remove Hidden  */}
      {/* todo remove Hidden  */}
      <div className=" mx-auto  hidden max-w-lg rounded-b-md">
        {/* primary-bg removed  */}
        {/* primary-bg removed  */}
        {/* primary-bg removed  */}
        {/* primary-bg removed  */}
        <div className=" mb-10 flex  justify-between">
          <FormSectionButton
            currentForm={currentForm}
            setCurrentForm={setCurrentForm}
            formSectionTitle="signup"
          >
            Login <span className="hidden md:inline">Details</span>
          </FormSectionButton>

          <FormSectionButton
            currentForm={currentForm}
            setCurrentForm={setCurrentForm}
            formSectionTitle="personal"
          >
            Personal <span className="hidden md:inline">Details</span>
          </FormSectionButton>

          <FormSectionButton
            currentForm={currentForm}
            setCurrentForm={setCurrentForm}
            formSectionTitle="company"
          >
            Company <span className="hidden md:inline">Details</span>
          </FormSectionButton>
        </div>

        <div className=" secondary-bg   rounded-b-md px-8 py-10 shadow-md md:pb-16">
          {currentForm === 'signup' && (
            <form
              onSubmit={handleSubmit(handleFormSubmit)}
              className="secondary-bg mx-auto flex max-w-lg flex-col gap-6 rounded-md p-6 shadow-md md:p-8 "
            >
              <h3 className="text-center text-2xl ">Sign up</h3>

              {/* Email */}
              <div className="flex flex-col gap-3">
                <label htmlFor="email">Email</label>
                <input
                  className="inputError"
                  aria-invalid={errors.email && errors.email ? 'true' : 'false'}
                  aria-errormessage="Valid email is required"
                  type="email"
                  {...register('email', {
                    required: {
                      value: true,
                      message: 'A valid email is required',
                    },
                    pattern: {
                      value: /^\w+([.-]?\w+)*@\w+([.]?)+(\.\w{2,3})+$/,
                      message: 'Please enter a valid email',
                    },
                  })}
                />

                {errors.email && errors.email?.type && (
                  <span className="errorMessage" role="alert">
                    {errors.email.message}
                  </span>
                )}
              </div>

              {/* Password */}
              <div className="flex flex-col gap-3">
                <label htmlFor="password">Password</label>
                <input
                  className={`inputError `}
                  aria-invalid={
                    errors.password && errors.password?.type ? 'true' : 'false'
                  }
                  aria-errormessage="Password too weak"
                  type="password"
                  {...register('password', {
                    required: {
                      value: true,
                      message: 'Password is required',
                    },
                    pattern: {
                      value:
                        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,30}$/,
                      message: 'Stronger password required',
                    },
                  })}
                />

                {errors.password && errors.password?.type && (
                  <span className="errorMessage" role="alert">
                    {errors.password.message}
                  </span>
                )}
              </div>

              {/* Confirmation password */}
              <div className="flex flex-col gap-3">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  className={`inputError `}
                  aria-invalid={
                    errors.confirmPassword && errors.confirmPassword?.type
                      ? 'true'
                      : 'false'
                  }
                  aria-errormessage="Passwords don't match"
                  type="password"
                  {...register('confirmPassword', {
                    required: {
                      value: true,
                      message: 'Confirm password is required',
                    },
                    // eslint-disable-next-line consistent-return
                    validate: (value) => {
                      if (watch('password') !== value)
                        return "Passwords don't match!";
                    },
                  })}
                />

                {errors.confirmPassword && errors.confirmPassword?.type && (
                  <span className="errorMessage" role="alert">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>

              {error && (
                <div className="rounded-md bg-red-800 py-2 text-center text-white">
                  {error}
                </div>
              )}

              <div className=" flex flex-wrap-reverse items-center justify-between py-2">
                <Link
                  to="/login"
                  className="text-gray-600 underline underline-offset-2 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100"
                >
                  Click here to Login
                </Link>
                {/* <button
              type="submit"
              disabled={isLoading}
              className="btn | bg-green-700 text-white hover:bg-green-900/90 "
            >
              Sign Up
            </button> */}
                <button
                  type="button"
                  disabled={isLoading}
                  className="btn | flex items-center justify-center  gap-2 bg-green-700 text-white hover:bg-green-900/90"
                >
                  Personal details <FaChevronRight />
                </button>
              </div>
            </form>
          )}
          {currentForm === 'personal' && (
            <form
              onSubmit={handleSubmit(handleFormSubmit)}
              className="flex  flex-col gap-4 rounded-md shadow-md  md:gap-8"
            >
              <div className="flex flex-col gap-6">
                {/* First Name */}
                <TextInputWithValidation
                  errors={errors}
                  register={register}
                  labelName="First name"
                  inputName="firstName"
                />
                {/* Surname */}
                <TextInputWithValidation
                  errors={errors}
                  register={register}
                  labelName="Surname"
                  inputName="surname"
                />
              </div>
              <button
                type="submit"
                className="btn | mt-4 bg-green-900 py-2 hover:opacity-80"
              >
                Save
              </button>
            </form>
          )}

          {currentForm === 'company' && (
            <form
              onSubmit={handleSubmit(handleFormSubmit)}
              className="flex  flex-col gap-4 rounded-md shadow-md  md:gap-8"
            >
              <div className="flex flex-col gap-6 ">
                {/* Company name */}
                <TextInputWithValidation
                  errors={errors}
                  register={register}
                  labelName="Company Name"
                  inputName="companyName"
                />

                {/* Sender street */}
                <TextInputWithValidation
                  errors={errors}
                  register={register}
                  labelName="Street"
                  inputName="senderStreet"
                />

                {/* Sender city */}
                <TextInputWithValidation
                  errors={errors}
                  register={register}
                  labelName="City"
                  inputName="senderCity"
                />
                {/* Sender postcode */}
                <TextInputWithValidation
                  errors={errors}
                  register={register}
                  labelName="Postcode"
                  inputName="senderPostCode"
                />

                {/* Sender Country */}
                <TextInputWithValidation
                  errors={errors}
                  register={register}
                  labelName="Country"
                  inputName="senderCountry"
                />
              </div>

              <button
                type="submit"
                className="btn | mt-4 bg-green-900 py-2 hover:opacity-80"
              >
                Save
              </button>
            </form>
          )}
        </div>
      </div>
      <div className="mx-auto  max-w-lg rounded-b-md bg-skin-secondary px-8 py-8">
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="flex  flex-col gap-4 rounded-md  md:gap-8"
        >
          <div className="flex flex-col gap-6 ">
            {/* Company name */}
            <TextInputWithValidation
              errors={errors}
              register={register}
              labelName="Company Name"
              inputName="companyName"
            />

            {/* Sender street */}
            <TextInputWithValidation
              errors={errors}
              register={register}
              labelName="Street"
              inputName="senderStreet"
            />

            {/* Sender city */}
            <TextInputWithValidation
              errors={errors}
              register={register}
              labelName="City"
              inputName="senderCity"
            />
            {/* Sender postcode */}
            <TextInputWithValidation
              errors={errors}
              register={register}
              labelName="Postcode"
              inputName="senderPostCode"
            />

            {/* Sender Country */}
            <TextInputWithValidation
              errors={errors}
              register={register}
              labelName="Country"
              inputName="senderCountry"
            />
          </div>

          <button
            type="submit"
            className="btn | mt-4 bg-green-900 py-2 hover:opacity-80"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
export default Signup;
