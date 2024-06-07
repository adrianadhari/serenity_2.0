import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import BackButton from "@/Components/BackButton";
import DetailTable from "./DetailTable";
import DaftarForm from "./DaftarForm";

export default function Detail({ activity, auth, tipe }) {
    const title = activity.judul_kegiatan;

    return (
        <AuthenticatedLayout user={auth.user} titlePage={title}>
            <Head title={title} />

            <div className="py-6">
                <BackButton href={route("kegiatan.aktif")} />

                <div className="max-w-7xl mx-auto">
                    <DetailTable activity={activity} />
                    <DaftarForm tipe={tipe} activityId={activity.id} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
