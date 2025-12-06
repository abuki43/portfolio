import { useState } from 'react';
import { Link } from 'react-scroll';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = ['Home', 'About', 'Projects', 'Contact'];

  return (
    <nav className="fixed w-full bg-parchment/95 backdrop-blur-sm z-50 border-b border-sepia/10">
      <div className="container mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          {/* Brand Name - Editorial Style */}
          <Link
            to="home"
            spy={true}
            smooth={true}
            duration={500}
            className="font-heading text-xl font-semibold text-tobacco tracking-wide cursor-pointer small-caps"
          >
            Abubeker Abe
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            {menuItems.map((item) => (
              <Link
                key={item}
                to={item.toLowerCase()}
                spy={true}
                smooth={true}
                duration={500}
                offset={-80}
                className="nav-link cursor-pointer"
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-sepia hover:text-tobacco transition-colors"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-6 pb-4 border-t border-sepia/10 pt-4">
            {menuItems.map((item, index) => (
              <Link
                key={item}
                to={item.toLowerCase()}
                spy={true}
                smooth={true}
                duration={500}
                offset={-80}
                className="block py-3 font-heading text-lg text-sepia hover:text-tobacco transition-colors cursor-pointer"
                onClick={() => setIsOpen(false)}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {item}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;