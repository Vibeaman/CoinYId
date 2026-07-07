import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CtaSection = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-3xl border border-primary/20 p-12 md:p-20 text-center overflow-hidden"
          style={{ background: "var(--gradient-card)" }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-primary/10 blur-[120px]" />
          <div className="relative z-10">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Ready to start farming?
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
              Create your non-custodial vault in under 60 seconds and unlock yields across the best chains.
            </p>
            <Link to="/wallet" className="inline-block rounded-full px-10 py-4 font-semibold text-primary-foreground text-lg transition-all hover:shadow-[var(--glow-primary)] hover:scale-105" style={{ background: "var(--gradient-primary)" }}>
              Launch Vault Now →
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
