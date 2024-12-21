import { Link } from "react-router-dom";
import useCurrentYear from "../../hooks/useCurrentYear";

const Footer: React.FC = () => {
  const currentYear: number = useCurrentYear();
  return (
    <footer className="bg-[#0d0c22] text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-sm">
          &copy; {currentYear} Acme.co. All rights reserved.
        </div>
        <div className="flex space-x-4">
          <Link to="/" className="text-white hover:text-gray-400">
            Privacy Policy
          </Link>
          <Link to="/" className="text-white hover:text-gray-400">
            Terms of Service
          </Link>
          <Link to="/" className="text-white hover:text-gray-400">
            Contact Us
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
