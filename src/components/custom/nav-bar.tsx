import NavButtons from "./nav-buttons";
import { BlogLogo } from "./nav-buttons";
export default async function NavBar({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex flex-row items-center justify-between border border-b-2 bg-sidebar-accent w-full min-h-14 min-w-screen p-4 drop-shadow-accent shadow-2xl shadow-sidebar-accent fixed z-50">
        {/*<h1 className="text-xl ">{`Kyle's Blog `}</h1>*/}
        <BlogLogo />
        <NavButtons />
      </div>
      {children}
    </>
  );
}
