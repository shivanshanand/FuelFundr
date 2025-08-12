import logo from "../../../assets/logo.jpg";

export default function AppLoader() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-emerald-800 animate-gradient-x">
      <div className="flex flex-col items-center p-6 sm:p-10 rounded-2xl bg-white/10 shadow-2xl border border-blue-900/50 backdrop-blur-md w-11/12 sm:w-auto max-w-md">
        <img
          src={logo}
          alt="Loading FuelFundr"
          className="w-20 h-20 sm:w-28 sm:h-28 mb-5 sm:mb-7 rounded-full border-2 border-blue-500 shadow-xl object-cover bg-white animate-spin-slow"
        />
        <span className="text-2xl sm:text-3xl font-extrabold text-blue-100 drop-shadow-md text-center tracking-tight">
          Getting everything ready for you…
        </span>
      </div>
    </div>
  );
}
