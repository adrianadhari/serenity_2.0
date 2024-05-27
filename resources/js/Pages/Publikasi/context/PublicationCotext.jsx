import React, { createContext } from "react";

export const PublicationContext = createContext();

export const PublicationProvider = (props) => {
    const selectedTypeTemplate = (option, props) => {
        if (option) {
            return <div className="text-sm">{option}</div>;
        }

        return <span>{props.placeholder}</span>;
    };

    const typeOptionTemplate = (option) => {
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
        selectedTypeTemplate,
        typeOptionTemplate,
        selectedStatusTemplate,
        statusOptionTemplate,
    };

    return (
        <PublicationContext.Provider
            value={{
                handleFunctions,
            }}
        >
            {props.children}
        </PublicationContext.Provider>
    );
};
