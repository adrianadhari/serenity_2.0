import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import BackButton from "@/Components/BackButton";
import DaftarForm from "./Partials/DaftarForm";
import DetailKegiatanTable from "./Partials/DetailKegiatanTable";

export default function DaftarKegiatan({ activity, auth, tipe }) {
    const title = activity.judul_kegiatan;

    return (
        <AuthenticatedLayout user={auth.user} titlePage={title}>
            <Head title={title} />

            <div className="py-6">
                <BackButton href={route("kegiatan.aktif")} />

                <div className="max-w-7xl mx-auto">
                    <DetailKegiatanTable activity={activity} />
                    <DaftarForm tipe={tipe} activityId={activity.id} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
