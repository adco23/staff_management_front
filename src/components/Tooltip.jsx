import { useRef } from "react";

const Tooltip = ({ children, tooltip }) => {
  const tooltipRef = useRef(null);
  const container = useRef(null);

  const handleOnMouseEnter = (e) => {
    const { clientX } = e;

    if (!tooltipRef.current || !container.current) return;

    const { left } = container.current.getBoundingClientRect();

    tooltipRef.current.style.left = clientX - left + "px";
  }

  return (
    <div ref={container} onMouseEnter={(e) => handleOnMouseEnter(e) } className="group relative inline-block" >
      {children}
      { tooltip ? (
        <span ref={tooltipRef} className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition bg-gray-700 text-white rounded absolute top-full px-4 py-2 flex flex-wrap max-w-96" >
          {tooltip}
        </span>
      ) : null }
      
    </div>
  );
};

export default Tooltip;
