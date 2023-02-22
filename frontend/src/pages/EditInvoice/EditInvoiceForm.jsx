import { useFieldArray, useForm } from 'react-hook-form';

import InvoiceFormItem from '../../components/InvoiceFormItem';
import TextInputWithValidation from '../../components/TextInputWithValidation';

function EditInvoiceForm({ handleFormSubmit, handleCancel, invoiceData }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: { ...invoiceData },
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'items' });

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className=" secondary-bg mx-auto flex w-full max-w-2xl flex-col gap-10 rounded-md py-6 px-8 shadow-md "
    >
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl">Edit #{invoiceData.id}</h1>

        <input
          id="id"
          name="id"
          type="text"
          {...register('id')}
          defaultValue={invoiceData.id}
          hidden
        />
      </div>

      <div className="flex flex-col gap-6">
        <h2 className=" text-xl">Sender Details:</h2>

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

      <div className="flex flex-col gap-6">
        <h2 className=" text-xl ">Client Details:</h2>

        <TextInputWithValidation
          errors={errors}
          register={register}
          labelName="Client Name"
          inputName="clientName"
        />

        <div className="flex flex-col gap-3">
          <label htmlFor="clientEmail" className="inputError">
            Client Email
          </label>
          <input
            className="inputError"
            aria-invalid={
              errors.clientEmail && errors.clientEmail ? 'true' : 'false'
            }
            aria-errormessage="Valid email is required"
            type="email"
            {...register('clientEmail', {
              required: { value: true, message: 'A valid email is required' },
            })}
          />

          {errors.clientEmail && errors.clientEmail?.type && (
            <span className="errorMessage" role="alert">
              {errors.clientEmail.message}
            </span>
          )}
        </div>

        {/* Client Street */}
        <TextInputWithValidation
          errors={errors}
          register={register}
          labelName="Client Street"
          inputName="clientStreet"
        />

        <div className="grid grid-cols-2 gap-4">
          {/* Client City */}
          <TextInputWithValidation
            errors={errors}
            register={register}
            labelName="Client City"
            inputName="clientCity"
          />
          {/* Client Postcode */}
          <TextInputWithValidation
            errors={errors}
            register={register}
            labelName="Client PostCode"
            inputName="clientPostCode"
          />
        </div>

        {/* Client Country */}
        <TextInputWithValidation
          errors={errors}
          register={register}
          labelName="Client Country"
          inputName="clientCountry"
        />
      </div>

      <div className="flex flex-col gap-6">
        <h2 className=" text-xl ">Invoice Information:</h2>

        {/* Description */}
        <TextInputWithValidation
          errors={errors}
          register={register}
          labelName="Description"
          inputName="description"
        />

        <div className="flex flex-col gap-3">
          <label htmlFor="selectPaymentTerms">Payment Terms</label>
          {/* Payment Terms */}
          <select
            {...register('paymentTerms', {
              required: {
                value: true,
                message: 'Payment Terms are required',
              },
            })}
            id="selectPaymentTerms"
            className="formSelectInput"
            defaultValue="Cash"
          >
            <option value="Cash">Cash</option>
            <option value="15 days from invoice date">
              15 days from invoice date
            </option>
            <option value="21 days from invoice date">
              21 days from invoice date
            </option>
          </select>
        </div>

        <div className="flex flex-col gap-3">
          <label htmlFor="statusSelect">Payment Status</label>
          {/* Payment status */}
          <select
            {...register('status')}
            id="statusSelect"
            name="status"
            className="formSelectInput"
          >
            <option value="draft">Draft</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
          </select>
        </div>
      </div>

      {/* Form Items */}
      <div className="flex flex-col gap-6">
        <h2 className="  text-xl">Items:</h2>

        {fields.map((field, index) => (
          <InvoiceFormItem
            item={field}
            key={field.id}
            index={index}
            register={register}
            remove={remove}
            control={control}
            errors={errors}
          />
        ))}

        {/* Add a new item */}
        <button
          className="btn w-full border-2  border-gray-500 text-gray-800 hover:bg-gray-800 hover:text-white dark:border-gray-400 dark:text-gray-400 hover:dark:border-gray-900 hover:dark:bg-gray-900 hover:dark:text-white"
          type="button"
          onClick={() => append({ name: '', price: '0.00', quantity: 1 })}
        >
          Add Item
        </button>
      </div>

      {/* form buttons */}
      <div className=" mt-6 flex justify-between gap-4 ">
        <button
          type="button"
          className="btn | flex items-center  justify-center gap-3  bg-red-800 text-white hover:bg-red-900"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn | flex items-center  justify-center gap-3 bg-green-800 text-white  hover:bg-green-900"
        >
          Submit Changes
        </button>
      </div>
    </form>
  );
}
export default EditInvoiceForm;
