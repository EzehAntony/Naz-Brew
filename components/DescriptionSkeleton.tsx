import React from "react";

const DescriptionSkeleton = () => {
  return (
    <div>
      <div className="animate-pulse my-4 w-3/4 bg-[#101010] h-[10px] rounded-md "></div>
      <div className="animate-pulse my-4 w-2/4 bg-[#101010] h-[10px] rounded-md "></div>
      <div className="animate-pulse my-4 w-3/4 bg-[#101010] h-[10px] rounded-md "></div>
      <div className="animate-pulse my-4 w-4/4 bg-[#101010] h-[10px] rounded-md "></div>
      <div className="animate-pulse my-4 w-4/4 bg-[#101010] h-[10px] rounded-md "></div>
      <div className="animate-pulse my-4 w-4/4 bg-[#101010] h-[10px] rounded-md "></div>
    </div>
  );
};

export default DescriptionSkeleton;
