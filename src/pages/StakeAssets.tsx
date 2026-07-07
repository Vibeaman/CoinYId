import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Menu, Languages, User, Search, ArrowRight, Copy, Check } from "lucide-react";
import ProfileDropdown from "@/components/ProfileDropdown";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import WalletSidebar from "@/components/WalletSidebar";
import FooterSection from "@/components/FooterSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const STAKE_ASSETS = [
  { symbol: "BTC", name: "Bitcoin", apr: 11.2, logo: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png", wallet: "bc1qzxvmx9nf0532jw2m2gcv4v4x2mu50zcgjvm9mm" },
  { symbol: "ETH", name: "Ethereum", apr: 8.2, logo: "https://assets.coingecko.com/coins/images/279/small/ethereum.png", wallet: "0x008fCFfbC46D3914d5B5741588548D63626E2322" },
  { symbol: "SOL", name: "Solana", apr: 14.2, logo: "https://assets.coingecko.com/coins/images/4128/small/solana.png", wallet: "FvF39A1SEvpDLtg3jKpkeiUyQn4V4HwkRdntpufR6MTB" },
  { symbol: "USDT", name: "Tether (TRC-20)", apr: 8.93, logo: "https://assets.coingecko.com/coins/images/325/small/Tether.png", wallet: "TCEY6Hn14KXH1MZs7JSzyhq94o9kcYAMUt" },
];

const STAKING_PERIODS = [
  { label: "Flexible (No lock period)", aprMultiplier: 1.0 },
  { label: "30 Days", aprMultiplier: 1.06 },
  { label: "60 Days", aprMultiplier: 1.12 },
  { label: "90 Days", aprMultiplier: 1.18 },
];

const StakeAssets = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"stake" | "positions">("stake");
  const [searchQuery, setSearchQuery] = useState("");
  const [perPage, setPerPage] = useState("10");
  const [selectedAsset, setSelectedAsset] = useState<typeof STAKE_ASSETS[0] | null>(null);
  const [stakeAmount, setStakeAmount] = useState("");
  const [stakingPeriod, setStakingPeriod] = useState("");
  const [showWallet, setShowWallet] = useState(false);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const filteredAssets = STAKE_ASSETS.filter(
    (a) =>
      a.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.name.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, parseInt(perPage));

  const getEffectiveApr = () => {
    if (!selectedAsset || !stakingPeriod) return selectedAsset?.apr || 0;
    const period = STAKING_PERIODS.find(p => p.label === stakingPeriod);
    return parseFloat((selectedAsset.apr * (period?.aprMultiplier || 1)).toFixed(1));
  };

  const estimatedReward = () => {
    const amount = parseFloat(stakeAmount);
    if (!amount || !selectedAsset) return null;
    const apr = getEffectiveApr();
    const period = STAKING_PERIODS.find(p => p.label === stakingPeriod);
    const days = stakingPeriod.includes("30") ? 30 : stakingPeriod.includes("60") ? 60 : stakingPeriod.includes("90") ? 90 : 365;
    const reward = (amount * (apr / 100) * days) / 365;
    return reward.toFixed(8);
  };

  const handleStakeClick = (asset: typeof STAKE_ASSETS[0]) => {
    setSelectedAsset(asset);
    setStakeAmount("");
    setStakingPeriod("");
    setShowWallet(false);
    setCopied(false);
  };

  const handleCopyWallet = () => {
    if (selectedAsset) {
      navigator.clipboard.writeText(selectedAsset.wallet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col relative">
      <WalletSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Top nav */}
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

      {/* Tabs */}
      <div className="flex gap-3 px-4 pt-5 pb-2">
        <Button
          variant={activeTab === "stake" ? "default" : "outline"}
          onClick={() => setActiveTab("stake")}
          className="rounded-lg"
        >
          Stake Assets
        </Button>
        <Button
          variant={activeTab === "positions" ? "default" : "outline"}
          onClick={() => setActiveTab("positions")}
          className="rounded-lg"
        >
          My Positions
        </Button>
      </div>

      <div className="flex-1 px-4 py-4 space-y-5">
        {activeTab === "stake" ? (
          <>
            {/* Search card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-2xl border border-border p-5 space-y-4"
            >
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Search Assets</label>
                <Input
                  placeholder="Search by symbol or name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-background"
                />
              </div>
              <div className="flex items-end gap-3">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Per Page</label>
                  <Select value={perPage} onValueChange={setPerPage}>
                    <SelectTrigger className="w-24 bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="20">20</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="gap-2">
                  <Search className="w-4 h-4" />
                  Search
                </Button>
              </div>
            </motion.div>

            {/* Asset table */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card rounded-2xl border border-border overflow-hidden"
            >
              <div className="grid grid-cols-[1fr_auto_auto] gap-4 px-5 py-3 border-b border-border">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Asset</span>
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">APR</span>
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Action</span>
              </div>

              {filteredAssets.map((asset) => (
                <div
                  key={asset.symbol}
                  className="grid grid-cols-[1fr_auto_auto] gap-4 items-center px-5 py-4 border-b border-border last:border-b-0"
                >
                  <div className="flex items-center gap-3">
                    <img src={asset.logo} alt={asset.symbol} className="w-10 h-10 rounded-full" />
                    <div>
                      <p className="font-semibold text-foreground text-sm">{asset.symbol}</p>
                      <p className="text-xs text-muted-foreground">{asset.name}</p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-md">
                    {asset.apr}%
                  </span>
                  <Button size="sm" className="gap-1.5 rounded-lg text-xs" onClick={() => handleStakeClick(asset)}>
                    <span className="text-base">🪙</span>
                    Stake
                  </Button>
                </div>
              ))}
            </motion.div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-2xl border border-border p-8 text-center"
          >
            <p className="text-muted-foreground text-sm">No staking positions yet.</p>
          </motion.div>
        )}
      </div>

      {/* Stake Dialog */}
      <Dialog open={!!selectedAsset} onOpenChange={(open) => { if (!open) { setSelectedAsset(null); setShowWallet(false); } }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span className="text-xl">🪙</span> Stake Asset
            </DialogTitle>
          </DialogHeader>

          {selectedAsset && (
            <div className="space-y-5">
              {/* Asset info */}
              <div className="flex items-center justify-between bg-muted/50 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <img src={selectedAsset.logo} alt={selectedAsset.symbol} className="w-12 h-12 rounded-full" />
                  <div>
                    <p className="font-bold text-foreground">{selectedAsset.symbol}</p>
                    <p className="text-sm text-muted-foreground">{selectedAsset.name}</p>
                  </div>
                </div>
                <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-lg">
                  APR: {getEffectiveApr()}%
                </span>
              </div>

              {/* Amount input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Amount to Stake</label>
                <div className="flex border border-border rounded-lg overflow-hidden">
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(e.target.value)}
                    className="border-0 focus-visible:ring-0"
                  />
                  <div className="flex items-center px-3 bg-muted/30 border-l border-border text-sm font-semibold text-foreground">
                    {selectedAsset.symbol}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">
                    Available Balance: <span className="text-primary font-medium">0.00000000 {selectedAsset.symbol}</span>
                  </p>
                  <button className="text-xs text-primary font-medium hover:underline">Use Max</button>
                </div>
              </div>

              {/* Estimated reward */}
              {stakeAmount && parseFloat(stakeAmount) > 0 && (
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground">Estimated Reward</p>
                  <p className="text-sm font-bold text-primary">
                    +{estimatedReward()} {selectedAsset.symbol}
                    <span className="text-xs font-normal text-muted-foreground ml-1">
                      ({getEffectiveApr()}% APR)
                    </span>
                  </p>
                </div>
              )}

              {/* Staking period */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Staking Period</label>
                <Select value={stakingPeriod} onValueChange={setStakingPeriod}>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select staking period" />
                  </SelectTrigger>
                  <SelectContent>
                    {STAKING_PERIODS.map((period) => {
                      const effectiveApr = (selectedAsset.apr * period.aprMultiplier).toFixed(1);
                      return (
                        <SelectItem key={period.label} value={period.label}>
                          {period.label} – {effectiveApr}% APR
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              {/* Wallet address reveal */}
              <AnimatePresence>
                {showWallet && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-muted/50 border border-border rounded-xl p-4 space-y-3">
                      <p className="text-xs font-medium text-muted-foreground">Send {selectedAsset.symbol} to this wallet address:</p>
                      <div className="flex justify-center py-3">
                        <div className="bg-white rounded-xl p-4">
                          <QRCodeSVG
                            value={selectedAsset.wallet}
                            size={180}
                            level="M"
                            imageSettings={{
                              src: selectedAsset.logo,
                              height: 30,
                              width: 30,
                              excavate: true,
                            }}
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-2 bg-background rounded-lg p-3 border border-border">
                        <p className="text-xs text-foreground font-mono break-all flex-1">{selectedAsset.wallet}</p>
                        <button onClick={handleCopyWallet} className="shrink-0 p-1.5 rounded-md hover:bg-muted transition-colors">
                          {copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4 text-muted-foreground" />}
                        </button>
                      </div>
                      <p className="text-[10px] text-destructive">⚠️ Only send {selectedAsset.symbol} to this address. Sending other tokens may result in permanent loss.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Actions */}
              <div className="flex flex-col gap-3 pt-2">
                {!showWallet ? (
                  <Button
                    className="w-full gap-2"
                    onClick={() => setShowWallet(true)}
                    disabled={!stakeAmount || !stakingPeriod || parseFloat(stakeAmount) <= 0}
                  >
                    <ArrowRight className="w-4 h-4" />
                    Review & Confirm
                  </Button>
                ) : (
                  <Button className="w-full gap-2" variant="outline" onClick={() => setShowWallet(false)}>
                    Hide Wallet Address
                  </Button>
                )}
                <Button variant="outline" onClick={() => { setSelectedAsset(null); setShowWallet(false); }}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <FooterSection />
    </div>
  );
};

export default StakeAssets;
