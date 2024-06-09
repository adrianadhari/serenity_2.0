import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import Spinner from "@/Components/Spinner";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";

export default function CreateForm({}) {
    const { data, setData, post, processing, errors } = useForm({
        nama_pelatihan: "",
        institusi: "",
        trainer: "",
        unit_pengusul: "",
        tanggal_mulai: "",
        tanggal_akhir: "",
    });

    const storeTraining = async (e) => {
        e.preventDefault();

        post(route("pelatihan.store"));
    };

    return (
        <form onSubmit={storeTraining} className="form-card">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                    <InputLabel value="Nama Pelatihan" />

                    <TextInput
                        type="text"
                        placeholder="Masukkan nama pelatihan"
                        value={data.nama_pelatihan}
                        onChange={(e) =>
                            setData("nama_pelatihan", e.target.value)
                        }
                    />

                    <InputError message={errors.nama_pelatihan} />
                </div>

                <div className="form-control">
                    <InputLabel value="Institusi Pemberi Pelatihan" />

                    <TextInput
                        type="text"
                        placeholder="Masukkan Institusi Pemberi Pelatihan"
                        value={data.institusi}
                        onChange={(e) => setData("institusi", e.target.value)}
                    />

                    <InputError message={errors.institusi} />
                </div>

                <div className="form-control">
                    <InputLabel value="Trainer Pelatihan" />

                    <TextInput
                        type="text"
                        placeholder="Masukkan Trainer Pelatihan"
                        value={data.trainer}
                        onChange={(e) => setData("trainer", e.target.value)}
                    />

                    <InputError message={errors.trainer} />
                </div>

                <div className="form-control">
                    <InputLabel value="Unit Pengusul" />

                    <TextInput
                        type="text"
                        placeholder="Masukkan Unit Pengusul"
                        value={data.unit_pengusul}
                        onChange={(e) =>
                            setData("unit_pengusul", e.target.value)
                        }
                    />

                    <InputError message={errors.unit_pengusul} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="form-control">
                        <InputLabel value="Tanggal Pelaksanaan (Awal)" />

                        <TextInput
                            type="date"
                            placeholder="Masukkan Tanggal Pelaksanaan (Awal)"
                            value={data.tanggal_mulai}
                            onChange={(e) =>
                                setData("tanggal_mulai", e.target.value)
                            }
                        />

                        <InputError message={errors.tanggal_mulai} />
                    </div>

                    <div className="form-control">
                        <InputLabel value="Tanggal Pelaksanaan (Akhir)" />

                        <TextInput
                            type="date"
                            placeholder="Masukkan Tanggal Pelaksanaan (Akhir)"
                            value={data.tanggal_akhir}
                            onChange={(e) =>
                                setData("tanggal_akhir", e.target.value)
                            }
                        />

                        <InputError message={errors.tanggal_akhir} />
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
