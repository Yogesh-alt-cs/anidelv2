const Loader = ({ className }) => {
  return (
    <div className={`flex loader justify-center select-none items-center ${className}`}>
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 rounded-full border-4 border-orange-500/20"></div>
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-orange-500 border-r-yellow-500 animate-spin"></div>
        <div className="absolute inset-2 rounded-full border-4 border-transparent border-b-red-500 animate-spin animation-delay-150" style={{ animationDirection: 'reverse' }}></div>
      </div>
    </div>
  )
}

export default Loader
