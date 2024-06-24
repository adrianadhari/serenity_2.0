import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import Spinner from "@/Components/Spinner";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";

export default function TenderForm({ id }) {
    const { data, setData, post, processing, errors } = useForm({
        parameter_uji: "",
        jenis_sampel: "",
        metode: "",
        peralatan: "",
        personel: false,
        bahan: false,
        qc: false,
        kondisi_akomodasi: false,
        kesimpulan: "",
    });

    const storeAction = async (e) => {
        e.preventDefault();

        post(route("lab.pra-analisa.lab-tender.create", id));
    };

    return (
        <form onSubmit={storeAction} className="form-card">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                    <InputLabel value="Paremeter Uji" />

                    <TextInput
                        type="text"
                        value={data.parameter_uji}
                        onChange={(e) =>
                            setData("parameter_uji", e.target.value)
                        }
                    />

                    <InputError message={errors.parameter_uji} />
                </div>

                <div className="form-control">
                    <InputLabel value="Jenis dan Jumlah Sampel" />

                    <TextInput
                        type="text"
                        value={data.jenis_sampel}
                        onChange={(e) =>
                            setData("jenis_sampel", e.target.value)
                        }
                    />

                    <InputError message={errors.jenis_sampel} />
                </div>

                <div className="form-control">
                    <InputLabel value="Metode" />

                    <TextInput
                        type="text"
                        value={data.metode}
                        onChange={(e) => setData("metode", e.target.value)}
                    />

                    <InputError message={errors.metode} />
                </div>

                <div className="form-control">
                    <InputLabel value="Peralatan" />

                    <TextInput
                        type="text"
                        value={data.peralatan}
                        onChange={(e) => setData("peralatan", e.target.value)}
                    />

                    <InputError message={errors.peralatan} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="flex items-center">
                        <Checkbox
                            name="personal"
                            checked={data.personel}
                            onChange={(e) =>
                                setData("personel", e.target.checked)
                            }
                        />
                        <span className="ms-2 text-sm text-gray-600">
                            Personal
                        </span>
                    </label>

                    <label className="flex items-center">
                        <Checkbox
                            name="bahan"
                            checked={data.bahan}
                            onChange={(e) => setData("bahan", e.target.checked)}
                        />
                        <span className="ms-2 text-sm text-gray-600">
                            Bahan
                        </span>
                    </label>

                    <label className="flex items-center">
                        <Checkbox
                            name="qc"
                            checked={data.qc}
                            onChange={(e) => setData("qc", e.target.checked)}
                        />
                        <span className="ms-2 text-sm text-gray-600">QC</span>
                    </label>

                    <label className="flex items-center">
                        <Checkbox
                            name="kondisi_akomodasi"
                            checked={data.kondisi_akomodasi}
                            onChange={(e) =>
                                setData("kondisi_akomodasi", e.target.checked)
                            }
                        />
                        <span className="ms-2 text-sm text-gray-600">
                            Kondisi Akomodasi
                        </span>
                    </label>
                </div>

                <div className="form-control">
                    <InputLabel value="Kesimpulan" />

                    <TextInput
                        type="text"
                        value={data.kesimpulan}
                        onChange={(e) => setData("kesimpulan", e.target.value)}
                    />

                    <InputError message={errors.kesimpulan} />
                </div>
            </div>

            <div className="flex justify-end">
                <PrimaryButton
                    className="mt-8 w-full md:w-1/6 justify-center py-2 btn-danger"
                    disabled={processing}
                >
                    Simpan Data
                    <Spinner isLoading={processing} />
                </PrimaryButton>
            </div>
        </form>
    );
}
