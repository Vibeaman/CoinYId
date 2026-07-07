import { motion } from "framer-motion";
import { Shield, Repeat, TrendingUp, Wallet, Lock, Globe } from "lucide-react";

const features = [
  { icon: Shield, title: "Self-Custody", desc: "Your keys, your crypto. No third-party risk. Full control at all times." },
  { icon: Repeat, title: "Cross-Chain Swaps", desc: "Swap between chains seamlessly. No bridges, no hassle." },
  { icon: TrendingUp, title: "Yield Farming", desc: "Access the best yields across DeFi protocols automatically." },
  { icon: Wallet, title: "Multi-Asset Support", desc: "BTC, ETH, SOL, and 500+ tokens in one secure wallet." },
  { icon: Lock, title: "Hardware Wallet Support", desc: "Connect your Ledger or Trezor for maximum security." },
  { icon: Globe, title: "15+ Chains", desc: "Ethereum, Solana, BSC, Polygon, Arbitrum, and more." },
];

const WhyChooseSection = () => {
  return (
    <section id="why-choose" className="py-24 relative scroll-mt-8">
      <div className="absolute inset-0 bg-secondary/30" />
      <div className="relative container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Why Choose <span className="text-primary">CoinYId</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Built for traders, investors, and DeFi enthusiasts who demand full control and transparency
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl border border-border p-6 transition-all hover:border-primary/40 hover:shadow-[var(--glow-primary)]"
              style={{ background: "var(--gradient-card)" }}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/15 flex items-center justify-center mb-4">
                <f.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading text-lg font-semibold mb-2 text-foreground">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
