import { twMerge } from "tailwind-merge";

const Corner = ({ className }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M20 4H10C6.68629 4 4 6.68629 4 10V20"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function GlowButton({ children, className }) {
  const defaultClasses = `
    relative
    px-4 py-2 sm:px-6 sm:py-3 md:px-10 md:py-4
    min-w-28 sm:min-w-32 md:min-w-40 max-w-full md:max-w-xs
    min-h-12 sm:min-h-14 md:min-h-16
    bg-[#141312]
    text-base sm:text-lg md:text-xl
    text-gray-200 font-bold rounded-lg
    border-2 border-orange-500
    shadow-[0_0_30px_10px_rgba(249,115,22,0.9)]
    hover:bg-orange-500 hover:text-black
    transition duration-300
  `;
  const mergedClasses = twMerge(defaultClasses, className);
  return (
    <button className={mergedClasses}>
      {children}
      <Corner className="absolute top-1 left-1 text-orange-500 w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6" />
      <Corner className="absolute top-1 right-1 text-orange-500 transform rotate-90 w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6" />
      <Corner className="absolute bottom-1 right-1 text-orange-500 transform rotate-180 w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6" />
      <Corner className="absolute bottom-1 left-1 text-orange-500 transform -rotate-90 w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6" />
    </button>
  );
}
