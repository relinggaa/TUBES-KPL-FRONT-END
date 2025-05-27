import navlogo from "./assets/img/logo-sagara.png";
const Landing = () => {
  return (
    <>
      <header className="shadow mb-2 bg-white">
        <div className="relative flex max-w-screen-xl flex-col overflow-hidden px-4 py-4 md:mx-auto md:flex-row md:items-center">
          <a
            href="#"
            className="flex items-center whitespace-nowrap text-2xl font-black"
          >
            <img className="w-32" src={navlogo} alt="Logo" />
          </a>
          <input type="checkbox" className="peer hidden" id="navbar-open" />
          <label
            htmlFor="navbar-open"
            className="absolute top-5 right-7 mt-9 cursor-pointer md:hidden"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </label>

          <nav
            aria-label="Header Navigation"
            className="peer-checked:mt-8 peer-checked:max-h-56 flex max-h-0 w-full flex-col items-center justify-between overflow-hidden transition-all md:ml-24 md:max-h-full md:flex-row md:items-start"
          >
            <ul className="flex flex-col items-center space-y-2 md:ml-auto md:flex-row md:space-y-0">
              <li className="text-gray-600 md:mr-12 hover:text-blue-600">
                <a href="/">Home</a>
              </li>
              <li className="text-gray-600 md:mr-12 hover:text-blue-600">
                <a href="/admin">Admin</a>
              </li>
              <li className="text-gray-600 md:mr-12 hover:text-blue-600">
                <a href="/driver">Driver</a>
              </li>
              <li className="text-gray-600 md:mr-12 hover:text-blue-600">
                <a href="/Teknisi">Teknisi</a>
              </li>
              <li className="text-gray-600 md:mr-12 hover:text-blue-600">
                <button className="rounded-md border-2 border-blue-600 px-6 py-1 font-medium text-blue-600 transition-colors hover:bg-blue-600 hover:text-white">
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="py-8">
        <div className="max-w-screen-xl px-4 md:mx-auto">
          <h1 className="text-3xl font-bold">Welcome To Sagara Daily Checkup</h1>
          <p className="mt-4 text-blue-600">
            Always Check Your Vehicle.
          </p>
        </div>
      </main>

{/* CARD */}

<div className="max-w-screen-xl px-3 md:mx-auto mt-1 flex flex-col gap-5 items-start">
  {/* Card 1 */}
  <div className="relative group w-72 h-40 bg-white rounded-xl shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer">
    <div className="absolute inset-0 bg-blue-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl z-0"></div>
    <div className="relative z-10 flex flex-col items-start justify-center h-full px-5">
      <h2 className="text-xl font-semibold text-blue-700 mb-2 text-left">Cek Kendaraan</h2>
      <p className="text-base text-gray-600 text-left">Lakukan pengecekan harian kendaraan dengan mudah dan cepat.</p>
    </div>
  </div>
  {/* Card 2 */}
  <div className="relative group w-72 h-40 bg-white rounded-xl shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer">
    <div className="absolute inset-0 bg-blue-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl z-0"></div>
    <div className="relative z-10 flex flex-col items-start justify-center h-full px-5">
      <h2 className="text-xl font-semibold text-blue-700 mb-2 text-left">Laporan & Riwayat</h2>
      <p className="text-base text-gray-600 text-left">Lihat laporan dan riwayat pengecekan kendaraan secara real-time.</p>
    </div>
  </div>
  {/* Card 3 */}
  <div className="relative group w-72 h-40 bg-white rounded-xl shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer">
    <div className="absolute inset-0 bg-blue-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl z-0"></div>
    <div className="relative z-10 flex flex-col items-start justify-center h-full px-5">
      <h2 className="text-xl font-semibold text-blue-700 mb-2 text-left">Notifikasi</h2>
      <p className="text-base text-gray-600 text-left">Admin Mendapatkan notifikasi jika ada masalah pada kendaraan.</p>
    </div>
  </div>
</div>

    </>
  );
};
export default Landing;



