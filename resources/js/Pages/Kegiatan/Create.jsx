import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import BackButton from "@/Components/BackButton";
import { KegiatanProvider } from "./context/KegiatanContext";
import CreateForm from "./Partials/CreateForm";

export default function CreateKegiatan({
    auth,
    jenis_kegiatan,
    semester,
    flagship,
    moda,
    status_kegiatan,
}) {
    const title = "Tambah Kegiatan";

    return (
        <AuthenticatedLayout user={auth.user} titlePage={title}>
            <Head title={title} />

            <KegiatanProvider>
                <div className="py-4">
                    <BackButton href={route("kegiatan.index")} />

                    <CreateForm
                        jenis_kegiatan={jenis_kegiatan}
                        semester={semester}
                        flagship={flagship}
                        moda={moda}
                        status_kegiatan={status_kegiatan}
                    />
                </div>
            </KegiatanProvider>
        </AuthenticatedLayout>
    );
}
