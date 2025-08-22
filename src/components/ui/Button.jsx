import React from "react";

const Button = ({ children, className = "", ...props }) => {
  return (
    <button
      className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export { Button };
