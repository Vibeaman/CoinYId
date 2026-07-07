import { motion } from "framer-motion";

const stats = [
  { value: "$1.8B+", label: "Total Value Locked" },
  { value: "5M+", label: "Active Users" },
  { value: "8.4%", label: "Average APY" },
  { value: "15+", label: "Supported Chains" },
];

const StatsSection = () => {
  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-secondary/30" />
      <div className="relative container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <p className="font-heading text-4xl md:text-5xl font-bold text-accent mb-2">{s.value}</p>
              <p className="text-muted-foreground">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
