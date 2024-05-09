import { forwardRef, useEffect, useRef } from "react";

export default forwardRef(function TextArea(
    { type = "text", className = "", isFocused = false, ...props },
    ref
) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <textarea
            {...props}
            type={type}
            className={"textarea textarea-bordered h-24 mt-1 " + className}
            ref={input}
            required
        ></textarea>
    );
});
