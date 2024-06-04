import ButtonDropdown from "@/Components/ButtonDropdown";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { useMountEffect } from "primereact/hooks";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import ResearchTable from "./Partials/ResearchTable";
import HeaderIndex from "@/Components/HeaderIndex";

export default function Penelitian({ auth, flash, researches }) {
    const title = "Penelitian";

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
                    <HeaderIndex
                        link={route("penelitian.create")}
                    ></HeaderIndex>

                    <ResearchTable researches={researches} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
