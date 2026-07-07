import { useState, useEffect } from "react";
import { Menu, Languages, TrendingUp, DollarSign, User, Loader2 } from "lucide-react";
import ProfileDropdown from "@/components/ProfileDropdown";
import { motion } from "framer-motion";
import FooterSection from "@/components/FooterSection";
import WalletSidebar from "@/components/WalletSidebar";

const COINGECKO_IDS = [
  { id: "ethereum", symbol: "ETH", icon: "⟠" },
  { id: "tether", symbol: "USDT", icon: "₮" },
  { id: "bitcoin", symbol: "BTC", icon: "₿" },
  { id: "solana", symbol: "SOL", icon: "◎" },
];

interface TickerCoin {
  name: string;
  symbol: string;
  price: string;
  change: string;
  changePositive: boolean;
  icon: string;
}

const formatPrice = (price: number) =>
  price < 1 ? `$${price.toFixed(4)}` : `$${price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const useCryptoTicker = () => {
  const [coins, setCoins] = useState<TickerCoin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const ids = COINGECKO_IDS.map((c) => c.id).join(",");
        const res = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`
        );
        const data = await res.json();

        const mapped: TickerCoin[] = COINGECKO_IDS.map((c) => {
          const d = data[c.id];
          const change = d?.usd_24h_change ?? 0;
          return {
            name: c.id.charAt(0).toUpperCase() + c.id.slice(1),
            symbol: c.symbol,
            price: d ? formatPrice(d.usd) : "—",
            change: `${change >= 0 ? "+" : ""}${change.toFixed(2)}%`,
            changePositive: change >= 0,
            icon: c.icon,
          };
        });
        setCoins(mapped);
      } catch {
        // fallback static
        setCoins(
          COINGECKO_IDS.map((c) => ({
            name: c.id.charAt(0).toUpperCase() + c.id.slice(1),
            symbol: c.symbol,
            price: "—",
            change: "0.00%",
            changePositive: true,
            icon: c.icon,
          }))
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 60000); // refresh every 60s
    return () => clearInterval(interval);
  }, []);

  return { coins, loading };
};

const WalletDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { coins, loading } = useCryptoTicker();

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col relative">
      {/* Sidebar */}
      <WalletSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Top nav bar */}
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

      {/* Crypto ticker strip */}
      <div className="bg-card border-b border-border overflow-x-auto">
        <div className="flex items-center gap-6 px-4 py-3 min-w-max">
          {loading ? (
            <div className="flex items-center gap-2 py-1">
              <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Loading prices…</span>
            </div>
          ) : (
            coins.map((coin) => (
              <div key={coin.symbol} className="flex items-center gap-2">
                <span className="text-lg">{coin.icon}</span>
                <span className="text-sm font-medium text-foreground">{coin.name}</span>
                <span className="text-xs text-muted-foreground">{coin.symbol}</span>
                <span className="text-sm font-semibold text-foreground">{coin.price}</span>
                <span className={`text-xs font-medium ${coin.changePositive ? "text-primary" : "text-destructive"}`}>
                  {coin.changePositive ? "▲" : "▼"} {coin.change}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 px-4 py-6 space-y-6">
        {/* Vault & PNL Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-card rounded-2xl border border-border p-6"
        >
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">0.00</p>
                <p className="text-sm text-muted-foreground">Vault</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">0.0%</p>
                <p className="text-sm text-muted-foreground">PNL</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Asset Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-card rounded-2xl border border-border p-6"
        >
          <h2 className="font-heading text-lg font-bold text-foreground mb-4">Asset Breakdown</h2>

          {/* Table header */}
          <div className="grid grid-cols-3 gap-4 py-3 border-b border-border">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Asset</span>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Balance</span>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider text-right">Allocation</span>
          </div>

          {/* Empty state */}
          <div className="py-12 text-center">
            <p className="text-muted-foreground text-sm">No assets yet. Start by receiving crypto.</p>
          </div>
        </motion.div>
      </div>

      <FooterSection />
    </div>
  );
};

export default WalletDashboard;
