type Props = {
  children?: React.ReactNode;
};

const Container = ({ children }: Props) => {
  return <div className="md:container mx-auto px-20 bg-black">{children}</div>;
};

export default Container;
