function InvoicesTable({ children, addClass }) {
  return (
    <div
      className={`relative grid grid-cols-2 gap-4 md:grid-cols-[1fr_2fr_2fr_100px_60px_60px] md:items-center md:gap-4   lg:grid-cols-[1fr_2fr_2fr_2fr_1fr_80px] ${
        addClass && addClass
      }`}
    >
      {children}
    </div>
  );
}
export default InvoicesTable;
