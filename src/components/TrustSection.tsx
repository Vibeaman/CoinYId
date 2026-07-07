import { motion } from "framer-motion";
import { ShieldCheck, Lock, Eye, FileCheck, Users, Server } from "lucide-react";

const trustItems = [
  {
    icon: ShieldCheck,
    title: "Audited Smart Contracts",
    desc: "All smart contracts are independently audited by leading security firms to ensure your funds stay safe.",
  },
  {
    icon: Lock,
    title: "End-to-End Encryption",
    desc: "Your private keys never leave your device. Military-grade encryption protects every transaction.",
  },
  {
    icon: Eye,
    title: "Fully Transparent",
    desc: "Open-source codebase. Verify every line of code. No hidden fees, no shady practices.",
  },
  {
    icon: FileCheck,
    title: "Regulatory Compliant",
    desc: "Built with compliance in mind. KYC/AML ready for institutional and retail users alike.",
  },
  {
    icon: Users,
    title: "Trusted by Millions",
    desc: "Over 5 million users across 100+ countries trust CoinYId to manage their digital assets.",
  },
  {
    icon: Server,
    title: "99.99% Uptime",
    desc: "Enterprise-grade infrastructure ensures your wallet is always available when you need it.",
  },
];

const TrustSection = () => {
  return (
    <section className="py-24 relative">
      <div className="relative container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Built on <span className="text-primary">Trust</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Security isn't a feature — it's our foundation. Here's why users trust CoinYId with their assets.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trustItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl border border-border p-6 transition-all hover:border-primary/40 hover:shadow-[var(--glow-primary)]"
              style={{ background: "var(--gradient-card)" }}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/15 flex items-center justify-center mb-4">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading text-lg font-semibold mb-2 text-foreground">
                {item.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
