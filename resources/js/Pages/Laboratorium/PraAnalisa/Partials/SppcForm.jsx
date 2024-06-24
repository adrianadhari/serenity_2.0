import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import Spinner from "@/Components/Spinner";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";

export default function SppcForm({ id }) {
    const { data, setData, post, processing, errors } = useForm({
        kode: "",
        jenis_sampel: "",
        unit_kemasan: "",
        jumlah_sampel: 0,
        parameter_uji: "",
        metode_pengujian: "",
        no_analisis: 0,
        tgl_penerimaan: "",
        tgl_selesai_pengujian: "",
    });

    const storeAction = async (e) => {
        e.preventDefault();

        post(route("lab.pra-analisa.lab-sppc.create", id));
    };

    return (
        <form onSubmit={storeAction} className="form-card">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                    <InputLabel value="Jenis Sampel" />

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
                    <InputLabel value="Kode" />

                    <TextInput
                        type="text"
                        value={data.kode}
                        onChange={(e) => setData("kode", e.target.value)}
                    />

                    <InputError message={errors.kode} />
                </div>

                <div className="form-control">
                    <InputLabel value="Unit Kemasan dan Ukuran" />

                    <TextInput
                        type="text"
                        value={data.unit_kemasan}
                        onChange={(e) =>
                            setData("unit_kemasan", e.target.value)
                        }
                    />

                    <InputError message={errors.unit_kemasan} />
                </div>

                <div className="form-control">
                    <InputLabel value="Jumlah Sampel" />

                    <TextInput
                        type="number"
                        value={data.jumlah_sampel}
                        onChange={(e) =>
                            setData("jumlah_sampel", e.target.value)
                        }
                    />

                    <InputError message={errors.jumlah_sampel} />
                </div>

                <div className="form-control">
                    <InputLabel value="Parameter Uji" />

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
                    <InputLabel value="Metode Pengujian" />

                    <TextInput
                        type="text"
                        value={data.metode_pengujian}
                        onChange={(e) =>
                            setData("metode_pengujian", e.target.value)
                        }
                    />

                    <InputError message={errors.metode_pengujian} />
                </div>

                <div className="form-control">
                    <InputLabel value="No Analisis" />

                    <TextInput
                        type="number"
                        value={data.no_analisis}
                        onChange={(e) => setData("no_analisis", e.target.value)}
                    />

                    <InputError message={errors.no_analisis} />
                </div>

                <div className="form-control">
                    <InputLabel value="Tanggal Penerimaan" />

                    <TextInput
                        type="date"
                        value={data.tgl_penerimaan}
                        onChange={(e) =>
                            setData("tgl_penerimaan", e.target.value)
                        }
                    />

                    <InputError message={errors.tgl_penerimaan} />
                </div>

                <div className="form-control">
                    <InputLabel value="Tanggal Estimasi Penyelesaian" />

                    <TextInput
                        type="date"
                        value={data.tgl_selesai_pengujian}
                        onChange={(e) =>
                            setData("tgl_selesai_pengujian", e.target.value)
                        }
                    />

                    <InputError message={errors.tgl_selesai_pengujian} />
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
