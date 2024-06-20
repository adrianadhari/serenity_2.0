import React, { createContext } from "react";

export const PraAnalisaContext = createContext();

export const PraAnalisaProvider = (props) => {
    const selectedStatusTemplate = (option, props) => {
        if (option) {
            return <div className="text-sm">{option}</div>;
        }

        return <span>{props.placeholder}</span>;
    };

    const statusOptionTemplate = (option) => {
        return <div className="text-sm">{option}</div>;
    };

    const selectedJenisTemplate = (option, props) => {
        if (option) {
            return <div className="text-sm">{option}</div>;
        }

        return <span>{props.placeholder}</span>;
    };

    const jenisOptionTemplate = (option) => {
        return <div className="text-sm">{option}</div>;
    };

    const selectedPelangganTemplate = (option, props) => {
        if (option) {
            return <div className="text-sm">{option}</div>;
        }

        return <span>{props.placeholder}</span>;
    };

    const pelangganOptionTemplate = (option) => {
        return <div className="text-sm">{option}</div>;
    };

    let handleFunctions = {
        selectedStatusTemplate,
        statusOptionTemplate,
        selectedJenisTemplate,
        jenisOptionTemplate,
        selectedPelangganTemplate,
        pelangganOptionTemplate,
    };

    return (
        <PraAnalisaContext.Provider
            value={{
                handleFunctions,
            }}
        >
            {props.children}
        </PraAnalisaContext.Provider>
    );
};
