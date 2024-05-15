import { useContext } from "react";
import { StudentContext } from "../context/StudentContext";
import { useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { Dropdown } from "primereact/dropdown";
import TextArea from "@/Components/TextArea";
import PrimaryButton from "@/Components/PrimaryButton";
import Spinner from "@/Components/Spinner";

export default function EditForm({ studentDetail, schools_name, gender }) {
    let { handleFunctions } = useContext(StudentContext);

    let {
        selectedJenisKelaminTemplate,
        jenisKelaminOptionTemplate,
        selectedSekolahTemplate,
        sekolahOptionTemplate,
    } = handleFunctions;

    let {
        kode_siswa,
        nama_siswa,
        nis,
        jenis_kelamin,
        email,
        telp,
        nama_wali,
        keterangan,
    } = studentDetail;

    const { data, setData, patch, processing, errors } = useForm({
        nama_siswa,
        nis,
        jenis_kelamin,
        email,
        telp,
        nama_wali,
        keterangan,
        school_name: studentDetail.school.nama_sekolah,
    });

    const updateStudent = async (e) => {
        e.preventDefault();

        patch(route("siswa.update", kode_siswa));
    };

    return (
        <form onSubmit={updateStudent} className="form-card">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                    <InputLabel value="Nama Siswa" />

                    <TextInput
                        type="text"
                        placeholder="Masukkan nama siswa"
                        value={data.nama_siswa}
                        onChange={(e) => setData("nama_siswa", e.target.value)}
                    />

                    <InputError message={errors.nama_siswa} />
                </div>

                <div className="form-control">
                    <InputLabel value="NIS Siswa" />

                    <TextInput
                        type="number"
                        placeholder="Masukkan NIS siswa"
                        value={data.nis}
                        onChange={(e) => setData("nis", e.target.value)}
                    />

                    <InputError message={errors.nis} />
                </div>

                <div className="form-control">
                    <InputLabel value="Jenis Kelamin" />

                    <Dropdown
                        required
                        value={data.jenis_kelamin}
                        onChange={(e) => setData("jenis_kelamin", e.value)}
                        options={gender}
                        optionLabel="name"
                        placeholder="-- Pilih Jenis Kelamin --"
                        filter
                        checkmark={true}
                        highlightOnSelect={false}
                        valueTemplate={selectedJenisKelaminTemplate}
                        itemTemplate={jenisKelaminOptionTemplate}
                        className="border-gray"
                    />

                    <InputError message={errors.jenis_kelamin} />
                </div>

                <div className="form-control">
                    <InputLabel value="Sekolah" />

                    <Dropdown
                        required
                        value={data.school_name}
                        onChange={(e) => setData("school_name", e.value)}
                        options={schools_name}
                        optionLabel="name"
                        placeholder="-- Pilih Sekolah --"
                        filter
                        checkmark={true}
                        highlightOnSelect={false}
                        valueTemplate={selectedSekolahTemplate}
                        itemTemplate={sekolahOptionTemplate}
                        className="border-gray"
                    />

                    <InputError message={errors.school_name} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="form-control">
                        <InputLabel value="Email Siswa" />

                        <TextInput
                            type="email"
                            placeholder="Masukkan email siswa"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                        />

                        <InputError message={errors.email} />
                    </div>

                    <div className="form-control">
                        <InputLabel value="Telepon Siswa" />

                        <TextInput
                            type="number"
                            placeholder="Masukkan telepon siswa"
                            value={data.telp}
                            onChange={(e) => setData("telp", e.target.value)}
                        />

                        <InputError message={errors.telp} />
                    </div>
                </div>

                <div className="form-control">
                    <InputLabel value="Nama Wali" />

                    <TextInput
                        type="text"
                        placeholder="Masukkan nama wali"
                        value={data.nama_wali}
                        onChange={(e) => setData("nama_wali", e.target.value)}
                    />

                    <InputError message={errors.nama_wali} />
                </div>

                <div className="form-control">
                    <InputLabel value="Keterangan" />

                    <TextArea
                        placeholder="Masukkan keterangan"
                        onChange={(e) => setData("keterangan", e.target.value)}
                        value={data.keterangan}
                    />

                    <InputError message={errors.keterangan} />
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
