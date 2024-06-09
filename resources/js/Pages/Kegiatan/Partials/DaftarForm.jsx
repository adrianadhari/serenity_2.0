import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import Spinner from "@/Components/Spinner";
import { useForm } from "@inertiajs/react";
import { Dropdown } from "primereact/dropdown";
import { useState, useEffect } from "react";

export default function DaftarForm({ tipe, activityId }) {
    const [showSekolahDropdown, setShowSekolahDropdown] = useState(false);
    const [showPesertaDropdown, setShowPesertaDropdown] = useState(false);
    const [dataSekolah, setDataSekolah] = useState([]);
    const [dataPeserta, setDataPeserta] = useState([]);

    const { data, setData, post, processing, errors } = useForm({
        type: "",
        sekolah: "",
        peserta: "",
        activityId,
    });

    useEffect(() => {
        if (data.type) {
            fetch(`/api/get-sekolah?type=${data.type}`)
                .then((res) => res.json())
                .then((data) => {
                    setDataSekolah(data);
                    setShowSekolahDropdown(true);
                    setShowPesertaDropdown(false);
                    setDataPeserta([]);
                })
                .catch((error) => {
                    console.error("Error fetching sekolah data:", error);
                });
        }
    }, [data.type]);

    useEffect(() => {
        if (data.sekolah && data.type !== "Institusi") {
            fetch(`/api/get-peserta?id=${data.sekolah.id}&type=${data.type}`)
                .then((res) => res.json())
                .then((data) => {
                    setDataPeserta(data);
                    setShowPesertaDropdown(true);
                })
                .catch((error) => {
                    console.error("Error fetching peserta data:", error);
                });
        }
    }, [data.sekolah]);

    const getOptionSchoolLabel = (option) => {
        return data.type === "Institusi" ? option.nama : option.nama_sekolah;
    };

    const selectedOptionSchoolTemplate = (option, props) => {
        if (option) {
            const label = getOptionSchoolLabel(option);
            return <div className="text-sm">{label}</div>;
        }

        return <span>{props.placeholder}</span>;
    };

    const optionSchoolTemplate = (option) => {
        const label = getOptionSchoolLabel(option);
        return <div className="text-sm">{label}</div>;
    };

    const getOptionTeacherLabel = (option) => {
        return data.type === "Siswa" ? option.nama_siswa : option.nama;
    };

    const selectedOptionTeacherTemplate = (option, props) => {
        if (option) {
            const label = getOptionTeacherLabel(option);
            return <div className="text-sm">{label}</div>;
        }

        return <span>{props.placeholder}</span>;
    };

    const optionTeacherTemplate = (option) => {
        const label = getOptionTeacherLabel(option);
        return <div className="text-sm">{label}</div>;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("kegiatan.peserta.create"));
    };

    return (
        <form className="form-card mt-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="form-control">
                    <InputLabel value="Tipe Peserta" />

                    <Dropdown
                        value={data.type}
                        onChange={(e) => setData("type", e.value)}
                        options={tipe}
                        optionLabel="name"
                        placeholder="-- Pilih Tipe --"
                        filter
                        checkmark={true}
                        highlightOnSelect={false}
                        valueTemplate={(option, props) =>
                            option ? (
                                <div className="text-sm">{option}</div>
                            ) : (
                                <span>{props.placeholder}</span>
                            )
                        }
                        itemTemplate={(option) => (
                            <div className="text-sm">{option}</div>
                        )}
                        className="border-gray"
                    />

                    <InputError message={errors.type} />
                </div>

                <div
                    className={`${
                        showSekolahDropdown ? "" : "hidden"
                    } form-control`}
                >
                    <InputLabel value="Sekolah / Institusi" />

                    <Dropdown
                        value={data.sekolah}
                        onChange={(e) => setData("sekolah", e.value)}
                        options={dataSekolah}
                        optionLabel={(option) => getOptionSchoolLabel(option)}
                        placeholder="-- Pilih Sekolah / Institusi --"
                        filter
                        checkmark={true}
                        highlightOnSelect={false}
                        valueTemplate={selectedOptionSchoolTemplate}
                        itemTemplate={optionSchoolTemplate}
                        className="border-gray"
                    />
                </div>

                <div
                    className={`${
                        showPesertaDropdown ? "" : "hidden"
                    } form-control`}
                >
                    <InputLabel value="Peserta" />

                    <Dropdown
                        value={data.peserta}
                        onChange={(e) => setData("peserta", e.value)}
                        options={dataPeserta}
                        optionLabel={(option) => getOptionTeacherLabel(option)}
                        placeholder="-- Pilih Peserta --"
                        filter
                        checkmark={true}
                        highlightOnSelect={false}
                        valueTemplate={selectedOptionTeacherTemplate}
                        itemTemplate={optionTeacherTemplate}
                        className="border-gray"
                    />
                </div>
            </div>

            <div className="flex justify-end">
                <PrimaryButton
                    className="mt-8 w-1/6 justify-center py-2 btn-danger"
                    disabled={processing}
                >
                    Daftar Kegiatan
                    <Spinner isLoading={processing} />
                </PrimaryButton>
            </div>
        </form>
    );
}
