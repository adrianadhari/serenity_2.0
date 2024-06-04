import ButtonDropdown from "@/Components/ButtonDropdown";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { useMountEffect } from "primereact/hooks";
import { Toast } from "primereact/toast";
import { useRef, useState } from "react";
import InstitutionTable from "./Partials/InstitutionTable";
import HeaderIndex from "@/Components/HeaderIndex";
import { Dialog } from "primereact/dialog";
import PrimaryButton from "@/Components/PrimaryButton";
import Spinner from "@/Components/Spinner";
import InputError from "@/Components/InputError";

export default function Institusi({ auth, flash, institutions }) {
    const title = "Institusi";

    const [importModal, setImportModal] = useState(false);
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

    const { setData, post, processing, errors } = useForm({
        file: null,
    });

    const uploadFile = async (e) => {
        e.preventDefault();

        post(route("institusi.import"), {
            preserveScroll: true,
            onSuccess: () => {
                setImportModal(false);
                toast.current.show({
                    severity: "success",
                    summary: "Institusi Berhasil Diimport!",
                });
            },
            onError: () => {
                setImportModal(false);
                toast.current.show({
                    severity: "error",
                    summary: "Terdapat kesalahan saat mengimport data!",
                });
            },
        });
    };

    return (
        <>
            <AuthenticatedLayout user={auth.user} titlePage={title}>
                <Head title={title} />

                <div className="pb-12">
                    <Toast ref={toast} />

                    <div className="max-w-7xl mx-auto">
                        <HeaderIndex link={route("institusi.create")}>
                            <ButtonDropdown>
                                <ButtonDropdown.Trigger>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-5 h-5 mr-2 -ml-1"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M13 10H18L12 16L6 10H11V3H13V10ZM4 19H20V12H22V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V12H4V19Z"></path>
                                    </svg>
                                    <span>Import Data</span>
                                </ButtonDropdown.Trigger>
                                <ButtonDropdown.Content>
                                    <ButtonDropdown.Link>
                                        <button
                                            className="w-full text-start"
                                            onClick={() => setImportModal(true)}
                                        >
                                            Upload File
                                        </button>
                                    </ButtonDropdown.Link>
                                    <ButtonDropdown.Link>
                                        <a
                                            href={route(
                                                "institusi.downloadTemplate"
                                            )}
                                        >
                                            Download Format
                                        </a>
                                    </ButtonDropdown.Link>
                                </ButtonDropdown.Content>
                            </ButtonDropdown>

                            <a
                                href={route("institusi.export")}
                                className="justify-center flex items-center px-4 py-2 btn-primary"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5 mr-2 -ml-1"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M4 19H20V12H22V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V12H4V19ZM13 9V16H11V9H6L12 3L18 9H13Z"></path>
                                </svg>
                                <span>Export Data</span>
                            </a>
                        </HeaderIndex>

                        <InstitutionTable institutions={institutions} />
                    </div>
                </div>
            </AuthenticatedLayout>

            <Dialog
                header="Import File"
                visible={importModal}
                onHide={() => setImportModal(false)}
                draggable={false}
                className="md:w-1/2"
            >
                <form
                    onSubmit={uploadFile}
                    className="flex items-center justify-between flex-col lg:flex-row gap-2 mt-2"
                >
                    <input
                        required
                        type="file"
                        className="file-input file-input-bordered w-full"
                        onChange={(e) => setData("file", e.target.files[0])}
                    />

                    <div className="flex justify-end">
                        <PrimaryButton
                            className="btn-danger p-2"
                            disabled={processing}
                        >
                            Upload File
                            <Spinner isLoading={processing} />
                        </PrimaryButton>
                    </div>
                </form>
                <InputError message={errors.file} />
            </Dialog>
        </>
    );
}
