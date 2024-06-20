import React, { createContext } from "react";

export const PeminjamanContext = createContext();

export const PeminjamanProvider = (props) => {
    const selectedStatusTarifTemplate = (option, props) => {
        if (option) {
            return <div className="text-sm">{option}</div>;
        }

        return <span>{props.placeholder}</span>;
    };

    const statusTarifOptionTemplate = (option) => {
        return <div className="text-sm">{option}</div>;
    };

    const selectedStatusPeminjamanTemplate = (option, props) => {
        if (option) {
            return <div className="text-sm">{option}</div>;
        }

        return <span>{props.placeholder}</span>;
    };

    const statusPeminjamanOptionTemplate = (option) => {
        return <div className="text-sm">{option}</div>;
    };

    const selectedNamaAlatTemplate = (option, props) => {
        if (option) {
            return <div className="text-sm">{option}</div>;
        }

        return <span>{props.placeholder}</span>;
    };

    const namaAlatOptionTemplate = (option) => {
        return <div className="text-sm">{option}</div>;
    };

    const selectedNamaPelangganTemplate = (option, props) => {
        if (option) {
            return <div className="text-sm">{option}</div>;
        }

        return <span>{props.placeholder}</span>;
    };

    const namaPelangganOptionTemplate = (option) => {
        return <div className="text-sm">{option}</div>;
    };

    let handleFunctions = {
        selectedStatusTarifTemplate,
        statusTarifOptionTemplate,
        selectedStatusPeminjamanTemplate,
        statusPeminjamanOptionTemplate,
        selectedNamaAlatTemplate,
        namaAlatOptionTemplate,
        selectedNamaPelangganTemplate,
        namaPelangganOptionTemplate,
    };

    return (
        <PeminjamanContext.Provider
            value={{
                handleFunctions,
            }}
        >
            {props.children}
        </PeminjamanContext.Provider>
    );
};
