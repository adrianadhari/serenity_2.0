import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import Spinner from "@/Components/Spinner";
import TextInput from "@/Components/TextInput";
import { PascaAnalyticContext } from "../context/PascaAnalyticContext";
import { useContext } from "react";
import { useForm } from "@inertiajs/react";
import { Dropdown } from "primereact/dropdown";

export default function CreateForm({ kode_pra_analisaa }) {
    let { handleFunctions } = useContext(PascaAnalyticContext);

    let { selectedKodePraAnalisaTemplate, kodePraAnalisaOptionTemplate } =
        handleFunctions;

    const { data, setData, post, processing, errors } = useForm({
        tanggal_pasca_analisa: "",
        invoice_pelunasan: "",
        bukti_pembayaran: "",
        lembar_hasil_uji: "",
        kode_pra_analisa: "",
    });

    const storePascaAnalytic = async (e) => {
        e.preventDefault();

        post(route("lab.pasca-analisa.store"));
    };

    return (
        <form onSubmit={storePascaAnalytic} className="form-card">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                    <InputLabel value="Kode Pra Analisa" />
                    <Dropdown
                        required
                        value={data.kode_pra_analisa}
                        onChange={(e) => setData("kode_pra_analisa", e.value)}
                        options={kode_pra_analisaa}
                        optionLabel="kode_pra_analisa"
                        placeholder="-- Pilih Kode Pra Analisa --"
                        filter
                        checkmark={true}
                        highlightOnSelect={false}
                        valueTemplate={selectedKodePraAnalisaTemplate}
                        itemTemplate={kodePraAnalisaOptionTemplate}
                        className="border-gray"
                    />

                    <InputError message={errors.kode_pra_analisa} />
                </div>

                <div className="form-control">
                    <InputLabel value="Tanggal Penertiban Hasil Uji" />

                    <TextInput
                        type="date"
                        onChange={(e) =>
                            setData("tanggal_pasca_analisa", e.target.value)
                        }
                        value={data.tanggal_pasca_analisa}
                    />

                    <InputError message={errors.tanggal_pasca_analisa} />
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
                    <InputLabel value="Lembar Hasil Uji" />

                    <input
                        type="file"
                        className="file-input file-input-bordered w-full mt-1"
                        onChange={(e) =>
                            setData("lembar_hasil_uji", e.target.files[0])
                        }
                    />

                    <InputError message={errors.lembar_hasil_uji} />
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
