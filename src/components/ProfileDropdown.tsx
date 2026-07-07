import { useEffect, useState } from "react";
import { User, LogOut, Mail, Shield, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const ProfileDropdown = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [displayName, setDisplayName] = useState<string>("");
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("profiles")
      .select("display_name")
      .eq("id", user.id)
      .maybeSingle()
      .then(({ data }) => setDisplayName(data?.display_name ?? user.email?.split("@")[0] ?? "User"));
  }, [user]);

  const handleLogout = async () => {
    setSigningOut(true);
    await signOut();
    navigate("/wallet");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="w-10 h-10 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center hover:bg-primary/30 transition-colors">
          <User className="w-5 h-5 text-primary" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel className="pb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
              <User className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">{displayName || "User"}</p>
              <p className="text-xs text-muted-foreground truncate">{user?.email ?? ""}</p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2 cursor-pointer" onClick={() => navigate("/wallet/profile")}>
          <User className="w-4 h-4" />
          My Profile
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-2 cursor-pointer" onClick={() => navigate("/wallet/profile")}>
          <Shield className="w-4 h-4" />
          Security
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-2 cursor-pointer">
          <Mail className="w-4 h-4" />
          Support
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="gap-2 cursor-pointer text-destructive focus:text-destructive"
          onClick={handleLogout}
          disabled={signingOut}
        >
          {signingOut ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogOut className="w-4 h-4" />}
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
