import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import Spinner from "@/Components/Spinner";
import TextInput from "@/Components/TextInput";
import { EmployeeContext } from "../context/EmployeeContext";
import { useContext } from "react";
import { useForm } from "@inertiajs/react";
import { Dropdown } from "primereact/dropdown";

export default function CreateForm({ nama_pelatihan }) {
    let { handleFunctions } = useContext(EmployeeContext);

    let { selectedNamaPelatihanTemplate, namaPelatihanOptionTemplate } =
        handleFunctions;

    const { data, setData, post, processing, errors } = useForm({
        nama_peserta: "",
        nik_peserta: "",
        jabatan_saat_pelatihan: "",
        unit_saat_pelatihan: "",
        jabatan_saat_ini: "",
        unit_saat_ini: "",
        masa_berlaku_sertifikat: "",
        masa_berakhir_sertifikat: "",
        link_sertifikat: "",
        nama_pelatihan: "",
    });

    const storeEmployee = async (e) => {
        e.preventDefault();

        post(route("pegawai.store"));
    };

    return (
        <form onSubmit={storeEmployee} className="form-card">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                    <InputLabel value="Nama Pelatihan" />

                    <Dropdown
                        required
                        value={data.nama_pelatihan}
                        onChange={(e) => setData("nama_pelatihan", e.value)}
                        options={nama_pelatihan}
                        optionLabel="name"
                        placeholder="-- Pilih Nama Pelatihan --"
                        filter
                        checkmark={true}
                        highlightOnSelect={false}
                        valueTemplate={selectedNamaPelatihanTemplate}
                        itemTemplate={namaPelatihanOptionTemplate}
                        className="border-gray"
                    />

                    <InputError message={errors.nama_pelatihan} />
                </div>
                <div className="form-control">
                    <InputLabel value="Nama Peserta" />

                    <TextInput
                        type="text"
                        placeholder="Masukkan Nama Peserta"
                        onChange={(e) =>
                            setData("nama_peserta", e.target.value)
                        }
                        value={data.nama_peserta}
                    />

                    <InputError message={errors.nama_peserta} />
                </div>

                <div className="form-control">
                    <InputLabel value="NIK Peserta" />

                    <TextInput
                        type="number"
                        placeholder="Masukkan NIK Peserta"
                        onChange={(e) => setData("nik_peserta", e.target.value)}
                        value={data.nik_peserta}
                    />

                    <InputError message={errors.nik_peserta} />
                </div>

                <div className="form-control">
                    <InputLabel value="Jabatan Saat Pelatihan" />

                    <TextInput
                        type="text"
                        placeholder="Masukkan Jabatan Saat Pelatihan"
                        onChange={(e) =>
                            setData("jabatan_saat_pelatihan", e.target.value)
                        }
                        value={data.jabatan_saat_pelatihan}
                    />

                    <InputError message={errors.jabatan_saat_pelatihan} />
                </div>

                <div className="form-control">
                    <InputLabel value="Unit Saat Pelatihan" />

                    <TextInput
                        type="text"
                        placeholder="Masukkan Unit Saat Pelatihan"
                        onChange={(e) =>
                            setData("unit_saat_pelatihan", e.target.value)
                        }
                        value={data.unit_saat_pelatihan}
                    />

                    <InputError message={errors.unit_saat_pelatihan} />
                </div>

                <div className="form-control">
                    <InputLabel value="Jabatan Saat Ini" />

                    <TextInput
                        type="text"
                        placeholder="Masukkan Jabatan Saat Ini"
                        onChange={(e) =>
                            setData("jabatan_saat_ini", e.target.value)
                        }
                        value={data.jabatan_saat_ini}
                    />

                    <InputError message={errors.jabatan_saat_ini} />
                </div>

                <div className="form-control">
                    <InputLabel value="Unit Saat Ini" />

                    <TextInput
                        type="text"
                        placeholder="Masukkan Unit Saat Ini"
                        onChange={(e) =>
                            setData("unit_saat_ini", e.target.value)
                        }
                        value={data.unit_saat_ini}
                    />

                    <InputError message={errors.unit_saat_ini} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="form-control">
                        <InputLabel value="Masa Berlaku Sertifikat (Sejak)" />

                        <TextInput
                            type="date"
                            placeholder="Masukkan Masa Berlaku Sertifikat (Sejak)"
                            onChange={(e) =>
                                setData(
                                    "masa_berlaku_sertifikat",
                                    e.target.value
                                )
                            }
                            value={data.masa_berlaku_sertifikat}
                        />

                        <InputError message={errors.masa_berlaku_sertifikat} />
                    </div>

                    <div className="form-control">
                        <InputLabel value="Masa Berlaku Sertifikat (Hingga)" />

                        <TextInput
                            type="date"
                            placeholder="Masukkan Masa Berlaku Sertifikat (Hingga)"
                            onChange={(e) =>
                                setData(
                                    "masa_berakhir_sertifikat",
                                    e.target.value
                                )
                            }
                            value={data.masa_berakhir_sertifikat}
                        />

                        <InputError message={errors.masa_berakhir_sertifikat} />
                    </div>
                </div>

                <div className="form-control">
                    <InputLabel value="Link Sertifikat" />

                    <TextInput
                        type="text"
                        placeholder="Masukkan Link Sertifikat"
                        onChange={(e) =>
                            setData("link_sertifikat", e.target.value)
                        }
                        value={data.link_sertifikat}
                    />

                    <InputError message={errors.link_sertifikat} />
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
