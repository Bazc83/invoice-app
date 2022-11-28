import { DarkModeContext } from '@/App';
import styles from '@styles/Invoices.module.css';
import { useContext } from 'react';
import { InvoicesPageControls } from './InvoicesPageControls';
export const Invoices = () => {
  const { light } = useContext(DarkModeContext);

  return (
    <div className='container'>
      <InvoicesPageControls light={light} />
    </div>
  );
};
