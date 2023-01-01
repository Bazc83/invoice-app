import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getInvoice } from '../useInvoicesApi';

export const useFilterInvoiceById = (invoiceId) =>
  useQuery(['invoices', invoiceId], () => getInvoice(invoiceId));
