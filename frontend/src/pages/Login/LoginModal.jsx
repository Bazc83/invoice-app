import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { useLogin } from '@/hooks/useLogin';

export function LoginModal() {
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
    <div className="fixed inset-0 z-20 h-full  w-full bg-black bg-opacity-70 ">
      <div className="absolute top-[20%] left-[50%] z-50 flex w-[calc(100%_-_2rem)] max-w-xl -translate-x-[50%] -translate-y-[20%] flex-col items-start justify-center gap-6 rounded-md bg-skin-secondary p-6 text-skin-base  ">
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="mx-auto flex w-full flex-col gap-6 rounded-md bg-skin-secondary p-6 text-skin-base shadow-md md:p-8 "
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
              className="btn | bg-skin-success text-white hover:opacity-90 disabled:bg-gray-700 disabled:text-gray-600"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;
