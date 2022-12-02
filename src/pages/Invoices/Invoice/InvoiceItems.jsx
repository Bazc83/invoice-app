import { InvoiceItem } from './InvoiceItem';

export const InvoiceItems = ({items}) => {
  return (
    <div>
      {items?.map((item, i) => {
        return <InvoiceItem item={item} key={`item${i}`} />;
      })}
    </div>
  );
};
