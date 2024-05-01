import React, { createContext, useState } from "react";

export const SchoolContext = createContext();

export const SchoolProvider = (props) => {
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedSchool, setSelectedSchool] = useState(null);
    const [selectedSchoolCategory, setSelectedSchoolCategory] = useState(null);
    const [selectedSchoolType, setSelectedSchoolType] = useState(null);
    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const selectedProvinceTemplate = (option, props) => {
        if (option) {
            fetch(
                `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${option.id}.json`
            )
                .then((res) => res.json())
                .then((data) => {
                    setCities(data);
                    setIsLoading(true);
                });

            return <div className="text-sm">{option.name}</div>;
        }

        return <span>{props.placeholder}</span>;
    };

    const provinceOptionTemplate = (option) => {
        return <div className="text-sm">{option.name}</div>;
    };

    const selectedCityTemplate = (option, props) => {
        if (option) {
            return <div className="text-sm">{option.name}</div>;
        }

        return <span>{props.placeholder}</span>;
    };

    const cityOptionTemplate = (option) => {
        return <div className="text-sm">{option.name}</div>;
    };

    const selectedSchoolTemplate = (option, props) => {
        if (option) {
            return <div className="text-sm">{option}</div>;
        }

        return <span>{props.placeholder}</span>;
    };

    const schoolOptionTemplate = (option) => {
        return <div className="text-sm">{option}</div>;
    };

    const selectedSchoolCategoryTemplate = (option, props) => {
        if (option) {
            return <div className="text-sm">{option}</div>;
        }

        return <span>{props.placeholder}</span>;
    };

    const schoolCategoryOptionTemplate = (option) => {
        return <div className="text-sm">{option}</div>;
    };

    const selectedSchoolTypeTemplate = (option, props) => {
        if (option) {
            return <div className="text-sm">{option}</div>;
        }

        return <span>{props.placeholder}</span>;
    };

    const schoolTypeOptionTemplate = (option) => {
        return <div className="text-sm">{option}</div>;
    };

    let state = {
        selectedProvince,
        setSelectedProvince,
        selectedCity,
        setSelectedCity,
        selectedSchool,
        setSelectedSchool,
        selectedSchoolCategory,
        setSelectedSchoolCategory,
        selectedSchoolType,
        setSelectedSchoolType,
        provinces,
        setProvinces,
        cities,
        setCities,
        isLoading,
        setIsLoading,
    };

    let handleFunctions = {
        selectedProvinceTemplate,
        provinceOptionTemplate,
        selectedCityTemplate,
        cityOptionTemplate,
        selectedSchoolTemplate,
        schoolOptionTemplate,
        selectedSchoolCategoryTemplate,
        schoolCategoryOptionTemplate,
        selectedSchoolTypeTemplate,
        schoolTypeOptionTemplate,
    };

    return (
        <SchoolContext.Provider
            value={{
                state,
                handleFunctions,
            }}
        >
            {props.children}
        </SchoolContext.Provider>
    );
};
