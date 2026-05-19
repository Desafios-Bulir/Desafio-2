import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MapPin, Phone, ExternalLink } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/Gilson-chipombo",
      label: "GitHub",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/gilson-bravo-fernando-chipombo-aa0ba4209/",
      label: "LinkedIn",
    },
    {
      icon: Mail,
      href: "mailto:fernandochipombo@email.com",
      label: "Email",
    },
  ];

  const quickLinks = [
    { label: t.nav.home, href: "/" },
    { label: t.nav.about, href: "/about" },
    { label: t.nav.experience, href: "/experience" },
    { label: t.nav.portfolio, href: "/portfolio" },
  ];

  const contactInfo = [
    { icon: MapPin, text: t.footer.contactInfo },
    { icon: Mail, text: t.footer.email },
  ];

  return (
    <footer className="relative mt-20 border-t border-white/10 bg-black">
      {/* Decorative top line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-600/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-lg font-bold text-white mb-4">Gilson Chipombo</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              {t.footer.footerDescription}
            </p>
            <div className="pt-2 space-y-2">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <div key={index} className="flex items-center gap-2 text-sm text-gray-400">
                    <Icon size={16} className="text-red-600" />
                    <span>{info.text}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-lg font-bold text-white mb-4">{t.footer.navigation}</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-red-600 transition-colors duration-300 flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-red-600" />
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-lg font-bold text-white mb-4">{t.footer.connect}</h3>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-red-600/20 to-red-600/10 border border-red-600/30 flex items-center justify-center text-red-600 hover:bg-red-600/30 hover:border-red-600/50 transition-all duration-300"
                    aria-label={social.label}
                  >
                    <Icon size={24} />
                  </motion.a>
                );
              })}
            </div>
            <p className="text-xs text-gray-500 mt-6">
              {t.footer.message}
            </p>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-xs text-gray-500 font-mono">
            © {currentYear} Gilson Chipombo. {t.footer.copyright}
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span></span>
            <span className="text-red-600"></span>
            <span></span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
