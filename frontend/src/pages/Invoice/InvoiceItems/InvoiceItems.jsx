import { InvoiceItem } from './InvoiceItem';

export const InvoiceItems = ({ items }) => {
  return (
    <div className="flex flex-col justify-center gap-6 bg-gray-200 dark:bg-gray-700 text-gray-900  dark:text-white p-4 rounded-t-sm ">
      {items?.map((item, i) => {
        return <InvoiceItem item={item} key={`item${i}`} />;
      })}
    </div>
  );
};
