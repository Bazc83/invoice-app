/* eslint-disable no-underscore-dangle */
import { useFieldArray, useForm } from 'react-hook-form';

import useModalStore from '@/context/useModalStore';

import CancelEditFormModal from '../CancelEditFormModal';
import InvoiceFormItem from './InvoiceFormItem';

export function InvoiceForm({ invoiceData, handleFormSubmit, handleCancel }) {
  const confirmationModal = useModalStore((s) => s.confirmationModal);

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
    <div className="primary-bg relative flex h-max flex-col pb-10  sm:px-6 md:pt-8  ">
      {/* confirm cancel modal */}
      {confirmationModal && <CancelEditFormModal />}

      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className=" secondary-bg mx-auto flex w-full max-w-2xl flex-col gap-10 rounded-md py-6 px-8 shadow-md "
      >
        <div className="flex flex-col gap-4">
          <h1 className="secondary-text text-2xl">Edit #{invoiceData.id}</h1>

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

          <div className="flex flex-col gap-3">
            <label htmlFor="companyName">Company Name </label>
            <input
              id="companyName"
              name="companyName"
              type="text"
              {...register('companyName')}
            />
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="senderStreet">Street </label>
            <input
              id="senderStreet"
              name="senderStreet"
              type="text"
              {...register('senderStreet')}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-3">
              <label htmlFor="senderCity">City</label>
              <input
                name="senderCity"
                type="text"
                {...register('senderCity')}
              />
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="senderPostCode">Postcode</label>
              <input type="text" {...register('senderPostCode')} />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="senderCountry">Country</label>
            <input
              type="text"
              name="senderCountry"
              {...register('senderCountry')}
            />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h2 className=" text-xl ">Client Details:</h2>
          <div className="flex flex-col gap-3 ">
            <label htmlFor="clientName">Client Name</label>
            <input
              className={`${
                errors.clientName?.type === 'required' &&
                'border-3 border-red-600'
              }`}
              type="text"
              {...register('clientName', { required: true })}
            />

            {errors.clientName?.type === 'required' && (
              <p className="text-sm text-red-500 " role="alert">
                First name is required
              </p>
            )}
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="clientEmail">Client Email</label>
            <input
              type="email"
              {...register('clientEmail', { required: true })}
            />
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="clientStreet">Street</label>
            <input type="text" {...register('clientStreet')} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-3">
              <label htmlFor="clientCity">City</label>
              <input type="text" {...register('clientCity')} />
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="clientPostCode">Postcode</label>
              <input type="text" {...register('clientPostCode')} />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="clientCountry">Country</label>
            <input type="text" {...register('clientCountry')} />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h2 className=" text-xl ">Invoice Information:</h2>
          <div className="flex flex-col gap-3">
            <label htmlFor="description">Description</label>
            <input type="text" {...register('description')} />
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="selectPaymentTerms">Payment Terms</label>
            {/* Payment Terms */}
            <select
              {...register('paymentTerms', { required: true })}
              id="selectPaymentTerms"
              className="formSelectInput"
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

          <div className="grid grid-cols-2 gap-4">
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

            <div className="flex flex-col gap-3">
              <label htmlFor="createdAt">Created At</label>
              <input
                type="date"
                {...register('createdAt', { required: true })}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {/* Form Items */}
          <h2 className="  text-xl">Items:</h2>

          {fields.map((item, index) => (
            <InvoiceFormItem
              item={item}
              key={item._id}
              index={index}
              register={register}
              remove={remove}
              control={control}
            />
          ))}

          {/* Add a new item */}
          <button
            className="btn w-full border-2  border-gray-500 text-gray-800 hover:bg-gray-800 hover:text-white dark:border-gray-400 dark:text-gray-400 hover:dark:border-gray-900 hover:dark:bg-gray-900 hover:dark:text-white"
            type="button"
            onClick={() => append({})}
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
    </div>
  );
}

export default InvoiceForm;
