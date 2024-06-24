import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import Spinner from "@/Components/Spinner";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";

export default function AgendaForm({ id }) {
    const { data, setData, post, processing, errors } = useForm({
        tgl_terima_sampel: "",
        jumlah_sampel: "",
        kode_lab: "",
        nama_koresponden: "",
        jenis_sampel: "",
        jam_pengambilan_sampel: "",
        hemolis: false,
        lipemik: false,
        ikterus: false,
        volume: "",
        cair: false,
        dingin: false,
        no_box: "",
        cup_asam: false,
        cup_gelap: false,
        f80: "",
        f20: "",
        keterangan: "",
    });

    const storeAction = async (e) => {
        e.preventDefault();

        post(route("lab.pra-analisa.lab-agenda.create", id));
    };

    return (
        <form onSubmit={storeAction} className="form-card">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                    <InputLabel value="Tanggal Terima Sampel" />

                    <TextInput
                        type="date"
                        value={data.tgl_terima_sampel}
                        onChange={(e) =>
                            setData("tgl_terima_sampel", e.target.value)
                        }
                    />

                    <InputError message={errors.tgl_terima_sampel} />
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
                    <InputLabel value="Kode Lab" />

                    <TextInput
                        type="number"
                        value={data.kode_lab}
                        onChange={(e) => setData("kode_lab", e.target.value)}
                    />

                    <InputError message={errors.kode_lab} />
                </div>

                <div className="form-control">
                    <InputLabel value="Nama Koresponden" />

                    <TextInput
                        type="text"
                        value={data.nama_koresponden}
                        onChange={(e) =>
                            setData("nama_koresponden", e.target.value)
                        }
                    />

                    <InputError message={errors.nama_koresponden} />
                </div>

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
                    <InputLabel value="Jam Pengambilan Sampel" />

                    <TextInput
                        type="time"
                        value={data.jam_pengambilan_sampel}
                        onChange={(e) =>
                            setData("jam_pengambilan_sampel", e.target.value)
                        }
                    />

                    <InputError message={errors.jam_pengambilan_sampel} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="flex items-center">
                        <Checkbox
                            name="hemolis"
                            checked={data.hemolis}
                            onChange={(e) =>
                                setData("hemolis", e.target.checked)
                            }
                        />
                        <span className="ms-2 text-sm text-gray-600">
                            Hemolis
                        </span>
                    </label>

                    <label className="flex items-center">
                        <Checkbox
                            name="lipemik"
                            checked={data.lipemik}
                            onChange={(e) =>
                                setData("lipemik", e.target.checked)
                            }
                        />
                        <span className="ms-2 text-sm text-gray-600">
                            Lipemik
                        </span>
                    </label>

                    <label className="flex items-center">
                        <Checkbox
                            name="ikterus"
                            checked={data.ikterus}
                            onChange={(e) =>
                                setData("ikterus", e.target.checked)
                            }
                        />
                        <span className="ms-2 text-sm text-gray-600">
                            Ikterus
                        </span>
                    </label>

                    <label className="flex items-center">
                        <Checkbox
                            name="cair"
                            checked={data.cair}
                            onChange={(e) => setData("cair", e.target.checked)}
                        />
                        <span className="ms-2 text-sm text-gray-600">
                            Cair/Beku
                        </span>
                    </label>

                    <label className="flex items-center">
                        <Checkbox
                            name="dingin"
                            checked={data.dingin}
                            onChange={(e) =>
                                setData("dingin", e.target.checked)
                            }
                        />
                        <span className="ms-2 text-sm text-gray-600">
                            Dingin/Tidak Dingin
                        </span>
                    </label>

                    <label className="flex items-center">
                        <Checkbox
                            name="cup_asam"
                            checked={data.cup_asam}
                            onChange={(e) =>
                                setData("cup_asam", e.target.checked)
                            }
                        />
                        <span className="ms-2 text-sm text-gray-600">
                            Cup Serum Asam
                        </span>
                    </label>

                    <label className="flex items-center">
                        <Checkbox
                            name="cup_gelap"
                            checked={data.cup_gelap}
                            onChange={(e) =>
                                setData("cup_gelap", e.target.checked)
                            }
                        />
                        <span className="ms-2 text-sm text-gray-600">
                            Cup Serum Gelap
                        </span>
                    </label>
                </div>

                <div className="form-control">
                    <InputLabel value="Volume" />

                    <TextInput
                        type="number"
                        value={data.volume}
                        onChange={(e) => setData("volume", e.target.value)}
                    />

                    <InputError message={errors.volume} />
                </div>

                <div className="form-control">
                    <InputLabel value="No Box" />

                    <TextInput
                        type="number"
                        value={data.no_box}
                        onChange={(e) => setData("no_box", e.target.value)}
                    />

                    <InputError message={errors.no_box} />
                </div>

                <div className="form-control">
                    <InputLabel value="F80" />

                    <TextInput
                        type="text"
                        value={data.f80}
                        onChange={(e) => setData("f80", e.target.value)}
                    />

                    <InputError message={errors.f80} />
                </div>

                <div className="form-control">
                    <InputLabel value="F20" />

                    <TextInput
                        type="text"
                        value={data.f20}
                        onChange={(e) => setData("f20", e.target.value)}
                    />

                    <InputError message={errors.f20} />
                </div>

                <div className="form-control">
                    <InputLabel value="Keterangan" />

                    <TextInput
                        type="text"
                        value={data.keterangan}
                        onChange={(e) => setData("keterangan", e.target.value)}
                    />

                    <InputError message={errors.keterangan} />
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
