import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { ResearchProvider } from "./context/ResearchContext";
import CreateForm from "./Partials/CreateForm";
import BackButton from "@/Components/BackButton";

export default function CreateResearch({
    auth,
    kategori_penelitian,
    jenis_flagship,
    area_penelitian,
    status_penelitian,
    institusi,
    publikasi,
}) {
    const title = "Tambah Penelitian";

    return (
        <AuthenticatedLayout user={auth.user} titlePage={title}>
            <Head title={title} />

            <ResearchProvider>
                <div className="py-4">
                    <BackButton href={route("penelitian.index")} />

                    <CreateForm
                        kategori_penelitian={kategori_penelitian}
                        jenis_flagship={jenis_flagship}
                        area_penelitian={area_penelitian}
                        status_penelitian={status_penelitian}
                        institusi={institusi}
                        publikasi={publikasi}
                    />
                </div>
            </ResearchProvider>
        </AuthenticatedLayout>
    );
}
