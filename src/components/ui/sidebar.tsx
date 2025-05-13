"use client";

import { cn } from "~/lib/utils/cn";
import { motion } from "framer-motion";
import {
  ChevronsUpDown,
  LayoutDashboard,
  LogOut,
  MessagesSquare,
  Settings,
  SidebarClose,
  SidebarOpen,
  UserCircle,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Avatar,
  AvatarFallback,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  ScrollArea,
} from "src/components/ui";
import { ROUTES } from "~/lib/utils/routes";

const sidebarVariants = {
  open: { width: "15rem" },
  closed: { width: "3.05rem" },
};

const contentVariants = {
  open: { display: "block", opacity: 1 },
  closed: { display: "block", opacity: 1 },
};

const variants = {
  open: {
    x: 0,
    opacity: 1,
    transition: { x: { stiffness: 1000, velocity: -100 } },
  },
  closed: { x: -20, opacity: 0, transition: { x: { stiffness: 100 } } },
};

const transitionProps = {
  type: "tween",
  ease: "easeOut",
  duration: 0.2,
  staggerChildren: 0.1,
};

const staggerVariants = {
  open: { transition: { staggerChildren: 0.03, delayChildren: 0.02 } },
};

const navItems = [
  {
    href: ROUTES.PROTECTED.DASHBOARD,
    label: "Overview",
    icon: LayoutDashboard,
    activeCheck: ROUTES.PROTECTED.DASHBOARD,
  },
  {
    href: ROUTES.PROTECTED.ASSISTANTS,
    label: "Assistants",
    icon: MessagesSquare,
    activeCheck: ROUTES.PROTECTED.ASSISTANTS,
  },
];

interface SessionNavBarProps {
  fullName: string;
  primaryEmailAddress: string;
}

export function SessionNavBar({
  fullName,
  primaryEmailAddress,
}: SessionNavBarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <motion.div
      className={cn(
        "sidebar relative z-30 h-full shrink-0 border-r bg-white dark:bg-black",
      )}
      initial={isCollapsed ? "closed" : "open"}
      animate={isCollapsed ? "closed" : "open"}
      variants={sidebarVariants}
      transition={transitionProps}
    >
      <motion.div
        className={`relative flex h-full shrink-0 flex-col text-gray-700 transition-all dark:text-gray-300`}
        variants={contentVariants}
      >
        <motion.ul variants={staggerVariants} className="flex h-full flex-col">
          <div className="flex w-full shrink-0 flex-col px-3 py-2">
            <motion.div
              variants={variants}
              className="mb-3 overflow-hidden"
              initial={isCollapsed ? "closed" : "open"}
              animate={isCollapsed ? "closed" : "open"}
            >
              {!isCollapsed && (
                <Link
                  href="/"
                  className="block text-xl font-bold text-gray-900 dark:text-white"
                >
                  MySettr
                </Link>
              )}
            </motion.div>
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger className="w-full" asChild>
                <Button
                  variant="outline"
                  className="hover:bg-muted flex h-auto w-full items-center justify-between gap-2 px-2 py-1 text-left font-normal text-gray-900 dark:text-white dark:hover:bg-gray-800"
                >
                  <div className="flex min-w-0 items-center gap-2">
                    <Avatar className="size-5 shrink-0">
                      <AvatarFallback>
                        {fullName?.charAt(0) ?? "U"}
                      </AvatarFallback>
                    </Avatar>
                    <motion.div
                      variants={variants}
                      className="min-w-0 overflow-hidden"
                    >
                      {!isCollapsed && (
                        <p className="truncate text-sm">
                          {primaryEmailAddress}
                        </p>
                      )}
                    </motion.div>
                  </div>
                  <motion.div variants={variants}>
                    {!isCollapsed && (
                      <ChevronsUpDown className="text-muted-foreground/80 ml-1 h-4 w-4 shrink-0" />
                    )}
                  </motion.div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                sideOffset={5}
                align="start"
                className="w-60 bg-white dark:bg-gray-800"
              >
                <div className="flex flex-row items-center gap-2 p-2">
                  <Avatar className="size-8">
                    <AvatarFallback>
                      {fullName?.charAt(0) ?? "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col text-left">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {fullName}
                    </span>
                    <span className="text-muted-foreground line-clamp-1 text-xs">
                      {primaryEmailAddress}
                    </span>
                  </div>
                </div>
                <DropdownMenuSeparator className="dark:bg-gray-700" />
                <DropdownMenuItem
                  asChild
                  className="hover:bg-muted focus:bg-muted dark:hover:bg-gray-700 dark:focus:bg-gray-700"
                >
                  <Link
                    href="/settings/profile"
                    className="text-gray-900 dark:text-white"
                  >
                    <UserCircle className="mr-2 h-4 w-4" /> Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-muted focus:bg-muted dark:hover:bg-gray-700 dark:focus:bg-gray-700">
                  <LogOut className="mr-2 h-4 w-4 text-gray-900 dark:text-white" />{" "}
                  <span className="text-gray-900 dark:text-white">
                    Sign out
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Navigation Body - Standardized padding */}
          <div className="flex grow flex-col overflow-hidden pt-1">
            <ScrollArea className="flex-grow px-3 py-1">
              <div className={cn("flex w-full flex-col gap-1")}>
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      "hover:bg-muted flex h-8 w-full flex-row items-center rounded-md py-1.5 text-gray-700 transition hover:text-gray-900 dark:text-gray-300 dark:hover:text-white",
                      pathname?.includes(item.activeCheck) &&
                        "bg-muted text-blue-600 dark:bg-gray-700 dark:text-blue-300",
                    )}
                  >
                    <item.icon className="mr-2 h-4 w-4 shrink-0" />
                    <motion.div
                      variants={variants}
                      className="overflow-hidden whitespace-nowrap"
                    >
                      {!isCollapsed && (
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium">{item.label}</p>
                        </div>
                      )}
                    </motion.div>
                  </Link>
                ))}
              </div>
            </ScrollArea>
          </div>

          <div className="mt-auto flex flex-col px-3 py-2">
            <Link
              href="/settings"
              className="hover:bg-muted flex h-8 w-full flex-row items-center rounded-md py-1.5 text-gray-700 transition hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              <Settings className="mr-2 h-4 w-4 shrink-0" />
              <motion.div
                variants={variants}
                className="overflow-hidden whitespace-nowrap"
              >
                {!isCollapsed && (
                  <p className="text-sm font-medium">Settings</p>
                )}
              </motion.div>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground mt-1 h-8 w-full justify-start px-0 py-1.5 transition hover:text-gray-900 dark:hover:text-white"
              onClick={() => setIsCollapsed(!isCollapsed)}
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isCollapsed ? (
                <SidebarOpen className="h-4 w-4 shrink-0" />
              ) : (
                <SidebarClose className="h-4 w-4 shrink-0" />
              )}
              <motion.div
                variants={variants}
                className="overflow-hidden whitespace-nowrap"
              >
                {!isCollapsed && (
                  <p className="text-sm font-medium">Collapse</p>
                )}
              </motion.div>
            </Button>
          </div>
        </motion.ul>
      </motion.div>
    </motion.div>
  );
}
