import { useContext } from "react";
import { ResearchContext } from "../context/ResearchContext";
import { useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { Dropdown } from "primereact/dropdown";
import PrimaryButton from "@/Components/PrimaryButton";
import Spinner from "@/Components/Spinner";

export default function CreateForm({
    kategori_penelitian,
    jenis_flagship,
    area_penelitian,
    status_penelitian,
    institusi,
    publikasi,
}) {
    let { handleFunctions } = useContext(ResearchContext);

    let {
        selectedKategoriPenelitianTemplate,
        kategoriPenelitianOptionTemplate,
        selectedJenisFlagshipTemplate,
        jenisFlagshipOptionTemplate,
        selectedAreaPenelitianTemplate,
        areaPenelitianOptionTemplate,
        selectedStatusPenelitianTemplate,
        statusPenelitianOptionTemplate,
        selectedInstitusiTemplate,
        institusiOptionTemplate,
        selectedPublikasiTemplate,
        publikasiOptionTemplate,
    } = handleFunctions;

    const { data, setData, post, processing, errors } = useForm({
        judul_penelitian: "",
        kategori_penelitian: "",
        jenis_flagship: "",
        area_penelitian: "",
        subjek_penelitian: "",
        nama_area_flagship: "",
        lokasi_penelitian: "",
        nama_penyelia: "",
        jenis_hibah: "",
        besaran_hibah: "",
        nama_funding: "",
        nama_peneliti: "",
        sub_area_penelitian: "",
        author: "",
        bulan_dipublikasi: "",
        doi: "",
        status_penelitian: "",
        institusi: "",
        publikasi: "",
    });

    const storeResearch = async (e) => {
        e.preventDefault();

        post(route("penelitian.store"));
    };

    return (
        <form onSubmit={storeResearch} className="form-card">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                    <InputLabel value="Institusi" />

                    <Dropdown
                        required
                        value={data.institusi}
                        onChange={(e) => setData("institusi", e.value)}
                        options={institusi}
                        optionLabel="institusi"
                        placeholder="-- Pilih Institusi --"
                        filter
                        checkmark={true}
                        highlightOnSelect={false}
                        valueTemplate={selectedInstitusiTemplate}
                        itemTemplate={institusiOptionTemplate}
                        className="border-gray"
                    />

                    <InputError message={errors.institusi} />
                </div>
                <div className="form-control">
                    <InputLabel value="Publikasi" />

                    <Dropdown
                        required
                        value={data.publikasi}
                        onChange={(e) => setData("publikasi", e.value)}
                        options={publikasi}
                        optionLabel="publikasi"
                        placeholder="-- Pilih Judul Publikasi --"
                        filter
                        checkmark={true}
                        highlightOnSelect={false}
                        valueTemplate={selectedPublikasiTemplate}
                        itemTemplate={publikasiOptionTemplate}
                        className="border-gray"
                    />

                    <InputError message={errors.publikasi} />
                </div>
                <div className="form-control">
                    <InputLabel value="Judul Penelitian" />
                    <TextInput
                        type="text"
                        placeholder="Masukkan judul penelitian"
                        value={data.judul_penelitian}
                        onChange={(e) =>
                            setData("judul_penelitian", e.target.value)
                        }
                    />

                    <InputError message={errors.judul_penelitian} />
                </div>
                <div className="form-control">
                    <InputLabel value="Kategori Penelitian" />

                    <Dropdown
                        required
                        value={data.kategori_penelitian}
                        onChange={(e) =>
                            setData("kategori_penelitian", e.value)
                        }
                        options={kategori_penelitian}
                        optionLabel="Kategori Penelitian"
                        placeholder="-- Pilih Kategori Penelitian --"
                        filter
                        checkmark={true}
                        highlightOnSelect={false}
                        valueTemplate={selectedKategoriPenelitianTemplate}
                        itemTemplate={kategoriPenelitianOptionTemplate}
                        className="border-gray"
                    />

                    <InputError message={errors.kategori_penelitian} />
                </div>
                <div className="form-control">
                    <InputLabel value="Jenis Flagship" />

                    <Dropdown
                        required
                        value={data.jenis_flagship}
                        onChange={(e) => setData("jenis_flagship", e.value)}
                        options={jenis_flagship}
                        optionLabel="Jenis Flagship"
                        placeholder="-- Pilih Jenis Flagship --"
                        filter
                        checkmark={true}
                        highlightOnSelect={false}
                        valueTemplate={selectedJenisFlagshipTemplate}
                        itemTemplate={jenisFlagshipOptionTemplate}
                        className="border-gray"
                    />

                    <InputError message={errors.jenis_flagship} />
                </div>
                <div className="form-control">
                    <InputLabel value="Area Penelitian" />

                    <Dropdown
                        required
                        value={data.area_penelitian}
                        onChange={(e) => setData("area_penelitian", e.value)}
                        options={area_penelitian}
                        optionLabel="Area Penelitian"
                        placeholder="-- Pilih Area Penelitian --"
                        filter
                        checkmark={true}
                        highlightOnSelect={false}
                        valueTemplate={selectedAreaPenelitianTemplate}
                        itemTemplate={areaPenelitianOptionTemplate}
                        className="border-gray"
                    />

                    <InputError message={errors.area_penelitian} />
                </div>
                <div className="form-control">
                    <InputLabel value="Subjek Penelitian" />
                    <TextInput
                        type="text"
                        placeholder="Masukkan subjek penelitian"
                        value={data.subjek_penelitian}
                        onChange={(e) =>
                            setData("subjek_penelitian", e.target.value)
                        }
                    />

                    <InputError message={errors.subjek_penelitian} />
                </div>
                <div className="form-control">
                    <InputLabel value="Nama Area Flagship" />
                    <TextInput
                        type="text"
                        placeholder="Masukkan nama area flagship"
                        value={data.nama_area_flagship}
                        onChange={(e) =>
                            setData("nama_area_flagship", e.target.value)
                        }
                    />

                    <InputError message={errors.nama_area_flagship} />
                </div>

                <div className="form-control">
                    <InputLabel value="Lokasi Penelitian" />
                    <TextInput
                        type="text"
                        placeholder="Masukkan lokasi penelitian"
                        value={data.lokasi_penelitian}
                        onChange={(e) =>
                            setData("lokasi_penelitian", e.target.value)
                        }
                    />

                    <InputError message={errors.lokasi_penelitian} />
                </div>
                <div className="form-control">
                    <InputLabel value="Nama Penyelia" />
                    <TextInput
                        type="text"
                        placeholder="Masukkan nama penyelia"
                        value={data.nama_penyelia}
                        onChange={(e) =>
                            setData("nama_penyelia", e.target.value)
                        }
                    />

                    <InputError message={errors.nama_penyelia} />
                </div>
                <div className="form-control">
                    <InputLabel value="Jenis Hibah" />
                    <TextInput
                        type="text"
                        placeholder="Masukkan jenis hibah"
                        value={data.jenis_hibah}
                        onChange={(e) => setData("jenis_hibah", e.target.value)}
                    />

                    <InputError message={errors.jenis_hibah} />
                </div>
                <div className="form-control">
                    <InputLabel value="Besaran Hibah" />
                    <TextInput
                        type="text"
                        placeholder="Masukkan besaran hibah"
                        value={data.besaran_hibah}
                        onChange={(e) =>
                            setData("besaran_hibah", e.target.value)
                        }
                    />

                    <InputError message={errors.besaran_hibah} />
                </div>
                <div className="form-control">
                    <InputLabel value="Nama Funding" />
                    <TextInput
                        type="text"
                        placeholder="Masukkan nama funding"
                        value={data.nama_funding}
                        onChange={(e) =>
                            setData("nama_funding", e.target.value)
                        }
                    />

                    <InputError message={errors.nama_funding} />
                </div>
                <div className="form-control">
                    <InputLabel value="Nama Peneliti" />
                    <TextInput
                        type="text"
                        placeholder="Masukkan nama peneliti"
                        value={data.nama_peneliti}
                        onChange={(e) =>
                            setData("nama_peneliti", e.target.value)
                        }
                    />

                    <InputError message={errors.nama_peneliti} />
                </div>
                <div className="form-control">
                    <InputLabel value="Sub Area Penelitian" />
                    <TextInput
                        type="text"
                        placeholder="Masukkan sub area penelitian"
                        value={data.sub_area_penelitian}
                        onChange={(e) =>
                            setData("sub_area_penelitian", e.target.value)
                        }
                    />

                    <InputError message={errors.sub_area_penelitian} />
                </div>
                <div className="form-control">
                    <InputLabel value="Author" />
                    <TextInput
                        type="text"
                        placeholder="Masukkan author"
                        value={data.author}
                        onChange={(e) => setData("author", e.target.value)}
                    />

                    <InputError message={errors.author} />
                </div>
                <div className="form-control">
                    <InputLabel value="Bulan Dipublikasi" />
                    <TextInput
                        type="text"
                        placeholder="Masukkan bulan dipublikasi"
                        value={data.bulan_dipublikasi}
                        onChange={(e) =>
                            setData("bulan_dipublikasi", e.target.value)
                        }
                    />

                    <InputError message={errors.bulan_dipublikasi} />
                </div>
                <div className="form-control">
                    <InputLabel value="DOI" />
                    <TextInput
                        type="text"
                        placeholder="Masukkan DOI"
                        value={data.doi}
                        onChange={(e) => setData("doi", e.target.value)}
                    />

                    <InputError message={errors.doi} />
                </div>
                <div className="form-control">
                    <InputLabel value="Status Penelitian" />

                    <Dropdown
                        required
                        value={data.status_penelitian}
                        onChange={(e) => setData("status_penelitian", e.value)}
                        options={status_penelitian}
                        optionLabel="Status Penelitian"
                        placeholder="-- Pilih Status Penelitian --"
                        filter
                        checkmark={true}
                        highlightOnSelect={false}
                        valueTemplate={selectedStatusPenelitianTemplate}
                        itemTemplate={statusPenelitianOptionTemplate}
                        className="border-gray"
                    />

                    <InputError message={errors.status_penelitian} />
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
