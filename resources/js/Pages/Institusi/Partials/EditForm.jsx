import { useContext } from "react";
import { InstitutionContext } from "../context/InstitutionContext";
import { useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { Dropdown } from "primereact/dropdown";
import PrimaryButton from "@/Components/PrimaryButton";
import TextArea from "@/Components/TextArea";
import Spinner from "@/Components/Spinner";

export default function EditForm({
    negaraInstitusi,
    jenisInstitusi,
    grupInstitusi,
    institutionDetail,
}) {
    let { handleFunctions } = useContext(InstitutionContext);

    let {
        selectedNegaraTemplate,
        negaraOptionTemplate,
        selectedGrupTemplate,
        grupOptionTemplate,
        selectedJenisTemplate,
        jenisOptionTemplate,
    } = handleFunctions;

    let { nama, negara, grup, jenis, alamat, telp, email } = institutionDetail;

    const { data, setData, patch, processing, errors } = useForm({
        nama,
        negara,
        grup,
        jenis,
        alamat,
        telp,
        email,
    });

    const updateInstitution = async (e) => {
        e.preventDefault();

        patch(route("sekolah.update", institutionDetail.kode));
    };

    return (
        <form onSubmit={updateInstitution} className="form-card">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                    <InputLabel value="Nama Institusi" />

                    <TextInput
                        type="text"
                        placeholder="Masukkan nama institusi"
                        value={data.nama}
                        onChange={(e) => setData("nama", e.target.value)}
                    />

                    <InputError message={errors.nama} />
                </div>

                <div className="form-control">
                    <InputLabel value="Negara Institusi" />

                    <Dropdown
                        required
                        value={data.negara}
                        onChange={(e) => setData("negara", e.value)}
                        options={negaraInstitusi}
                        optionLabel="name"
                        placeholder="-- Pilih Negara --"
                        filter
                        checkmark={true}
                        highlightOnSelect={false}
                        valueTemplate={selectedNegaraTemplate}
                        itemTemplate={negaraOptionTemplate}
                        className="border-gray"
                    />

                    <InputError message={errors.negara} />
                </div>

                <div className="form-control">
                    <InputLabel value="Grup Institusi" />

                    <Dropdown
                        required
                        value={data.grup}
                        onChange={(e) => setData("grup", e.value)}
                        options={grupInstitusi}
                        optionLabel="name"
                        placeholder="-- Pilih Grup Institusi --"
                        filter
                        checkmark={true}
                        highlightOnSelect={false}
                        valueTemplate={selectedGrupTemplate}
                        itemTemplate={grupOptionTemplate}
                        className="border-gray"
                    />

                    <InputError message={errors.grup} />
                </div>

                <div className="form-control">
                    <InputLabel value="Jenis Institusi" />

                    <Dropdown
                        required
                        value={data.jenis}
                        onChange={(e) => setData("jenis", e.value)}
                        options={jenisInstitusi}
                        optionLabel="name"
                        placeholder="-- Pilih Jenis Institusi --"
                        filter
                        checkmark={true}
                        highlightOnSelect={false}
                        valueTemplate={selectedJenisTemplate}
                        itemTemplate={jenisOptionTemplate}
                        className="border-gray"
                    />

                    <InputError message={errors.jenis} />
                </div>

                <div className="form-control">
                    <InputLabel value="Email Institusi" />

                    <TextInput
                        type="email"
                        placeholder="Masukkan email institusi"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                    />

                    <InputError message={errors.email} />
                </div>

                <div className="form-control">
                    <InputLabel value="Telepon Institusi" />

                    <TextInput
                        type="number"
                        placeholder="Masukkan telepon institusi"
                        value={data.telp}
                        onChange={(e) => setData("telp", e.target.value)}
                    />

                    <InputError message={errors.telp} />
                </div>

                <div className="form-control">
                    <InputLabel value="Alamat" />

                    <TextArea
                        placeholder="Masukkan alamat institusi"
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
