// import data from '@data/data.json';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
// import { InvoicesContext } from '../../context/InvoicesData';
import { getInvoices } from '../../features/invoice/invoicesSlice';
import { InvoicePreview } from './InvoicePreview';
import styles from './Invoices.module.css';
import { InvoicesPageControls } from './InvoicesPageControls/InvoicesPageControls';
import { NoInvoices } from './NoInvoices/NoInvoices';

export const Invoices = () => {


 
  const dispatch = useDispatch();

  const { invoices, isError, message, isSuccess, isLoading} = useSelector((state)=> state.invoices)

  useEffect(()=>{
    dispatch(getInvoices())
  },[])


  return (
    <div className={`container main-bg`}>
      <Outlet />

      <InvoicesPageControls invoicesData={invoices?.length} />

      <div className={styles.invoicesWrapper}>
        {invoices &&
          invoices?.map((invoice) => {
            return <InvoicePreview invoice={invoice} key={invoice.id} />;
          })}
      </div>
    </div>
  );
};
