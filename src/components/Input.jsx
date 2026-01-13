import React, { forwardRef } from "react";

// Use forwardRef to allow react-hook-form to access the inner <input>
const Input = forwardRef(({ error, caution, label, labelAddon, className, ...rest }, ref) => {
  return (
    <div className="form-control w-full">
      {/* Label Row */}
      <div className="flex justify-between items-center mb-1.5 px-1">
        {label && <span className="label-text font-black text-[10px] uppercase tracking-widest text-gray-400">{label}</span>}
        {labelAddon && <div className="flex items-center">{labelAddon}</div>}
      </div>

      {/* Input Field */}
      <input
        ref={ref} // Attach the ref here
        className={`input input-bordered w-full rounded-2xl bg-gray-50 border-gray-200 focus:ring-4 focus:ring-primary/10 transition-all duration-300 
          ${error ? "border-error bg-red-50 text-error" : "focus:border-primary text-gray-800"} 
          ${className}`}
        {...rest}
      />

      {/* Error Messages */}
      <div className="min-h-[24px] px-1">
        {error && (
          <p className="text-[10px] text-error font-black uppercase tracking-tight mt-1.5 animate-in fade-in slide-in-from-top-1">
            {Array.isArray(error) ? error[0] : error}
          </p>
        )}
      </div>
    </div>
  );
});

Input.displayName = "Input"; // Good practice for debugging

export default Input;
