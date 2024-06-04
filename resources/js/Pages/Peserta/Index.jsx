import ButtonDropdown from "@/Components/ButtonDropdown";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { useMountEffect } from "primereact/hooks";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import ParticipantsTable from "./Partials/ParticipantsTable";
import HeaderIndex from "@/Components/HeaderIndex";

export default function Peserta({ auth, flash, participants }) {
    const title = "Peserta";

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
                    <HeaderIndex link={route("peserta.create")}></HeaderIndex>

                    <ParticipantsTable participants={participants} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
