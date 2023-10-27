import { FaSpinner } from "react-icons/fa";

export function Loader() {
  return (
    <div className="fixed top-0 left-0 z-50 w-full h-screen flex items-center justify-center bg-rose-500">
      <div className="text-custom-icon text-white">
        <FaSpinner className="animate-spin text-6xl" />
      </div>
    </div>
  );
}
