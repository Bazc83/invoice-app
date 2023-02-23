function NavLinkItem({ children }) {
  return (
    <li className=" block  w-full  cursor-pointer border-b border-b-gray-700  px-4 py-2 last:border-none hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700">
      {children}
    </li>
  );
}
export default NavLinkItem;
