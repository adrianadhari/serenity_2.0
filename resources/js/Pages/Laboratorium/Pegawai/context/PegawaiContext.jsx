import React, { createContext } from "react";

export const PegawaiContext = createContext();

export const PegawaiProvider = (props) => {
    const selectedJenisKelaminTemplate = (option, props) => {
        if (option) {
            return <div className="text-sm">{option}</div>;
        }

        return <span>{props.placeholder}</span>;
    };

    const jenisKelaminOptionTemplate = (option) => {
        return <div className="text-sm">{option}</div>;
    };

    const selectedPendidikanTemplate = (option, props) => {
        if (option) {
            return <div className="text-sm">{option}</div>;
        }

        return <span>{props.placeholder}</span>;
    };

    const pendidikanOptionTemplate = (option) => {
        return <div className="text-sm">{option}</div>;
    };

    let handleFunctions = {
        selectedJenisKelaminTemplate,
        jenisKelaminOptionTemplate,
        selectedPendidikanTemplate,
        pendidikanOptionTemplate,
    };

    return (
        <PegawaiContext.Provider
            value={{
                handleFunctions,
            }}
        >
            {props.children}
        </PegawaiContext.Provider>
    );
};
