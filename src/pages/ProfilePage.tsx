import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Languages, User, Mail, Calendar, Fingerprint, Loader2, Save, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import ProfileDropdown from "@/components/ProfileDropdown";
import WalletSidebar from "@/components/WalletSidebar";
import FooterSection from "@/components/FooterSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface Profile {
  id: string;
  display_name: string | null;
  email: string | null;
  created_at: string;
}

const ProfilePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, display_name, email, created_at")
        .eq("id", user.id)
        .maybeSingle();
      if (error) {
        toast.error("Could not load profile");
      } else if (data) {
        setProfile(data);
        setDisplayName(data.display_name ?? "");
      }
      setLoading(false);
    };
    load();
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    if (displayName.trim().length < 2) {
      toast.error("Name must be at least 2 characters");
      return;
    }
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({ display_name: displayName.trim() })
      .eq("id", user.id);
    setSaving(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Profile updated");
    setProfile((p) => (p ? { ...p, display_name: displayName.trim() } : p));
  };

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col">
      <WalletSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <nav className="flex items-center justify-between px-4 py-3 bg-card border-b border-border">
        <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-lg hover:bg-secondary/50">
          <Menu className="w-6 h-6 text-foreground" />
        </button>
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-lg hover:bg-secondary/50">
            <Languages className="w-5 h-5 text-muted-foreground" />
          </button>
          <ProfileDropdown />
        </div>
      </nav>

      <div className="flex-1 px-4 py-6">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => navigate("/wallet/dashboard")}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="w-4 h-4" /> Back to dashboard
          </button>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border rounded-2xl p-6 mb-5"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
                <User className="w-8 h-8 text-primary" />
              </div>
              <div className="min-w-0">
                <h1 className="font-heading text-2xl font-bold text-foreground truncate">
                  {loading ? "…" : profile?.display_name || "Unnamed"}
                </h1>
                <p className="text-sm text-muted-foreground truncate">{profile?.email ?? user?.email}</p>
              </div>
            </div>
          </motion.div>

          {loading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="bg-card border border-border rounded-2xl p-6 mb-5"
              >
                <h2 className="font-heading text-lg font-semibold text-foreground mb-4">Account Info</h2>
                <div className="space-y-3">
                  <InfoRow icon={Mail} label="Email" value={profile?.email ?? user?.email ?? "—"} />
                  <InfoRow
                    icon={Calendar}
                    label="Member since"
                    value={profile?.created_at ? format(new Date(profile.created_at), "MMM d, yyyy") : "—"}
                  />
                  <InfoRow icon={Fingerprint} label="Account ID" value={user?.id ?? "—"} mono />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-card border border-border rounded-2xl p-6"
              >
                <h2 className="font-heading text-lg font-semibold text-foreground mb-4">Display Name</h2>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label>Name shown on your account</Label>
                    <Input
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="Your name"
                      maxLength={50}
                      className="h-11"
                    />
                  </div>
                  <Button onClick={handleSave} disabled={saving} className="gap-2">
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Save changes
                  </Button>
                </div>
              </motion.div>
            </>
          )}
        </div>
      </div>

      <FooterSection />
    </div>
  );
};

const InfoRow = ({
  icon: Icon,
  label,
  value,
  mono = false,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  mono?: boolean;
}) => (
  <div className="flex items-start gap-3 py-2 border-b border-border last:border-0">
    <div className="w-9 h-9 rounded-lg bg-secondary/60 flex items-center justify-center shrink-0">
      <Icon className="w-4 h-4 text-muted-foreground" />
    </div>
    <div className="min-w-0 flex-1">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={`text-sm text-foreground break-all ${mono ? "font-mono" : "font-medium"}`}>{value}</p>
    </div>
  </div>
);

export default ProfilePage;
