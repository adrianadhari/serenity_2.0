import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import Spinner from "@/Components/Spinner";
import TextArea from "@/Components/TextArea";
import TextInput from "@/Components/TextInput";
import { PeminjamanContext } from "../context/PeminjamanContext";
import { useContext } from "react";
import { useForm } from "@inertiajs/react";
import { Dropdown } from "primereact/dropdown";

export default function CreateForm({
    status_tarif,
    tools_name,
    nama_pelanggan,
}) {
    let { handleFunctions } = useContext(PeminjamanContext);

    let {
        selectedStatusTarifTemplate,
        statusTarifOptionTemplate,
        selectedNamaAlatTemplate,
        namaAlatOptionTemplate,
        selectedNamaPelangganTemplate,
        namaPelangganOptionTemplate,
    } = handleFunctions;

    const { data, setData, post, processing, errors } = useForm({
        tujuan_peminjaman: "",
        tanggal_peminjaman: "",
        tanggal_pengembalian: "",
        estimasi_tanggal_pengembalian: "",
        jumlah: "",
        keterangan: "",
        status_tarif: "",
        status_peminjaman: "Dipinjam",
        jumlah_invoice: "",
        surat_masuk: null,
        surat_balasan: null,
        invoice_pelunasan: null,
        bukti_pembayaran: null,
        kontrak_peminjaman_alat: null,
        form_serah_terima_alat: null,
        nama_alat: "",
        nama_pelanggan: "",
    });

    const storePeminjaman = async (e) => {
        e.preventDefault();

        post(route("lab.peminjaman.store"));
    };

    return (
        <form onSubmit={storePeminjaman} className="form-card">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                    <InputLabel value="Nama Pelanggan" />
                    <Dropdown
                        required
                        value={data.nama_pelanggan}
                        onChange={(e) => setData("nama_pelanggan", e.value)}
                        options={nama_pelanggan}
                        optionLabel="nama_pelanggan"
                        placeholder="-- Pilih Nama Pelanggan --"
                        filter
                        checkmark={true}
                        highlightOnSelect={false}
                        valueTemplate={selectedNamaPelangganTemplate}
                        itemTemplate={namaPelangganOptionTemplate}
                        className="border-gray"
                    />

                    <InputError message={errors.nama_pelanggan} />
                </div>

                <div className="form-control">
                    <InputLabel value="Nama Alat" />
                    <Dropdown
                        required
                        value={data.nama_alat}
                        onChange={(e) => setData("nama_alat", e.value)}
                        options={tools_name}
                        optionLabel="nama_alat"
                        placeholder="-- Pilih Nama Alat --"
                        filter
                        checkmark={true}
                        highlightOnSelect={false}
                        valueTemplate={selectedNamaAlatTemplate}
                        itemTemplate={namaAlatOptionTemplate}
                        className="border-gray"
                    />

                    <InputError message={errors.nama_alat} />
                </div>

                <div className="form-control">
                    <InputLabel value="Nama dan Tujuan" />

                    <TextInput
                        type="text"
                        placeholder="Masukkan Nama dan Tujuan"
                        value={data.tujuan_peminjaman}
                        onChange={(e) =>
                            setData("tujuan_peminjaman", e.target.value)
                        }
                    />

                    <InputError message={errors.tujuan_peminjaman} />
                </div>

                <div className="form-control">
                    <InputLabel value="Jumlah" />

                    <TextInput
                        type="number"
                        placeholder="Masukkan Jumlah"
                        value={data.jumlah}
                        onChange={(e) => setData("jumlah", e.target.value)}
                    />

                    <InputError message={errors.jumlah} />
                </div>

                <div className="form-control">
                    <InputLabel value="Status Tarif" />
                    <Dropdown
                        required
                        value={data.status_tarif}
                        onChange={(e) => setData("status_tarif", e.value)}
                        options={status_tarif}
                        optionLabel="status_tarif"
                        placeholder="-- Pilih Status Tarif --"
                        filter
                        checkmark={true}
                        highlightOnSelect={false}
                        valueTemplate={selectedStatusTarifTemplate}
                        itemTemplate={statusTarifOptionTemplate}
                        className="border-gray"
                    />

                    <InputError message={errors.status_tarif} />
                </div>

                <div className="form-control">
                    <InputLabel value="Jumlah Invoice" />

                    <TextInput
                        type="number"
                        placeholder="Masukkan Jumlah Invoice"
                        onChange={(e) =>
                            setData("jumlah_invoice", e.target.value)
                        }
                        value={data.jumlah_invoice}
                    />

                    <InputError message={errors.jumlah_invoice} />
                </div>

                <div className="form-control">
                    <InputLabel value="Tanggal Peminjaman" />

                    <TextInput
                        type="date"
                        onChange={(e) =>
                            setData("tanggal_peminjaman", e.target.value)
                        }
                        value={data.tanggal_peminjaman}
                    />

                    <InputError message={errors.tanggal_peminjaman} />
                </div>

                <div className="form-control">
                    <InputLabel value="Estimasi Tanggal Pengembalian" />

                    <TextInput
                        type="date"
                        onChange={(e) =>
                            setData(
                                "estimasi_tanggal_pengembalian",
                                e.target.value
                            )
                        }
                        value={data.estimasi_tanggal_pengembalian}
                    />

                    <InputError
                        message={errors.estimasi_tanggal_pengembalian}
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 py-4">
                <div className="form-control">
                    <InputLabel value="Keterangan" />

                    <TextArea
                        onChange={(e) => setData("keterangan", e.target.value)}
                        value={data.keterangan}
                    />

                    <InputError message={errors.keterangan} />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <InputLabel value="Invoice Pelunasan" />

                    <input
                        type="file"
                        className="file-input file-input-bordered w-full mt-1"
                        onChange={(e) =>
                            setData("invoice_pelunasan", e.target.files[0])
                        }
                    />

                    <InputError message={errors.invoice_pelunasan} />
                </div>

                <div className="form-control">
                    <InputLabel value="Bukti Pembayaran" />

                    <input
                        type="file"
                        className="file-input file-input-bordered w-full mt-1"
                        onChange={(e) =>
                            setData("bukti_pembayaran", e.target.files[0])
                        }
                    />

                    <InputError message={errors.bukti_pembayaran} />
                </div>

                <div className="form-control">
                    <InputLabel value="Kontrak Peminjaman Alat" />

                    <input
                        type="file"
                        className="file-input file-input-bordered w-full mt-1"
                        onChange={(e) =>
                            setData(
                                "kontrak_peminjaman_alat",
                                e.target.files[0]
                            )
                        }
                    />

                    <InputError message={errors.kontrak_peminjaman_alat} />
                </div>

                <div className="form-control">
                    <InputLabel value="Form Serah Terima Alat" />

                    <input
                        type="file"
                        className="file-input file-input-bordered w-full mt-1"
                        onChange={(e) =>
                            setData("form_serah_terima_alat", e.target.files[0])
                        }
                    />

                    <InputError message={errors.form_serah_terima_alat} />
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
