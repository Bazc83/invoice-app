import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import FormSectionButton from '@/components/FormSectionButton';
import TextInputWithValidation from '@/components/TextInputWithValidation';
import useCheckForUser from '@/hooks/useCheckForUser';
import { useSignup } from '@/hooks/useSignup';

export function Signup() {
  const { signup, isLoading, error } = useSignup();

  const { checkIfTaken } = useCheckForUser();

  const [currentForm, setCurrentForm] = useState('signup');

  const [alreadyTaken, setAlreadyTaken] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({});

  const [loginDetailsError, setLoginDetailsError] = useState(true);
  const [personalDetailsError, setPersonalDetailsError] = useState(true);

  const handleLoginDetails = async (data) => {
    const taken = await checkIfTaken(data.email);

    if (taken) {
      setAlreadyTaken(true);
    } else {
      setAlreadyTaken(false);

      if (!errors.email && !errors.password && !errors.confirmPassword) {
        setCurrentForm('personal');

        setLoginDetailsError(false);
      } else {
        setLoginDetailsError(true);
      }
    }
  };

  const handlePersonalDetails = () => {
    if (!errors.firstName && !errors.surname) {
      setCurrentForm('company');

      setPersonalDetailsError(false);
    } else {
      setPersonalDetailsError(true);
    }
  };

  const handleFormSubmit = async (data) => {
    await signup(data);
  };

  return (
    <div className="px-8 py-8">
      <div className=" mx-auto  max-w-lg rounded-b-md">
        <div className="flex  justify-between">
          <FormSectionButton
            currentForm={currentForm}
            setCurrentForm={setCurrentForm}
            formSectionTitle="signup"
            addClass={`${
              (errors.email || errors.password || errors.confirmPassword) &&
              'text-skin-danger border-b-2 border-b-skin-danger'
            } `}
          >
            Login <span className="hidden md:inline">Details</span>
          </FormSectionButton>

          <FormSectionButton
            currentForm={currentForm}
            setCurrentForm={setCurrentForm}
            formSectionTitle="personal"
            disabled={loginDetailsError}
          >
            Personal <span className="hidden md:inline">Details</span>
          </FormSectionButton>

          <FormSectionButton
            currentForm={currentForm}
            setCurrentForm={setCurrentForm}
            formSectionTitle="company"
            disabled={personalDetailsError}
          >
            Company <span className="hidden md:inline">Details</span>
          </FormSectionButton>
        </div>

        <div className=" rounded-b-md bg-skin-secondary   px-8 py-10 text-skin-base shadow-md md:pb-16">
          {/* Sign up */}
          {currentForm === 'signup' && (
            <form
              className="flex flex-col gap-4 rounded-md  md:gap-8"
              onSubmit={handleSubmit(handleLoginDetails)}
            >
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

              {alreadyTaken && (
                <div className="rounded-md bg-red-800 py-2 text-center text-white">
                  Email already taken! Please login or use different email.
                </div>
              )}

              <div className=" flex flex-wrap-reverse items-baseline justify-center gap-2 py-2 md:justify-between">
                <Link
                  to="/login"
                  className="text-gray-600 underline underline-offset-2 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100"
                >
                  Click here to Login
                </Link>

                <button
                  type="submit"
                  className="btn | flex items-center justify-center  gap-2 bg-skin-success text-skin-inverted hover:opacity-90 disabled:opacity-10 "
                >
                  Personal details <FaChevronRight />
                </button>
              </div>
            </form>
          )}

          {currentForm === 'personal' && (
            <form
              onSubmit={handleSubmit(handlePersonalDetails)}
              className="flex flex-col gap-4 rounded-md  md:gap-8"
            >
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

              <div className="flex flex-wrap justify-between gap-1 ">
                <button
                  type="button"
                  className="btn | flex items-center justify-center  gap-2 bg-skin-success text-skin-inverted hover:opacity-90"
                  onClick={() => setCurrentForm('signup')}
                >
                  <FaChevronLeft /> Login
                </button>
                <button
                  type="submit"
                  className="btn | flex items-center justify-center  gap-2 bg-skin-success text-skin-inverted hover:opacity-90"
                >
                  Company <FaChevronRight />
                </button>
              </div>
            </form>
          )}

          {currentForm === 'company' && (
            <form
              onSubmit={handleSubmit(handleFormSubmit)}
              className="flex flex-col gap-4 rounded-md  md:gap-8"
            >
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

              <div className="flex flex-wrap justify-between gap-1 ">
                <button
                  type="button"
                  className="btn | flex items-center justify-center  gap-2 bg-skin-success text-skin-inverted hover:opacity-90"
                  onClick={() => setCurrentForm('personal')}
                >
                  <FaChevronLeft /> Personal
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn | flex items-center justify-center  gap-2 bg-skin-success text-skin-inverted hover:opacity-90"
                >
                  Submit
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
export default Signup;
