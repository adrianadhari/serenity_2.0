import { useContext } from "react";
import { InstitutionContext } from "../context/InstitutionContext";
import { useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { Dropdown } from "primereact/dropdown";
import PrimaryButton from "@/Components/PrimaryButton";

export default function CreateForm({ negara, jenis, grup }) {
    let { handleFunctions } = useContext(InstitutionContext);

    let {
        selectedNegaraTemplate,
        negaraOptionTemplate,
        selectedGrupTemplate,
        grupOptionTemplate,
        selectedJenisTemplate,
        jenisOptionTemplate,
    } = handleFunctions;

    const { data, setData, post, processing, errors } = useForm({
        nama: "",
        negara: "",
        grup: "",
        jenis: "",
        alamat: "",
        telp: "",
        email: "",
        tgl_registrasi: "",
    });

    const storeInstitution = async (e) => {
        e.preventDefault();

        post(route("institusi.store"));
    };

    return (
        <form
            onSubmit={storeInstitution}
            className="max-w-7xl mx-auto p-4 bg-white shadow-lg rounded border-t-4 border-t-rose-600"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                    <InputLabel value="Nama Institusi" />

                    <TextInput
                        type="text"
                        className="mt-1 block w-full"
                        placeholder="Masukkan nama institusi"
                        required
                        value={data.nama}
                        onChange={(e) => setData("nama", e.target.value)}
                    />

                    <InputError message={errors.nama} className="mt-2" />
                </div>

                <div className="form-control">
                    <InputLabel value="Negara Institusi" />

                    <Dropdown
                        required
                        value={data.negara}
                        onChange={(e) => setData("negara", e.value)}
                        options={negara}
                        optionLabel="name"
                        placeholder="-- Pilih Negara --"
                        filter
                        checkmark={true}
                        highlightOnSelect={false}
                        valueTemplate={selectedNegaraTemplate}
                        itemTemplate={negaraOptionTemplate}
                        className="mt-1 text-sm border border-solid border-gray-300 w-full rounded-md shadow-sm"
                    />

                    <InputError message={errors.negara} className="mt-2" />
                </div>

                <div className="form-control">
                    <InputLabel value="Grup Institusi" />

                    <Dropdown
                        required
                        value={data.grup}
                        onChange={(e) => setData("grup", e.value)}
                        options={grup}
                        optionLabel="name"
                        placeholder="-- Pilih Grup Institusi --"
                        filter
                        checkmark={true}
                        highlightOnSelect={false}
                        valueTemplate={selectedGrupTemplate}
                        itemTemplate={grupOptionTemplate}
                        className="mt-1 text-sm border border-solid border-gray-300 w-full rounded-md shadow-sm"
                    />

                    <InputError message={errors.grup} className="mt-2" />
                </div>

                <div className="form-control">
                    <InputLabel value="Jenis Institusi" />

                    <Dropdown
                        required
                        value={data.jenis}
                        onChange={(e) => setData("jenis", e.value)}
                        options={jenis}
                        optionLabel="name"
                        placeholder="-- Pilih Jenis Institusi --"
                        filter
                        checkmark={true}
                        highlightOnSelect={false}
                        valueTemplate={selectedJenisTemplate}
                        itemTemplate={jenisOptionTemplate}
                        className="mt-1 text-sm border border-solid border-gray-300 w-full rounded-md shadow-sm"
                    />

                    <InputError message={errors.jenis} className="mt-2" />
                </div>
            </div>

            <hr className="my-8 border-gray-300" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                    <InputLabel value="Email Institusi" />

                    <TextInput
                        type="email"
                        className="mt-1 block w-full"
                        placeholder="Masukkan email institusi"
                        required
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="form-control">
                    <InputLabel value="Telepon Institusi" />

                    <TextInput
                        type="number"
                        className="mt-1 block w-full"
                        placeholder="Masukkan telepon institusi"
                        required
                        value={data.telp}
                        onChange={(e) => setData("telp", e.target.value)}
                    />

                    <InputError message={errors.telp} className="mt-2" />
                </div>

                <div className="form-control">
                    <InputLabel value="Alamat" />

                    <textarea
                        className="textarea textarea-bordered h-24 mt-1"
                        placeholder="Masukkan institusi"
                        required
                        onChange={(e) => setData("alamat", e.target.value)}
                        value={data.alamat}
                    ></textarea>

                    <InputError message={errors.alamat} className="mt-2" />
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
