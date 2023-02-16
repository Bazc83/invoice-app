/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { formatISO } from 'date-fns';

import CancelEditFormModal from '@/components/CancelEditFormModal';
import InvoiceFormItem from '@/components/InvoiceForm/InvoiceFormItem';
import TextInputWithValidation from '@/components/InvoiceForm/TextInputWithValidation';
import useModalStore from '@/context/useModalStore';
import useAddNewInvoice from '@/hooks/reactQueryHooks/useAddNewInvoice';
import useInvoiceId from '@/hooks/reactQueryHooks/useInvoiceId';
import useUpdateInvoiceId from '@/hooks/reactQueryHooks/useUpdateInvoiceId';

export function NewInvoice() {
  const navigate = useNavigate();
  const confirmationModal = useModalStore((s) => s.confirmationModal);

  const { data: invoiceId, isLoading, isError } = useInvoiceId();

  const [newInvoiceId, setNewInvoiceId] = useState('');

  const todaysDate = formatISO(new Date(), { representation: 'date' });
  // const [paymentDue, setPaymentDue] = useState(todaysDate);
  const showConfirmationModal = useModalStore((s) => s.showConfirmationModal);

  const [createdAtDate, setCreatedAtDate] = useState();
  const [paymentTerms, setPaymentTerms] = useState();

  // todo left of here
  // todo
  // todo

  // todo Getting data onchange from form and then gonna use it generate payment due dates

  useEffect(() => {
    console.log(createdAtDate);
  }, [createdAtDate]);
  useEffect(() => {
    console.log(paymentTerms);
  }, [paymentTerms]);

  const [invoiceData, setInvoiceData] = useState({
    id: '',
    companyName: '',
    senderCity: '',
    senderStreet: '',
    senderPostCode: '',
    senderCountry: '',
    clientEmail: '',
    clientName: '',
    clientCity: '',
    clientStreet: '',
    clientCountry: '',
    clientPostCode: '',
    description: '',
    createdAt: '',
    paymentDue: '',
    paymentTerms: 'Cash',
    status: 'draft',
    amountDueTotal: 0,
    items: [],
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm({
    defaultValues: { ...invoiceData },
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'items' });

  const { newInvoiceMutation } = useAddNewInvoice();

  // update invoiceId
  const { updateIdMutation } = useUpdateInvoiceId();

  const handleFormSubmit = (data) => {
    const payloadData = {
      ...data,
      id: invoiceId,
      createdAt: todaysDate,
    };

    console.log(payloadData);

    newInvoiceMutation.mutate({
      invoiceData: payloadData,
    });

    // increase invoice id by one
    updateIdMutation.mutate();

    navigate(`/`);
  };

  // Handle cancel adding new invoice
  const handleCancel = () => {
    showConfirmationModal();
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ invoiceData });
    }
  }, [isSubmitSuccessful, invoiceData, reset]);

  useEffect(() => {
    if (invoiceId) {
      setNewInvoiceId(invoiceId);
    }
  }, [invoiceId]);

  if (isLoading) return <div>Loading ...</div>;
  if (isError) return <div>Error</div>;
  if (!newInvoiceId) return <div>Loading...</div>;

  return (
    <div className="primary-bg relative flex h-max flex-col pb-10 pt-6 sm:px-6 md:pt-8  ">
      {/* confirm cancel modal */}
      {confirmationModal && <CancelEditFormModal />}

      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className=" secondary-bg mx-auto flex w-full max-w-2xl flex-col gap-10 rounded-md py-6 px-8 shadow-md "
      >
        <div className="flex flex-col gap-4">
          <h1 className="secondary-text text-2xl">Edit #{newInvoiceId}</h1>

          <input
            id="id"
            name="id"
            type="text"
            {...register('id')}
            defaultValue={newInvoiceId}
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
                onChange: (e) => setPaymentTerms(e.target.value),
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
                {...register('createdAt', {
                  onChange: (e) => setCreatedAtDate(e.target.value),
                })}
              />
            </div>
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
    </div>
  );
}

export default NewInvoice;
