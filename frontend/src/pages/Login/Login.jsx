import { useForm } from 'react-hook-form';

import { useLogin } from '@/hooks/useLogin';

export function Login() {
  const { login, error, isLoading } = useLogin();

  const handleFormSubmit = async (data) => {
    await login(data.email, data.password);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="h-full min-h-[calc(100vh-5rem)]  w-full bg-black/10 dark:bg-black/60 ">
      <div className="px-8 py-8">
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="secondary-bg mx-auto flex max-w-lg flex-col gap-6 rounded-md p-6 shadow-md md:p-8 "
        >
          <h3 className="text-center text-2xl ">Login</h3>

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
              aria-errormessage="Password is required"
              type="password"
              {...register('password', {
                required: { value: true, message: 'Password is required' },
              })}
            />

            {errors.password && errors.password?.type && (
              <span className="errorMessage" role="alert">
                {errors.password.message}
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
              className="btn | bg-green-700 text-white hover:bg-green-900/90 disabled:bg-gray-700 disabled:text-gray-600"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
