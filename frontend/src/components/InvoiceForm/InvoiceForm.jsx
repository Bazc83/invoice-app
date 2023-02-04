import { useContext } from 'react';
import { useForm } from 'react-hook-form';

import { FormItemInput } from '@/components/FormItemInput';
import { InvoiceContext } from '@/context/InvoiceContext';

import ConfirmCancelModal from '../ConfirmCancelModal';
import { FormItems } from './FormItems';
import { SelectPaymentTerms } from './SelectPaymentTerms';

export function InvoiceForm({ invoiceData, handleFormSubmit, handleCancel }) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      id: invoiceData.id,
      senderStreet: invoiceData.senderStreet,
      senderCity: invoiceData.senderCity,
      senderPostCode: invoiceData.senderPostCode,
      senderCountry: invoiceData.senderCountry,
      clientName: invoiceData.clientName,
      clientEmail: invoiceData.clientEmail,
      clientStreet: invoiceData.clientStreet,
      clientCity: invoiceData.clientCity,
      clientPostCode: invoiceData.clientPostCode,
      clientCountry: invoiceData.clientCountry,
      description: invoiceData.description,
      companyName: invoiceData.companyName,
      paymentTerms: invoiceData.paymentTerms,
    },
  });

  const { state } = useContext(InvoiceContext);

  return (
    <div className="secondary-bg relative z-50 col-span-full row-span-full flex h-max  flex-col gap-8 p-4 sm:p-8">
      {/* confirm cancel modal */}
      {state.showConfirmationModal && <ConfirmCancelModal />}

      <h2 className="text-xl">Edit #{invoiceData.id}</h2>

      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex flex-col gap-4"
      >
        <h2 className=" text-lg">Sender Details:</h2>
        <FormItemInput>
          <label className="secondary-text" htmlFor="companyName">
            Company Name{' '}
          </label>
          <input
            id="companyName"
            name="companyName"
            className="primary-bg"
            type="text"
            {...register('companyName')}
          />
        </FormItemInput>
        <FormItemInput>
          <label className="secondary-text" htmlFor="senderStreet">
            Sender Street{' '}
          </label>
          <input
            id="senderStreet"
            name="senderStreet"
            className="primary-bg"
            type="text"
            {...register('senderStreet')}
          />
        </FormItemInput>

        <FormItemInput>
          <label className="secondary-text" htmlFor="senderCity">
            Sender City
          </label>
          <input
            name="senderCity"
            className="primary-bg"
            type="text"
            {...register('senderCity')}
          />
        </FormItemInput>
        <FormItemInput>
          <label className="secondary-text" htmlFor="senderPostCode">
            Sender Postcode
          </label>
          <input
            className="primary-bg"
            type="text"
            {...register('senderPostCode')}
          />
        </FormItemInput>
        <FormItemInput>
          <label className="secondary-text" htmlFor="senderCountry">
            Sender Country
          </label>
          <input
            type="text"
            name="senderCountry"
            className="primary-bg"
            {...register('senderCountry')}
          />
        </FormItemInput>

        <h2 className="pt-6 text-lg">Client Details:</h2>
        <FormItemInput>
          <label className="secondary-text" htmlFor="clientName">
            Client Name
          </label>
          <input
            className="primary-bg"
            type="text"
            {...register('clientName')}
          />
        </FormItemInput>
        <FormItemInput>
          <label className="secondary-text" htmlFor="clientEmail">
            Client Email
          </label>
          <input
            className="primary-bg"
            type="email"
            {...register('clientEmail')}
          />
        </FormItemInput>
        <FormItemInput>
          <label className="secondary-text" htmlFor="clientStreet">
            Client Street
          </label>
          <input
            className="primary-bg"
            type="text"
            {...register('clientStreet')}
          />
        </FormItemInput>
        <FormItemInput>
          <label className="secondary-text" htmlFor="clientCity">
            Client City
          </label>
          <input
            className="primary-bg"
            type="text"
            {...register('clientCity')}
          />
        </FormItemInput>
        <FormItemInput>
          <label className="secondary-text" htmlFor="clientPostCode">
            Client Postcode
          </label>
          <input
            className="primary-bg"
            type="text"
            {...register('clientPostCode')}
          />
        </FormItemInput>
        <FormItemInput>
          <label className="secondary-text" htmlFor="clientCountry">
            Client Country
          </label>
          <input
            className="primary-bg"
            type="text"
            {...register('clientCountry')}
          />
        </FormItemInput>

        <h2 className="pt-6 text-lg">Invoice Information:</h2>
        <FormItemInput>
          <label className="secondary-text" htmlFor="description">
            Description
          </label>
          <input
            className="primary-bg"
            type="text"
            {...register('description')}
          />
        </FormItemInput>

        <SelectPaymentTerms />

        {/* Form Items section */}
        <FormItems />

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
