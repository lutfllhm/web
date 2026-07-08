import { Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import WhatsAppButton from "./components/ui/WhatsAppButton";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ThermalPrinterPage from "./pages/categories/ThermalPrinterPage";
import BarcodeLabelPrinterPage from "./pages/categories/BarcodeLabelPrinterPage";
import MobilePrinterPage from "./pages/categories/MobilePrinterPage";
import BarcodeScannerPage from "./pages/categories/BarcodeScannerPage";
import CashDrawerPage from "./pages/categories/CashDrawerPage";
import AllInOnePosSystemPage from "./pages/categories/AllInOnePosSystemPage";
import MiniPcPage from "./pages/categories/MiniPcPage";
import MonitorPcPage from "./pages/categories/MonitorPcPage";
import SelfOrderKioskPage from "./pages/categories/SelfOrderKioskPage";
import TabletPage from "./pages/categories/TabletPage";
import MoneyCounterPage from "./pages/categories/MoneyCounterPage";
import CallingSystemPage from "./pages/categories/CallingSystemPage";
import WalkieTalkiePage from "./pages/categories/WalkieTalkiePage";
import LainnyaPage from "./pages/categories/LainnyaPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import FaqPage from "./pages/FaqPage";
import ArtikelPage from "./pages/ArtikelPage";
import DownloadPage from "./pages/DownloadPage";
import ScrollToTop from "./components/ui/ScrollToTop";
import DocumentTitle from "./components/ui/DocumentTitle";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <DocumentTitle />
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/"         element={<HomePage />} />
            <Route path="/produk"   element={<ProductsPage />} />
            <Route path="/produk/thermal-printer" element={<ThermalPrinterPage />} />
            <Route path="/produk/barcode-label-printer" element={<BarcodeLabelPrinterPage />} />
            <Route path="/produk/mobile-printer" element={<MobilePrinterPage />} />
            <Route path="/produk/barcode-scanner" element={<BarcodeScannerPage />} />
            <Route path="/produk/cash-drawer" element={<CashDrawerPage />} />
            <Route path="/produk/all-in-one-pos-system" element={<AllInOnePosSystemPage />} />
            <Route path="/produk/mini-pc" element={<MiniPcPage />} />
            <Route path="/produk/monitor-pc" element={<MonitorPcPage />} />
            <Route path="/produk/self-order-kiosk" element={<SelfOrderKioskPage />} />
            <Route path="/produk/tablet" element={<TabletPage />} />
            <Route path="/produk/money-counter" element={<MoneyCounterPage />} />
            <Route path="/produk/calling-system" element={<CallingSystemPage />} />
            <Route path="/produk/walkie-talkie-and-handy-talkie" element={<WalkieTalkiePage />} />
            <Route path="/produk/lainnya" element={<LainnyaPage />} />
            <Route path="/tentang"  element={<AboutPage />} />
            <Route path="/kontak"   element={<ContactPage />} />
            <Route path="/faq"      element={<FaqPage />} />
            <Route path="/artikel"  element={<ArtikelPage />} />
            <Route path="/download" element={<DownloadPage />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
