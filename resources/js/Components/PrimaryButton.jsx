export default function PrimaryButton({
    className = "",
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `flex items-center ${disabled && "opacity-25"} ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
