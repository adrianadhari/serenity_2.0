import HeaderIndex from "@/Components/HeaderIndex";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useMountEffect } from "primereact/hooks";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import PublicationTable from "./Partials/PublicationTable";

export default function Publikasi({ auth, flash, publications }) {
    const title = "Publikasi";

    const toast = useRef(null);

    useMountEffect(() => {
        if (flash.message) {
            toast.current.show([
                {
                    severity: "success",
                    summary: flash.message,
                },
            ]);
        }
    });

    return (
        <AuthenticatedLayout user={auth.user} titlePage={title}>
            <Head title={title} />

            <div className="pb-12">
                <Toast ref={toast} />

                <div className="max-w-7xl mx-auto">
                    <HeaderIndex link={route("publikasi.create")} />

                    <PublicationTable publications={publications} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
