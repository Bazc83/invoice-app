// import { useEffect, useState } from 'react';

// import styles from './InvoiceFormInput.module.css';

// export const InvoiceFormInput = ({
//   type,
//   className,
//   itemName,
//   itemLabel,
//   inputError,
//   maxWidth,
//   disabled,
//   noBg,
//   value,
//   setValue,
//   item,
// }) => {
//   const [itemValue, setItemValue] = useState(value);

//   const handleChange = (e) => {
//     setItemValue(e.target.value);
//     setValue(e);
//   };

//   useEffect(() => {
//     setItemValue(value);
//   }, [value]);

//   return (
//     <div
//       className={`${styles.invoiceFormInput} ${
//         inputError ? styles.inputError : ''
//       }  ${maxWidth === 'max-content' ? styles.maxContent : ''} ${
//         noBg ? styles.noBg : ''
//       }  ${className ? className : ''}`}>

//         <label htmlFor={itemName} className='text-faded'>
//           {itemLabel}
//         </label>

//         <input
//           type={type ? type : 'text'}
//           name={itemName}
//           className={`text`}
//           value={itemValue}
//           onChange={handleChange}
//           disabled={disabled}
//         />

//     </div>
//   );
// };
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import styles from './InvoiceFormInput.module.css';

export const InvoiceFormInput = ({
  type,
  className,
  itemName,
  itemLabel,
  inputError,
  maxWidth,
  disabled,
  noBg,
  value,
  setValue,
  item,
  formValue,
}) => {
  const { control } = useForm();
  return (
    <div
      className={`${styles.invoiceFormInput} ${
        inputError ? styles.inputError : ''
      }  ${maxWidth === 'max-content' ? styles.maxContent : ''} ${
        noBg ? styles.noBg : ''
      }  ${className ? className : ''}`}>
      <label htmlFor={itemName} className='text-faded'>
        {itemLabel}
      </label>

      <Controller
        type={type ? type : 'text'}
        name={itemName}
        control={control}
        render={({ field }) => (
          <input
            {...field}
            value={field.value ?? formValue}
            className={`text`}
          />
        )}
      />
    </div>
  );
};
