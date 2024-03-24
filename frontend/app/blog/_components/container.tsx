type Props = {
  children?: React.ReactNode;
};

const Container = ({ children }: Props) => {
  return (
    <div className="md:container mx-auto md:px-20 px-5 bg-black">
      {children}
    </div>
  );
};

export default Container;
