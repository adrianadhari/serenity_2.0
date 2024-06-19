import { useContext } from "react";
import { useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { Dropdown } from "primereact/dropdown";
import PrimaryButton from "@/Components/PrimaryButton";
import Spinner from "@/Components/Spinner";
import { PraAnalisaContext } from "../context/PraAnalisaContext";
import { InputNumber } from "primereact/inputnumber";

export default function CreateForm({ jenis, status, customers_name }) {
    let { handleFunctions } = useContext(PraAnalisaContext);

    let {
        selectedStatusTemplate,
        statusOptionTemplate,
        selectedJenisTemplate,
        jenisOptionTemplate,
        selectedPelangganTemplate,
        pelangganOptionTemplate,
    } = handleFunctions;

    const { data, setData, post, processing, errors } = useForm({
        tujuan_kegiatan: "",
        pelayanan: "",
        jenis_analisis: "",
        status_tarif: "",
        surat_masuk: null,
        surat_balasan: null,
        invoice_dp: null,
        bukti_bayar_dp: null,
        jumlah_invoice: 0,
        permintaan_tender: null,
        sppc: null,
        buku_agenda: null,
        contoh_uji: "",
        pelanggan_name: "",
    });

    const storeAction = async (e) => {
        e.preventDefault();

        post(route("lab.pra-analisa.store"));
    };

    return (
        <form
            onSubmit={storeAction}
            className="form-card"
            encType="multipart/form-data"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                    <InputLabel value="Nama dan Tujuan Kegiatan" />

                    <TextInput
                        type="text"
                        placeholder="Masukkan nama dan tujuan kegiatan"
                        value={data.tujuan_kegiatan}
                        onChange={(e) =>
                            setData("tujuan_kegiatan", e.target.value)
                        }
                    />

                    <InputError message={errors.tujuan_kegiatan} />
                </div>

                <div className="form-control">
                    <InputLabel value="Jenis Pelayanan" />

                    <Dropdown
                        required
                        value={data.pelayanan}
                        onChange={(e) => setData("pelayanan", e.value)}
                        options={jenis}
                        optionLabel="name"
                        placeholder="-- Pilih Jenis Pelayanan --"
                        filter
                        checkmark={true}
                        highlightOnSelect={false}
                        valueTemplate={selectedJenisTemplate}
                        itemTemplate={jenisOptionTemplate}
                        className="border-gray"
                    />

                    <InputError message={errors.pelayanan} />
                </div>

                <div className="form-control">
                    <InputLabel value="Jenis Analisis" />

                    <TextInput
                        type="text"
                        placeholder="Masukkan jenis analisis"
                        value={data.jenis_analisis}
                        onChange={(e) =>
                            setData("jenis_analisis", e.target.value)
                        }
                    />

                    <InputError message={errors.jenis_analisis} />
                </div>

                <div className="form-control">
                    <InputLabel value="Status Tarif" />

                    <Dropdown
                        required
                        value={data.status_tarif}
                        onChange={(e) => setData("status_tarif", e.value)}
                        options={status}
                        optionLabel="name"
                        placeholder="-- Pilih Status Tarif --"
                        filter
                        checkmark={true}
                        highlightOnSelect={false}
                        valueTemplate={selectedStatusTemplate}
                        itemTemplate={statusOptionTemplate}
                        className="border-gray"
                    />

                    <InputError message={errors.status_tarif} />
                </div>

                <div className="form-control">
                    <InputLabel value="Pelanggan" />

                    <Dropdown
                        required
                        value={data.pelanggan_name}
                        onChange={(e) => setData("pelanggan_name", e.value)}
                        options={customers_name}
                        optionLabel="name"
                        placeholder="-- Pilih Pelanggan --"
                        filter
                        checkmark={true}
                        highlightOnSelect={false}
                        valueTemplate={selectedPelangganTemplate}
                        itemTemplate={pelangganOptionTemplate}
                        className="border-gray"
                    />

                    <InputError message={errors.pelanggan_name} />
                </div>

                <div className="form-control">
                    <InputLabel value="Surat Masuk" />

                    <input
                        type="file"
                        className="file-input file-input-bordered w-full mt-1"
                        onChange={(e) =>
                            setData("surat_masuk", e.target.files[0])
                        }
                    />

                    <InputError message={errors.surat_masuk} />
                </div>

                <div className="form-control">
                    <InputLabel value="Surat Balasan" />

                    <input
                        type="file"
                        className="file-input file-input-bordered w-full mt-1"
                        onChange={(e) =>
                            setData("surat_balasan", e.target.files[0])
                        }
                    />

                    <InputError message={errors.surat_balasan} />
                </div>

                <div className="form-control">
                    <InputLabel value="Invoice DP" />

                    <input
                        type="file"
                        className="file-input file-input-bordered w-full mt-1"
                        onChange={(e) =>
                            setData("invoice_dp", e.target.files[0])
                        }
                    />

                    <InputError message={errors.invoice_dp} />
                </div>

                <div className="form-control">
                    <InputLabel value="Bukti Pembayaran DP" />

                    <input
                        type="file"
                        className="file-input file-input-bordered w-full mt-1"
                        onChange={(e) =>
                            setData("bukti_bayar_dp", e.target.files[0])
                        }
                    />

                    <InputError message={errors.bukti_bayar_dp} />
                </div>

                <div className="form-control">
                    <InputLabel value="Jumlah Invoice" />

                    <InputNumber
                        value={data.jumlah_invoice}
                        onValueChange={(e) =>
                            setData("jumlah_invoice", e.target.value)
                        }
                        mode="currency"
                        currency="IDR"
                        className="mt-2"
                    />

                    <InputError message={errors.jumlah_invoice} />
                </div>

                <div className="form-control">
                    <InputLabel value="Kaji ulang permintaan tender dan kontrak" />

                    <input
                        type="file"
                        className="file-input file-input-bordered w-full mt-1"
                        onChange={(e) =>
                            setData("permintaan_tender", e.target.files[0])
                        }
                    />

                    <InputError message={errors.permintaan_tender} />
                </div>

                <div className="form-control">
                    <InputLabel value="Surat Permohonan Pemeriksaan Contoh (SPPC)" />

                    <input
                        type="file"
                        className="file-input file-input-bordered w-full mt-1"
                        onChange={(e) => setData("sppc", e.target.files[0])}
                    />

                    <InputError message={errors.sppc} />
                </div>

                <div className="form-control">
                    <InputLabel value="Buku agenda penerimaan contoh" />

                    <input
                        type="file"
                        className="file-input file-input-bordered w-full mt-1"
                        onChange={(e) =>
                            setData("buku_agenda", e.target.files[0])
                        }
                    />

                    <InputError message={errors.buku_agenda} />
                </div>

                <div className="form-control">
                    <InputLabel value="Data Kondisi Contoh Uji" />

                    <TextInput
                        type="text"
                        placeholder="Masukkan data kondisi contoh uji"
                        value={data.contoh_uji}
                        onChange={(e) => setData("contoh_uji", e.target.value)}
                    />

                    <InputError message={errors.contoh_uji} />
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
