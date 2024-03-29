export function RandomLogo() {
  return (
    <div className="relative  h-11 w-11 rounded-full bg-emerald-400 before:absolute before:top-3 before:left-5  before:z-10 before:h-5 before:w-5 before:rounded-tr-full before:bg-emerald-800 after:absolute after:top-3 after:left-1 after:z-10 after:h-5 after:w-5  after:rounded-bl-full after:bg-emerald-800  ">
      <div className="absolute top-3 left-6 z-[11] h-6 w-[0.5px] -rotate-[70deg] rounded-full bg-black" />
    </div>
  );
}

export default RandomLogo;
