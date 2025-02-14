import { Link } from 'react-router-dom';
import Logo from '../common/LogoNifty';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  const socialLinks = [
    {
      name: 'Facebook',
      icon: <FaFacebook className="w-6 h-6" />,
      url: 'https://facebook.com/nifty',
    },
    {
      name: 'Twitter',
      icon: <FaTwitter className="w-6 h-6" />,
      url: 'https://twitter.com/nifty',
    },
    {
      name: 'Instagram',
      icon: <FaInstagram className="w-6 h-6" />,
      url: 'https://instagram.com/nifty',
    },
    {
      name: 'Youtube',
      icon: <FaYoutube className="w-6 h-6" />,
      url: 'https://youtube.com/nifty',
    },
  ];

  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo và thông tin */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-3">
              <Logo />
              <span className="text-xl font-bold tracking-wider bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent">
                NIFTY
              </span>
            </Link>
            <p className="mt-4 text-gray-500">
              Kết nối - Chia sẻ - Khám phá. Nơi bạn có thể chia sẻ những khoảnh
              khắc và kết nối với mọi người.
            </p>
          </div>

          {/* Liên kết */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              Khám phá
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link
                  to="/explore"
                  className="text-base text-gray-500 hover:text-gray-900"
                >
                  Khám phá
                </Link>
              </li>
              <li>
                <Link
                  to="/trending"
                  className="text-base text-gray-500 hover:text-gray-900"
                >
                  Xu hướng
                </Link>
              </li>
              <li>
                <Link
                  to="/people"
                  className="text-base text-gray-500 hover:text-gray-900"
                >
                  Tìm bạn bè
                </Link>
              </li>
            </ul>
          </div>

          {/* Trợ giúp & Chính sách */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              Trợ giúp & Chính sách
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link
                  to="/help"
                  className="text-base text-gray-500 hover:text-gray-900"
                >
                  Trung tâm trợ giúp
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-base text-gray-500 hover:text-gray-900"
                >
                  Chính sách quyền riêng tư
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-base text-gray-500 hover:text-gray-900"
                >
                  Điều khoản sử dụng
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-8 border-t border-gray-200 pt-8">
          <div className="flex justify-center space-x-6">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-500 transition-colors duration-300"
                aria-label={`Follow us on ${social.name}`}
              >
                {social.icon}
              </a>
            ))}
          </div>
          <p className="mt-8 text-base text-gray-400 text-center">
            &copy; {new Date().getFullYear()} NIFTY Social. Đã đăng ký bản
            quyền.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
