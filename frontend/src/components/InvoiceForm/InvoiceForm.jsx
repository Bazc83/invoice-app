import { FormItems } from '@/components/InvoiceForm/FormItems';
import { InvoiceContext } from '@/context/InvoiceContext';
import { useContext } from 'react';
import { FormButtons } from './FormButtons';
import { FormId } from './FormId';
import { FormMainContent } from './FormMainContent';
import styles from './InvoiceForm.module.css';

export const InvoiceForm = ({
  itemsArray,
  setItemsArray,
  handleFormSubmit,
  handleCancel,
}) => {
  const { state, dispatch } = useContext(InvoiceContext);

  // Update formdata when form values change
  const inputOnChange = (e) => {
    dispatch({ type: 'changeFormData', payload: e });
  };

  if (!state.formData) return 'Loading ...';

  return (
    <div className={styles.invoiceForm}>
      <FormId state={state} />

      <form className={styles.form}>
        <FormMainContent inputOnChange={inputOnChange} state={state} />

        <FormItems itemsArray={itemsArray} setItemsArray={setItemsArray} />

        <FormButtons
          handleCancel={handleCancel}
          handleFormSubmit={handleFormSubmit}
        />
      </form>
    </div>
  );
};
