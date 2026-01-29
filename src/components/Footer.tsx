import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-secondary/50 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-display font-bold text-gradient mb-4">CurrencY</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Delivering excellence through innovation and dedication.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-2">
              <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                About Us
              </Link>
              <Link to="/catalogue" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Catalogue
              </Link>
              <Link to="/owner" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Owner
              </Link>
            </nav>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">
              Contact
            </h4>
            <p className="text-muted-foreground text-sm">
              Currencyinternational321@gmail.com
            </p>
            <p className="text-muted-foreground text-sm mt-1">
              +91 8595507825
            </p>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} CurrencY. All rights reserved.
          </p>
<p className="text-muted-foreground text-sm">
  Made by{" "}
  <a
    href="https://wybzite.vercel.app"
    target="_blank"
    rel="noopener noreferrer"
    className="text-[#F2A23A] hover:underline hover:opacity-80 font-medium"
  >
    Wybzite
  </a> 🧭
</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
