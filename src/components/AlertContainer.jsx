import {
  faCircleCheck,
  faCircleInfo,
  faCircleXmark,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { forwardRef, useEffect, useState } from "react";

const AlertInfo = forwardRef(({ message }, ref) => {
  return (
    <div ref={ref} className="px-5 py-3 rounded shadow-md flex flex-row gap-2 items-center bg-info-100 text-info-400">
      <FontAwesomeIcon icon={faCircleInfo} />
      {message}
    </div>
  );
});

const AlertError = forwardRef(({ message }, ref) => {
  return (
    <div ref={ref} className="px-5 py-3 rounded shadow-md flex flex-row gap-2 items-center bg-error-200 text-error-500" >
      <FontAwesomeIcon icon={faCircleXmark} />
      {message}
    </div>
  );
});

const AlertWarn = forwardRef(({ message }, ref) => {
  return (
    <div ref={ref} className="px-5 py-3 rounded shadow-md flex flex-row gap-2 items-center bg-warning-200 text-warning-700" >
      <FontAwesomeIcon icon={faTriangleExclamation} />
      {message}
    </div>
  );
});

const AlertOk = forwardRef(({ message }, ref) => {
  return (
    <div ref={ref} className="px-5 py-3 rounded shadow-md flex flex-row gap-2 items-center bg-success-200 text-success-700" >
      <FontAwesomeIcon icon={faCircleCheck} />
      {message}
    </div>
  );
});

const AlertContainer = forwardRef(({ type, message }, ref) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-5 right-5">
      {isVisible &&
        (type === "info" ? (
          <AlertInfo message={message} ref={ref} />
        ) : type === "error" ? (
          <AlertError message={message} ref={ref} />
        ) : type === "warn" ? (
          <AlertWarn message={message} ref={ref} />
        ) : type === "ok" ? (
          <AlertOk message={message} ref={ref} />
        ) : (
          setIsVisible(false)
        ))}
    </div>
  );
});

export default AlertContainer;
