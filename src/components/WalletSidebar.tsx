import { useState } from "react";
import { X, LayoutDashboard, Upload, Clock, Wallet, ChevronDown, Coins } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface WalletSidebarProps {
  open: boolean;
  onClose: () => void;
}

interface MenuItem {
  label: string;
  icon: React.ElementType;
  path?: string;
  children?: { label: string; icon: React.ElementType; path: string }[];
}

const menuItems: MenuItem[] = [
  { label: "Overview", icon: LayoutDashboard, path: "/wallet/dashboard" },
  { label: "Send", icon: Upload, path: "/wallet/send" },
  {
    label: "Earn",
    icon: Clock,
    children: [
      { label: "Stake", icon: Coins, path: "/wallet/stake" },
    ],
  },
];

const WalletSidebar = ({ open, onClose }: WalletSidebarProps) => {
  const [earnOpen, setEarnOpen] = useState(false);
  const navigate = useNavigate();

  const handleNav = (path?: string) => {
    if (path) {
      navigate(path);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-0 left-0 h-full w-72 bg-card border-r border-border z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Wallet className="w-4 h-4 text-primary" />
                </div>
                <span className="font-heading text-xl font-bold text-foreground tracking-tight">
                  CoinY<span className="text-primary">Id</span>
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-secondary/50 transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Menu items */}
            <nav className="flex-1 px-4 py-6 space-y-1">
              {menuItems.map((item) => (
                <div key={item.label}>
                  <button
                    onClick={() => {
                      if (item.children) {
                        setEarnOpen(!earnOpen);
                      } else {
                        handleNav(item.path);
                      }
                    }}
                    className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-foreground hover:bg-secondary/50 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                    {item.children && (
                      <ChevronDown
                        className={`w-4 h-4 text-muted-foreground transition-transform ${earnOpen ? "rotate-180" : ""}`}
                      />
                    )}
                  </button>

                  {/* Sub-items */}
                  {item.children && earnOpen && (
                    <div className="ml-6 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <button
                          key={child.label}
                          onClick={() => handleNav(child.path)}
                          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-foreground hover:bg-secondary/50 transition-colors group"
                        >
                          <child.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                          <span className="text-sm font-medium">{child.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default WalletSidebar;
