import { useContext } from "react";
import { AnalyticContext } from "../context/AnalyticContext";
import { useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { Dropdown } from "primereact/dropdown";
import PrimaryButton from "@/Components/PrimaryButton";
import Spinner from "@/Components/Spinner";

export default function EditForm({
    analyticDetail,
    kode_pra_analisaa
}) {
    let { handleFunctions } = useContext(AnalyticContext);

    let { selectedKodePraAnalisaTemplate, kodePraAnalisaOptionTemplate } =
        handleFunctions;

    let {
        kode,
        tanggal_analisa,
    } = analyticDetail;
 const { data, setData, post, processing, errors } = useForm({
        tanggal_analisa,
        surat_perintah_kerja: null,
        logbook_hasil: null,
        jaminan_mutu: null,
        estimasi_ketidakpastian_pengukuran: null,
        kode_pra_analisa: analyticDetail.lab_pra_analisa.kode,
        _method: "PUT",
    });

    const updateAnalytic = async (e) => {
        e.preventDefault();

        post(route("lab.analisa.update", kode));
    };

    return (
        <form onSubmit={updateAnalytic} className="form-card">
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
                    <InputLabel value="Tanggal Analisa" />

                    <TextInput
                        type="date"
                        onChange={(e) =>
                            setData("tanggal_analisa", e.target.value)
                        }
                        value={data.tanggal_analisa}
                    />

                    <InputError message={errors.tanggal_analisa} />
                </div>

                <div className="form-control">
                    <InputLabel value="Surat Perintah Kerja" />

                    <input
                        type="file"
                        className="file-input file-input-bordered w-full mt-1"
                        onChange={(e) =>
                            setData("surat_perintah_kerja", e.target.files[0])
                        }
                    />

                    <InputError message={errors.surat_perintah_kerja} />
                </div>

                <div className="form-control">
                    <InputLabel value="Logbook Hasil" />

                    <input
                        type="file"
                        className="file-input file-input-bordered w-full mt-1"
                        onChange={(e) =>
                            setData("logbook_hasil", e.target.files[0])
                        }
                    />

                    <InputError message={errors.logbook_hasil} />
                </div>

                <div className="form-control">
                    <InputLabel value="Jaminan Mutu" />

                    <input
                        type="file"
                        className="file-input file-input-bordered w-full mt-1"
                        onChange={(e) =>
                            setData("jaminan_mutu", e.target.files[0])
                        }
                    />

                    <InputError message={errors.jaminan_mutu} />
                </div>

                <div className="form-control">
                    <InputLabel value="Estimasi Ketidakpastian Pengukuran" />

                    <input
                        type="file"
                        className="file-input file-input-bordered w-full mt-1"
                        onChange={(e) =>
                            setData(
                                "estimasi_ketidakpastian_pengukuran",
                                e.target.files[0]
                            )
                        }
                    />

                    <InputError
                        message={errors.estimasi_ketidakpastian_pengukuran}
                    />
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
