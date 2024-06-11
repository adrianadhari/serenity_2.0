import { useContext } from "react";
import { useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { Dropdown } from "primereact/dropdown";
import PrimaryButton from "@/Components/PrimaryButton";
import Spinner from "@/Components/Spinner";
import { PegawaiContext } from "../context/PegawaiContext";
import TextArea from "@/Components/TextArea";

export default function CreateForm({ gender, pendidikan }) {
    let { handleFunctions } = useContext(PegawaiContext);

    let {
        selectedJenisKelaminTemplate,
        jenisKelaminOptionTemplate,
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
        alamat: "",
        tgl_lahir: "",
    });

    const storePegawai = async (e) => {
        e.preventDefault();

        post(route("lab.pegawai.store"));
    };

    return (
        <form onSubmit={storePegawai} className="form-card">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                    <InputLabel value="Nama Pegawai" />

                    <TextInput
                        type="text"
                        placeholder="Masukkan nama pegawai"
                        value={data.nama}
                        onChange={(e) => setData("nama", e.target.value)}
                    />

                    <InputError message={errors.nama} />
                </div>

                <div className="form-control">
                    <InputLabel value="NIP" />

                    <TextInput
                        type="number"
                        placeholder="Masukkan NIP"
                        value={data.nip}
                        onChange={(e) => setData("nip", e.target.value)}
                    />

                    <InputError message={errors.nip} />
                </div>

                <div className="form-control">
                    <InputLabel value="Tanggal Lahir" />

                    <TextInput
                        type="date"
                        value={data.tgl_lahir}
                        onChange={(e) => setData("tgl_lahir", e.target.value)}
                    />

                    <InputError message={errors.tgl_lahir} />
                </div>

                <div className="form-control">
                    <InputLabel value="Jabatan" />

                    <TextInput
                        type="text"
                        placeholder="Masukkan jabatan"
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="form-control">
                        <InputLabel value="Email" />

                        <TextInput
                            type="email"
                            placeholder="Masukkan email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                        />

                        <InputError message={errors.email} />
                    </div>

                    <div className="form-control">
                        <InputLabel value="Telepon" />

                        <TextInput
                            type="number"
                            placeholder="Masukkan telepon"
                            value={data.telp}
                            onChange={(e) => setData("telp", e.target.value)}
                        />

                        <InputError message={errors.telp} />
                    </div>
                </div>

                <div className="form-control">
                    <InputLabel value="Alamat" />

                    <TextArea
                        placeholder="Masukkan alamat"
                        onChange={(e) => setData("alamat", e.target.value)}
                        value={data.alamat}
                    />

                    <InputError message={errors.alamat} />
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
