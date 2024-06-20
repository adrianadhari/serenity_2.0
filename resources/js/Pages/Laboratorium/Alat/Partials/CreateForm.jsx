import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import Spinner from "@/Components/Spinner";
import TextArea from "@/Components/TextArea";
import TextInput from "@/Components/TextInput";
import { ToolContext } from "../context/ToolContext";
import { useContext } from "react";
import { useForm } from "@inertiajs/react";
import { Dropdown } from "primereact/dropdown";
import { useState } from "react";

export default function CreateForm({ kategori_alat, status_bmn, sumber_dana }) {
    let { handleFunctions } = useContext(ToolContext);

    let {
        selectedKategoriAlatTemplate,
        kategoriAlatOptionTemplate,
        selectedStatusBMNTemplate,
        statusBMNOptionTemplate,
        selectedSumberDanaTemplate,
        sumberDanaOptionTemplate,
    } = handleFunctions;

    const { data, setData, post, processing, errors } = useForm({
        kategori_alat: "",
        nama_alat: "",
        merk: "",
        nomor_serial: "",
        deskripsi_alat: "",
        status_bmn: "",
        kode_bmn: "",
        sumber_dana: "",
        tahun_perolehan: "",
        harga_perolehan: "",
        kalibrasi_terakhir: "",
        service_terakhir: "",
        keterangan_service_terakhir: "",
    });

    const storeTool = async (e) => {
        e.preventDefault();

        post(route("lab.alat.store"));
    };

    return (
        <form onSubmit={storeTool} className="form-card">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                    <InputLabel value="Kategori Alat" />
                    <Dropdown
                        required
                        value={data.kategori_alat}
                        onChange={(e) => setData("kategori_alat", e.value)}
                        options={kategori_alat}
                        optionLabel="name"
                        placeholder="-- Pilih Kategori Alat --"
                        filter
                        checkmark={true}
                        highlightOnSelect={false}
                        valueTemplate={selectedKategoriAlatTemplate}
                        itemTemplate={kategoriAlatOptionTemplate}
                        className="border-gray"
                    />

                    <InputError message={errors.kategori_alat} />
                </div>

                <div className="form-control">
                    <InputLabel value="Nama Alat" />

                    <TextInput
                        type="text"
                        placeholder="Masukkan Nama Alat"
                        value={data.nama_alat}
                        onChange={(e) => setData("nama_alat", e.target.value)}
                    />

                    <InputError message={errors.nama_alat} />
                </div>

                <div className="form-control">
                    <InputLabel value="Merk" />

                    <TextInput
                        type="text"
                        placeholder="Masukkan Merk"
                        value={data.merk}
                        onChange={(e) => setData("merk", e.target.value)}
                    />

                    <InputError message={errors.merk} />
                </div>

                <div className="form-control">
                    <InputLabel value="Nomor Serial" />

                    <TextInput
                        type="number"
                        placeholder="Masukkan Nomor Serial"
                        value={data.nomor_serial}
                        onChange={(e) =>
                            setData("nomor_serial", e.target.value)
                        }
                    />

                    <InputError message={errors.nomor_serial} />
                </div>

                <div className="form-control">
                    <InputLabel value="Deskripsi Alat" />

                    <TextArea
                        placeholder="Masukkan Deskripsi Alat"
                        onChange={(e) =>
                            setData("deskripsi_alat", e.target.value)
                        }
                        value={data.deskripsi_alat}
                    />

                    <InputError message={errors.deskripsi_alat} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="form-control">
                        <InputLabel value="Status BMN" />

                        <Dropdown
                            required
                            value={data.status_bmn}
                            onChange={(e) => setData("status_bmn", e.value)}
                            options={status_bmn}
                            optionLabel="status_bmn"
                            placeholder="-- Pilih Status BMN --"
                            filter
                            checkmark={true}
                            highlightOnSelect={false}
                            valueTemplate={selectedStatusBMNTemplate}
                            itemTemplate={statusBMNOptionTemplate}
                            className="border-gray"
                        />

                        <InputError message={errors.status_bmn} />
                    </div>

                    <div className="form-control">
                        <InputLabel value="Kode BMN" />

                        <TextInput
                            type="text"
                            placeholder="Masukkan Kode BMN"
                            value={data.kode_bmn}
                            onChange={(e) =>
                                setData("kode_bmn", e.target.value)
                            }
                        />

                        <InputError message={errors.kode_bmn} />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="form-control">
                        <InputLabel value="Sumber Dana" />

                        <Dropdown
                            required
                            value={data.sumber_dana}
                            onChange={(e) => setData("sumber_dana", e.value)}
                            options={sumber_dana}
                            optionLabel="name"
                            placeholder="-- Pilih Sumber Dana --"
                            filter
                            checkmark={true}
                            highlightOnSelect={false}
                            valueTemplate={selectedSumberDanaTemplate}
                            itemTemplate={sumberDanaOptionTemplate}
                            className="border-gray"
                        />

                        <InputError message={errors.sumber_dana} />
                    </div>
                    <div className="form-control">
                        <InputLabel value="Harga Perolehan" />

                        <TextInput
                            type="number"
                            placeholder="Masukkan Harga Perolehan"
                            value={data.harga_perolehan}
                            onChange={(e) =>
                                setData("harga_perolehan", e.target.value)
                            }
                        />

                        <InputError message={errors.harga_perolehan} />
                    </div>
                </div>

                <div className="form-control">
                    <InputLabel value="Tahun Perolehan" />

                    <TextInput
                        type="number"
                        min="1950"
                        max="2099"
                        step="1"
                        placeholder="Masukkan Tahun Perolehan"
                        value={data.tahun_perolehan}
                        onChange={(e) =>
                            setData("tahun_perolehan", e.target.value)
                        }
                    />

                    <InputError message={errors.tahun_perolehan} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="form-control">
                        <InputLabel value="Kalibrasi Terakhir" />

                        <TextInput
                            type="date"
                            placeholder="Masukkan Kalibrasi Terakhir"
                            value={data.kalibrasi_terakhir}
                            onChange={(e) =>
                                setData("kalibrasi_terakhir", e.target.value)
                            }
                        />

                        <InputError message={errors.kalibrasi_terakhir} />
                    </div>

                    <div className="form-control">
                        <InputLabel value="Service Terakhir" />

                        <TextInput
                            type="date"
                            placeholder="Masukkan Service Terakhir"
                            value={data.service_terakhir}
                            onChange={(e) =>
                                setData("service_terakhir", e.target.value)
                            }
                        />

                        <InputError message={errors.service_terakhir} />
                    </div>
                </div>

                <div className="form-control">
                    <InputLabel value="Keterangan Service Terakhir" />

                    <TextArea
                        placeholder="Masukkan Keterangan Service Terakhir"
                        onChange={(e) =>
                            setData(
                                "keterangan_service_terakhir",
                                e.target.value
                            )
                        }
                        value={data.keterangan_service_terakhir}
                    />

                    <InputError message={errors.keterangan_service_terakhir} />
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
