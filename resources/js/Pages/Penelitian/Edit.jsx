import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { ResearchProvider } from "./context/ResearchContext";
import EditForm from "./Partials/EditForm";
import BackButton from "@/Components/BackButton";

export default function EditResearch({
    auth,
    kategori_penelitian,
    jenis_flagship,
    area_penelitian,
    status_penelitian,
    institusi,
    publikasi,
    researchDetail,
}) {
    const title = "Edit Penelitian";

    return (
        <AuthenticatedLayout user={auth.user} titlePage={title}>
            <Head title={title} />

            <ResearchProvider>
                <div className="py-4">
                    <BackButton href={route("penelitian.index")} />

                    <EditForm
                        kategori_penelitiann={kategori_penelitian}
                        jenis_flagshipp={jenis_flagship}
                        area_penelitiann={area_penelitian}
                        status_penelitiann={status_penelitian}
                        institusi={institusi}
                        publikasi={publikasi}
                        researchDetail={researchDetail}
                    />
                </div>
            </ResearchProvider>
        </AuthenticatedLayout>
    );
}
