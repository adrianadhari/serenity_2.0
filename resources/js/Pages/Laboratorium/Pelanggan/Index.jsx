import HeaderIndex from "@/Components/HeaderIndex";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useMountEffect } from "primereact/hooks";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import PelangganTable from "./Partials/PelangganTable";

export default function Pelanggan({ auth, flash, customers }) {
    const title = "Pelanggan Laboratorium";

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
                    <HeaderIndex link={route("lab.pelanggan.create")} />

                    <PelangganTable customers={customers} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
