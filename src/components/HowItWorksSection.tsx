import { motion } from "framer-motion";

const steps = [
  { num: "01", title: "Create Your Vault", desc: "Sign up and create your self-custodial wallet in under 60 seconds. You're in full control." },
  { num: "02", title: "Fund & Connect", desc: "Deposit crypto or connect your existing wallet. Support for hardware wallets and external addresses." },
  { num: "03", title: "Trade & Stake", desc: "Swap across chains, stake your assets, or allocate to yield strategies—all with complete transparency." },
  { num: "04", title: "Earn & Withdraw", desc: "Watch your yields grow. Withdraw anytime (subject to product-specific lock-up periods). Your keys, your timeline." },
];

const HowItWorksSection = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary font-medium mb-2 tracking-wide uppercase text-sm">How It Works</p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
            Get started in minutes, not hours
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative rounded-xl border border-border p-8 group hover:border-primary/40 transition-all"
              style={{ background: "var(--gradient-card)" }}
            >
              <span className="font-heading text-5xl font-bold text-primary/15 absolute top-4 right-6 group-hover:text-primary/25 transition-colors">
                {step.num}
              </span>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-3">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
