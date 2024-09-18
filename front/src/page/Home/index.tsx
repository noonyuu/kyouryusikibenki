import { PostArea } from "./component/Organism/PostArea";
import { PostList } from "./component/Templetes/PostList";
import { useState } from "react";
import { Tab } from "./component/Atoms/Tab";
import { NavMenuList } from "./component/Templetes/NavMenuList";

export const Home = () => {
  const [tabNum, setTabNum] = useState<number>(0);
  const tabHandler = (tab: number) => {
    setTabNum(tab);
  };

  return (
    <div className="flex h-screen bg-slate-950">
      <header className="sticky top-0 h-screen w-1/4 border-r-[0.5px] bg-slate-950">
        <div className="mt-8 text-center text-xl text-white">叫流式便器</div>
        <NavMenuList />
      </header>

      <main className="flex grow overflow-y-auto">
        <div className="relative">
          <div className="fixed top-0 bg-slate-950">
            <Tab onChange={tabHandler} />
          </div>
          <div className="pt-16">
            <PostArea />
            {tabNum === 0 ? <PostList path="/all" /> : <PostList />}
          </div>
        </div>
        <div className="sticky top-0 h-screen grow border-l-[0.5px] bg-slate-950 text-white">
          
        </div>
      </main>
    </div>
  )
};
