import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PesertaProvider } from "./context/PesertaContext";
import EditForm from "./Partials/EditForm";
import BackButton from "@/Components/BackButton";

export default function EditPeserta({
    auth,
    tipe_peserta,
    jenis_kelamin,
    pendidikan,
    institusi,
    participantDetail,
}) {
    const title = "Edit Peserta";

    return (
        <AuthenticatedLayout user={auth.user} titlePage={title}>
            <Head title={title} />

            <PesertaProvider>
                <div className="py-4">
                    <BackButton href={route("peserta.index")} />

                    <EditForm
                        participantDetail={participantDetail}
                        gender={jenis_kelamin}
                        institusi={institusi}
                        tipe_pesertaa={tipe_peserta}
                        pend={pendidikan}
                    />
                </div>
            </PesertaProvider>
        </AuthenticatedLayout>
    );
}
