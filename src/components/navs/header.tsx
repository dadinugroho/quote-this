import { useAuth } from "@/hooks/Auth";
import { ModeToggle } from "@/components/themes/mode-toggle";
import { MainNav } from "@/components/navs/main-nav";
import { UserNav } from "@/components/navs/user-nav";
import { Logo } from "@/components/logo";

export function Header() {
  const { user, signOut } = useAuth();
  
  return (
    <div className="border-b border-primary px-5">
      <div className="flex h-16 items-center">
        <Logo />
        <div className="ml-auto flex items-center space-x-4">
          <MainNav />
          <ModeToggle />
          <UserNav email={user?.email || '<ERR>'} signOut={signOut} />
        </div>
      </div>
    </div>
  );
}
