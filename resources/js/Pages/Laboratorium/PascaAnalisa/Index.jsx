import HeaderIndex from "@/Components/HeaderIndex";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { useMountEffect } from "primereact/hooks";
import { Toast } from "primereact/toast";
import { useRef, useState } from "react";
import PascaAnalisaTable from "./Partials/PascaAnalisaTable";

export default function PascaAnalytic({ auth, flash, pascaAnalytics }) {
    const title = "Pasca Analisa";

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
        <>
            <AuthenticatedLayout user={auth.user} titlePage={title}>
                <Head title={title} />

                <div className="pb-12">
                    <Toast ref={toast} />

                    <div className="max-w-7xl mx-auto">
                        <HeaderIndex
                            link={route("lab.pasca-analisa.create")}
                        ></HeaderIndex>

                        <PascaAnalisaTable pascaAnalytics={pascaAnalytics} />
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
