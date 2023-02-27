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
    <div className=" mx-auto  max-w-lg rounded-b-md ">
      <div className="flex justify-between bg-skin-primary text-skin-base ">
        <button
          type="button"
          aria-expanded={currentForm === 'personal'}
          className="block w-full cursor-pointer bg-skin-primary py-4 hover:opacity-90 aria-expanded:rounded-t-md aria-expanded:bg-skin-secondary"
          onClick={() => setCurrentForm('personal')}
        >
          Personal <span className="hidden md:inline">Details</span>
        </button>
        <button
          type="button"
          aria-expanded={currentForm === 'company'}
          className="block w-full  cursor-pointer text-skin-base hover:opacity-90 aria-expanded:rounded-t-md aria-expanded:bg-skin-secondary"
          onClick={() => setCurrentForm('company')}
        >
          Company <span className="hidden md:inline">Details</span>
        </button>
      </div>

      <div className=" rounded-b-md bg-skin-secondary   px-8 py-10 text-skin-base shadow-md md:pb-16">
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
              className="btn | mt-4 bg-skin-success py-2 text-white hover:opacity-90"
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
              className="btn | mt-4 bg-skin-success py-2 text-white hover:opacity-90"
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
