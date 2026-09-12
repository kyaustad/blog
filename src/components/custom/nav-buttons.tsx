"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import ThemeToggle from "./theme-toggle";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";
import { HamburgerIcon, ListIcon, XIcon } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import React from "react";
import Link from "next/link";

export default function NavButtons() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <MobileNavButtons />;
  }

  return <DesktopNavButtons />;
}

function MobileNavButtons() {
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  return (
    <div className="flex flex-row items-center gap-2 p-2">
      <ThemeToggle />

      <Drawer
        swipeDirection="right"
        open={drawerOpen}
        onOpenChange={() => setDrawerOpen(!drawerOpen)}
      >
        <DrawerTrigger id="drawer-trigg">
          <div className="p-1 border border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50">
            <ListIcon size={24} />
          </div>
        </DrawerTrigger>
        <DrawerContent className="flex flex-col gap-8 p-2">
          <DrawerHeader className="flex flex-row w-full justify-between items-center">
            <DrawerTitle className="text-2xl">Menu</DrawerTitle>
            <DrawerClose>
              <div className="p-1 border border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50">
                <XIcon size={20} />
              </div>
            </DrawerClose>
          </DrawerHeader>
          <div className="flex flex-col m-2 gap-2 p-2">
            <Button
              onClick={() => {
                setDrawerOpen(false);
                router.push("/");
              }}
            >
              Home
            </Button>
            <Link href="https://kyleaustad.dev" className="min-w-full">
              <Button className="w-full">Portfolio</Button>
            </Link>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

function DesktopNavButtons() {
  return (
    <div className=" flex flex-row items-center justify-end gap-2 p-">
      <Button>Home</Button>
      <Link href="https://kyleaustad.dev">
        <Button>Portfolio</Button>
      </Link>
      <ThemeToggle />
    </div>
  );
}
