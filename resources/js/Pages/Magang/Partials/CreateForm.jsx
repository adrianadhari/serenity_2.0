import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import Spinner from "@/Components/Spinner";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { Dropdown } from "primereact/dropdown";

export default function CreateForm({ students }) {
    const selectedStudentTemplate = (option, props) => {
        if (option) {
            return <div className="text-sm">{option}</div>;
        }

        return <span>{props.placeholder}</span>;
    };

    const studentOptionTemplate = (option) => {
        return <div className="text-sm">{option}</div>;
    };

    const { data, setData, post, processing, errors } = useForm({
        start: "",
        finish: "",
        nis: "",
    });

    const storeIntern = async (e) => {
        e.preventDefault();

        post(route("magang.store"));
    };

    return (
        <form onSubmit={storeIntern} className="form-card">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                    <InputLabel value="NIS Siswa" />

                    <Dropdown
                        required
                        value={data.nis}
                        onChange={(e) => setData("nis", e.value)}
                        options={students}
                        optionLabel="name"
                        placeholder="-- Pilih NIS Siswa --"
                        filter
                        checkmark={true}
                        highlightOnSelect={false}
                        valueTemplate={selectedStudentTemplate}
                        itemTemplate={studentOptionTemplate}
                        className="border-gray"
                    />

                    <InputError message={errors.nis} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control">
                        <InputLabel value="Tanggal Mulai Magang" />

                        <TextInput
                            type="date"
                            value={data.start}
                            onChange={(e) => setData("start", e.target.value)}
                        />

                        <InputError message={errors.start} />
                    </div>

                    <div className="form-control">
                        <InputLabel value="Tanggal Selesai Magang" />

                        <TextInput
                            type="date"
                            value={data.finish}
                            onChange={(e) => setData("finish", e.target.value)}
                        />

                        <InputError message={errors.finish} />
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
