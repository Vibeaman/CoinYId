import { useEffect, useState } from "react";
import { Menu, Languages, ArrowUpRight, AlertTriangle, CheckCircle2, Clock, Loader2, Circle } from "lucide-react";
import { motion } from "framer-motion";
import ProfileDropdown from "@/components/ProfileDropdown";
import WalletSidebar from "@/components/WalletSidebar";
import FooterSection from "@/components/FooterSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const ASSETS = [
  { symbol: "BTC", name: "Bitcoin", network: "Bitcoin", logo: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png" },
  { symbol: "ETH", name: "Ethereum", network: "ERC-20", logo: "https://assets.coingecko.com/coins/images/279/small/ethereum.png" },
  { symbol: "SOL", name: "Solana", network: "Solana", logo: "https://assets.coingecko.com/coins/images/4128/small/solana.png" },
  { symbol: "USDT", name: "Tether", network: "TRC-20", logo: "https://assets.coingecko.com/coins/images/325/small/Tether.png" },
];

type TxStatus = "pending" | "processing" | "broadcasting" | "completed";

const STATUS_FLOW: TxStatus[] = ["pending", "processing", "broadcasting", "completed"];

const STATUS_LABEL: Record<TxStatus, string> = {
  pending: "Request received",
  processing: "Security review",
  broadcasting: "Broadcasting to network",
  completed: "Confirmed on-chain",
};

const generateTxId = (sym: string) =>
  `${sym.toLowerCase()}_${Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join("")}`;

const SendCrypto = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [assetSymbol, setAssetSymbol] = useState("BTC");
  const [destination, setDestination] = useState("");
  const [amount, setAmount] = useState("");
  const [memo, setMemo] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<TxStatus>("pending");
  const [txId, setTxId] = useState("");

  const asset = ASSETS.find((a) => a.symbol === assetSymbol)!;
  const networkFee = assetSymbol === "BTC" ? 0.00012 : assetSymbol === "ETH" ? 0.0021 : assetSymbol === "SOL" ? 0.0005 : 1;
  const numericAmount = parseFloat(amount) || 0;
  const receiveAmount = Math.max(numericAmount - networkFee, 0);

  // Auto-advance the transaction status to give live feedback
  useEffect(() => {
    if (!submitted) return;
    const idx = STATUS_FLOW.indexOf(status);
    if (idx >= STATUS_FLOW.length - 1) return;
    const t = setTimeout(() => setStatus(STATUS_FLOW[idx + 1]), idx === 0 ? 2200 : idx === 1 ? 3500 : 4200);
    return () => clearTimeout(t);
  }, [submitted, status]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination.trim()) {
      toast.error("Please enter a destination address");
      return;
    }
    if (numericAmount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    setTxId(generateTxId(assetSymbol));
    setStatus("pending");
    setSubmitted(true);
    toast.success("Withdrawal request submitted");
  };

  const reset = () => {
    setSubmitted(false);
    setStatus("pending");
    setDestination("");
    setAmount("");
    setMemo("");
    setTxId("");
  };

  const currentIdx = STATUS_FLOW.indexOf(status);
  const isComplete = status === "completed";



  return (
    <div className="min-h-screen bg-muted/30 flex flex-col">
      <WalletSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <nav className="flex items-center justify-between px-4 py-3 bg-card border-b border-border">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-lg hover:bg-secondary/50 transition-colors"
        >
          <Menu className="w-6 h-6 text-foreground" />
        </button>
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-lg hover:bg-secondary/50 transition-colors">
            <Languages className="w-5 h-5 text-muted-foreground" />
          </button>
          <ProfileDropdown />
        </div>
      </nav>

      <div className="flex-1 px-4 py-6">
        <div className="max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <ArrowUpRight className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="font-heading text-2xl font-bold text-foreground">Send Crypto</h1>
                <p className="text-sm text-muted-foreground">Withdraw your unlocked staking rewards</p>
              </div>
            </div>
          </motion.div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-card border border-border rounded-2xl p-6 space-y-5"
            >
              <div className="flex flex-col items-center text-center gap-3 py-2">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center ${isComplete ? "bg-primary/10" : "bg-secondary/60"}`}>
                  {isComplete ? (
                    <CheckCircle2 className="w-7 h-7 text-primary" />
                  ) : (
                    <Loader2 className="w-7 h-7 text-primary animate-spin" />
                  )}
                </div>
                <h2 className="font-heading text-xl font-bold text-foreground">
                  {isComplete ? "Transaction Confirmed" : "Transaction In Progress"}
                </h2>
                <p className="text-sm text-muted-foreground max-w-sm">
                  {isComplete
                    ? `${receiveAmount.toFixed(6)} ${asset.symbol} has been sent on the ${asset.network} network.`
                    : `Sending ${numericAmount} ${asset.symbol} on the ${asset.network} network.`}
                </p>
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                    isComplete
                      ? "bg-primary/15 text-primary"
                      : "bg-amber-500/15 text-amber-500"
                  }`}
                >
                  <Clock className="w-3 h-3" />
                  {STATUS_LABEL[status]}
                </span>
              </div>

              {/* Status timeline */}
              <div className="space-y-3">
                {STATUS_FLOW.map((s, i) => {
                  const done = i < currentIdx || isComplete;
                  const active = i === currentIdx && !isComplete;
                  return (
                    <div key={s} className="flex items-start gap-3">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            done ? "bg-primary text-primary-foreground" : active ? "bg-amber-500/20" : "bg-secondary"
                          }`}
                        >
                          {done ? (
                            <CheckCircle2 className="w-4 h-4" />
                          ) : active ? (
                            <Loader2 className="w-3 h-3 animate-spin text-amber-500" />
                          ) : (
                            <Circle className="w-3 h-3 text-muted-foreground" />
                          )}
                        </div>
                        {i < STATUS_FLOW.length - 1 && (
                          <div className={`w-0.5 h-6 ${done ? "bg-primary/60" : "bg-border"}`} />
                        )}
                      </div>
                      <div className="pb-2">
                        <p className={`text-sm font-medium ${done || active ? "text-foreground" : "text-muted-foreground"}`}>
                          {STATUS_LABEL[s]}
                        </p>
                        {active && <p className="text-xs text-muted-foreground">In progress…</p>}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="bg-secondary/40 rounded-xl p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Transaction ID</span>
                  <span className="text-foreground font-mono text-xs truncate max-w-[60%]">{txId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Asset</span>
                  <span className="text-foreground font-medium">{asset.name} ({asset.symbol})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Network</span>
                  <span className="text-foreground font-medium">{asset.network}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">To</span>
                  <span className="text-foreground font-mono text-xs truncate max-w-[60%]">{destination}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount</span>
                  <span className="text-foreground font-medium">{numericAmount} {asset.symbol}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Network Fee</span>
                  <span className="text-foreground font-medium">{networkFee} {asset.symbol}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-border">
                  <span className="text-muted-foreground">Recipient Receives</span>
                  <span className="text-primary font-semibold">{receiveAmount.toFixed(6)} {asset.symbol}</span>
                </div>
              </div>

              <Button onClick={reset} variant="outline" className="w-full" disabled={!isComplete}>
                {isComplete ? "Send another transaction" : "Please wait…"}
              </Button>
            </motion.div>

          ) : (
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border border-border rounded-2xl p-6 space-y-5"
            >
              <div className="space-y-2">
                <Label>Asset</Label>
                <Select value={assetSymbol} onValueChange={setAssetSymbol}>
                  <SelectTrigger className="h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ASSETS.map((a) => (
                      <SelectItem key={a.symbol} value={a.symbol}>
                        <div className="flex items-center gap-2">
                          <img src={a.logo} alt={a.symbol} className="w-5 h-5 rounded-full" />
                          <span>{a.name}</span>
                          <span className="text-muted-foreground text-xs">{a.network}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Destination Address</Label>
                <Input
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder={`Paste your ${asset.network} wallet address`}
                  className="h-12 font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground">
                  Make sure the address supports the <span className="font-semibold text-foreground">{asset.network}</span> network.
                </p>
              </div>

              <div className="space-y-2">
                <Label>Amount</Label>
                <div className="relative">
                  <Input
                    type="number"
                    step="any"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="h-12 pr-16"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground">
                    {asset.symbol}
                  </span>
                </div>
              </div>

              {assetSymbol === "USDT" && (
                <div className="space-y-2">
                  <Label>Memo / Tag (optional)</Label>
                  <Input
                    value={memo}
                    onChange={(e) => setMemo(e.target.value)}
                    placeholder="Required by some exchanges"
                    className="h-12"
                  />
                </div>
              )}

              <div className="bg-secondary/40 rounded-xl p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Network Fee</span>
                  <span className="text-foreground font-medium">{networkFee} {asset.symbol}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-border">
                  <span className="text-muted-foreground">You'll Send</span>
                  <span className="text-primary font-semibold">{receiveAmount.toFixed(6)} {asset.symbol}</span>
                </div>
              </div>

              <div className="flex gap-2 p-3 rounded-xl bg-destructive/10 border border-destructive/30">
                <AlertTriangle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                <p className="text-xs text-destructive">
                  Withdrawals are only processed once your staking period ends. Double-check the address — crypto sent to the wrong network cannot be recovered.
                </p>
              </div>

              <Button type="submit" className="w-full h-12 text-base font-semibold">
                Send {asset.symbol}
              </Button>
            </motion.form>
          )}
        </div>
      </div>

      <FooterSection />
    </div>
  );
};

export default SendCrypto;
