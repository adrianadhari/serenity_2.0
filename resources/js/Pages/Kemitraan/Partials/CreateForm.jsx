import { useContext } from "react";
import { useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { Dropdown } from "primereact/dropdown";
import PrimaryButton from "@/Components/PrimaryButton";
import Spinner from "@/Components/Spinner";
import { PartnershipContext } from "../context/PartnershipContext";
import TextArea from "@/Components/TextArea";
import { MultiSelect } from "primereact/multiselect";

export default function CreateForm({
    kategoriOption,
    statusOption,
    institutionOption,
}) {
    let { handleFunctions } = useContext(PartnershipContext);

    let {
        selectedKategoriTemplate,
        kategoriOptionTemplate,
        selectedStatusTemplate,
        statusOptionTemplate,
    } = handleFunctions;

    const { data, setData, post, processing, errors } = useForm({
        nomor: "",
        kategori: "",
        judul: "",
        status: "",
        tgl_awal: "",
        tgl_akhir: "",
        notifikasi: "",
        dok_kerjasama: null,
        dok_roadmap: null,
        nama_penandatangan: "",
        jabatan_penandatangan: "",
        ruang_lingkup: "",
        institutions: [],
    });

    const storePartnership = async (e) => {
        e.preventDefault();

        post(route("kemitraan.store"));
    };

    return (
        <form
            onSubmit={storePartnership}
            encType="multipart/form-data"
            className="form-card"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                    <InputLabel value="Nomor Dokumen Kerjasama" />

                    <TextInput
                        type="number"
                        placeholder="Masukkan nomor dokumen kerjasama"
                        value={data.nomor}
                        onChange={(e) => setData("nomor", e.target.value)}
                    />

                    <InputError message={errors.nomor} />
                </div>

                <div className="form-control">
                    <InputLabel value="Judul" />

                    <TextInput
                        type="text"
                        placeholder="Masukkan judul"
                        value={data.judul}
                        onChange={(e) => setData("judul", e.target.value)}
                    />

                    <InputError message={errors.judul} />
                </div>

                <div className="form-control">
                    <InputLabel value="Kategori" />

                    <Dropdown
                        required
                        value={data.kategori}
                        onChange={(e) => setData("kategori", e.value)}
                        options={kategoriOption}
                        optionLabel="name"
                        placeholder="-- Pilih Kategori --"
                        filter
                        checkmark={true}
                        highlightOnSelect={false}
                        valueTemplate={selectedKategoriTemplate}
                        itemTemplate={kategoriOptionTemplate}
                        className="border-gray"
                    />

                    <InputError message={errors.kategori} />
                </div>

                <div className="form-control">
                    <InputLabel value="Status" />

                    <Dropdown
                        required
                        value={data.status}
                        onChange={(e) => setData("status", e.value)}
                        options={statusOption}
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control">
                        <InputLabel value="Tanggal Awal Kerjasama" />

                        <TextInput
                            type="date"
                            value={data.tgl_awal}
                            onChange={(e) =>
                                setData("tgl_awal", e.target.value)
                            }
                        />

                        <InputError message={errors.tgl_awal} />
                    </div>

                    <div className="form-control">
                        <InputLabel value="Tanggal Akhir Kerjasama" />

                        <TextInput
                            type="date"
                            value={data.tgl_akhir}
                            onChange={(e) =>
                                setData("tgl_akhir", e.target.value)
                            }
                        />

                        <InputError message={errors.tgl_akhir} />
                    </div>
                </div>

                <div className="form-control">
                    <InputLabel value="Notifikasi (Hari Kalender)" />

                    <TextInput
                        type="number"
                        placeholder="Masukkan notifikasi"
                        value={data.notifikasi}
                        onChange={(e) => setData("notifikasi", e.target.value)}
                    />

                    <InputError message={errors.notifikasi} />
                </div>

                <div className="form-control">
                    <InputLabel value="Dokumen Kerjasama" />

                    <input
                        type="file"
                        className="file-input file-input-bordered w-full mt-1"
                        onChange={(e) =>
                            setData("dok_kerjasama", e.target.files[0])
                        }
                    />

                    <InputError message={errors.dok_kerjasama} />
                </div>

                <div className="form-control">
                    <InputLabel value="Dokumen Roadmap Kerjasama" />

                    <input
                        type="file"
                        className="file-input file-input-bordered w-full mt-1"
                        onChange={(e) =>
                            setData("dok_roadmap", e.target.files[0])
                        }
                    />

                    <InputError message={errors.dok_roadmap} />
                </div>

                <div className="form-control">
                    <InputLabel value="Nama Pejabat Penandatangan" />

                    <TextInput
                        type="text"
                        placeholder="Masukkan nama"
                        value={data.nama_penandatangan}
                        onChange={(e) =>
                            setData("nama_penandatangan", e.target.value)
                        }
                    />

                    <InputError message={errors.nama_penandatangan} />
                </div>

                <div className="form-control">
                    <InputLabel value="Jabatan Penandatangan" />

                    <TextInput
                        type="text"
                        placeholder="Masukkan jabatan"
                        value={data.jabatan_penandatangan}
                        onChange={(e) =>
                            setData("jabatan_penandatangan", e.target.value)
                        }
                    />

                    <InputError message={errors.jabatan_penandatangan} />
                </div>

                <div className="form-control">
                    <InputLabel value="Ruang Lingkup" />

                    <TextArea
                        placeholder="Masukkan ruang lingkup"
                        onChange={(e) =>
                            setData("ruang_lingkup", e.target.value)
                        }
                        value={data.ruang_lingkup}
                    />

                    <InputError message={errors.ruang_lingkup} />
                </div>

                <div className="form-control">
                    <InputLabel value="Institusi" />

                    <MultiSelect
                        required
                        value={data.institutions}
                        options={institutionOption}
                        onChange={(e) => setData("institutions", e.value)}
                        optionLabel="nama"
                        filter
                        placeholder="Pilih Institusi"
                        display="chip"
                        className="border-gray"
                    />

                    <InputError message={errors.institutions} />
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
