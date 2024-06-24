import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import BackButton from "@/Components/BackButton";
import DetailPraAnalisaTable from "./Partials/DetailPraAnalisaTable";
import DetailPelanggan from "./Partials/DetailPelanggan";
import TenderTable from "./Partials/TenderTable";
import SppcTable from "./Partials/SppcTable";
import AgendaTable from "./Partials/AgendaTable";
import { useMountEffect } from "primereact/hooks";
import { useRef } from "react";
import { Toast } from "primereact/toast";

export default function ShowPraAnalisa({ auth, detailData, flash }) {
    const title = "Detail Data Pra Analisa";

    const toast = useRef(null);

    useMountEffect(() => {
        if (flash.message) {
            toast.current.show([
                {
                    severity: "success",
                    summary: flash.message,
                },
            ]);
        }
    });

    return (
        <AuthenticatedLayout user={auth.user} titlePage={title}>
            <Head title={title} />

            <div className="py-6">
                <Toast ref={toast} />

                <div className="flex flex-col md:flex-row justify-between mb-4 md:mb-0 md:items-center">
                    <BackButton href={route("lab.pra-analisa.index")} />
                </div>

                <div className="max-w-7xl mx-auto">
                    <div className="mb-8">
                        <DetailPraAnalisaTable detailData={detailData} />
                        <DetailPelanggan
                            pelanggan={detailData.lab_pelanggans}
                        />
                        <TenderTable
                            tenders={detailData.lab_tenders}
                            kodeLab={detailData.kode}
                            noSurat={detailData.no_surat}
                        />
                        <SppcTable
                            sppc={detailData.lab_sppcs}
                            kodeLab={detailData.kode}
                        />
                        <AgendaTable
                            agenda={detailData.lab_agendas}
                            kodeLab={detailData.kode}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
