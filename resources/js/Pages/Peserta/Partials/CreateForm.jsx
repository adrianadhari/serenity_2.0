import { useContext } from "react";
import { PesertaContext } from "../context/PesertaContext";
import { useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { Dropdown } from "primereact/dropdown";
import PrimaryButton from "@/Components/PrimaryButton";
import Spinner from "@/Components/Spinner";

export default function CreateForm({
    tipe_peserta,
    jenis_kelamin,
    pendidikan,
    institusi,
}) {
    let { handleFunctions } = useContext(PesertaContext);

    let {
        selectedTipeTemplate,
        tipeOptionTemplate,
        selectedGenderTemplate,
        genderOptionTemplate,
        selectedPendidikanTemplate,
        pendidikanOptionTemplate,
        selectedInstitusiTemplate,
        institusiOptionTemplate,
    } = handleFunctions;

    const { data, setData, post, processing, errors } = useForm({
        nama_peserta: "",
        tipe_peserta: "",
        institusi: "",
        email: "",
        jabatan: "",
        telp: "",
        pendidikan: "",
        jenis_kelamin: "",
    });

    const storeParticipant = async (e) => {
        e.preventDefault();

        post(route("peserta.store"));
    };

    return (
        <form onSubmit={storeParticipant} className="form-card">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                    <InputLabel value="Nama Peserta" />
                    <TextInput
                        type="text"
                        placeholder="Masukkan nama peserta"
                        value={data.nama_peserta}
                        onChange={(e) =>
                            setData("nama_peserta", e.target.value)
                        }
                    />

                    <InputError message={errors.nama_peserta} />
                </div>

                <div className="form-control">
                    <InputLabel value="Tipe Peserta" />

                    <Dropdown
                        required
                        value={data.tipe_peserta}
                        onChange={(e) => setData("tipe_peserta", e.value)}
                        options={tipe_peserta}
                        optionLabel="tipe peserta"
                        placeholder="-- Pilih Tipe Peserta --"
                        filter
                        checkmark={true}
                        highlightOnSelect={false}
                        valueTemplate={selectedTipeTemplate}
                        itemTemplate={tipeOptionTemplate}
                        className="border-gray"
                    />

                    <InputError message={errors.tipe_peserta} />
                </div>

                <div className="form-control">
                    <InputLabel value="Institusi" />

                    <Dropdown
                        required
                        value={data.institusi}
                        onChange={(e) => setData("institusi", e.value)}
                        options={institusi}
                        optionLabel="institusi"
                        placeholder="-- Pilih Institusi --"
                        filter
                        checkmark={true}
                        highlightOnSelect={false}
                        valueTemplate={selectedInstitusiTemplate}
                        itemTemplate={institusiOptionTemplate}
                        className="border-gray"
                    />

                    <InputError message={errors.institusi} />
                </div>

                <div className="form-control">
                    <InputLabel value="Email" />

                    <TextInput
                        type="text"
                        placeholder="Masukkan email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                    />

                    <InputError message={errors.email} />
                </div>

                <div className="form-control">
                    <InputLabel value="Telp" />
                    <TextInput
                        type="text"
                        placeholder="Masukkan telp"
                        value={data.telp}
                        onChange={(e) => setData("telp", e.target.value)}
                    />

                    <InputError message={errors.telp} />
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
                        optionLabel="pendidikan"
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
                        options={jenis_kelamin}
                        optionLabel="jenis_kelamin"
                        placeholder="-- Pilih Jenis Kelamin --"
                        filter
                        checkmark={true}
                        highlightOnSelect={false}
                        valueTemplate={selectedGenderTemplate}
                        itemTemplate={genderOptionTemplate}
                        className="border-gray"
                    />

                    <InputError message={errors.jenis_kelamin} />
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
