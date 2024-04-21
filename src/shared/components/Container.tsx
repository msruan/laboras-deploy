type containerProps = {
  children: JSX.Element[];
};

export const Container = ({ children }: containerProps) => {
  return (
    <div className="grid grid-cols-3 gap-20 bg-[#0F0B1C] h-screen">
      {children}
    </div>
  );
};
