import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { useLogin } from '@/hooks/useLogin';

export function Login() {
  const { login, error, isLoading } = useLogin();

  const handleFormSubmit = async (data) => {
    console.log(data);
    await login(data.email, data.password);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const notifyError = (errorVal) => toast.error(`${errorVal}`);

  useEffect(() => {
    if (error) {
      notifyError(error);
    }
  }, [error]);

  return (
    <div className="min-h-[calc(100vh-5rem)] h-full  w-full bg-black/10 dark:bg-black/60 ">
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
                  value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
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

          <div className=" flex justify-end py-2">
            <button
              type="submit"
              disabled={isLoading}
              className="btn | bg-green-700 text-white hover:bg-green-900/90"
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
