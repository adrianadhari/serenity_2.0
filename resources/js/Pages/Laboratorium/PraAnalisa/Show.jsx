import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import BackButton from "@/Components/BackButton";
import DetailPraAnalisaTable from "./Partials/DetailPraAnalisaTable";
import ButtonDropdown from "@/Components/ButtonDropdown";

export default function ShowPraAnalisa({ auth, detailData }) {
    const title = "Detail Data Pra Analisa";

    return (
        <AuthenticatedLayout user={auth.user} titlePage={title}>
            <Head title={title} />

            <div className="py-6">
                <div className="flex flex-col md:flex-row justify-between mb-4 md:mb-0 md:items-center">
                    <BackButton href={route("lab.pra-analisa.index")} />

                    <ButtonDropdown>
                        <ButtonDropdown.Trigger>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5 mr-2 -ml-1"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
                            </svg>
                            <span>Input Data</span>
                        </ButtonDropdown.Trigger>
                        <ButtonDropdown.Content>
                            <ButtonDropdown.Link>
                                <a>Input Kaji Ulang dan Tender</a>
                            </ButtonDropdown.Link>
                            <ButtonDropdown.Link>
                                <a>Input SPPC</a>
                            </ButtonDropdown.Link>
                            <ButtonDropdown.Link>
                                <a>Input Agenda</a>
                            </ButtonDropdown.Link>
                        </ButtonDropdown.Content>
                    </ButtonDropdown>
                </div>

                <div className="max-w-7xl mx-auto">
                    <div className="mb-8">
                        <DetailPraAnalisaTable detailData={detailData} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
