import React, { createContext } from "react";

export const PelangganContext = createContext();

export const PelangganProvider = (props) => {
    const selectedJenisKelaminTemplate = (option, props) => {
        if (option) {
            return <div className="text-sm">{option}</div>;
        }

        return <span>{props.placeholder}</span>;
    };

    const jenisKelaminOptionTemplate = (option) => {
        return <div className="text-sm">{option}</div>;
    };

    const selectedAgencyTemplate = (option, props) => {
        if (option) {
            return <div className="text-sm">{option}</div>;
        }

        return <span>{props.placeholder}</span>;
    };

    const agencyOptionTemplate = (option) => {
        return <div className="text-sm">{option}</div>;
    };

    let handleFunctions = {
        selectedJenisKelaminTemplate,
        jenisKelaminOptionTemplate,
        selectedAgencyTemplate,
        agencyOptionTemplate,
    };

    return (
        <PelangganContext.Provider
            value={{
                handleFunctions,
            }}
        >
            {props.children}
        </PelangganContext.Provider>
    );
};
