import { useFieldArray, useForm } from 'react-hook-form';
import { FaTrashAlt } from 'react-icons/fa';

import ItemTotal from '@/components/ItemTotal';
import useModalStore from '@/context/useModalStore';

import CancelEditFormModal from '../CancelEditFormModal';

export function InvoiceForm({ invoiceData, handleFormSubmit, handleCancel }) {
  const confirmationModal = useModalStore((s) => s.confirmationModal);

  const { register, handleSubmit, control } = useForm({
    defaultValues: { ...invoiceData },
  });

  console.log(invoiceData);
  const { fields, append, remove } = useFieldArray({ control, name: 'items' });

  return (
    <div className="secondary-bg relative z-50  row-span-1 row-start-1 flex h-max flex-col gap-8 p-4 sm:p-8">
      {/* confirm cancel modal */}
      {confirmationModal && <CancelEditFormModal />}

      <h2 className="text-xl">Edit #{invoiceData.id}</h2>

      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex flex-col gap-4"
      >
        <div>
          <input
            id="id"
            name="id"
            type="text"
            {...register('id')}
            defaultValue={invoiceData.id}
            hidden
          />
        </div>
        <h2 className=" text-lg">Sender Details:</h2>
        <div>
          <label className="secondary-text" htmlFor="companyName">
            Company Name{' '}
          </label>
          <input
            id="companyName"
            name="companyName"
            type="text"
            {...register('companyName')}
          />
        </div>
        <div>
          <label className="secondary-text" htmlFor="senderStreet">
            Sender Street{' '}
          </label>
          <input
            id="senderStreet"
            name="senderStreet"
            type="text"
            {...register('senderStreet')}
          />
        </div>

        <div>
          <label className="secondary-text" htmlFor="senderCity">
            Sender City
          </label>
          <input name="senderCity" type="text" {...register('senderCity')} />
        </div>
        <div>
          <label className="secondary-text" htmlFor="senderPostCode">
            Sender Postcode
          </label>
          <input type="text" {...register('senderPostCode')} />
        </div>
        <div>
          <label className="secondary-text" htmlFor="senderCountry">
            Sender Country
          </label>
          <input
            type="text"
            name="senderCountry"
            {...register('senderCountry')}
          />
        </div>

        <h2 className="pt-6 text-lg">Client Details:</h2>
        <div>
          <label className="secondary-text" htmlFor="clientName">
            Client Name
          </label>
          <input type="text" {...register('clientName')} />
        </div>
        <div>
          <label className="secondary-text" htmlFor="clientEmail">
            Client Email
          </label>
          <input type="email" {...register('clientEmail')} />
        </div>
        <div>
          <label className="secondary-text" htmlFor="clientStreet">
            Client Street
          </label>
          <input type="text" {...register('clientStreet')} />
        </div>
        <div>
          <label className="secondary-text" htmlFor="clientCity">
            Client City
          </label>
          <input type="text" {...register('clientCity')} />
        </div>
        <div>
          <label className="secondary-text" htmlFor="clientPostCode">
            Client Postcode
          </label>
          <input type="text" {...register('clientPostCode')} />
        </div>
        <div>
          <label className="secondary-text" htmlFor="clientCountry">
            Client Country
          </label>
          <input type="text" {...register('clientCountry')} />
        </div>

        <h2 className="pt-6 text-lg">Invoice Information:</h2>
        <div>
          <label className="secondary-text" htmlFor="description">
            Description
          </label>
          <input type="text" {...register('description')} />
        </div>

        <div>
          <label htmlFor="statusSelect">Payment Status</label>
          {/* Payment status */}
          <select {...register('status')} id="statusSelect" name="status">
            <option value="draft">Draft</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
          </select>
        </div>

        <div>
          <label htmlFor="createdAt">Created At</label>
          <input type="date" {...register('createdAt')} />
        </div>
        <div>
          <label htmlFor="selectPaymentTerms">Payment Terms</label>
          {/* Payment Terms */}
          <select {...register('paymentTerms')} id="selectPaymentTerms">
            <option value="Cash">Cash</option>
            <option value="15 days from invoice date">
              15 days from invoice date
            </option>
            <option value="21 days from invoice date">
              21 days from invoice date
            </option>
          </select>
        </div>
        {/* Form Items section */}
        {/* <FormItems invoiceData={invoiceData}/> */}

        <div>
          <h2>Items:</h2>
          {fields.map(({ id, name, quantity, price }, index) => (
            <div key={id}>
              <div>
                <label htmlFor={`items[${index}].name`}>Item Name</label>
                <input
                  {...register(`items[${index}].name`)}
                  type="text"
                  id="itemName"
                  defaultValue={name}
                />
              </div>
              <div>
                <label htmlFor={`items[${index}].quantity`}>Quantity</label>
                <input
                  {...register(`items[${index}].quantity`)}
                  type="number"
                  id="itemName"
                  defaultValue={quantity}
                />
              </div>
              <div>
                <label htmlFor={`items[${index}].price`}>Price</label>
                <input
                  {...register(`items[${index}].price`)}
                  type="number"
                  id="itemName"
                  defaultValue={price}
                />
              </div>
              <ItemTotal control={control} index={index} register={register} />

              <button type="button" onClick={() => remove(index)}>
                <FaTrashAlt />
              </button>
            </div>
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
