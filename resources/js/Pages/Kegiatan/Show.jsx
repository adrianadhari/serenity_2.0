import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import BackButton from "@/Components/BackButton";
import DetailKegiatanTable from "./Partials/DetailKegiatanTable";
import DetailPesertaTable from "./Partials/PesertaTable";

export default function ShowKegiatan({ auth, participants, activity }) {
    let routeBack = activity.status == "Rencana" ? "aktif" : "index";

    const title = "Detail Kegiatan";

    return (
        <AuthenticatedLayout user={auth.user} titlePage={title}>
            <Head title={title} />

            <div className="py-6">
                <BackButton href={route(`kegiatan.${routeBack}`)} />

                <div className="max-w-7xl mx-auto">
                    <div className="mb-8">
                        <DetailKegiatanTable activity={activity} />
                    </div>
                    <DetailPesertaTable participants={participants} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
