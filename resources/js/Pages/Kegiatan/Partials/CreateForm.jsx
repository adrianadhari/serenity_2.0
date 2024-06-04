import { useContext } from "react";
import { KegiatanContext } from "../context/KegiatanContext";
import { useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { Dropdown } from "primereact/dropdown";
import PrimaryButton from "@/Components/PrimaryButton";
import Spinner from "@/Components/Spinner";
import TextArea from "@/Components/TextArea";

export default function CreateForm({
    jenis_kegiatan,
    semester,
    flagship,
    moda,
    status_kegiatan,
}) {
    let { handleFunctions } = useContext(KegiatanContext);

    let {
        selectedJenisKegiatanTemplate,
        jenisKegiatanOptionTemplate,
        selectedSemesterTemplate,
        semesterOptionTemplate,
        selectedFlagshipTemplate,
        flagshipOptionTemplate,
        selectedModaTemplate,
        modaOptionTemplate,
        selectedStatusKegiatanTemplate,
        statusKegiatanOptionTemplate,
    } = handleFunctions;

    const { data, setData, post, processing, errors } = useForm({
        jenis_kegiatan: "",
        semester: 0,
        judul_kegiatan: "",
        jenis_flagship: "",
        jadwal_mulai: "",
        jadwal_selesai: "",
        lokasi: "",
        link: "",
        moda: "",
        tentang: "",
        narasumber: "",
        materi: "",
        sertifikat: null,
        status: "",
        target_peserta: 0,
        min_score: 0,
    });

    const storeKegiatan = async (e) => {
        e.preventDefault();

        post(route("kegiatan.store"));
    };

    return (
        <form onSubmit={storeKegiatan} className="form-card">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                    <InputLabel value="Judul Kegiatan" />

                    <TextInput
                        type="text"
                        placeholder="Masukkan judul kegiatan"
                        value={data.judul_kegiatan}
                        onChange={(e) =>
                            setData("judul_kegiatan", e.target.value)
                        }
                    />

                    <InputError message={errors.judul_kegiatan} />
                </div>

                <div className="form-control">
                    <InputLabel value="Jenis Kegiatan" />

                    <Dropdown
                        required
                        value={data.jenis_kegiatan}
                        onChange={(e) => setData("jenis_kegiatan", e.value)}
                        options={jenis_kegiatan}
                        optionLabel="name"
                        placeholder="-- Pilih Jenis Kegiatan --"
                        filter
                        checkmark={true}
                        highlightOnSelect={false}
                        valueTemplate={selectedJenisKegiatanTemplate}
                        itemTemplate={jenisKegiatanOptionTemplate}
                        className="border-gray"
                    />

                    <InputError message={errors.jenis_kegiatan} />
                </div>

                <div className="form-control">
                    <InputLabel value="Jenis Flagship" />

                    <Dropdown
                        required
                        value={data.jenis_flagship}
                        onChange={(e) => setData("jenis_flagship", e.value)}
                        options={flagship}
                        optionLabel="name"
                        placeholder="-- Pilih Jenis Flagship --"
                        filter
                        checkmark={true}
                        highlightOnSelect={false}
                        valueTemplate={selectedFlagshipTemplate}
                        itemTemplate={flagshipOptionTemplate}
                        className="border-gray"
                    />

                    <InputError message={errors.jenis_flagship} />
                </div>

                <div className="form-control">
                    <InputLabel value="Semester" />

                    <Dropdown
                        required
                        value={data.semester}
                        onChange={(e) => setData("semester", e.value)}
                        options={semester}
                        optionLabel="name"
                        placeholder="-- Pilih Semester --"
                        filter
                        checkmark={true}
                        highlightOnSelect={false}
                        valueTemplate={selectedSemesterTemplate}
                        itemTemplate={semesterOptionTemplate}
                        className="border-gray"
                    />

                    <InputError message={errors.semester} />
                </div>

                <div className="form-control">
                    <InputLabel value="Jadwal Mulai" />

                    <TextInput
                        type="datetime-local"
                        value={data.jadwal_mulai}
                        onChange={(e) =>
                            setData("jadwal_mulai", e.target.value)
                        }
                    />

                    <InputError message={errors.jadwal_mulai} />
                </div>

                <div className="form-control">
                    <InputLabel value="Jadwal Selesai" />

                    <TextInput
                        type="datetime-local"
                        value={data.jadwal_selesai}
                        onChange={(e) =>
                            setData("jadwal_selesai", e.target.value)
                        }
                    />

                    <InputError message={errors.jadwal_selesai} />
                </div>

                <div className="form-control">
                    <InputLabel value="Lokasi" />

                    <TextInput
                        type="text"
                        placeholder="Masukkan lokasi kegiatan"
                        value={data.lokasi}
                        onChange={(e) => setData("lokasi", e.target.value)}
                    />

                    <InputError message={errors.lokasi} />
                </div>

                <div className="form-control">
                    <InputLabel value="Link Kegiatan (link pendaftaran/link zoom/link materi)" />

                    <TextInput
                        type="text"
                        placeholder="Masukkan link"
                        value={data.link}
                        onChange={(e) => setData("link", e.target.value)}
                    />

                    <InputError message={errors.link} />
                </div>

                <div className="form-control">
                    <InputLabel value="Moda" />

                    <Dropdown
                        required
                        value={data.moda}
                        onChange={(e) => setData("moda", e.value)}
                        options={moda}
                        optionLabel="name"
                        placeholder="-- Pilih Moda --"
                        filter
                        checkmark={true}
                        highlightOnSelect={false}
                        valueTemplate={selectedModaTemplate}
                        itemTemplate={modaOptionTemplate}
                        className="border-gray"
                    />

                    <InputError message={errors.semester} />
                </div>

                <div className="form-control">
                    <InputLabel value="Narasumber" />

                    <TextInput
                        type="text"
                        placeholder="Masukkan narasumber"
                        value={data.narasumber}
                        onChange={(e) => setData("narasumber", e.target.value)}
                    />

                    <InputError message={errors.narasumber} />
                </div>

                <div className="form-control">
                    <InputLabel value="Tentang Kegiatan" />

                    <TextArea
                        onChange={(e) => setData("tentang", e.target.value)}
                        value={data.tentang}
                    />

                    <InputError message={errors.tentang} />
                </div>

                <div className="form-control">
                    <InputLabel value="Materi Kegiatan" />

                    <TextArea
                        onChange={(e) => setData("materi", e.target.value)}
                        value={data.materi}
                    />

                    <InputError message={errors.materi} />
                </div>

                <div className="form-control">
                    <InputLabel value="Status Kegiatan" />

                    <Dropdown
                        required
                        value={data.status}
                        onChange={(e) => setData("status", e.value)}
                        options={status_kegiatan}
                        optionLabel="name"
                        placeholder="-- Pilih Status Kegiatan --"
                        filter
                        checkmark={true}
                        highlightOnSelect={false}
                        valueTemplate={selectedStatusKegiatanTemplate}
                        itemTemplate={statusKegiatanOptionTemplate}
                        className="border-gray"
                    />

                    <InputError message={errors.status} />
                </div>

                <div className="form-control">
                    <InputLabel value="Target Peserta" />

                    <TextInput
                        type="number"
                        placeholder="Masukkan target peserta"
                        value={data.target_peserta}
                        onChange={(e) =>
                            setData("target_peserta", e.target.value)
                        }
                    />

                    <InputError message={errors.target_peserta} />
                </div>

                <div className="form-control">
                    <InputLabel value="Min. Score" />

                    <TextInput
                        type="number"
                        placeholder="Masukkan minimum score"
                        value={data.min_score}
                        onChange={(e) => setData("min_score", e.target.value)}
                    />

                    <InputError message={errors.min_score} />
                </div>

                <div className="form-control">
                    <InputLabel value="File Template Sertifikat" />

                    <input
                        type="file"
                        className="file-input file-input-bordered w-full mt-1"
                        onChange={(e) =>
                            setData("sertifikat", e.target.files[0])
                        }
                    />

                    <InputError message={errors.sertifikat} />
                </div>
            </div>

            <div className="flex justify-end">
                <PrimaryButton
                    className="mt-8 w-1/6 justify-center py-2 btn-danger"
                    disabled={processing}
                >
                    Simpan Data
                    <Spinner isLoading={processing} />
                </PrimaryButton>
            </div>
        </form>
    );
}
