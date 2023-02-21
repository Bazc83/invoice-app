import { useForm } from 'react-hook-form';

import { useSignup } from '@/hooks/useSignup';

export function Signup() {
  const { signup, isLoading, error } = useSignup();

  const handleFormSubmit = async (data) => {
    await signup(data.email, data.password);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  return (
    <div className="h-full min-h-[calc(100vh-5rem)]  w-full bg-black/10 dark:bg-black/60 ">
      <div className="px-8 py-8">
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="secondary-bg mx-auto flex max-w-lg flex-col gap-6 rounded-md p-6 shadow-md md:p-8 "
        >s
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
                required: { value: true, message: 'A valid email is required' },
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
                required: { value: true, message: 'Password is required' },
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

          <div className=" flex justify-end py-2">
            <button
              type="submit"
              disabled={isLoading}
              className="btn | bg-green-700 text-white hover:bg-green-900/90"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Signup;
