import React, { useState, useEffect } from "react";
import AuthPage from "./pages/AuthPage";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { MdEdit, MdDelete } from "react-icons/md";
import navlogo from "./assets/img/logo-sagara.png";
import "react-toastify/dist/ReactToastify.css";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("addKey");
  const [keys, setKeys] = useState([]);
  const [kendaraans, setKendaraans] = useState([]);
  const [loading, setLoading] = useState(false);

  const [keyForm, setKeyForm] = useState({
    username: "",
    role: "admin",
    keyValue: "",
  });

  const isValidPlatNomorFormat = (platNomor) => {
    // Format: satu/tiga huruf - spasi - 1-4 angka - spasi - satu/tiga huruf (ade)
    const regex = /^[A-Z]{1,3} \d{1,4}( [A-Z]{1,3})?$/;
    return regex.test(platNomor.trim().toUpperCase());
  };

  const [selectedKey, setSelectedKey] = useState(null);
  const [KendaraanForm, setKendaraanForm] = useState({
    merek: "",
    platNomor: "",
  });
  const [updateKendaraanForm, setUpdateKendaraanForm] = useState({
    oldPlatNomor: "",
    merek: "",
    platNomor: "",
  });

  useEffect(() => {
    getKey();
    getKendaraan();
  }, []);

  const getKey = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://localhost:7119/api/Login/getKey"
      );
      setKeys(response.data);
    } catch (error) {
      toast.error("Gagal mengambil data key");
    } finally {
      setLoading(false);
    }
  };
  const handleEditKey = (key) => {
    setSelectedKey(key);
    setKeyForm({
      username: key.username,
      role: key.role,
      keyValue: key.Keyvalue,
    });
  };
  const updateKey = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://localhost:7119/api/Login/updateKey/${selectedKey.username}`,
        keyForm
      );
      toast.success("Key berhasil diperbarui");
      setKeyForm({ username: "", role: "admin", keyValue: "" });
      setSelectedKey(null);
      getKey();
    } catch {
      toast.error("Gagal memperbarui key");
    }
  };
  const getKendaraan = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://localhost:7119/api/Admin/getKendaraan"
      );
      setKendaraans(response.data);
    } catch (error) {
      toast.error("Gagal mengambil data kendaraan");
    } finally {
      setLoading(false);
    }
  };

  const CreateKey = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://localhost:7119/api/Login/addKey", keyForm);
      toast.success("Key berhasil dibuat");
      setKeyForm({ username: "", role: "admin", keyValue: "" });
      getKey();
    } catch {
      toast.error("Gagal membuat key");
    }
  };

  const DeleteKey = async (username) => {
    try {
      await axios.delete(
        `https://localhost:7119/api/Login/deleteKey/${username}`
      );
      toast.success("Key berhasil dihapus");
      getKey();
    } catch {
      toast.error("Gagal menghapus key");
    }
  };

  // Fungsi untuk cek apakah plat nomor sudah ada / duplikat (Ade)
  const checkPlatNomorExists = async (platNomor) => {
    try {
      const response = await axios.get(
        "https://localhost:7119/api/Admin/getKendaraan"
      );
      const existing = response.data.find(
        (kendaraan) =>
          kendaraan.platNomor.toUpperCase() === platNomor.toUpperCase()
      );
      return !!existing; // true jika ditemukan, false kalau tidak
    } catch (error) {
      console.error("Gagal memeriksa plat nomor:", error);
      return false;
    }
  };

  const AddKendaraan = async (e) => {
    e.preventDefault();

    const { platNomor, merek } = KendaraanForm;

    if (!isValidPlatNomorFormat(platNomor)) {
      toast.error("Format plat nomor salah. Contoh yang benar: B 1234 ABC");
      return;
    }

    const isDuplicate = await checkPlatNomorExists(platNomor);
    if (isDuplicate) {
      toast.error(`Plat nomor "${platNomor}" sudah terdaftar.`);
      return;
    }

    try {
      const response = await axios.post(
        "https://localhost:7119/api/Admin/addKendaraan",
        KendaraanForm
      );

      toast.success("Kendaraan berhasil ditambahkan");
      setKendaraanForm({ merek: "", platNomor: "" });
      getKendaraan();
    } catch (error) {
      toast.error("Gagal menambahkan kendaraan");
      console.error("Error adding kendaraan:", error);
    }
  };

  const generateKey = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const length = 5;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    setKeyForm({ ...keyForm, keyValue: result });
  };

  const UpdateKendaraan = async (e) => {
    e.preventDefault();

    const { platNomor, merek, oldPlatNomor } = updateKendaraanForm;

    if (!isValidPlatNomorFormat(platNomor)) {
      toast.error("Format plat nomor salah. Contoh yang benar: B 1234 ABC");
      return;
    }

    if (platNomor.toUpperCase() !== oldPlatNomor.toUpperCase()) {
      const isDuplicate = await checkPlatNomorExists(platNomor);
      if (isDuplicate) {
        toast.error(
          `Plat nomor "${platNomor}" sudah digunakan oleh kendaraan lain.`
        );
        return;
      }
    }

    try {
      await axios.put(
        `https://localhost:7119/api/Admin/updateKendaraan/${oldPlatNomor}`,
        { merek, platNomor }
      );
      toast.success("Kendaraan berhasil diupdate");
      setUpdateKendaraanForm({ oldPlatNomor: "", merek: "", platNomor: "" });
      getKendaraan();
    } catch (error) {
      toast.error("Gagal mengupdate kendaraan");
    }
  };

  const handleEditVehicle = (kendaraan) => {
    setUpdateKendaraanForm({
      oldPlatNomor: kendaraan.platNomor,
      merek: kendaraan.merek,
      platNomor: kendaraan.platNomor,
    });
    setActiveTab("addVehicle");
  };

  const DeleteKendaraan = async (platNomor) => {
    try {
      await axios.delete(
        `https://localhost:7119/api/Admin/deleteKendaraan/${platNomor}`
      );
      toast.success("Kendaraan berhasil dihapus");
      getKendaraan();
    } catch {
      toast.error("Gagal menghapus kendaraan");
    }
  };

  const handleLogout = () => {
    // Hapus data auth dari localStorage/session (jika ada)
    localStorage.removeItem("token"); // atau sessionStorage.removeItem("token")

    // Tampilkan notifikasi
    toast.success("Berhasil logout");

    // Arahkan ke halaman login / landing page
    window.location.href = "/login"; // ganti sesuai routing
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
                <button onClick={() => setActiveTab("addKey")}>Buat Key</button>
              </li>
              <li className="text-gray-600 md:mr-12 hover:text-blue-600">
                <button onClick={() => setActiveTab("addVehicle")}>
                  Tambah Data Kendaraan
                </button>
              </li>
              <li className="text-gray-600 md:mr-12 hover:text-blue-600">
                <button
                  onClick={handleLogout}
                  className="rounded-md border-2 border-blue-600 px-6 py-1 font-medium text-blue-600 transition-colors hover:bg-blue-600 hover:text-white"
                >
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <div className="flex  flex-col justify-center items-center mt-12">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
        />
        {activeTab === "addVehicle" && (
          <div className="w-full max-w-6xl">
            <div className="bg-white p-5 rounded-lg shadow-md mb-6">
              <h1 className="text-2xl font-bold mb-4">
                {updateKendaraanForm.oldPlatNomor
                  ? "Edit Kendaraan"
                  : "Tambah Kendaraan"}
              </h1>

              <form
                onSubmit={
                  updateKendaraanForm.oldPlatNomor
                    ? UpdateKendaraan
                    : AddKendaraan
                }
                className="space-y-4"
              >
                <div>
                  <input
                    type="text"
                    placeholder="Merek Kendaraan"
                    value={updateKendaraanForm.merek || KendaraanForm.merek}
                    onChange={(e) =>
                      updateKendaraanForm.oldPlatNomor
                        ? setUpdateKendaraanForm({
                            ...updateKendaraanForm,
                            merek: e.target.value,
                          })
                        : setKendaraanForm({
                            ...KendaraanForm,
                            merek: e.target.value,
                          })
                    }
                    className="input border border-gray-300 p-3 rounded-md w-full"
                    required
                  />
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Plat Nomor"
                    value={
                      updateKendaraanForm.platNomor || KendaraanForm.platNomor
                    }
                    onChange={(e) =>
                      updateKendaraanForm.oldPlatNomor
                        ? setUpdateKendaraanForm({
                            ...updateKendaraanForm,
                            platNomor: e.target.value,
                          })
                        : setKendaraanForm({
                            ...KendaraanForm,
                            platNomor: e.target.value,
                          })
                    }
                    className="input border border-gray-300 p-3 rounded-md w-full"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors"
                >
                  {updateKendaraanForm.oldPlatNomor
                    ? "Update Kendaraan"
                    : "Tambah Kendaraan"}
                </button>
              </form>
            </div>

            <div className="w-full bg-gray-50 p-4 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <form className="relative flex w-full max-w-2xl items-center">
                  <svg
                    className="absolute left-2 block h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                  <input
                    type="name"
                    name="search"
                    className="h-12 w-full border-b-gray-400 bg-transparent py-4 pl-12 text-sm outline-none focus:border-b-2"
                    placeholder="Search by Order ID, Date, Customer"
                  />
                </form>
                <button
                  type="button"
                  className="relative inline-flex items-center rounded-full border border-gray-200 bg-white px-5 py-2 text-center text-sm font-medium text-gray-800 hover:bg-gray-100 focus:shadow"
                >
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                  <svg
                    className="mr-2 h-3 w-3"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                    />
                  </svg>
                  Filter
                </button>
              </div>

              <div className="mt-6 overflow- rounded-xl bg-white px-6 shadow lg:px-4">
                <table className="min-w-full border-collapse border-spacing-y-2 border-spacing-x-2">
                  <thead className="border-b lg:table-header-group">
                    <tr>
                      <td className="whitespace-normal py-4 text-sm font-semibold text-gray-800 sm:px-3">
                        Merek Kendaraan
                      </td>
                      <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                        Plat Nomor
                      </td>
                      <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                        Aksi
                      </td>
                    </tr>
                  </thead>
                  <tbody className="bg-white lg:border-gray-300">
                    {kendaraans.map((kendaraan) => (
                      <tr key={kendaraan.platNomor}>
                        <td className="whitespace-no-wrap py-4 text-sm font-normal text-dark sm:px-3 lg:table-cell">
                          {kendaraan.merek}
                        </td>
                        <td className="whitespace-no-wrap py-4 text-sm font-normal text-dark sm:px-3 lg:table-cell">
                          {kendaraan.platNomor}
                        </td>
                        <td className="whitespace-no-wrap py-4 text-sm font-normal text-dark sm:px-3 lg:table-cell">
                          <div className="md:flex space-x-2.5">
                            <button
                              onClick={() =>
                                setUpdateKendaraanForm({
                                  oldPlatNomor: kendaraan.platNomor,
                                  merek: kendaraan.merek,
                                  platNomor: kendaraan.platNomor,
                                })
                              }
                              className="bg-blue-600 text-white hover:bg-blue-700 flex items-center px-4 py-2 rounded-md border border-blue-600"
                            >
                              <MdEdit className="text-xs mr-2" /> Edit
                            </button>
                            <button
                              onClick={() =>
                                DeleteKendaraan(kendaraan.platNomor)
                              }
                              className="bg-red-600 text-white hover:bg-red-700 flex items-center mt-2 md:mt-0 px-4 py-2 rounded-md border border-red-600"
                            >
                              <MdDelete className="text-xl mr-2" /> Hapus
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "addKey" && (
          <div className="w-full max-w-6xl">
            <div className="bg-white p-5 rounded-lg shadow-md mb-6">
              <h1 className="text-2xl font-bold mb-4">
                {" "}
                {selectedKey ? "Edit Key" : "Buat Key"}
              </h1>
              <form
                onSubmit={selectedKey ? updateKey : CreateKey}
                className="space-y-4"
              >
                <div>
                  <input
                    type="text"
                    placeholder="Username"
                    value={keyForm.username}
                    onChange={(e) =>
                      setKeyForm({ ...keyForm, username: e.target.value })
                    }
                    className="input border border-gray-300 p-3 rounded-md w-full"
                    required
                  />
                </div>
                <div>
                  <select
                    value={keyForm.role}
                    onChange={(e) =>
                      setKeyForm({ ...keyForm, role: e.target.value })
                    }
                    className="input border border-gray-300 p-3 rounded-md w-full"
                  >
                    <option value="admin">Admin</option>
                    <option value="teknisi">Teknisi</option>
                    <option value="driver">Driver</option>
                  </select>
                </div>
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Key Value"
                    value={keyForm.keyValue}
                    onChange={(e) =>
                      setKeyForm({ ...keyForm, keyValue: e.target.value })
                    }
                    className="input border border-gray-300 p-3 rounded-md w-full"
                    required
                  />
                  <button
                    type="button"
                    onClick={generateKey}
                    className="rounded-md border-2 border-blue-600 px-6 py-1 font-medium text-blue-600 transition-colors hover:bg-blue-600 hover:text-white  ms-5 w-2xs"
                  >
                    Generate Key
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors"
                >
                  {selectedKey ? "Update Key" : "Buat Key"}
                </button>
              </form>
            </div>

            {/* Table for Keys */}
            <div className="w-full bg-gray-50 p-4 rounded-lg shadow-md">
              <div className="w-full">
                <div className="flex w-full flex-col items-center justify-between space-y-2 sm:flex-row sm:space-y-0">
                  <form className="relative flex w-full max-w-2xl items-center">
                    <svg
                      className="absolute left-2 block h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <input
                      type="name"
                      name="search"
                      className="h-12 w-full border-b-gray-400 bg-transparent py-4 pl-12 text-sm outline-none focus:border-b-2"
                      placeholder="Search by Order ID, Date, Customer"
                    />
                  </form>

                  <button
                    type="button"
                    className="relative mr-auto inline-flex cursor-pointer items-center rounded-full border border-gray-200 bg-white px-5 py-2 text-center text-sm font-medium text-gray-800 hover:bg-gray-100 focus:shadow sm:mr-0"
                  >
                    <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                    <svg
                      className="mr-2 h-3 w-3"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                      />
                    </svg>
                    Filter
                  </button>
                </div>
              </div>

              <div className="mt-6 overflow- rounded-xl bg-white px-6 shadow lg:px-4">
                <table className="min-w-full border-collapse border-spacing-y-2 border-spacing-x-2">
                  <thead className=" border-b lg:table-header-group">
                    <tr>
                      <td className="whitespace-normal py-4 text-sm font-semibold text-gray-800 sm:px-3">
                        Username
                      </td>
                      <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                        Role
                      </td>
                      <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                        Key
                      </td>
                      <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                        Aksi
                      </td>
                    </tr>
                  </thead>

                  <tbody className="bg-white lg:border-gray-300">
                    {keys.map((key) => (
                      <tr key={key.username} className="">
                        <td className="whitespace-no-wrap py-4 text-sm font-normal text-dark sm:px-3 lg:table-cell">
                          {key.username}
                        </td>
                        <td className="whitespace-no-wrap py-4 text-sm font-normal text-dark sm:px-3 lg:table-cell">
                          {key.role}
                        </td>
                        <td className="whitespace-no-wrap  py-4 text-sm font-normal text-dark sm:px-3 lg:table-cell">
                          {key.Keyvalue}
                        </td>
                        <td className="whitespace-no-wrap  py-4 text-sm font-normal text-dark sm:px-3  lg:table-cell">
                          <div className=" md:flex  space-x-2.5">
                            <button
                              onClick={() => handleEditKey(key)}
                              className=" bg-blue-600 text-white hover:bg-blue-700 flex items-center px-4 py-2 rounded-md border border-blue-600"
                            >
                              <MdEdit className="text-xs mr-2" />{" "}
                              {/* Ikon Edit */}
                              <span>Edit</span>
                            </button>

                            {/* Tombol Hapus */}
                            <button
                              onClick={() => DeleteKey(key.username)}
                              className=" bg-red-600 text-white hover:bg-red-700 flex items-center mt-2 md:mt-0 px-4 py-2 rounded-md border border-red-600"
                            >
                              <MdDelete className="text-xl mr-2" />{" "}
                              {/* Ikon Hapus */}
                              <span>Hapus</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Admin;
