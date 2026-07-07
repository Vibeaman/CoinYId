import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";

const faqs = [
  { q: "What is self-custody?", a: "Self-custody means you hold your own private keys. No third party can access, freeze, or seize your assets. You are in complete control." },
  { q: "How does CoinYId make money?", a: "CoinYId earns a small performance fee on yield strategies. We never charge hidden fees—all costs are disclosed upfront." },
  { q: "Where are my assets stored?", a: "Your assets remain in your self-custodial wallet. CoinYId never takes custody of your funds." },
  { q: "Can I withdraw at any time?", a: "Yes, most products allow instant withdrawal. Some yield strategies have lock-up periods which are clearly disclosed before you commit." },
  { q: "What are the main risks?", a: "Cryptocurrency investments carry significant risk including smart contract risk, market volatility, and potential loss of capital." },
  { q: "Can I connect a hardware wallet?", a: "Yes. CoinYId supports Ledger, Trezor, and other popular hardware wallets for maximum security." },
  { q: "Does CoinYId support loans?", a: "Lending and borrowing features are available through integrated DeFi protocols on supported chains." },
  { q: "Does CoinYId support copy trading?", a: "Automated strategies and social trading features are on our roadmap and coming soon." },
];

const FaqSection = () => {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-secondary/30" />
      <div className="relative container mx-auto px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-primary font-medium mb-2 tracking-wide uppercase text-sm">FAQ</p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="rounded-xl border border-border px-6 data-[state=open]:border-primary/40"
              style={{ background: "var(--gradient-card)" }}
            >
              <AccordionTrigger className="font-heading font-semibold text-foreground hover:text-primary hover:no-underline py-5">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FaqSection;
