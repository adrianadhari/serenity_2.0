import React, { useEffect, useContext } from "react";
import { Dropdown } from "primereact/dropdown";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { SchoolContext } from "../context/SchoolContext";

export default function CreateForm() {
    let { state, handleFunctions, data } = useContext(SchoolContext);

    let {
        selectedProvince,
        setSelectedProvince,
        selectedCity,
        setSelectedCity,
        selectedSchool,
        setSelectedSchool,
        selectedSchoolCategory,
        setSelectedSchoolCategory,
        selectedSchoolType,
        setSelectedSchoolType,
        provinces,
        setProvinces,
        cities,
        isLoading,
    } = state;

    let {
        selectedProvinceTemplate,
        provinceOptionTemplate,
        selectedCityTemplate,
        cityOptionTemplate,
        selectedSchoolTemplate,
        schoolOptionTemplate,
        selectedSchoolCategoryTemplate,
        schoolCategoryOptionTemplate,
        selectedSchoolTypeTemplate,
        schoolTypeOptionTemplate,
    } = handleFunctions;

    let { school, schoolCategory, schoolType } = data;

    useEffect(() => {
        fetch("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json")
            .then((res) => res.json())
            .then((data) => {
                setProvinces(data);
            });
    }, []);

    return (
        <form
            method="POST"
            className="max-w-7xl mx-auto p-4 bg-white shadow-lg rounded border-t-4 border-t-rose-600"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                    <InputLabel htmlFor="nama_sekolah" value="Nama Sekolah" />

                    <TextInput
                        id="nama_sekolah"
                        type="text"
                        name="nama_sekolah"
                        className="mt-1 block w-full"
                        placeholder="Masukkan nama sekolah"
                    />

                    <InputError className="mt-2" />
                </div>

                <div className="form-control">
                    <InputLabel value="Jenis Sekolah" />
                    <Dropdown
                        value={selectedSchool}
                        onChange={(e) => setSelectedSchool(e.value)}
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
                </div>

                <div className="form-control">
                    <InputLabel value="Kategori Sekolah" />
                    <Dropdown
                        value={selectedSchoolCategory}
                        onChange={(e) => setSelectedSchoolCategory(e.value)}
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
                </div>

                <div className="form-control">
                    <InputLabel value="Negeri / Swasta" />
                    <Dropdown
                        value={selectedSchoolType}
                        onChange={(e) => setSelectedSchoolType(e.value)}
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
                </div>

                <div className="form-control">
                    <InputLabel value="Provinsi" />
                    <Dropdown
                        value={selectedProvince}
                        onChange={(e) => setSelectedProvince(e.value)}
                        options={provinces}
                        optionLabel="name"
                        placeholder="-- Pilih Provinsi --"
                        filter
                        checkmark={true}
                        highlightOnSelect={false}
                        valueTemplate={selectedProvinceTemplate}
                        itemTemplate={provinceOptionTemplate}
                        className="mt-1 text-sm border border-solid border-gray-300 w-full rounded-md shadow-sm"
                    />
                </div>

                <div className={`${isLoading ? "" : "hidden"} form-control`}>
                    <InputLabel value="Kota / Kabupaten" />
                    <Dropdown
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.value)}
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
                </div>
            </div>

            <hr className="my-8 border-gray-300" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                    <InputLabel
                        htmlFor="nama_kontak_sekolah"
                        value="Nama Kontak Sekolah"
                    />

                    <TextInput
                        id="nama_kontak_sekolah"
                        type="text"
                        name="nama_kontak_sekolah"
                        className="mt-1 block w-full"
                        placeholder="Masukkan nama kontak sekolah"
                    />

                    <InputError className="mt-2" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="form-control">
                        <InputLabel
                            htmlFor="email_sekolah"
                            value="Email Sekolah"
                        />

                        <TextInput
                            id="email_sekolah"
                            type="email"
                            name="email_sekolah"
                            className="mt-1 block w-full"
                            placeholder="Masukkan email sekolah"
                        />

                        <InputError className="mt-2" />
                    </div>

                    <div className="form-control">
                        <InputLabel
                            htmlFor="telepon_sekolah"
                            value="Telepon Sekolah"
                        />

                        <TextInput
                            id="telepon_sekolah"
                            type="number"
                            name="telepon_sekolah"
                            className="mt-1 block w-full"
                            placeholder="Masukkan telepon sekolah"
                        />

                        <InputError className="mt-2" />
                    </div>
                </div>

                <div className="form-control">
                    <InputLabel htmlFor="alamat" value="Alamat" />
                    <textarea
                        className="textarea textarea-bordered h-24 mt-1"
                        placeholder="Masukkan alamat sekolah"
                        name="alamat"
                        id="alamat"
                    ></textarea>
                </div>

                <div className="form-control">
                    <InputLabel
                        htmlFor="tanggal_daftar"
                        value="Tanggal Daftar"
                    />

                    <TextInput
                        id="tanggal_daftar"
                        type="date"
                        name="tanggal_daftar"
                        className="mt-1 block w-full"
                    />

                    <InputError className="mt-2" />
                </div>
            </div>

            <div className="flex justify-end">
                <PrimaryButton className="mt-8 w-1/6 justify-center">
                    Simpan Data
                </PrimaryButton>
            </div>
        </form>
    );
}
