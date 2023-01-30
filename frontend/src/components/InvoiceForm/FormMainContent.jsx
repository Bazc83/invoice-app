import { InvoiceContext } from "@/context/InvoiceContext";
import { useContext } from "react";
import { FormInput } from "./FormInput";
import styles from "./InvoiceForm.module.css";
import { SelectPaymentTerms } from "./SelectPaymentTerms";

export function FormMainContent() {
  const { state, dispatch } = useContext(InvoiceContext);

  const inputOnChange = (e) => {
    dispatch({ type: "changeFormData", payload: e });
  };

  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-4">
        <h4 className={styles.formSectionHeader}>Bill From</h4>

        <div className="flex flex-col gap-4">
          <FormInput
            itemName="senderStreet"
            itemLabel="Street Address"
            value={state.formData.senderStreet || ""}
            setValue={inputOnChange}
          />
          <FormInput
            itemName="senderCity"
            itemLabel="City"
            value={state.formData.senderCity || ""}
            setValue={inputOnChange}
          />
          <FormInput
            itemName="senderPostCode"
            itemLabel="Postcode"
            value={state.formData.senderPostCode || ""}
            setValue={inputOnChange}
          />
          <FormInput
            itemName="senderCountry"
            itemLabel="Country"
            value={state.formData.senderCountry || ""}
            setValue={inputOnChange}
          />
        </div>
      </section>

      <div>
        <h4 className={styles.formSectionHeader}>Bill To</h4>
        <section className="flex flex-col gap-4">
          <FormInput
            itemName="clientName"
            itemLabel="Client's Name"
            value={state.formData.clientName || ""}
            setValue={inputOnChange}
          />
          <FormInput
            type="email"
            itemName="clientEmail"
            itemLabel="Client's Email"
            value={state.formData.clientEmail || ""}
            setValue={inputOnChange}
          />

          <FormInput
            itemName="clientStreet"
            itemLabel="Street Address"
            value={state.formData.clientStreet || ""}
            setValue={inputOnChange}
          />
          <FormInput
            itemName="clientCity"
            itemLabel="City"
            value={state.formData.clientCity || ""}
            setValue={inputOnChange}
          />
          <FormInput
            itemName="clientPostCode"
            itemLabel="Post Code"
            value={state.formData.clientPostCode || ""}
            setValue={inputOnChange}
          />
          <FormInput
            itemName="clientCountry"
            itemLabel="Country"
            value={state.formData.clientCountry || ""}
            setValue={inputOnChange}
          />

          {/* Select payment terms */}
          <SelectPaymentTerms />

          <FormInput
            itemName="description"
            itemLabel="Project/Description"
            value={state.formData.description || ""}
            setValue={inputOnChange}
          />
        </section>
      </div>
    </div>
  );
}
