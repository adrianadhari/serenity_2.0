import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PeminjamanProvider } from "./context/PeminjamanContext";
import BackButton from "@/Components/BackButton";
import EditForm from "./Partials/EditForm";

export default function EditPeminjaman({
    auth,
    peminjamanDetail,
    status_tarif,
    status_peminjaman,
    tools_name,
    nama_pelanggan,
}) {
    const title = "Edit Peminjaman Alat";

    return (
        <AuthenticatedLayout user={auth.user} titlePage={title}>
            <Head title={title} />

            <PeminjamanProvider>
                <div className="py-4">
                    <BackButton href={route("lab.peminjaman.index")} />

                    <EditForm
                        peminjamanDetail={peminjamanDetail}
                        status_tariff={status_tarif}
                        status_peminjamann={status_peminjaman}
                        tools_namee={tools_name}
                        nama_pelanggann={nama_pelanggan}
                    />
                </div>
            </PeminjamanProvider>
        </AuthenticatedLayout>
    );
}
