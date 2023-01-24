export const Container = ({ children, className }) => {
  return <div className={`mx-auto p-6 ${className}`}>{children}</div>;
};
