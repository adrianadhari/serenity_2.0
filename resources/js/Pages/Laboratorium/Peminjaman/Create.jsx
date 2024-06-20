import BackButton from "@/Components/BackButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PeminjamanProvider } from "./context/PeminjamanContext";
import CreateForm from "./Partials/CreateForm";

export default function CreateTools({
    auth,
    status_tarif,
    status_peminjaman,
    tools_name,
    nama_pelanggan,
}) {
    const title = "Tambah Peminjaman Alat";

    return (
        <AuthenticatedLayout user={auth.user} titlePage={title}>
            <Head title={title} />

            <PeminjamanProvider>
                <div className="py-4">
                    <BackButton href={route("lab.peminjaman.index")} />

                    <CreateForm
                        status_tarif={status_tarif}
                        status_peminjaman={status_peminjaman}
                        tools_name={tools_name}
                        nama_pelanggan={nama_pelanggan}
                    />
                </div>
            </PeminjamanProvider>
        </AuthenticatedLayout>
    );
}
