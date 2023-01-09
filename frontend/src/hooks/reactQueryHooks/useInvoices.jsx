import { useQuery } from '@tanstack/react-query';
import { getInvoices } from '../useInvoicesApi';

export const useInvoices = () =>
  useQuery({
    queryKey: ['invoices'],
    queryFn: getInvoices,
  });
