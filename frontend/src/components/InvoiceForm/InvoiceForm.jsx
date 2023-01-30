import { useFilterInvoiceById } from "@/hooks/reactQueryHooks/useFilterInvoiceById";
import { FormItem } from "@/ui/FormItem";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

export const InvoiceForm = ({
  formData,
  itemsArray,
  setItemsArray,
  handleFormSubmit,
  handleCancel,
}) => {
  const { invoiceId } = useParams();
  const { data, isLoading, isError, error } = useFilterInvoiceById(invoiceId);

  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      id: invoiceId,
      senderStreet: data["senderStreet"],
      senderCity: data["senderCity"],
      senderPostCode: data["senderPostCode"],
      senderCountry: data["senderCountry"],
      clientName: data["clientName"],
      clientEmail: data["clientEmail"],
      clientStreet: data["clientStreet"],
      clientCity: data["clientCity"],
      clientPostCode: data["clientPostCode"],
      clientCountry: data["clientCountry"],
      description: data["description"],
      items: [],
    },
  });

  const onSubmit = (data) => {
    handleFormSubmit(data);
  };

  if (isLoading) return "Loading ...";
  if (isError) return `Error ... ${error}`;

  return (
    <div className="secondary-bg z-50 col-span-full row-span-full flex h-max flex-col  gap-8 p-8">
      <h2 className="text-xl">Edit #{formData?.id}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormItem>
          <label className="secondary-text" htmlFor="senderStreet">
            Sender Street
          </label>
          <input
            className="primary-bg"
            type="text"
            {...register("senderStreet")}
          />
        </FormItem>
        <FormItem>
          <label className="secondary-text" htmlFor="senderCity">
            Sender City
          </label>
          <input
            className="primary-bg"
            type="text"
            {...register("senderCity")}
          />
        </FormItem>
        <FormItem>
          <label className="secondary-text" htmlFor="senderPostCode">
            Sender Postcode
          </label>
          <input
            className="primary-bg"
            type="text"
            {...register("senderPostCode")}
          />
        </FormItem>
        <FormItem>
          <label className="secondary-text" htmlFor="senderCountry">
            Sender Country
          </label>
          <input
            className="primary-bg"
            type="text"
            {...register("senderCountry")}
          />
        </FormItem>
        <FormItem>
          <label className="secondary-text" htmlFor="clientName">
            Client Name
          </label>
          <input
            className="primary-bg"
            type="text"
            {...register("clientName")}
          />
        </FormItem>
        <FormItem>
          <label className="secondary-text" htmlFor="clientEmail">
            Client Email
          </label>
          <input
            className="primary-bg"
            type="email"
            {...register("clientEmail")}
          />
        </FormItem>
        <FormItem>
          <label className="secondary-text" htmlFor="clientStreet">
            Client Street
          </label>
          <input
            className="primary-bg"
            type="text"
            {...register("clientStreet")}
          />
        </FormItem>
        <FormItem>
          <label className="secondary-text" htmlFor="clientCity">
            Client City
          </label>
          <input
            className="primary-bg"
            type="text"
            {...register("clientCity")}
          />
        </FormItem>
        <FormItem>
          <label className="secondary-text" htmlFor="clientPostCode">
            Client Postcode
          </label>
          <input
            className="primary-bg"
            type="text"
            {...register("clientPostCode")}
          />
        </FormItem>
        <FormItem>
          <label className="secondary-text" htmlFor="clientCountry">
            Client Country
          </label>
          <input
            className="primary-bg"
            type="text"
            {...register("clientCountry")}
          />
        </FormItem>
        <FormItem>
          <label className="secondary-text" htmlFor="description">
            Description
          </label>
          <input
            className="primary-bg"
            type="text"
            {...register("description")}
          />
        </FormItem>

        <button type="submit">Submit form</button>
      </form>
    </div>
  );
};
