import ThemeToggle from "@/components/custom/theme-toggle";

export default async function NavBar({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex flex-row items-center justify-between bg-sidebar-accent w-full min-h-14 min-w-screen p-4 drop-shadow-accent shadow-2xl shadow-sidebar-accent">
        <h1 className="text-xl ">{`Kyle's Blog `}</h1>
        <ThemeToggle className="" />
      </div>
      {children}
    </>
  );
}
