import { useState } from "react";

interface WordProps {
  wordList: string[];
}

export const Header: React.FC<WordProps> = ({ wordList }) => {
  const [openMenu, setOpenMenu] = useState(false);

  const handleMenuOpen = () => {
    setOpenMenu(!openMenu);
    console.log("wordList", wordList);
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
                  ? "h-1 w-8 translate-y-2.5 rotate-45 bg-primary transition duration-500 ease-in-out"
                  : "h-1 w-5 bg-primary transition duration-500 ease-in-out"
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
                  ? "h-1 w-8 -rotate-45 bg-primary transition duration-500 ease-in-out"
                  : "absolute right-0 h-1 w-5 bg-primary transition duration-500 ease-in-out"
              }
            />
          </button>
          <nav
            className={
              openMenu ? "absolute left-0 top-0 z-40 h-full w-full" : "hidden"
            }
          >
            <div className="pt-4 bg-black text-center text-2xl text-white">
              排泄待ち
            </div>
            <div className="pt-8 h-full overflow-y-auto bg-black text-center text-2xl text-white">
              {wordList.map((word, index) => (
                <div key={index}>{word}</div>
              ))}
            </div>
          </nav>
        </span>
        {/* ハンバーガーメニューのマージンと横幅分左にずらす */}
        <span className="mt-3 flex grow -translate-x-11 items-center justify-center font-sans text-5xl text-black">
          叫流式便器
        </span>
      </section>
    </header>
  );
};
