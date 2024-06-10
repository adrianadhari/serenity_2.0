import { useContext } from "react";
import { useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { Dropdown } from "primereact/dropdown";
import PrimaryButton from "@/Components/PrimaryButton";
import Spinner from "@/Components/Spinner";
import { PelangganContext } from "../context/PelangganContext";
import TextArea from "@/Components/TextArea";

export default function EditForm({ gender, agency, customerDetail }) {
    let { handleFunctions } = useContext(PelangganContext);

    let {
        selectedJenisKelaminTemplate,
        jenisKelaminOptionTemplate,
        selectedAgencyTemplate,
        agencyOptionTemplate,
    } = handleFunctions;

    let {
        instansi,
        nama_instansi,
        nama_pelanggan,
        alamat,
        telp,
        tgl_lahir,
        jenis_kelamin,
        email,
    } = customerDetail;

    const { data, setData, patch, processing, errors } = useForm({
        instansi,
        nama_instansi,
        nama_pelanggan,
        alamat,
        telp,
        tgl_lahir,
        jenis_kelamin,
        email,
    });

    const updatePelanggan = async (e) => {
        e.preventDefault();

        patch(route("lab.pelanggan.update", customerDetail.kode));
    };

    return (
        <form onSubmit={updatePelanggan} className="form-card">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                    <InputLabel value="Instansi" />

                    <Dropdown
                        required
                        value={data.instansi}
                        onChange={(e) => setData("instansi", e.value)}
                        options={agency}
                        optionLabel="name"
                        placeholder="-- Pilih Instansi --"
                        filter
                        checkmark={true}
                        highlightOnSelect={false}
                        valueTemplate={selectedAgencyTemplate}
                        itemTemplate={agencyOptionTemplate}
                        className="border-gray"
                    />

                    <InputError message={errors.instansi} />
                </div>

                <div className="form-control">
                    <InputLabel value="Nama Instansi" />

                    <TextInput
                        type="text"
                        placeholder="Masukkan nama instansi"
                        value={data.nama_instansi}
                        onChange={(e) =>
                            setData("nama_instansi", e.target.value)
                        }
                    />

                    <InputError message={errors.nama_instansi} />
                </div>

                <div className="form-control">
                    <InputLabel value="Nama Pelanggan" />

                    <TextInput
                        type="text"
                        placeholder="Masukkan nama pelanggan"
                        value={data.nama_pelanggan}
                        onChange={(e) =>
                            setData("nama_pelanggan", e.target.value)
                        }
                    />

                    <InputError message={errors.nama_pelanggan} />
                </div>

                <div className="form-control">
                    <InputLabel value="Tanggal Lahir" />

                    <TextInput
                        type="date"
                        value={data.tgl_lahir}
                        onChange={(e) => setData("tgl_lahir", e.target.value)}
                    />

                    <InputError message={errors.tgl_lahir} />
                </div>

                <div className="form-control">
                    <InputLabel value="Jenis Kelamin" />

                    <Dropdown
                        required
                        value={data.jenis_kelamin}
                        onChange={(e) => setData("jenis_kelamin", e.value)}
                        options={gender}
                        optionLabel="name"
                        placeholder="-- Pilih Jenis Kelamin --"
                        filter
                        checkmark={true}
                        highlightOnSelect={false}
                        valueTemplate={selectedJenisKelaminTemplate}
                        itemTemplate={jenisKelaminOptionTemplate}
                        className="border-gray"
                    />

                    <InputError message={errors.jenis_kelamin} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="form-control">
                        <InputLabel value="Email" />

                        <TextInput
                            type="email"
                            placeholder="Masukkan email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                        />

                        <InputError message={errors.email} />
                    </div>

                    <div className="form-control">
                        <InputLabel value="Telepon" />

                        <TextInput
                            type="number"
                            placeholder="Masukkan telepon"
                            value={data.telp}
                            onChange={(e) => setData("telp", e.target.value)}
                        />

                        <InputError message={errors.telp} />
                    </div>
                </div>

                <div className="form-control">
                    <InputLabel value="Alamat" />

                    <TextArea
                        placeholder="Masukkan alamat"
                        onChange={(e) => setData("alamat", e.target.value)}
                        value={data.alamat}
                    />

                    <InputError message={errors.alamat} />
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
