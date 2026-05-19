import { motion } from "framer-motion";
import { useState } from "react";
import { Menu, X, Home, User, Briefcase, Folder, Mail, Trophy } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import logo from "@/assets/logo.png";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  const handleNavigation = (path: string, id?: string) => {
    navigate(path);
    setIsOpen(false);
    if (id) {
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  const menuItems = [
    { label: t.nav.home, path: "/", icon: Home, action: () => handleNavigation("/") },
    { label: t.nav.about, path: "/about", icon: User, action: () => handleNavigation("/about") },
    { label: t.nav.experience, path: "/experience", icon: Briefcase, action: () => handleNavigation("/experience") },
    { label: t.nav.portfolio, path: "/portfolio", icon: Folder, action: () => handleNavigation("/portfolio") },
    { label: t.nav.awards, path: "/awards", icon: Trophy, action: () => handleNavigation("/awards") },
  ];

  return (
    <>
      {/* Background decorative elements */}
      <div className="fixed top-0 left-0 right-0 h-32 pointer-events-none z-40">
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="navGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: "rgb(251, 146, 60)", stopOpacity: 0.1 }} />
              <stop offset="100%" style={{ stopColor: "rgb(168, 85, 247)", stopOpacity: 0.1 }} />
            </linearGradient>
          </defs>
          <path
            d="M0,20 Q360,0 720,30 T1440,20 L1440,0 L0,0 Z"
            fill="url(#navGradient)"
          />
          <path
            d="M1440,80 Q1080,60 720,70 T0,80 L0,100 L1440,100 Z"
            fill="url(#navGradient)"
            opacity="0.5"
          />
        </svg>
      </div>

      {/* Floating Navigation */}
      <nav className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-4xl"
        >
          {/* Floating bar with glassmorphism */}
          <div className="relative bg-white/10 dark:bg-white/5 backdrop-blur-2xl border border-white/20 dark:border-white/10 rounded-full shadow-2xl">
            {/* Animated gradient background */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative flex items-center justify-between px-6 md:px-8 py-4 md:py-3">
              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => handleNavigation("/")}
              >
                <div className="relative">
                  <img
                    src={logo}
                    alt="Logo"
                    className="h-8 w-8 md:h-10 md:w-10 object-contain filter drop-shadow-md"
                  />
                </div>
              </motion.div>

              {/* Desktop Menu */}
              <div className="hidden md:flex items-center gap-8">
                {menuItems.map((item, index) => {
                  const isActive = location.pathname === item.path;
                  const IconComponent = item.icon;
                  return (
                    <motion.button
                      key={item.label}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + 0.1 * index }}
                      onClick={item.action}
                      className={`font-bold transition-all duration-300 relative group flex items-center gap-2 ${
                        isActive
                          ? "text-base md:text-lg text-red-600"
                          : "text-sm md:text-base text-foreground/80 hover:text-black"
                      }`}
                    >
                      <IconComponent size={20} />
                      {item.label}
                      {isActive && (
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600 rounded-full" />
                      )}
                      {!isActive && (
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-300 rounded-full" />
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* CTA Button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                onClick={() => handleNavigation("/portfolio")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-black text-white rounded-full font-medium text-sm shadow-lg hover:bg-neutral-900 transition-all duration-300 whitespace-nowrap flex items-center gap-2"
              >
                <Folder size={18} />
                {t.nav.portfolio}
              </motion.button>

              {/* Mobile Menu Button */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 bg-white/10 dark:bg-white/5 backdrop-blur-2xl border border-white/20 dark:border-white/10 rounded-3xl shadow-2xl p-4 space-y-3"
            >
              {menuItems.map((item, index) => {
                const isActive = location.pathname === item.path;
                const IconComponent = item.icon;
                return (
                  <motion.button
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={item.action}
                    className={`w-full text-left px-4 py-2 font-bold rounded-full transition-all duration-300 flex items-center gap-2 ${
                      isActive
                        ? "text-base text-red-600 bg-red-600/30 border border-red-600"
                        : "text-sm text-foreground/80 hover:text-black hover:bg-white/10"
                    }`}
                  >
                    <IconComponent size={20} />
                    {item.label}
                  </motion.button>
                );
              })}
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                onClick={() => handleNavigation("/portfolio")}
                className="w-full mt-4 px-4 py-2 bg-black text-white rounded-full font-medium text-sm hover:bg-neutral-900 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Folder size={18} />
                {t.nav.portfolio}
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </nav>
    </>
  );
};

export default Navigation;
