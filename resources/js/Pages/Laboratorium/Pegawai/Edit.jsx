import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import BackButton from "@/Components/BackButton";
import { PegawaiProvider } from "./context/PegawaiContext";
import EditForm from "./Partials/EditForm";

export default function EditPelanggan({
    auth,
    gender,
    pendidikan,
    pegawaiDetail,
}) {
    const title = "Edit Pelanggan";

    return (
        <AuthenticatedLayout user={auth.user} titlePage={title}>
            <Head title={title} />

            <PegawaiProvider>
                <div className="py-4">
                    <BackButton href={route("lab.pegawai.index")} />

                    <EditForm
                        gender={gender}
                        study={pendidikan}
                        pegawaiDetail={pegawaiDetail}
                    />
                </div>
            </PegawaiProvider>
        </AuthenticatedLayout>
    );
}
