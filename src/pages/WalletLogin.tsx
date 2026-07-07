import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Wallet, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { z } from "zod";
import FooterSection from "@/components/FooterSection";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const schema = z.object({
  email: z.string().trim().email("Invalid email").max(255),
  password: z.string().min(6, "Password must be at least 6 characters").max(72),
});

const WalletLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) navigate("/wallet/dashboard", { replace: true });
  }, [user, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ email, password });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email: parsed.data.email, password: parsed.data.password });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Welcome back");
    navigate("/wallet/dashboard");
  };

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col">
      <nav className="flex items-center justify-between px-6 py-4 bg-card border-b border-border">
        <Link to="/" className="font-heading text-xl font-bold text-foreground tracking-tight">
          CoinY<span className="text-primary">Id</span>
        </Link>
      </nav>

      <div className="flex-1 flex items-start justify-center px-6 pt-10 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-card rounded-2xl border border-border p-8 shadow-lg"
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <Wallet className="w-5 h-5 text-primary" />
            </div>
            <span className="font-heading text-2xl font-bold text-foreground tracking-tight">
              CoinY<span className="text-primary">Id</span>
            </span>
          </div>

          <h1 className="font-heading text-xl font-bold text-foreground mb-2">Welcome Back 👋</h1>
          <p className="text-muted-foreground text-sm mb-6">Sign in to access your wallet.</p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPwd ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-12 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPwd ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl py-3.5 font-semibold text-primary-foreground transition-all hover:opacity-90 hover:shadow-[var(--glow-primary)] disabled:opacity-60 flex items-center justify-center gap-2"
              style={{ background: "var(--gradient-primary)" }}
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            New to CoinYId?{" "}
            <Link to="/wallet/create" className="text-primary font-medium hover:underline">
              Create Account
            </Link>
          </p>
        </motion.div>
      </div>
      <FooterSection />
    </div>
  );
};

export default WalletLogin;
