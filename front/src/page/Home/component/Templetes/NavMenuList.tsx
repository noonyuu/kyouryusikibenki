import { Nav } from '../Atoms/Nav';

const navList = [
  { icon: "heart.svg", title: "いいね", link: "/admin" },
  { icon: "poop.svg", title: "お気に入り", link: "/admin" },
  { icon: "vite.svg", title: "ユーザー", link: "/admin" },
  { icon: "unk.svg", title: "設定", link: "/admin" },
];

export const NavMenuList = () => {
  return (
    <div className="space-y-2 p-4 text-white">
      {navList.map((nav, index) => (
        <div className="flex justify-center">
          <Nav key={index} icon={nav.icon} title={nav.title} link={nav.link} />
        </div>
      ))}
    </div>
  );
}

