import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { MdEdit, MdDelete } from "react-icons/md";
import navlogo from "./assets/img/logo-sagara.png";
import "react-toastify/dist/ReactToastify.css";

const Teknisi = () => {
  const [activeTab, setActiveTab] = useState("kerusakan");
  const [kerusakans, setKerusakans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [kerusakanForm, setKerusakanForm] = useState({
    merek: "",
    platNomor: "",
    kendala: "",
    Catatan: "",
  });
  const [selectedKerusakan, setSelectedKerusakan] = useState(null);

  useEffect(() => {
    getKerusakan();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const getKerusakan = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://localhost:7119/api/Driver/getKerusakan"
      );
      setKerusakans(response.data);
    } catch (error) {
      toast.error("Gagal mengambil data kerusakan");
    } finally {
      setLoading(false);
    }
  };

  const handleEditKerusakan = (kerusakan) => {
    setSelectedKerusakan(kerusakan);
    setKerusakanForm({
      merek: kerusakan.merek,
      platNomor: kerusakan.platNomor,
      kendala: kerusakan.kendala,
      catatan: kerusakan.Catatan,
    });
  };

  const updateKerusakan = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://localhost:7119/api/Driver/updateKerusakan/${selectedKerusakan.platNomor}`,
        kerusakanForm
      );
      toast.success("Kerusakan berhasil diperbarui");
      setKerusakanForm({ merek: "", platNomor: "", kendala: "", Catatan: "" });
      setSelectedKerusakan(null);
      getKerusakan();
    } catch {
      toast.error("Gagal memperbarui kerusakan");
    }
  };

  const addKerusakan = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://localhost:7119/api/Driver/addKerusakan",
        kerusakanForm
      );
      toast.success("Kerusakan berhasil ditambahkan");
      setKerusakanForm({ merek: "", platNomor: "", kendala: "", Catatan: "" });
      getKerusakan();
    } catch {
      toast.error("Gagal menambahkan kerusakan");
    }
  };

  const deleteKerusakan = async (platNomor) => {
    try {
      await axios.delete(
        `https://localhost:7119/api/Driver/deleteKerusakan/${platNomor}`
      );
      toast.success("Kerusakan berhasil dihapus");
      getKerusakan();
    } catch {
      toast.error("Gagal menghapus kerusakan");
    }
  };

  const searchByPlatNomor = async (platNomor) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://localhost:7119/api/Admin/getKendaraan/${platNomor}`
      );
      if (response.data) {
        setKerusakanForm({
          ...kerusakanForm,
          merek: response.data.merek,
        });
        toast.success("Data kendaraan ditemukan");
      } else {
        toast.error("Plat nomor tidak ditemukan");
      }
    } catch (error) {
      toast.error("Gagal mencari data kendaraan");
    } finally {
      setLoading(false);
    }
  };

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
                <button onClick={() => handleTabChange("kerusakan")}>
                  Tampilkan Data Kerusakan
                </button>
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

      <div className="flex flex-col justify-center items-center mt-12">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
        />

        {activeTab === "kerusakan" && (
          <div className="w-full max-w-6xl">
            <h1 className="text-4xl text-center font-bold">
              List Data Kerusakan
            </h1>
            <div className="w-full bg-gray-50 p-4 rounded-lg shadow-md">
              <table className="min-w-full border-collapse border-spacing-y-2 border-spacing-x-2">
                <thead className="border-b lg:table-header-group">
                  <tr>
                    <td className="py-4 text-sm font-semibold text-gray-800">
                      Merek Kendaraan
                    </td>
                    <td className="py-4 text-sm font-medium text-gray-500">
                      Plat Nomor
                    </td>
                    <td className="py-4 text-sm font-medium text-gray-500">
                      Kendala
                    </td>
                    <td className="py-4 text-sm font-medium text-gray-500">
                      Catatan
                    </td>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {kerusakans.map((kerusakan) => (
                    <tr key={kerusakan.platNomor}>
                      <td className="py-4 text-sm">{kerusakan.merek}</td>
                      <td className="py-4 text-sm">{kerusakan.platNomor}</td>
                      <td className="py-4 text-sm">{kerusakan.kendala}</td>
                      <td className="py-4 text-sm">{kerusakan.Catatan}</td>
                      <td className="py-4 text-sm">
                        <div className="md:flex space-x-2.5">
                          <button
                            onClick={() => deleteKerusakan(kerusakan.platNomor)}
                            className="bg-red-600 text-white hover:bg-red-700 flex items-center mt-2 md:mt-0 px-4 py-2 rounded-md"
                          >
                            <MdDelete className="text-xl mr-2" />
                            Selesai
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Teknisi;
