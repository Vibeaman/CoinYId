import { useState, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Copy, Check, ShieldCheck, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import FooterSection from "@/components/FooterSection";

const BIP39_SAMPLE_WORDS = [
  "abandon", "ability", "able", "about", "above", "absent", "absorb", "abstract",
  "absurd", "abuse", "access", "accident", "account", "accuse", "achieve", "acid",
  "acoustic", "acquire", "across", "act", "action", "actor", "actress", "actual",
  "adapt", "add", "addict", "address", "adjust", "admit", "adult", "advance",
  "advice", "aerobic", "affair", "afford", "afraid", "again", "age", "agent",
  "agree", "ahead", "aim", "air", "airport", "aisle", "alarm", "album",
  "alcohol", "alert", "alien", "all", "alley", "allow", "almost", "alone",
  "alpha", "already", "also", "alter", "always", "amateur", "amazing", "among",
  "amount", "amused", "analyst", "anchor", "ancient", "anger", "angle", "angry",
  "animal", "ankle", "announce", "annual", "another", "answer", "antenna", "antique",
  "anxiety", "any", "apart", "apology", "appear", "apple", "approve", "april",
  "arch", "arctic", "area", "arena", "argue", "arm", "armed", "armor",
  "army", "around", "arrange", "arrest", "arrive", "arrow", "art", "artefact",
  "artist", "artwork", "ask", "aspect", "assault", "asset", "assist", "assume",
  "asthma", "athlete", "atom", "attack", "attend", "attitude", "attract", "auction",
  "audit", "august", "aunt", "author", "auto", "autumn", "average", "avocado",
  "avoid", "awake", "aware", "awesome", "awful", "awkward", "axis", "baby",
  "bachelor", "bacon", "badge", "bag", "balance", "balcony", "ball", "bamboo",
  "banana", "banner", "bar", "barely", "bargain", "barrel", "base", "basic",
  "basket", "battle", "beach", "bean", "beauty", "because", "become", "beef",
  "before", "begin", "behave", "behind", "believe", "below", "belt", "bench",
  "benefit", "best", "betray", "better", "between", "beyond", "bicycle", "bid",
  "bike", "bind", "biology", "bird", "birth", "bitter", "black", "blade",
  "blame", "blanket", "blast", "bleak", "bless", "blind", "blood", "blossom",
  "blow", "blue", "blur", "blush", "board", "boat", "body", "boil",
  "bomb", "bone", "bonus", "book", "boost", "border", "boring", "borrow",
  "boss", "bottom", "bounce", "box", "boy", "bracket", "brain", "brand",
  "brave", "bread", "breeze", "brick", "bridge", "brief", "bright", "bring",
];

function generatePhrase(): string[] {
  const words: string[] = [];
  for (let i = 0; i < 12; i++) {
    const idx = Math.floor(Math.random() * BIP39_SAMPLE_WORDS.length);
    words.push(BIP39_SAMPLE_WORDS[idx]);
  }
  return words;
}

const RecoveryPhrase = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const username = (location.state as any)?.username || "User";
  const phrase = useMemo(() => generatePhrase(), []);
  const [copied, setCopied] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(phrase.join(" "));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleContinue = () => {
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
          <div className="flex items-center justify-center mb-6">
            <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center">
              <ShieldCheck className="w-7 h-7 text-primary" />
            </div>
          </div>

          <h1 className="font-heading text-xl font-bold text-foreground mb-2 text-center">
            Your Recovery Phrase
          </h1>
          <p className="text-muted-foreground text-sm mb-6 text-center">
            Welcome, <span className="text-primary font-medium">{username}</span>! Write down these 12 words in order and store them safely.
          </p>

          {/* Warning */}
          <div className="flex items-start gap-3 bg-accent/10 border border-accent/30 rounded-lg px-4 py-3 mb-6">
            <AlertTriangle className="w-5 h-5 text-accent mt-0.5 shrink-0" />
            <p className="text-sm text-accent">
              Never share your recovery phrase. Anyone with these words can access your wallet.
            </p>
          </div>

          {/* Phrase grid */}
          <div className="grid grid-cols-3 gap-2 mb-6">
            {phrase.map((word, i) => (
              <div
                key={i}
                className="bg-secondary/60 border border-border rounded-lg px-3 py-2.5 text-center"
              >
                <span className="text-muted-foreground text-xs mr-1">{i + 1}.</span>
                <span className="text-foreground text-sm font-medium">{word}</span>
              </div>
            ))}
          </div>

          {/* Copy button */}
          <button
            onClick={handleCopy}
            className="w-full flex items-center justify-center gap-2 rounded-lg border border-border py-3 text-sm font-medium text-foreground hover:bg-secondary/50 transition-all mb-6"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-primary" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy Recovery Phrase
              </>
            )}
          </button>

          {/* Confirmation */}
          <label className="flex items-start gap-3 mb-6 cursor-pointer">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
              className="w-5 h-5 rounded border-border accent-primary mt-0.5"
            />
            <span className="text-sm text-muted-foreground">
              I have saved my recovery phrase in a secure location.
            </span>
          </label>

          <button
            onClick={handleContinue}
            disabled={!confirmed}
            className="w-full rounded-xl py-3.5 font-semibold text-primary-foreground transition-all hover:opacity-90 hover:shadow-[var(--glow-primary)] disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ background: "var(--gradient-primary)" }}
          >
            Continue to Wallet
          </button>
        </motion.div>
      </div>
      <FooterSection />
    </div>
  );
};

export default RecoveryPhrase;
