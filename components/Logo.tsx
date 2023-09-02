import React from "react";

const Logo = ({ styles }: { styles: string }) => {
  return (
    <a
      className={`flex justify-between items-center gap-x-2 text-secondary text-2xl ${styles}`}
      href="/"
    >
      <div>
        <i className="bi bi-cup-hot-fill absolute animate-ping"></i>
        <i className="bi bi-cup-hot-fill "></i>
      </div>
      <p className="text-[16px] font-semibold ">
        Naz<span className="text-gray">Brew</span>
      </p>
    </a>
  );
};

export default Logo;
