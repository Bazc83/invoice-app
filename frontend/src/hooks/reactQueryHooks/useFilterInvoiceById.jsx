import { useQuery } from '@tanstack/react-query';

import { getInvoice } from '@/hooks/useInvoicesApi';

export const useFilterInvoiceById = (invoiceId) =>
  useQuery({
    queryKey: ['filteredInvoice', invoiceId],
    queryFn: () => getInvoice(invoiceId),
    staleTime: 1000,
  });
