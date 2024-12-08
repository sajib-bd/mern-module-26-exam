const Footer = () => {
  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Blogs", path: "/blogs" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ];
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <h4 className="text-lg font-bold mb-4">About Lie Blog</h4>
          <p className="text-gray-400 text-sm">
            Lie Blog is your go-to platform for inspiring stories, insights, and
            the latest trends. We connect readers to content that matters.
          </p>
        </div>
        {/* Navigation Links */}
        <div>
          <h4 className="text-lg font-bold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {links.map((link, index) => (
              <li key={index}>
                <a
                  href={link.path}
                  className="hover:text-blue-400 transition-colors"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        {/* Contact & Social Links */}
        <div>
          <h4 className="text-lg font-bold mb-4">Contact Us</h4>
          <p className="text-gray-400 text-sm">
            Email:{" "}
            <a
              href="mailto:support@lieblog.com"
              className="hover:text-blue-400 transition-colors"
            >
              support@lieblog.com
            </a>
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Phone:{" "}
            <a
              href="tel:+123456789"
              className="hover:text-blue-400 transition-colors"
            >
              +1 234 567 89
            </a>
          </p>
          <div className="mt-4 flex space-x-4">
            <a
              href="https://facebook.com/enough2005"
              target="_blank"
              className="hover:text-blue-400 transition-colors"
            >
              Facebook
            </a>
            <a
              href="https://www.linkedin.com/in/enough2005"
              target="_blank"
              className="hover:text-blue-400 transition-colors"
            >
              Linkedin
            </a>
            <a
              href="https://t.me/englush2005"
              target="_blank"
              className="hover:text-blue-400 transition-colors"
            >
              Telegram
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-8 border-t border-gray-700 pt-6 text-center">
        <p className="text-sm text-gray-500">
          © 2024 Lie Blog. All rights reserved. | Designed by Lie Blog Team.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
