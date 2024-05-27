import { useContext } from "react";
import { useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { Dropdown } from "primereact/dropdown";
import PrimaryButton from "@/Components/PrimaryButton";
import Spinner from "@/Components/Spinner";
import { PublicationContext } from "../context/PublicationCotext";

export default function CreateForm({ typeData, statusData }) {
    let { handleFunctions } = useContext(PublicationContext);

    let {
        selectedTypeTemplate,
        typeOptionTemplate,
        selectedStatusTemplate,
        statusOptionTemplate,
    } = handleFunctions;

    const { data, setData, post, processing, errors } = useForm({
        judul: "",
        tipe: "",
        haki: "",
        status: "",
    });

    const storePublication = async (e) => {
        e.preventDefault();

        post(route("publikasi.store"));
    };

    return (
        <form onSubmit={storePublication} className="form-card">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                    <InputLabel value="Judul Publikasi" />

                    <TextInput
                        type="text"
                        placeholder="Masukkan judul publikasi"
                        value={data.judul}
                        onChange={(e) => setData("judul", e.target.value)}
                    />

                    <InputError message={errors.judul} />
                </div>

                <div className="form-control">
                    <InputLabel value="Tipe" />

                    <Dropdown
                        required
                        value={data.tipe}
                        onChange={(e) => setData("tipe", e.value)}
                        options={typeData}
                        optionLabel="name"
                        placeholder="-- Pilih Tipe --"
                        filter
                        checkmark={true}
                        highlightOnSelect={false}
                        valueTemplate={selectedTypeTemplate}
                        itemTemplate={typeOptionTemplate}
                        className="border-gray"
                    />

                    <InputError message={errors.tipe} />
                </div>

                <div className="form-control">
                    <InputLabel value="HAKI" />

                    <TextInput
                        type="text"
                        placeholder="Masukkan HAKI"
                        value={data.haki}
                        onChange={(e) => setData("haki", e.target.value)}
                    />

                    <InputError message={errors.haki} />
                </div>

                <div className="form-control">
                    <InputLabel value="Status" />

                    <Dropdown
                        required
                        value={data.status}
                        onChange={(e) => setData("status", e.value)}
                        options={statusData}
                        optionLabel="name"
                        placeholder="-- Pilih Status --"
                        filter
                        checkmark={true}
                        highlightOnSelect={false}
                        valueTemplate={selectedStatusTemplate}
                        itemTemplate={statusOptionTemplate}
                        className="border-gray"
                    />

                    <InputError message={errors.status} />
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
