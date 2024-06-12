import React, { createContext } from "react";

export const PartnershipContext = createContext();

export const PartnershipProvider = (props) => {
    const selectedKategoriTemplate = (option, props) => {
        if (option) {
            return <div className="text-sm">{option}</div>;
        }

        return <span>{props.placeholder}</span>;
    };

    const kategoriOptionTemplate = (option) => {
        return <div className="text-sm">{option}</div>;
    };

    const selectedStatusTemplate = (option, props) => {
        if (option) {
            return <div className="text-sm">{option}</div>;
        }

        return <span>{props.placeholder}</span>;
    };

    const statusOptionTemplate = (option) => {
        return <div className="text-sm">{option}</div>;
    };

    let handleFunctions = {
        selectedKategoriTemplate,
        kategoriOptionTemplate,
        selectedStatusTemplate,
        statusOptionTemplate,
    };

    return (
        <PartnershipContext.Provider
            value={{
                handleFunctions,
            }}
        >
            {props.children}
        </PartnershipContext.Provider>
    );
};
