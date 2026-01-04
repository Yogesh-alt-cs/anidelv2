const Skeleton = ({ className }) => {
  return (
    <div
      className={`animate-pulse bg-white/10 rounded-md ${className}`}
    ></div>
  );
};

export default Skeleton;
