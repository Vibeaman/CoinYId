import { Instagram, Youtube, MessageCircle, BookOpen } from "lucide-react";

const FooterSection = () => {
  return (
    <footer className="bg-card border-t border-border py-16">
      <div className="container mx-auto px-6">
        {/* Top section */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 mb-10">
          <div>
            <span className="font-heading text-2xl font-bold text-foreground tracking-tight">
              CoinY<span className="text-primary">Id</span>
            </span>
            <p className="text-muted-foreground mt-2 text-sm">Join our community</p>

            {/* Social media icons */}
            <div className="flex items-center gap-4 mt-4">
              <a href="#" className="w-10 h-10 rounded-full bg-pink-600 flex items-center justify-center text-white hover:opacity-80 transition-opacity">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white hover:opacity-80 transition-opacity">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white hover:opacity-80 transition-opacity">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-foreground/80 flex items-center justify-center text-background hover:opacity-80 transition-opacity">
                <BookOpen className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-10">2026 © CoinYId</p>

        {/* Company section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <div>
            <h4 className="font-heading font-semibold text-primary mb-4 text-lg">Company</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li className="hover:text-foreground transition-colors cursor-pointer">About</li>
              <li className="hover:text-foreground transition-colors cursor-pointer">Cookies</li>
              <li className="hover:text-foreground transition-colors cursor-pointer">Privacy Policy</li>
              <li className="hover:text-foreground transition-colors cursor-pointer">Terms of Service</li>
              <li className="hover:text-foreground transition-colors cursor-pointer">Corporate & Investor Compliance Report</li>
              <li className="hover:text-foreground transition-colors cursor-pointer">Risk, Security and Compliance Documentation</li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-primary mb-4 text-lg">Documentation</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li className="hover:text-foreground transition-colors cursor-pointer">CoinYId Verify Your Download and Vault Notes</li>
              <li className="hover:text-foreground transition-colors cursor-pointer">Australian Securities and Investments Commission (ASIC)</li>
              <li className="hover:text-foreground transition-colors cursor-pointer">Bundesanstalt für Finanzdienstleistungsaufsicht</li>
              <li className="hover:text-foreground transition-colors cursor-pointer">U.S Securities and Exchange Commission</li>
              <li className="hover:text-foreground transition-colors cursor-pointer">U.K Companies House Filing</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Risk Warning: Cryptocurrency investments carry significant risk. Digital assets are volatile and may result in partial or total loss of capital. CoinYId does not provide investment, legal, or tax advice. Users are solely responsible for their investment decisions.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
