import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import BackButton from "@/Components/BackButton";
import { KegiatanProvider } from "./context/KegiatanContext";
import EditForm from "./Partials/EditForm";

export default function EditKegiatan({
    auth,
    jenis_kegiatan,
    semester,
    flagship,
    moda,
    status_kegiatan,
    kegiatanDetail,
}) {
    const title = "Edit Kegiatan";

    return (
        <AuthenticatedLayout user={auth.user} titlePage={title}>
            <Head title={title} />

            <KegiatanProvider>
                <div className="py-4">
                    <BackButton href={route("kegiatan.index")} />

                    <EditForm
                        jenisKegiatanOption={jenis_kegiatan}
                        semesterOption={semester}
                        flagship={flagship}
                        modaOption={moda}
                        statusKegiatanOption={status_kegiatan}
                        kegiatanDetail={kegiatanDetail}
                    />
                </div>
            </KegiatanProvider>
        </AuthenticatedLayout>
    );
}
