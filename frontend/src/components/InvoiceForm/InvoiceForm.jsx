import { FormItems } from '@/components/InvoiceForm/FormItems';
import { InvoiceContext } from '@/context/InvoiceContext';
import { useContext } from 'react';
import { FormButtons } from './FormButtons';
import { FormId } from './FormId';
import { FormMainContent } from './FormMainContent';

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
    <div className="h-max z-50 secondary-bg flex flex-col gap-8 p-8 ">
      <FormId state={state} />

      <form className="flex flex-col">
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
