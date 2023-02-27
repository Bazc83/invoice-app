// parent needs const [currentForm, setCurrentForm] = usestate('defaultFormtitle')

// Needs prop of form section title

function FormSectionButton({
  currentForm,
  setCurrentForm,
  formSectionTitle,
  children,
}) {
  if (!formSectionTitle) return null;
  return (
    <button
      type="button"
      aria-expanded={currentForm === formSectionTitle}
      className="aria-expanded:secondary-bg s flex w-full cursor-pointer items-center justify-center gap-2  border-r-4  border-gray-800/30 bg-gray-200 py-4  first:rounded-tl-md last:rounded-tr-md  last:border-r-0   hover:scale-[.98] dark:bg-gray-600/40 dark:first:border-gray-800"
      onClick={() => setCurrentForm(formSectionTitle)}
    >
      {children}
    </button>
  );
}
export default FormSectionButton;
