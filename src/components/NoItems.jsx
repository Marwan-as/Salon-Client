import React from "react";

const NoItems = ({ title, caution }) => {
  return (
    <div className="col-span-full flex flex-col items-center justify-center h-64">
      {/* <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0c0 6.627-5.373 12-12 12S3 18.627 3 12 8.373 0 15 0s12 5.373 12 12z" />
      </svg> */}
      {title && <p className="text-gray-600 text-lg font-medium">{title}</p>}
      {caution && <p className="text-gray-400 text-sm">{caution}</p>}
    </div>
  );
};

export default NoItems;
