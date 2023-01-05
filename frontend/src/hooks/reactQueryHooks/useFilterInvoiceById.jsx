import { useQuery } from '@tanstack/react-query';
import { getInvoice } from '../useInvoicesApi';

export const useFilterInvoiceById = (invoiceId) =>
  useQuery(['invoices', invoiceId], () => getInvoice(invoiceId));
