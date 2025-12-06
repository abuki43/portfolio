import { BulletSeparator } from "./Ornaments";

const Footer = () => {
  const socialLinks = [
    { name: "GitHub", url: "https://github.com/abuki43" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/abubeker-abe-bb2325285?" },
    { name: "Telegram", url: "https://t.me/ABking1" },
  ];

  return (
    <footer className="py-12 px-6 border-t border-sepia/10">
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col items-center gap-6">
          {/* Social Links */}
          <div className="flex flex-wrap justify-center items-center">
            {socialLinks.map((link, index) => (
              <span key={link.name} className="inline-flex items-center">
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-caption text-sm text-sepia hover:text-tobacco transition-colors"
                >
                  {link.name}
                </a>
                {index < socialLinks.length - 1 && <BulletSeparator />}
              </span>
            ))}
          </div>

          {/* Copyright */}
          <p className="font-caption text-xs text-sepia/60 small-caps tracking-wider">
            © 2025 Abubeker Abe. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
