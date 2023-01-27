import { InvoiceItem } from './InvoiceItem';

export const InvoiceItems = ({ items }) => {
  return (
    <div className="flex flex-col justify-center gap-6 primary-bg p-4 rounded-t-sm">
      {items?.map((item, i) => {
        return <InvoiceItem item={item} key={`item${i}`} />;
      })}
    </div>
  );
};
