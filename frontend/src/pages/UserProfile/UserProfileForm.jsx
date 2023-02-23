import { useState } from 'react';
import { useForm } from 'react-hook-form';

import TextInputWithValidation from '@/components/TextInputWithValidation';

function UserProfileForm({ handleFormSubmit, userData }) {
  const [currentForm, setCurrentForm] = useState('personal');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { ...userData } });

  return (
    <div className=" relative flex h-full flex-col gap-4 rounded-md  lg:grid lg:grid-cols-[200px_1fr] ">
      <div className="secondary-bg flex w-full items-center justify-center gap-4  rounded-md p-4 lg:flex-col lg:items-start lg:justify-start lg:px-8 lg:pt-10">
        <button
          type="button"
          className="cursor-pointer hover:opacity-80"
          onClick={() => setCurrentForm('personal')}
        >
          Personal Details
        </button>
        <button
          type="button"
          className="cursor-pointer hover:opacity-80"
          onClick={() => setCurrentForm('company')}
        >
          Company Details
        </button>
        <button
          type="button"
          className="cursor-pointer hover:opacity-80"
          onClick={() => setCurrentForm('preferences')}
        >
          Preferences
        </button>
      </div>

      <div>
        {currentForm === 'personal' && (
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className=" secondary-bg mx-auto flex w-full max-w-2xl flex-col gap-10 rounded-md py-6 px-8 shadow-md "
          >
            <div className="flex flex-col gap-6">
              <h2 className=" text-xl">Personal Details</h2>

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
              className="btn | bg-green-900 py-2 hover:opacity-80"
            >
              Save
            </button>
          </form>
        )}

        {currentForm === 'company' && (
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className=" secondary-bg mx-auto flex w-full max-w-2xl flex-col gap-10 rounded-md py-6 px-8 shadow-md "
          >
            <div className="flex flex-col gap-6 ">
              <h2 className=" text-xl">Company Details</h2>
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

              <div className="grid grid-cols-2 gap-4">
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
              </div>

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
              className="btn | bg-green-900 py-2 hover:opacity-80"
            >
              Save
            </button>
          </form>
        )}
        {currentForm === 'preferences' && (
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className=" secondary-bg mx-auto flex w-full max-w-2xl flex-col gap-10 rounded-md py-6 px-8 shadow-md "
          >
            <div className="flex flex-col gap-6 ">
              <h2 className=" text-xl">Preferences</h2>

              {/* Sender Country */}
              <TextInputWithValidation
                errors={errors}
                register={register}
                labelName="test"
                inputName="test"
              />
            </div>

            <button
              type="submit"
              className="btn | bg-green-900 py-2 hover:opacity-80"
            >
              Save
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
export default UserProfileForm;
