import { useContext } from "react";
import { TeacherContext } from "../context/GuruContext";
import { useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { Dropdown } from "primereact/dropdown";
import PrimaryButton from "@/Components/PrimaryButton";
import Spinner from "@/Components/Spinner";

export default function CreateForm({ gender, pendidikan, schools_name }) {
    let { handleFunctions } = useContext(TeacherContext);

    let {
        selectedJenisKelaminTemplate,
        jenisKelaminOptionTemplate,
        selectedSekolahTemplate,
        sekolahOptionTemplate,
        selectedPendidikanTemplate,
        pendidikanOptionTemplate,
    } = handleFunctions;

    const { data, setData, post, processing, errors } = useForm({
        nama: "",
        nip: "",
        jenis_kelamin: "",
        email: "",
        telp: "",
        jabatan: "",
        pendidikan: "",
        school_name: "",
    });

    const storeTeacher = async (e) => {
        e.preventDefault();

        post(route("guru.store"));
    };

    return (
        <form onSubmit={storeTeacher} className="form-card">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                    <InputLabel value="Nama Guru" />

                    <TextInput
                        type="text"
                        placeholder="Masukkan nama guru"
                        value={data.nama}
                        onChange={(e) => setData("nama", e.target.value)}
                    />

                    <InputError message={errors.nama} />
                </div>

                <div className="form-control">
                    <InputLabel value="NIP Guru" />

                    <TextInput
                        type="number"
                        placeholder="Masukkan NIP guru"
                        value={data.nip}
                        onChange={(e) => setData("nip", e.target.value)}
                    />

                    <InputError message={errors.nip} />
                </div>

                <div className="form-control">
                    <InputLabel value="Jabatan Guru" />

                    <TextInput
                        type="text"
                        placeholder="Masukkan jabatan guru"
                        value={data.jabatan}
                        onChange={(e) => setData("jabatan", e.target.value)}
                    />

                    <InputError message={errors.jabatan} />
                </div>

                <div className="form-control">
                    <InputLabel value="Pendidikan" />

                    <Dropdown
                        required
                        value={data.pendidikan}
                        onChange={(e) => setData("pendidikan", e.value)}
                        options={pendidikan}
                        optionLabel="name"
                        placeholder="-- Pilih Pendidikan --"
                        filter
                        checkmark={true}
                        highlightOnSelect={false}
                        valueTemplate={selectedPendidikanTemplate}
                        itemTemplate={pendidikanOptionTemplate}
                        className="border-gray"
                    />

                    <InputError message={errors.pendidikan} />
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
