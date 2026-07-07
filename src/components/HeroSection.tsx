import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        <div className="absolute inset-0 bg-background/60" />
      </div>

      {/* Floating orbs */}
      <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-primary/10 blur-[100px] animate-pulse-glow" />
      <div className="absolute bottom-40 left-10 w-96 h-96 rounded-full bg-accent/8 blur-[120px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />

      <div className="relative z-10 container mx-auto px-6 pt-32 pb-20">
        {/* Nav */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-6 left-0 right-0 px-6 flex items-center justify-between"
        >
          <span className="font-heading text-2xl font-bold text-foreground tracking-tight">
            CoinY<span className="text-primary">Id</span>
          </span>
          <Link to="/wallet" className="rounded-full border border-primary/30 bg-primary/10 px-6 py-2.5 text-sm font-medium text-primary transition-all hover:bg-primary/20 hover:shadow-[var(--glow-primary)]">
            Wallet
          </Link>
        </motion.nav>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-3xl"
        >
          <h1 className="font-heading text-5xl md:text-7xl font-bold leading-[1.1] mb-6 text-foreground">
            Your Keys, Your Crypto,{" "}
            <span className="text-primary">Your Yields</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
            Self-custody wallet with cross-chain swaps, staking, and yield farming. Trade, stake, and earn—all while keeping full control of your assets.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link to="/wallet" className="rounded-full px-8 py-4 font-semibold text-primary-foreground transition-all hover:shadow-[var(--glow-primary)] hover:scale-105" style={{ background: "var(--gradient-primary)" }}>
              Launch Vault →
            </Link>
            <a href="#why-choose" className="rounded-full border border-accent/40 bg-accent/10 px-8 py-4 font-semibold text-accent transition-all hover:bg-accent/20 hover:shadow-[var(--glow-accent)]">
              Explore Features
            </a>
          </div>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-20 rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Highest Staked Assets</p>
              <p className="font-heading text-xl font-bold text-primary">BTC • SOL • ETH</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Dominant Yield Strategy</p>
              <p className="font-heading text-xl font-bold text-accent">Lending Protocols • Native Staking • DeFi Mirror Algo</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Yield Ranges</p>
              <p className="font-heading text-xl font-bold text-primary">Flexible • 60 Days • 90 Days</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
