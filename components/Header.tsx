import React from "react";

const Header = () => {
  return (
    <header className="bg-primary">
      <div className="mx-5 flex h-16 max-w-screen-xl justify-between items-center gap-8 px-4 sm:px-6 lg:px-8">
        <a
          className="flex justify-between items-center gap-x-2 text-secondary text-2xl"
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

        <div>
          <i className="bi bi-text-right text-2xl  text-secondary"></i>
        </div>
      </div>
    </header>
  );
};

export default Header;
