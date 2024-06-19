import HeaderIndex from "@/Components/HeaderIndex";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useMountEffect } from "primereact/hooks";
import { useRef } from "react";
import { Toast } from "primereact/toast";
import PraAnalisaTable from "./Partials/PraAnalisaTable";

export default function PraAnalisa({ auth, flash, praAnalisas }) {
    const title = "Pra Analisa";

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

            <div className="py-4">
                <Toast ref={toast} />

                <div className="max-w-7xl mx-auto">
                    <HeaderIndex link={route("lab.pra-analisa.create")} />

                    <PraAnalisaTable praAnalisas={praAnalisas} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
