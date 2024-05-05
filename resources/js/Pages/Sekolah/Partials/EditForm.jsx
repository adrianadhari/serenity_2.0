import React, { useEffect, useContext, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { SchoolContext } from "../context/SchoolContext";
import { useForm } from "@inertiajs/react";

export default function EditForm({
    school,
    schoolCategory,
    schoolType,
    schoolDetail,
}) {
    const [provincesId, setProvincesId] = useState(null);
    const [provincesName, setProvincesName] = useState(null);
    const [cities, setCities] = useState([]);

    let { handleFunctions } = useContext(SchoolContext);

    let {
        selectedSchoolTemplate,
        schoolOptionTemplate,
        selectedSchoolCategoryTemplate,
        schoolCategoryOptionTemplate,
        selectedSchoolTypeTemplate,
        schoolTypeOptionTemplate,
    } = handleFunctions;

    let {
        nama_sekolah,
        kategori_sekolah,
        jenis_sekolah,
        nama_kontak,
        tipe_sekolah,
        provinsi,
        kota,
        email,
        alamat_sekolah,
        telp,
        tgl_registrasi,
    } = schoolDetail;

    const selectedProvinceTemplate = (option, props) => {
        if (option) {
            return <div className="text-sm">{option}</div>;
        }

        return <span>{props.placeholder}</span>;
    };

    const provinceOptionTemplate = (option) => {
        return <div className="text-sm">{option}</div>;
    };

    const selectedCityTemplate = (option, props) => {
        if (option) {
            return <div className="text-sm">{option}</div>;
        }

        return <span>{props.placeholder}</span>;
    };

    const cityOptionTemplate = (option) => {
        return <div className="text-sm">{option}</div>;
    };

    const { data, setData, patch, processing, errors } = useForm({
        nama_sekolah,
        kategori_sekolah,
        jenis_sekolah,
        nama_kontak,
        tipe_sekolah,
        provinsi,
        kota,
        email,
        alamat_sekolah,
        telp,
        tgl_registrasi,
    });

    useEffect(() => {
        fetch("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json")
            .then((res) => res.json())
            .then((dataProvinsi) => {
                const names = dataProvinsi.map((item) => item.name);
                setProvincesName(names);
                const selectedProvince = dataProvinsi.find(
                    (item) => item.name === data.provinsi
                );
                if (selectedProvince) {
                    setProvincesId(selectedProvince.id);
                }
            });

        if (provincesId) {
            fetch(
                `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provincesId}.json`
            )
                .then((res) => res.json())
                .then((dataRegencies) => {
                    const names = dataRegencies.map((item) => item.name);
                    setCities(names);
                });
        }
    }, [data.provinsi, provincesId]);

    const updateSchool = async (e) => {
        e.preventDefault();

        patch(route("sekolah.update", schoolDetail.kode_sekolah));
    };

    return (
        <form
            onSubmit={updateSchool}
            className="max-w-7xl mx-auto p-4 bg-white shadow-lg rounded border-t-4 border-t-rose-600"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                    <InputLabel value="Nama Sekolah" />

                    <TextInput
                        type="text"
                        className="mt-1 block w-full"
                        placeholder="Masukkan nama sekolah"
                        required
                        value={data.nama_sekolah}
                        onChange={(e) =>
                            setData("nama_sekolah", e.target.value)
                        }
                    />

                    <InputError
                        message={errors.nama_sekolah}
                        className="mt-2"
                    />
                </div>

                <div className="form-control">
                    <InputLabel value="Jenis Sekolah" />

                    <Dropdown
                        required
                        value={data.jenis_sekolah}
                        onChange={(e) => setData("jenis_sekolah", e.value)}
                        options={school}
                        optionLabel="name"
                        placeholder="-- Pilih Jenis --"
                        filter
                        checkmark={true}
                        highlightOnSelect={false}
                        valueTemplate={selectedSchoolTemplate}
                        itemTemplate={schoolOptionTemplate}
                        className="mt-1 text-sm border border-solid border-gray-300 w-full rounded-md shadow-sm"
                    />

                    <InputError
                        message={errors.jenis_sekolah}
                        className="mt-2"
                    />
                </div>

                <div className="form-control">
                    <InputLabel value="Kategori Sekolah" />

                    <Dropdown
                        required
                        value={data.kategori_sekolah}
                        onChange={(e) => setData("kategori_sekolah", e.value)}
                        options={schoolCategory}
                        optionLabel="name"
                        placeholder="-- Pilih Kategori Sekolah --"
                        filter
                        checkmark={true}
                        highlightOnSelect={false}
                        valueTemplate={selectedSchoolCategoryTemplate}
                        itemTemplate={schoolCategoryOptionTemplate}
                        className="mt-1 text-sm border border-solid border-gray-300 w-full rounded-md shadow-sm"
                    />

                    <InputError
                        message={errors.kategori_sekolah}
                        className="mt-2"
                    />
                </div>

                <div className="form-control">
                    <InputLabel value="Negeri / Swasta" />

                    <Dropdown
                        required
                        value={data.tipe_sekolah}
                        onChange={(e) => setData("tipe_sekolah", e.value)}
                        options={schoolType}
                        optionLabel="name"
                        placeholder="-- Pilih Negeri/Swasta --"
                        filter
                        checkmark={true}
                        highlightOnSelect={false}
                        valueTemplate={selectedSchoolTypeTemplate}
                        itemTemplate={schoolTypeOptionTemplate}
                        className="mt-1 text-sm border border-solid border-gray-300 w-full rounded-md shadow-sm"
                    />

                    <InputError
                        message={errors.tipe_sekolah}
                        className="mt-2"
                    />
                </div>

                <div className="form-control">
                    <InputLabel value="Provinsi" />

                    <Dropdown
                        required
                        value={data.provinsi}
                        onChange={(e) => setData("provinsi", e.value)}
                        options={provincesName}
                        optionLabel="name"
                        placeholder="-- Pilih Provinsi --"
                        filter
                        checkmark={true}
                        highlightOnSelect={false}
                        valueTemplate={selectedProvinceTemplate}
                        itemTemplate={provinceOptionTemplate}
                        className="mt-1 text-sm border border-solid border-gray-300 w-full rounded-md shadow-sm"
                    />

                    <InputError message={errors.provinsi} className="mt-2" />
                </div>

                <div className="form-control">
                    <InputLabel value="Kota / Kabupaten" />

                    <Dropdown
                        required
                        value={data.kota}
                        onChange={(e) => setData("kota", e.value)}
                        options={cities}
                        optionLabel="name"
                        placeholder="-- Pilih Kota/Kabupaten --"
                        filter
                        checkmark={true}
                        highlightOnSelect={false}
                        valueTemplate={selectedCityTemplate}
                        itemTemplate={cityOptionTemplate}
                        className="mt-1 text-sm border border-solid border-gray-300 w-full rounded-md shadow-sm"
                    />

                    <InputError message={errors.kota} className="mt-2" />
                </div>
            </div>

            <hr className="my-8 border-gray-300" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                    <InputLabel value="Nama Kontak Sekolah" />

                    <TextInput
                        type="text"
                        className="mt-1 block w-full"
                        placeholder="Masukkan nama kontak sekolah"
                        value={data.nama_kontak}
                        onChange={(e) => setData("nama_kontak", e.target.value)}
                        required
                    />

                    <InputError message={errors.nama_kontak} className="mt-2" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="form-control">
                        <InputLabel value="Email Sekolah" />

                        <TextInput
                            type="email"
                            className="mt-1 block w-full"
                            placeholder="Masukkan email sekolah"
                            required
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="form-control">
                        <InputLabel value="Telepon Sekolah" />

                        <TextInput
                            type="number"
                            className="mt-1 block w-full"
                            placeholder="Masukkan telepon sekolah"
                            required
                            value={data.telp}
                            onChange={(e) => setData("telp", e.target.value)}
                        />

                        <InputError message={errors.telp} className="mt-2" />
                    </div>
                </div>

                <div className="form-control">
                    <InputLabel value="Alamat" />

                    <textarea
                        className="textarea textarea-bordered h-24 mt-1"
                        placeholder="Masukkan alamat sekolah"
                        required
                        onChange={(e) =>
                            setData("alamat_sekolah", e.target.value)
                        }
                        value={data.alamat_sekolah}
                    ></textarea>

                    <InputError
                        message={errors.alamat_sekolah}
                        className="mt-2"
                    />
                </div>

                <div className="form-control">
                    <InputLabel value="Tanggal Daftar" />

                    <TextInput
                        type="date"
                        className="mt-1 block w-full"
                        required
                        value={data.tgl_registrasi}
                        onChange={(e) =>
                            setData("tgl_registrasi", e.target.value)
                        }
                    />

                    <InputError
                        message={errors.tgl_registrasi}
                        className="mt-2"
                    />
                </div>
            </div>

            <div className="flex justify-end">
                <PrimaryButton
                    className="mt-8 w-1/6 justify-center"
                    disabled={processing}
                >
                    Simpan Data
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`${
                            processing ? "" : "hidden"
                        } animate-spin h-5 w-5 ml-2`}
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M18.364 5.63604L16.9497 7.05025C15.683 5.7835 13.933 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12H21C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C14.4853 3 16.7353 4.00736 18.364 5.63604Z"></path>
                    </svg>
                </PrimaryButton>
            </div>
        </form>
    );
}
