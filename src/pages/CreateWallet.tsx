import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Wallet, Eye, EyeOff, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { z } from "zod";
import FooterSection from "@/components/FooterSection";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const schema = z.object({
  displayName: z.string().trim().min(2, "Name must be at least 2 characters").max(50),
  email: z.string().trim().email("Invalid email").max(255),
  password: z.string().min(8, "Password must be at least 8 characters").max(72),
});

const CreateWallet = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const parsed = schema.safeParse({ displayName, email, password });
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (!agreed) {
      setError("You must agree to the terms.");
      return;
    }

    setLoading(true);
    const { error: signUpError } = await supabase.auth.signUp({
      email: parsed.data.email,
      password: parsed.data.password,
      options: {
        emailRedirectTo: `${window.location.origin}/wallet/dashboard`,
        data: { display_name: parsed.data.displayName },
      },
    });
    setLoading(false);

    if (signUpError) {
      setError(signUpError.message);
      return;
    }
    toast.success("Account created — welcome!");
    navigate("/wallet/dashboard");
  };

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col">
      <nav className="flex items-center justify-between px-6 py-4 bg-card border-b border-border">
        <Link to="/" className="font-heading text-xl font-bold text-foreground tracking-tight">
          CoinY<span className="text-primary">Id</span>
        </Link>
        <Link to="/wallet" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
          Login
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

          <h1 className="font-heading text-xl font-bold text-foreground mb-2">Create Your Account 🔐</h1>
          <p className="text-muted-foreground text-sm mb-6">Sign up to access your CoinYId wallet.</p>

          {error && (
            <div className="bg-destructive/10 border border-destructive/30 rounded-lg px-4 py-3 mb-4">
              <p className="text-destructive text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Display Name</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="e.g. Satoshi"
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPwd ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-12 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
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

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Confirm Password</label>
              <input
                type={showPwd ? "text" : "password"}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Re-enter your password"
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <label className="flex items-start gap-3 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="w-5 h-5 rounded border-border accent-primary mt-0.5"
              />
              <span className="text-sm text-muted-foreground">
                I agree to the <span className="text-primary">Terms of Service</span> and{" "}
                <span className="text-primary">Privacy Policy</span>
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl py-3.5 font-semibold text-primary-foreground transition-all hover:opacity-90 hover:shadow-[var(--glow-primary)] disabled:opacity-60 flex items-center justify-center gap-2"
              style={{ background: "var(--gradient-primary)" }}
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link to="/wallet" className="text-primary font-medium hover:underline">
              Login
            </Link>
          </p>
        </motion.div>
      </div>
      <FooterSection />
    </div>
  );
};

export default CreateWallet;
