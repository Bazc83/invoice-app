// parent needs const [currentForm, setCurrentForm] = usestate('defaultFormtitle')

// Needs prop of form section title

function FormSectionButton({
  currentForm,
  setCurrentForm,
  formSectionTitle,
  children,
  disabled,
}) {
  if (!formSectionTitle) return null;
  return (
    <button
      disabled={disabled}
      type="button"
      aria-expanded={currentForm === formSectionTitle}
      className={`border-skin-btn-default/30 flex w-full cursor-pointer items-center justify-center gap-2 border-r-4  bg-skin-btn-default py-4  first:rounded-tl-md  last:rounded-tr-md last:border-r-0  hover:scale-[.98]   aria-expanded:bg-skin-secondary `}
      onClick={() => setCurrentForm(formSectionTitle)}
    >
      {children}
    </button>
  );
}
export default FormSectionButton;
