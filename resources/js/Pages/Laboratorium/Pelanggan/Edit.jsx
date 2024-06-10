import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import BackButton from "@/Components/BackButton";
import { PelangganProvider } from "./context/PelangganContext";
import EditForm from "./Partials/EditForm";

export default function EditPelanggan({
    auth,
    customerDetail,
    gender,
    agency,
}) {
    const title = "Edit Pelanggan";

    return (
        <AuthenticatedLayout user={auth.user} titlePage={title}>
            <Head title={title} />

            <PelangganProvider>
                <div className="py-4">
                    <BackButton href={route("lab.pelanggan.index")} />

                    <EditForm
                        customerDetail={customerDetail}
                        gender={gender}
                        agency={agency}
                    />
                </div>
            </PelangganProvider>
        </AuthenticatedLayout>
    );
}
