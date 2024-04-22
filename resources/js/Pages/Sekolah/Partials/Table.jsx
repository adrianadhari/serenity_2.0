import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode, FilterOperator } from "primereact/api";

export default function Table() {
    const [globalFilterValue, setGlobalFilterValue] = useState("");
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        "country.name": { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        representative: { value: null, matchMode: FilterMatchMode.IN },
        status: { value: null, matchMode: FilterMatchMode.EQUALS },
        verified: { value: null, matchMode: FilterMatchMode.EQUALS },
    });
    const data = [
        {
            id: 1,
            no: 1,
            kode: 1001,
            kategori: "Negeri",
            nama_sekolah: "SMA Negeri 1 Kota Jakarta",
            provinsi: "DKI Jakarta",
            kota: "Jakarta",
            aksi: "ANJAY",
        },
        {
            id: 2,
            no: 2,
            kode: 1000,
            kategori: "Negeri",
            nama_sekolah: "SMA Negeri 1 Kota Jakarta",
            provinsi: "DKI Jakarta",
            kota: "Jakarta",
            aksi: "ANJAY",
        },
        {
            id: 3,
            no: 3,
            kode: 1000,
            kategori: "Negeri",
            nama_sekolah: "SMA Negeri 1 Kota Jakarta",
            provinsi: "DKI Jakarta",
            kota: "Jakarta",
            aksi: "ANJAY",
        },
        {
            id: 4,
            no: 4,
            kode: 1000,
            kategori: "Negeri",
            nama_sekolah: "SMA Negeri 1 Kota Jakarta",
            provinsi: "DKI Jakarta",
            kota: "Jakarta",
            aksi: "ANJAY",
        },
        {
            id: 5,
            no: 5,
            kode: 1000,
            kategori: "Negeri",
            nama_sekolah: "SMA Negeri 1 Kota Jakarta",
            provinsi: "DKI Jakarta",
            kota: "Jakarta",
            aksi: "ANJAY",
        },
        {
            id: 6,
            no: 6,
            kode: 1000,
            kategori: "Negeri",
            nama_sekolah: "SMA Negeri 1 Kota Jakarta",
            provinsi: "DKI Jakarta",
            kota: "Jakarta",
            aksi: "ANJAY",
        },
        {
            id: 7,
            no: 7,
            kode: 1000,
            kategori: "Negeri",
            nama_sekolah: "SMA Negeri 1 Kota Jakarta",
            provinsi: "DKI Jakarta",
            kota: "Jakarta",
            aksi: "ANJAY",
        },
        {
            id: 8,
            no: 8,
            kode: 1000,
            kategori: "Negeri",
            nama_sekolah: "SMA Negeri 1 Kota Jakarta",
            provinsi: "DKI Jakarta",
            kota: "Jakarta",
            aksi: "ANJAY",
        },
        {
            id: 9,
            no: 9,
            kode: 1000,
            kategori: "Negeri",
            nama_sekolah: "SMA Negeri 1 Kota Jakarta",
            provinsi: "DKI Jakarta",
            kota: "Jakarta",
            aksi: "ANJAY",
        },
        {
            id: 10,
            no: 10,
            kode: 1000,
            kategori: "Negeri",
            nama_sekolah: "SMA Negeri 1 Kota Jakarta",
            provinsi: "DKI Jakarta",
            kota: "Jakarta",
            aksi: "ANJAY",
        },
        {
            id: 11,
            no: 11,
            kode: 1000,
            kategori: "Negeri",
            nama_sekolah: "SMA Negeri 1 Kota Jakarta",
            provinsi: "DKI Jakarta",
            kota: "Jakarta",
            aksi: "ANJAY",
        },
        {
            id: 12,
            no: 12,
            kode: 1000,
            kategori: "Negeri",
            nama_sekolah: "SMA Negeri 1 Kota Jakarta",
            provinsi: "DKI Jakarta",
            kota: "Jakarta",
            aksi: "ANJAY",
        },
        {
            id: 13,
            no: 13,
            kode: 1000,
            kategori: "Negeri",
            nama_sekolah: "SMA Negeri 1 Kota Jakarta",
            provinsi: "DKI Jakarta",
            kota: "Jakarta",
            aksi: "ANJAY",
        },
        {
            id: 14,
            no: 14,
            kode: 1000,
            kategori: "Negeri",
            nama_sekolah: "SMA Negeri 1 Kota Jakarta",
            provinsi: "DKI Jakarta",
            kota: "Jakarta",
            aksi: "ANJAY",
        },
        {
            id: 15,
            no: 15,
            kode: 1000,
            kategori: "Negeri",
            nama_sekolah: "SMA Negeri 1 Kota Jakarta",
            provinsi: "DKI Jakarta",
            kota: "Jakarta",
            aksi: "ANJAY",
        },
    ];

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters["global"].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const renderHeader = () => {
        return (
            <div className="flex justify-content-end">
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText
                        value={globalFilterValue}
                        onChange={onGlobalFilterChange}
                        placeholder="Keyword Search"
                    />
                </span>
            </div>
        );
    };

    const header = renderHeader();
    return (
        <div className="card">
            <DataTable
                value={data}
                showGridlines
                paginator
                rows={10}
                rowsPerPageOptions={[10, 15, 25, 50]}
                tableStyle={{ minWidth: "50rem" }}
                header={header}
                emptyMessage="No customers found."
            >
                <Column sortable field="no" header="No"></Column>
                <Column sortable field="kode" header="Kode"></Column>
                <Column sortable field="kategori" header="Kategori"></Column>
                <Column
                    sortable
                    field="nama_sekolah"
                    header="Nama Sekolah"
                ></Column>
                <Column sortable field="provinsi" header="Provinsi"></Column>
                <Column sortable field="kota" header="Kota"></Column>
                <Column sortable field="aksi" header="Aksi"></Column>
            </DataTable>
        </div>
    );
}
