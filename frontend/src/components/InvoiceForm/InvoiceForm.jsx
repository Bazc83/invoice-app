import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { FormItemInput } from '@/components/FormItemInput';
import { useFilterInvoiceById } from '@/hooks/reactQueryHooks/useFilterInvoiceById';

import { FormItems } from './FormItems';

export function InvoiceForm({ handleFormSubmit, handleCancel }) {
  const { invoiceId } = useParams();
  const { data, isLoading, isError, error } = useFilterInvoiceById(invoiceId);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      id: invoiceId,
      senderStreet: data.senderStreet,
      senderCity: data.senderCity,
      senderPostCode: data.senderPostCode,
      senderCountry: data.senderCountry,
      clientName: data.clientName,
      clientEmail: data.clientEmail,
      clientStreet: data.clientStreet,
      clientCity: data.clientCity,
      clientPostCode: data.clientPostCode,
      clientCountry: data.clientCountry,
      description: data.description,
      companyName: data.companyName,
    },
  });

  if (isLoading) return 'Loading ...';
  if (isError) return `Error ... ${error}`;

  return (
    <div className="secondary-bg z-50 col-span-full row-span-full flex h-max flex-col  gap-8 p-4 sm:p-8">
      <h2 className="text-xl">Edit #{invoiceId}</h2>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex flex-col gap-4"
      >
        <FormItemInput>
          <label className="secondary-text" htmlFor="companyName">
            CompanyName{' '}
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

        <FormItems />

        <div className="mt-6 flex justify-between gap-4">
          <button
            type="button"
            className="btn | flex items-center  justify-center gap-2 border border-red-900 text-red-700 hover:bg-red-800 hover:text-white"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn | flex items-center  justify-center gap-2 bg-green-800 hover:bg-green-900  text-white"
          >
            Submit Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default InvoiceForm;
