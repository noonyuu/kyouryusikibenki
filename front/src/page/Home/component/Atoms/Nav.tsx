import { FC } from "react";

type NavProps = {
  icon: string;
  title: string;
  link: string;
};

export const Nav: FC<NavProps> = ({ icon, title, link }) => {
  return (
    <a
      href={link}
      className="my-auto flex h-14 w-56 items-center bg-slate-950 text-lg"
    >
      <img src={icon} alt="" className="mx-4 size-8" />
      {title}
    </a>
  );
};
