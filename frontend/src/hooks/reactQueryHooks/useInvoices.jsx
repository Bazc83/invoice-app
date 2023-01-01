import { useQuery } from '@tanstack/react-query';
import { getInvoices } from '../useInvoicesApi';

export const useInvoices = () => useQuery(['invoices'], getInvoices);
