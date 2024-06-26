import React, { useEffect, useContext, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { SchoolContext } from "../context/SchoolContext";
import { useForm } from "@inertiajs/react";
import TextArea from "@/Components/TextArea";
import Spinner from "@/Components/Spinner";

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
        <form onSubmit={updateSchool} className="form-card">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                    <InputLabel value="Nama Sekolah" />

                    <TextInput
                        type="text"
                        placeholder="Masukkan nama sekolah"
                        value={data.nama_sekolah}
                        onChange={(e) =>
                            setData("nama_sekolah", e.target.value)
                        }
                    />

                    <InputError message={errors.nama_sekolah} />
                </div>

                <div className="form-control">
                    <InputLabel value="Jenis Sekolah" />

                    <Dropdown
                        required
                        value={data.jenis_sekolah}
                        onChange={(e) => setData("jenis_sekolah", e.value)}
                        options={school}
                        optionLabel="name"
                        placeholder="-- Pilih Jenis Sekolah --"
                        filter
                        checkmark={true}
                        highlightOnSelect={false}
                        valueTemplate={selectedSchoolTemplate}
                        itemTemplate={schoolOptionTemplate}
                        className="border-gray"
                    />

                    <InputError message={errors.jenis_sekolah} />
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
                        className="border-gray"
                    />

                    <InputError message={errors.kategori_sekolah} />
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
                        className="border-gray"
                    />

                    <InputError message={errors.tipe_sekolah} />
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
                        className="border-gray"
                    />

                    <InputError message={errors.provinsi} />
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
                        className="border-gray"
                    />

                    <InputError message={errors.kota} />
                </div>
            </div>

            <hr className="my-8 border-gray-300" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                    <InputLabel value="Nama Kontak Sekolah" />

                    <TextInput
                        type="text"
                        placeholder="Masukkan nama kontak sekolah"
                        value={data.nama_kontak}
                        onChange={(e) => setData("nama_kontak", e.target.value)}
                    />

                    <InputError message={errors.nama_kontak} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="form-control">
                        <InputLabel value="Email Sekolah" />

                        <TextInput
                            type="email"
                            placeholder="Masukkan email sekolah"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                        />

                        <InputError message={errors.email} />
                    </div>

                    <div className="form-control">
                        <InputLabel value="Telepon Sekolah" />

                        <TextInput
                            type="number"
                            placeholder="Masukkan telepon sekolah"
                            value={data.telp}
                            onChange={(e) => setData("telp", e.target.value)}
                        />

                        <InputError message={errors.telp} />
                    </div>
                </div>

                <div className="form-control">
                    <InputLabel value="Alamat" />

                    <TextArea
                        placeholder="Masukkan alamat sekolah"
                        onChange={(e) =>
                            setData("alamat_sekolah", e.target.value)
                        }
                        value={data.alamat_sekolah}
                    />

                    <InputError message={errors.alamat_sekolah} />
                </div>
            </div>

            <div className="flex justify-end">
                <PrimaryButton
                    className="mt-8 w-1/6 justify-center btn-primary"
                    disabled={processing}
                >
                    Simpan Data
                    <Spinner isLoading={processing} />
                </PrimaryButton>
            </div>
        </form>
    );
}
