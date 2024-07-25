import { useRef, useState } from "react";

export const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const handleMenuOpen = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <header className="h-16">
      <section className="flex flex-row">
        <span className="">
          <button
            onClick={handleMenuOpen}
            type="button"
            className="relative z-50 ml-3 mt-3 size-8 space-y-2"
          >
            <div
              className={
                openMenu
                  ? "bg-primary h-1 w-8 translate-y-2.5 rotate-45 transition duration-500 ease-in-out"
                  : "bg-primary h-1 w-5 transition duration-500 ease-in-out"
              }
            />
            <div
              className={
                openMenu
                  ? "opacity-0 transition duration-500 ease-in-out"
                  : "h-1 w-8 bg-black transition duration-500 ease-in-out"
              }
            />
            <div
              className={
                openMenu
                  ? "bg-primary h-1 w-8 -rotate-45 transition duration-500 ease-in-out"
                  : "bg-primary absolute right-0 h-1 w-5 transition duration-500 ease-in-out"
              }
            />
          </button>
          <nav
            className={
              openMenu
                ? "absolute left-0 top-0 z-40 h-full w-full bg-black"
                : "hidden"
            }
          />
        </span>
        {/* ハンバーガーメニューのマージンと横幅分左にずらす */}
        <span className="mt-3 flex grow -translate-x-11 items-center justify-center font-sans text-5xl text-black">
          タイトル
        </span>
      </section>
    </header>
  );
};
