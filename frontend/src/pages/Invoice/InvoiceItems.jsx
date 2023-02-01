import { InvoiceItem } from './InvoiceItem';

export function InvoiceItems({ items }) {
  return (
    <div className="flex flex-col justify-center gap-6 rounded-t-sm bg-gray-200 p-4  text-gray-900 dark:bg-gray-700 dark:text-white ">
      {items?.map((item) => (
        <InvoiceItem item={item} key={item.itemId} />
      ))}
    </div>
  );
}

export default InvoiceItems;
