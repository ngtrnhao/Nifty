const Logo = () => {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-indigo-600"
    >
      {/* Khung nền */}
      <rect
        x="4"
        y="4"
        width="28"
        height="28"
        rx="8"
        className="fill-current"
        fillOpacity="0.1"
      />

      {/* Chữ N stylized */}
      <path
        d="M11 11L11 25M11 11L25 25M25 11L25 25"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Viền trang trí góc */}
      <path
        d="M4 12V8C4 5.79086 5.79086 4 8 4H12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M24 4H28C30.2091 4 32 5.79086 32 8V12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M32 24V28C32 30.2091 30.2091 32 28 32H24"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 32H8C5.79086 32 4 30.2091 4 28V24"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default Logo;
