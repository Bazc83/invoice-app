import { useQuery } from '@tanstack/react-query';

const getId = async () => {
  const response = await fetch(`/api/invoiceId`);

  const json = await response.json();

  if (response.ok) {
    return json;
  }

  return json.error;
};

const useInvoiceId = () => {
  const queryResponse = useQuery({
    queryKey: ['invoiceId'],
    queryFn: () => getId(),
  });

  return { ...queryResponse };
};

export default useInvoiceId;

