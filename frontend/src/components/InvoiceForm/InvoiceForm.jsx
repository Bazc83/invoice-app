/* eslint-disable no-underscore-dangle */
import { useFieldArray, useForm} from 'react-hook-form';

import useModalStore from '@/context/useModalStore';

import CancelEditFormModal from '../CancelEditFormModal';
import InvoiceFormItem from './InvoiceFormItem';

export function InvoiceForm({ invoiceData, handleFormSubmit, handleCancel }) {
  const confirmationModal = useModalStore((s) => s.confirmationModal);

  const { register, handleSubmit, control } = useForm({
    defaultValues: { ...invoiceData },
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'items' });


  return (
    <div className="secondary-bg relative z-50  row-span-1 row-start-1 flex h-max flex-col gap-8 p-4 pt-8 sm:p-8">
      {/* confirm cancel modal */}
      {confirmationModal && <CancelEditFormModal />}

      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="primary-bg  mx-auto flex w-full max-w-3xl flex-col gap-6 rounded-md py-6 px-8"
      >
        <h1 className="secondary-text text-2xl">Edit #{invoiceData.id}</h1>

        <input
          id="id"
          name="id"
          type="text"
          {...register('id')}
          defaultValue={invoiceData.id}
          hidden
        />

        <h2 className="pt-6 text-xl">Sender Details:</h2>

        <div className="flex flex-col gap-2">
          <label htmlFor="companyName">Company Name </label>
          <input
            id="companyName"
            name="companyName"
            type="text"
            {...register('companyName')}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="senderStreet">Sender Street </label>
          <input
            id="senderStreet"
            name="senderStreet"
            type="text"
            {...register('senderStreet')}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="senderCity">Sender City</label>
          <input name="senderCity" type="text" {...register('senderCity')} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="senderPostCode">Sender Postcode</label>
          <input type="text" {...register('senderPostCode')} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="senderCountry">Sender Country</label>
          <input
            type="text"
            name="senderCountry"
            {...register('senderCountry')}
          />
        </div>

        <h2 className="pt-6 text-xl ">Client Details:</h2>
        <div className="flex flex-col gap-2">
          <label htmlFor="clientName">Client Name</label>
          <input type="text" {...register('clientName')} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="clientEmail">Client Email</label>
          <input type="email" {...register('clientEmail')} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="clientStreet">Client Street</label>
          <input type="text" {...register('clientStreet')} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="clientCity">Client City</label>
          <input type="text" {...register('clientCity')} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="clientPostCode">Client Postcode</label>
          <input type="text" {...register('clientPostCode')} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="clientCountry">Client Country</label>
          <input type="text" {...register('clientCountry')} />
        </div>

        <h2 className="pt-6 text-xl ">Invoice Information:</h2>
        <div className="flex flex-col gap-2">
          <label htmlFor="description">Description</label>
          <input type="text" {...register('description')} />
        </div>

        <div className="flex flex-col gap-2">
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

        <div className="flex flex-col gap-2">
          <label htmlFor="createdAt">Created At</label>
          <input type="date" {...register('createdAt')} />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="selectPaymentTerms">Payment Terms</label>
          {/* Payment Terms */}
          <select
            {...register('paymentTerms')}
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

        {/* Form Items */}
        <div className="flex flex-col gap-6">
          <h2 className=" text-lg">Items:</h2>
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

          <button className="btn" type="button" onClick={() => append({})}>
            Add Item
          </button>
        </div>

        <div className=" mt-6 flex justify-between gap-4 ">
          <button
            type="button"
            className="btn | flex items-center  justify-center gap-2  bg-red-800 text-white hover:bg-red-900"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn | flex items-center  justify-center gap-2 bg-green-800 text-white  hover:bg-green-900"
          >
            Submit Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default InvoiceForm;
