import { Nav } from '../Atoms/Nav';

const navList = [
  { icon: "home.svg", title: "HOME", link: "/" },
  { icon: "graph.svg", title: "辞書", link: "/admin" },
  { icon: "3d.svg", title: "3D", link: "/animation" },
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

