"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BookMarked,
  Heart,
  LogOut,
  PlusCircle,
  Settings,
  User,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "./ui/button";

export default function UserMenu() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="w-10 h-10 rounded-full bg-muted animate-pulse" />;
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex items-center gap-2">
        <Link href="/auth/login">
          <Button variant="ghost" size="sm">
            Connexion
          </Button>
        </Link>
        <Link href="/auth/signup">
          <Button size="sm" className="bg-primary hover:bg-primary/90">
            Inscription
          </Button>
        </Link>
      </div>
    );
  }

  const user = session?.user;

  return (
    <div className="flex items-center gap-3">
      {/* Add Savoir Button */}
      <Link href="/add-savoir">
        <Button size="sm" className="gap-2 bg-accent hover:bg-accent/90">
          <PlusCircle className="w-4 h-4" />
          <span className="hidden md:inline">Ajouter un Savoir</span>
        </Button>
      </Link>

      {/* User Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            {user?.image ? (
              <img
                src={user.image}
                alt={user.name || "User"}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/20"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold ring-2 ring-primary/20">
                {user?.name?.[0]?.toUpperCase() || "U"}
              </div>
            )}
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user?.name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user?.email}
              </p>
              {(user as any)?.username && (
                <p className="text-xs leading-none text-muted-foreground">
                  @{(user as any).username}
                </p>
              )}
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem asChild>
            <Link
              href={`/profile/${(user as any)?.username}`}
              className="cursor-pointer"
            >
              <User className="w-4 h-4 mr-2" />
              Mon Profil
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href="/favorites" className="cursor-pointer">
              <Heart className="w-4 h-4 mr-2" />
              Mes Favoris
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href="/my-savoirs" className="cursor-pointer">
              <BookMarked className="w-4 h-4 mr-2" />
              Mes Savoirs
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href="/settings" className="cursor-pointer">
              <Settings className="w-4 h-4 mr-2" />
              Paramètres
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => signOut({ callbackUrl: "/" })}
            className="cursor-pointer text-red-600 focus:text-red-600 dark:text-red-400 dark:focus:text-red-400"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Déconnexion
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
