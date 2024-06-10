import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Link, useForm } from "@inertiajs/react";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import Spinner from "@/Components/Spinner";
import PrimaryButton from "@/Components/PrimaryButton";
import moment from "moment";

export default function PesertaTable({ participants }) {
    const [dataParticipants, setDataParticipants] = useState(null);
    const [deleteModal, setDeleteModal] = useState(false);
    const [detailDataModal, setDetailDataModal] = useState(false);
    const [dataParticipant, setDataParticipant] = useState(null);
    const [selectedDatas, setSelectedDatas] = useState(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);

    useEffect(() => {
        setDataParticipants(participants);
    }, [participants]);

    const confirmDeleteSelected = () => {
        setDeleteModal(true);
    };

    const confirmDetailData = (data) => {
        setDataParticipant(data);
        setDetailDataModal(true);
    };

    const { setData, post, processing } = useForm({
        codes: [],
    });

    const deleteParticipants = (e) => {
        e.preventDefault();

        post(route("kegiatan.peserta.multipleDelete"), {
            preserveScroll: true,
            onSuccess: () => setDeleteModal(false),
            onFinish: () => {
                setSelectedDatas(null);
                toast.current.show({
                    severity: "success",
                    summary: "Peserta Berhasil Dihapus",
                });
            },
        });
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="flex items-center gap-1">
                <button
                    onClick={() => confirmDetailData(rowData)}
                    className="p-2 btn-info"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3ZM12.0003 19C16.2359 19 19.8603 16.052 20.7777 12C19.8603 7.94803 16.2359 5 12.0003 5C7.7646 5 4.14022 7.94803 3.22278 12C4.14022 16.052 7.7646 19 12.0003 19ZM12.0003 16.5C9.51498 16.5 7.50026 14.4853 7.50026 12C7.50026 9.51472 9.51498 7.5 12.0003 7.5C14.4855 7.5 16.5003 9.51472 16.5003 12C16.5003 14.4853 14.4855 16.5 12.0003 16.5ZM12.0003 14.5C13.381 14.5 14.5003 13.3807 14.5003 12C14.5003 10.6193 13.381 9.5 12.0003 9.5C10.6196 9.5 9.50026 10.6193 9.50026 12C9.50026 13.3807 10.6196 14.5 12.0003 14.5Z"></path>
                    </svg>
                </button>

                <Link href="" className="p-2 btn-success">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="w-4 h-4"
                        fill="currentColor"
                    >
                        <path d="M17 2C17.5523 2 18 2.44772 18 3V7H21C21.5523 7 22 7.44772 22 8V18C22 18.5523 21.5523 19 21 19H18V21C18 21.5523 17.5523 22 17 22H7C6.44772 22 6 21.5523 6 21V19H3C2.44772 19 2 18.5523 2 18V8C2 7.44772 2.44772 7 3 7H6V3C6 2.44772 6.44772 2 7 2H17ZM16 17H8V20H16V17ZM20 9H4V17H6V16C6 15.4477 6.44772 15 7 15H17C17.5523 15 18 15.4477 18 16V17H20V9ZM8 10V12H5V10H8ZM16 4H8V7H16V4Z"></path>
                    </svg>
                </Link>
            </div>
        );
    };

    const header = (
        <div
            className={`${
                !selectedDatas || !selectedDatas.length
                    ? "justify-end flex"
                    : "justify-between flex"
            } items-center flex-wrap gap-4`}
        >
            <button
                onClick={confirmDeleteSelected}
                className={`${
                    !selectedDatas || !selectedDatas.length ? "hidden" : "flex"
                } items-center gap-2 py-2 order-2 lg:order-1 lg:w-1/6 w-full justify-center btn-danger`}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                >
                    <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"></path>
                </svg>
                Hapus Data
            </button>

            <div className="flex items-center order-1 lg:order-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                >
                    <path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"></path>
                </svg>
                <InputText
                    onInput={(e) => setGlobalFilter(e.target.value)}
                    placeholder="Cari..."
                    className="border-0 bg-transparent border-b pl-0 focus:ring-0 focus:border-black w-full"
                />
            </div>
        </div>
    );

    const onSelectionChange = (e) => {
        setSelectedDatas(e.value);
        setData(
            "codes",
            e.value.map((item) => item.kode)
        );
    };

    const tipePesertaTemplate = (rowData) => {
        if (rowData.teacher_id !== null) {
            return "Guru";
        } else if (rowData.student_id !== null) {
            return "Siswa";
        }
        if (rowData.institution_id !== null) {
            return "Institusi";
        }
    };

    const namaPesertaTemplate = (rowData) => {
        if (rowData.teacher_id !== null) {
            return rowData.teacher.nama;
        } else if (rowData.student_id !== null) {
            return rowData.student.nama_siswa;
        }
        if (rowData.institution_id !== null) {
            return rowData.institution.nama;
        }
    };

    const scoreTemplate = (rowData) => {
        const score = rowData.score === null ? 0 : rowData.score;
        return <InputText className="w-24" type="number" value={score} />;
    };

    const onScoreEditComplete = (e) => {
        const { rowData, newValue } = e;

        post(
            route("kegiatan.peserta.updateScore", {
                id: rowData.id,
                score: newValue,
            }),
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast.current.show({
                        severity: "success",
                        summary: "Skor Berhasil Diupdate",
                    });
                },
            }
        );
    };

    const scoreEditor = (options) => {
        return (
            <InputText
                className="w-24"
                type="number"
                value={options.value}
                onChange={(e) => options.editorCallback(e.target.value)}
            />
        );
    };

    return (
        <>
            <Toast ref={toast} />

            <div className="card shadow-lg">
                <DataTable
                    value={dataParticipants}
                    paginator
                    rows={10}
                    globalFilter={globalFilter}
                    rowsPerPageOptions={[10, 25, 50, 100]}
                    header={header}
                    emptyMessage="Tidak ada peserta."
                    stripedRows
                    removableSort
                    selection={selectedDatas}
                    onSelectionChange={onSelectionChange}
                    editMode="cell"
                    currentPageReportTemplate="Menampilkan {first} sampai {last} dari {totalRecords} peserta"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown CurrentPageReport"
                >
                    <Column selectionMode="multiple" />
                    <Column sortable field="kode" header="Kode" />
                    <Column sortable body={tipePesertaTemplate} header="Tipe" />
                    <Column
                        sortable
                        body={namaPesertaTemplate}
                        header="Peserta"
                    />
                    <Column
                        sortable
                        field="score"
                        body={scoreTemplate}
                        header="Skor"
                        editor={scoreEditor}
                        onCellEditComplete={onScoreEditComplete}
                    />
                    <Column body={actionBodyTemplate} />
                </DataTable>
            </div>

            <Dialog
                header="Detail Peserta Kegiatan"
                visible={detailDataModal}
                onHide={() => setDetailDataModal(false)}
                draggable={false}
                className="md:w-1/2"
            >
                {dataParticipant && (
                    <>
                        <table className="table-auto mb-4">
                            <tbody>
                                <tr>
                                    <td className="font-bold">Kode Peserta</td>
                                    <td className="p-2">:</td>
                                    <td className="p-2">
                                        {dataParticipant.kode}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="font-bold">Skor</td>
                                    <td className="p-2">:</td>
                                    <td className="p-2">
                                        {dataParticipant.score}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="font-bold">
                                        Tanggal Registrasi
                                    </td>
                                    <td className="p-2">:</td>
                                    <td className="p-2">
                                        {moment(
                                            dataParticipant.created_at
                                        ).format("D/MM/YYYY")}
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        {dataParticipant.teacher_id && (
                            <>
                                <details className="collapse collapse-arrow bg-gray-100 mb-4">
                                    <summary className="collapse-title text-lg font-semibold">
                                        Data Guru
                                    </summary>
                                    <table className="table-auto mx-4 mb-4">
                                        <tbody>
                                            <tr>
                                                <td className="font-bold">
                                                    Kode Guru
                                                </td>
                                                <td className="p-2">:</td>
                                                <td className="p-2">
                                                    {
                                                        dataParticipant.teacher
                                                            .kode
                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="font-bold">
                                                    Nama Guru
                                                </td>
                                                <td className="p-2">:</td>
                                                <td className="p-2">
                                                    {
                                                        dataParticipant.teacher
                                                            .nama
                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="font-bold">
                                                    NIP
                                                </td>
                                                <td className="p-2">:</td>
                                                <td className="p-2">
                                                    {
                                                        dataParticipant.teacher
                                                            .nip
                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="font-bold">
                                                    Jenis Kelamin
                                                </td>
                                                <td className="p-2">:</td>
                                                <td className="p-2">
                                                    {
                                                        dataParticipant.teacher
                                                            .jenis_kelamin
                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="font-bold">
                                                    Jabatan
                                                </td>
                                                <td className="p-2">:</td>
                                                <td className="p-2">
                                                    {
                                                        dataParticipant.teacher
                                                            .jabatan
                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="font-bold">
                                                    Pendidikan
                                                </td>
                                                <td className="p-2">:</td>
                                                <td className="p-2">
                                                    {
                                                        dataParticipant.teacher
                                                            .pendidikan
                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="font-bold">
                                                    Nomor Telepon
                                                </td>
                                                <td className="p-2">:</td>
                                                <td className="p-2">
                                                    {
                                                        dataParticipant.teacher
                                                            .telp
                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="font-bold">
                                                    Email
                                                </td>
                                                <td className="p-2">:</td>
                                                <td className="p-2">
                                                    {
                                                        dataParticipant.teacher
                                                            .email
                                                    }
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </details>

                                <RenderSchool
                                    data={dataParticipant.teacher.school}
                                />
                            </>
                        )}

                        {dataParticipant.student_id && (
                            <>
                                <details className="collapse collapse-arrow bg-gray-100 mb-4">
                                    <summary className="collapse-title text-lg font-semibold">
                                        Data Siswa
                                    </summary>
                                    <table className="table-auto mx-4 mb-4">
                                        <tbody>
                                            <tr>
                                                <td className="font-bold">
                                                    Kode Siswa
                                                </td>
                                                <td className="p-2">:</td>
                                                <td className="p-2">
                                                    {
                                                        dataParticipant.student
                                                            .kode_siswa
                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="font-bold">
                                                    Nama Siswa
                                                </td>
                                                <td className="p-2">:</td>
                                                <td className="p-2">
                                                    {
                                                        dataParticipant.student
                                                            .nama_siswa
                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="font-bold">
                                                    NIS Siswa
                                                </td>
                                                <td className="p-2">:</td>
                                                <td className="p-2">
                                                    {
                                                        dataParticipant.student
                                                            .nis
                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="font-bold">
                                                    Jenis Kelamin
                                                </td>
                                                <td className="p-2">:</td>
                                                <td className="p-2">
                                                    {
                                                        dataParticipant.student
                                                            .jenis_kelamin
                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="font-bold">
                                                    Email
                                                </td>
                                                <td className="p-2">:</td>
                                                <td className="p-2">
                                                    {
                                                        dataParticipant.student
                                                            .email
                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="font-bold">
                                                    Nomor Telepon
                                                </td>
                                                <td className="p-2">:</td>
                                                <td className="p-2">
                                                    {
                                                        dataParticipant.student
                                                            .telp
                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="font-bold">
                                                    Nama Wali
                                                </td>
                                                <td className="p-2">:</td>
                                                <td className="p-2">
                                                    {
                                                        dataParticipant.student
                                                            .nama_wali
                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="font-bold">
                                                    Keterangan
                                                </td>
                                                <td className="p-2">:</td>
                                                <td className="p-2">
                                                    {
                                                        dataParticipant.student
                                                            .keterangan
                                                    }
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </details>

                                <RenderSchool
                                    data={dataParticipant.student.school}
                                />
                            </>
                        )}

                        {dataParticipant.institution_id && (
                            <details className="collapse collapse-arrow bg-gray-100">
                                <summary className="collapse-title text-lg font-semibold">
                                    Data Institusi
                                </summary>
                                <table className="table-auto mx-4 mb-4">
                                    <tbody>
                                        <tr>
                                            <td className="font-bold">
                                                Kode Institusi
                                            </td>
                                            <td className="p-2">:</td>
                                            <td className="p-2">
                                                {
                                                    dataParticipant.institution
                                                        .kode
                                                }
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="font-bold">
                                                Nama Institusi
                                            </td>
                                            <td className="p-2">:</td>
                                            <td className="p-2">
                                                {
                                                    dataParticipant.institution
                                                        .nama
                                                }
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="font-bold">
                                                Negara Institusi
                                            </td>
                                            <td className="p-2">:</td>
                                            <td className="p-2">
                                                {
                                                    dataParticipant.institution
                                                        .negara
                                                }
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="font-bold">
                                                Grup Institusi
                                            </td>
                                            <td className="p-2">:</td>
                                            <td className="p-2">
                                                {
                                                    dataParticipant.institution
                                                        .grup
                                                }
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="font-bold">
                                                Jenis Institusi
                                            </td>
                                            <td className="p-2">:</td>
                                            <td className="p-2">
                                                {
                                                    dataParticipant.institution
                                                        .jenis
                                                }
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="font-bold">
                                                Alamat Institusi
                                            </td>
                                            <td className="p-2">:</td>
                                            <td className="p-2">
                                                {
                                                    dataParticipant.institution
                                                        .alamat
                                                }
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="font-bold">
                                                Nomor Telepon
                                            </td>
                                            <td className="p-2">:</td>
                                            <td className="p-2">
                                                {
                                                    dataParticipant.institution
                                                        .telp
                                                }
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="font-bold">Email</td>
                                            <td className="p-2">:</td>
                                            <td className="p-2">
                                                {
                                                    dataParticipant.institution
                                                        .email
                                                }
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </details>
                        )}
                    </>
                )}
            </Dialog>

            <Dialog
                header="Hapus Data Terpilih"
                visible={deleteModal}
                onHide={() => setDeleteModal(false)}
                draggable={false}
            >
                <div className="flex flex-col items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="rgba(255,0,0,1)"
                        className="w-24"
                    >
                        <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 15H13V17H11V15ZM11 7H13V13H11V7Z"></path>
                    </svg>
                    <p className="font-medium text-lg">
                        Anda yakin ingin menghapus data yang dipilih?
                    </p>
                    <div className="flex items-center">
                        <PrimaryButton
                            className="mt-2 px-4 py-2 btn-danger"
                            disabled={processing}
                            onClick={deleteParticipants}
                        >
                            Ya, Hapus
                            <Spinner isLoading={processing} />
                        </PrimaryButton>
                    </div>
                </div>
            </Dialog>
        </>
    );
}

const RenderSchool = ({ data }) => {
    return (
        <details className="collapse collapse-arrow bg-gray-100">
            <summary className="collapse-title text-lg font-semibold">
                Data Sekolah
            </summary>
            <table className="table-auto mx-4 mb-4">
                <tbody>
                    <tr>
                        <td className="font-bold">Kode Sekolah</td>
                        <td className="p-2">:</td>
                        <td className="p-2">{data.kode_sekolah}</td>
                    </tr>
                    <tr>
                        <td className="font-bold">Nama Sekolah</td>
                        <td className="p-2">:</td>
                        <td className="p-2">{data.nama_sekolah}</td>
                    </tr>
                    <tr>
                        <td className="font-bold">Kategori Sekolah</td>
                        <td className="p-2">:</td>
                        <td className="p-2">{data.kategori_sekolah}</td>
                    </tr>
                    <tr>
                        <td className="font-bold">Jenis Sekolah</td>
                        <td className="p-2">:</td>
                        <td className="p-2">{data.jenis_sekolah}</td>
                    </tr>
                    <tr>
                        <td className="font-bold">Tipe Sekolah</td>
                        <td className="p-2">:</td>
                        <td className="p-2">{data.tipe_sekolah}</td>
                    </tr>
                    <tr>
                        <td className="font-bold">Alamat Sekolah</td>
                        <td className="p-2">:</td>
                        <td className="p-2">{data.alamat_sekolah}</td>
                    </tr>
                    <tr>
                        <td className="font-bold">Provinsi</td>
                        <td className="p-2">:</td>
                        <td className="p-2">{data.provinsi}</td>
                    </tr>
                    <tr>
                        <td className="font-bold">Kota</td>
                        <td className="p-2">:</td>
                        <td className="p-2">{data.kota}</td>
                    </tr>
                    <tr>
                        <td className="font-bold">Nama Kontak</td>
                        <td className="p-2">:</td>
                        <td className="p-2">{data.nama_kontak}</td>
                    </tr>
                    <tr>
                        <td className="font-bold">Nomor Telepon</td>
                        <td className="p-2">:</td>
                        <td className="p-2">{data.telp}</td>
                    </tr>
                    <tr>
                        <td className="font-bold">Email</td>
                        <td className="p-2">:</td>
                        <td className="p-2">{data.email}</td>
                    </tr>
                </tbody>
            </table>
        </details>
    );
};
