const Skeleton = ({ className }) => {
  return (
    <div
      className={`animate-pulse bg-white/20 rounded-md ${className}`}
    ></div>
  );
};

export default Skeleton;
