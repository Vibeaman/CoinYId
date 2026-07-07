import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index.tsx";
import WalletLogin from "./pages/WalletLogin.tsx";
import CreateWallet from "./pages/CreateWallet.tsx";
import RecoveryPhrase from "./pages/RecoveryPhrase.tsx";
import WalletDashboard from "./pages/WalletDashboard.tsx";
import StakeAssets from "./pages/StakeAssets.tsx";
import SendCrypto from "./pages/SendCrypto.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/wallet" element={<WalletLogin />} />
            <Route path="/wallet/create" element={<CreateWallet />} />
            <Route path="/wallet/recovery" element={<RecoveryPhrase />} />
            <Route
              path="/wallet/dashboard"
              element={<ProtectedRoute><WalletDashboard /></ProtectedRoute>}
            />
            <Route
              path="/wallet/stake"
              element={<ProtectedRoute><StakeAssets /></ProtectedRoute>}
            />
            <Route
              path="/wallet/send"
              element={<ProtectedRoute><SendCrypto /></ProtectedRoute>}
            />
            <Route
              path="/wallet/profile"
              element={<ProtectedRoute><ProfilePage /></ProtectedRoute>}
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
