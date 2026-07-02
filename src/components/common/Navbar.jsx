import { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import cmLogo from '../../assets/logo/cm-logo.jpg';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Council', path: '/council' },
  { name: 'Motion Archive', path: '/archive' },
  { name: 'Competitions', path: '/competitions' },
  { name: 'Rulebook', href: 'https://drive.google.com/file/d/1EuIVTQgImuCDyH0sf7OYgiw0NQlpE21j/' },
  { name: 'Gallery', path: '/gallery' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 border-b-2 border-primary bg-background/90 backdrop-blur-xl"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0 cursor-pointer">
            <Link to="/" className="flex items-center gap-3 text-primary">
              <img
                src={cmLogo}
                alt="Cognitive Minds logo"
                className="h-9 w-9 object-cover"
              />
              <span className="font-serif text-xl font-semibold leading-none">Cognitive Minds</span>
            </Link>
          </div>

          <div className="hidden items-center space-x-7 md:flex">
            {navLinks.map((link) => (
              link.href ? (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="relative group font-sans text-xs font-bold uppercase tracking-[0.08em] text-secondary transition-colors duration-300 hover:text-oxblood"
                >
                  {link.name}
                  <span className="absolute -bottom-2 left-0 h-[2px] w-0 bg-oxblood transition-all duration-300 group-hover:w-full"></span>
                </a>
              ) : (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `relative group font-sans text-xs font-bold uppercase tracking-[0.08em] transition-colors duration-300 ${
                      isActive ? 'text-oxblood' : 'text-secondary hover:text-oxblood'
                    }`
                  }
                >
                  {link.name}
                  <span className="absolute -bottom-2 left-0 h-[2px] w-0 bg-oxblood transition-all duration-300 group-hover:w-full"></span>
                </NavLink>
              )
            ))}
            <Link
              to="/recruitment"
              className="flex items-center border-2 border-primary bg-accent px-5 py-2 text-xs font-bold uppercase tracking-wider text-primary transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary hover:text-paper"
            >
              Join Us
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-primary hover:text-accent transition-colors">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="md:hidden bg-background border-b border-black/5">
          <div className="px-6 pt-2 pb-6 space-y-4 flex flex-col">
            {navLinks.map((link) => (
              link.href ? (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-serif text-secondary hover:text-accent"
                >
                  {link.name}
                </a>
              ) : (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `text-lg font-serif ${isActive ? 'text-primary' : 'text-secondary hover:text-accent'}`
                  }
                >
                  {link.name}
                </NavLink>
              )
            ))}
            <Link
              to="/recruitment"
              onClick={() => setIsOpen(false)}
              className="mt-4 flex w-full items-center justify-center rounded-lg bg-accent py-3 text-sm font-medium text-primary"
            >
              Join Us
            </Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
