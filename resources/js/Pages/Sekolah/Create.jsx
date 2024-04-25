import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";

export default function CreateSekolah({ auth }) {
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const provinces = [
        { name: "Aceh" },
        { name: "Bali" },
        { name: "Banten" },
        { name: "Bengkulu" },
        { name: "Daerah Istimewa Yogyakarta" },
        { name: "DKI Jakarta" },
        { name: "Gorontalo" },
        { name: "Jambi" },
        { name: "Jawa Barat" },
        { name: "Jawa Tengah" },
        { name: "Jawa Timur" },
    ];
    const cities = [
        { name: "Bogor" },
        { name: "Bandung" },
        { name: "Banten" },
        { name: "Jakarta" },
        { name: "Bekasi" },
        { name: "Karawang" },
        { name: "Tangerang" },
        { name: "Aceh" },
        { name: "Lampung" },
    ];

    const selectedProvinceTemplate = (option, props) => {
        if (option) {
            return (
                <div className="flex align-items-center">
                    <div className=" font-sans text-sm">{option.name}</div>
                </div>
            );
        }

        return <span>{props.placeholder}</span>;
    };

    const ProvinceOptionTemplate = (option) => {
        return (
            <div className="flex align-items-center">
                <div className=" font-sans text-sm">{option.name}</div>
            </div>
        );
    };

    const selectedCityTemplate = (option, props) => {
        if (option) {
            return (
                <div className="flex align-items-center">
                    <div className="font-sans text-sm">{option.name}</div>
                </div>
            );
        }

        return <span>{props.placeholder}</span>;
    };

    const CityOptionTemplate = (option) => {
        return (
            <div className="flex align-items-center">
                <div className=" font-sans text-sm">{option.name}</div>
            </div>
        );
    };

    return (
        <AuthenticatedLayout user={auth.user} titlePage="Tambah Sekolah">
            <Head title="Sekolah" />

            <div className="py-4">
                <div className="flex flex-col md:flex-row md:items-center flex-wrap gap-2 my-4">
                    <Link
                        href={route("sekolah.index")}
                        className="justify-center flex items-center px-4 py-2 font-medium leading-5 text-white transition-colors duration-150 bg-rose-600 border border-transparent rounded-lg active:bg-rose-600 hover:bg-rose-700 focus:outline-none focus:shadow-outline-rose ease-in-out"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 mr-2 -ml-1"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path>
                        </svg>
                        <span>Kembali</span>
                    </Link>
                </div>
                <div className="max-w-7xl mx-auto p-4 bg-white shadow-sm rounded-sm border-t-4 border-t-[#E11D48]">
                    <form method="POST">
                        <div className="flex sm:flex-row flex-col justify-between sm:space-x-6 space-x-0">
                            <div className="flex flex-col space-y-4 w-full sm:w-1/2">
                                <label className="form-control">
                                    <div className="label">
                                        <span className="label-text">
                                            Nama Sekolah
                                        </span>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Masukkan nama sekolah"
                                        className="input input-bordered w-full"
                                        name="nama_sekolah"
                                    />
                                </label>

                                <div>
                                    <div className="label">
                                        <span className="label-text">
                                            Jenis Sekolah
                                        </span>
                                    </div>
                                    <select
                                        name="jenis_sekolah"
                                        className="select select-bordered w-full"
                                    >
                                        <option disabled selected>
                                            Pilih Jenis Sekolah
                                        </option>
                                        <option value="KB (Kelompok Bermain)">
                                            KB (Kelompok Bermain)
                                        </option>
                                        <option value="PAUD">PAUD</option>
                                        <option value="TK (Taman Kanak-Kanak)">
                                            TK (Taman Kanak-Kanak)
                                        </option>
                                        <option value="SD">SD</option>
                                        <option value="SMP">SMP</option>
                                    </select>
                                </div>

                                <div>
                                    <div className="label">
                                        <span className="label-text">
                                            Kategori Sekolah
                                        </span>
                                    </div>
                                    <select
                                        className="select select-bordered w-full"
                                        name="kategori_sekolah"
                                    >
                                        <option disabled selected>
                                            Pilih Kategori Sekolah
                                        </option>
                                        <option value="Madya">Madya</option>
                                        <option value="Utama">Utama</option>
                                        <option value="Pari">Pari Purna</option>
                                    </select>
                                </div>

                                <div>
                                    <div className="label">
                                        <span className="label-text">
                                            Kota / Kabupaten
                                        </span>
                                    </div>
                                    <Dropdown
                                        value={selectedCity}
                                        onChange={(e) =>
                                            setSelectedCity(e.value)
                                        }
                                        options={cities}
                                        optionLabel="name"
                                        placeholder="Pilih Kota"
                                        filter
                                        valueTemplate={selectedCityTemplate}
                                        itemTemplate={CityOptionTemplate}
                                        className="border-[1px] border-solid border-[#e0e1e3] w-full rounded-lg  font-sans text-sm"
                                    />
                                </div>

                                <div>
                                    <div className="label">
                                        <span className="label-text">
                                            Provinsi
                                        </span>
                                    </div>
                                    <Dropdown
                                        value={selectedProvince}
                                        onChange={(e) =>
                                            setSelectedProvince(e.value)
                                        }
                                        options={provinces}
                                        optionLabel="name"
                                        placeholder="Pilih Provinsi"
                                        filter
                                        valueTemplate={selectedProvinceTemplate}
                                        itemTemplate={ProvinceOptionTemplate}
                                        className="border-[1px] border-solid border-[#e0e1e3] w-full rounded-lg font-sans text-sm"
                                    />
                                </div>

                                <div>
                                    <div className="label">
                                        <span className="label-text">
                                            Negeri / Swasta
                                        </span>
                                    </div>
                                    <select
                                        className="select select-bordered w-full"
                                        name="negeriswasta"
                                    >
                                        <option disabled selected>
                                            Pilih Negeri / Swasta
                                        </option>
                                        <option value="Negeri">Negeri</option>
                                        <option value="Swasta">Swasta</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex flex-col space-y-4 w-full sm:w-1/2 sm:mt-0 mt-4">
                                <label className="form-control">
                                    <div className="label">
                                        <span className="label-text">
                                            Nama Kontak Sekolah
                                        </span>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Masukkan nama kontak sekolah"
                                        className="input input-bordered w-full"
                                        name="nama_kontak_sekolah"
                                    />
                                </label>

                                <label className="form-control">
                                    <div className="label">
                                        <span className="label-text">
                                            Email Sekolah
                                        </span>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Masukkan email sekolah"
                                        className="input input-bordered w-full"
                                        name="email_sekolah"
                                    />
                                </label>

                                <label className="form-control">
                                    <div className="label">
                                        <span className="label-text">
                                            Telepon Sekolah
                                        </span>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Masukkan telepon sekolah"
                                        className="input input-bordered w-full"
                                        name="telepon_sekolah"
                                    />
                                </label>

                                <label className="form-control">
                                    <div className="label">
                                        <span className="label-text">
                                            Alamat
                                        </span>
                                    </div>
                                    <textarea
                                        className="textarea textarea-bordered h-24"
                                        placeholder="Masukkan alamat sekolah"
                                        name="alamat"
                                    ></textarea>
                                </label>

                                <label className="form-control">
                                    <div className="label">
                                        <span className="label-text">
                                            Tanggal Daftar
                                        </span>
                                    </div>
                                    <input
                                        type="date"
                                        className="input input-bordered w-full"
                                        name="tanggal_daftar"
                                    />
                                </label>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary mt-7">
                            Simpan Data
                        </button>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
