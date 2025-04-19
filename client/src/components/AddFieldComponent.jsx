import React, { useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { IoClose } from "react-icons/io5";

const AddFieldComponent = ({ close, value, onChange, submit }) => {
    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const handleKeyDown = useCallback((event) => {
        if (event.key === 'Enter') {
            submit();
        }
    }, [submit]);

    return (
        <section 
            className="fixed inset-0 bg-neutral-900 bg-opacity-70 z-50 flex justify-center items-center p-4"
            aria-modal="true"
            role="dialog"
        >
            <div className="bg-white rounded-lg p-4 w-full max-w-md shadow-lg">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h1 className="font-semibold text-lg">Add Field</h1>
                    <button onClick={close} aria-label="Close dialog">
                        <IoClose size={25} />
                    </button>
                </div>

                {/* Input Field */}
                <input
                    ref={inputRef}
                    type="text"
                    className="bg-blue-50 my-3 p-2 border border-gray-300 outline-none focus:border-blue-500 rounded w-full"
                    placeholder="Enter field name"
                    value={value}
                    onChange={onChange}
                    onKeyDown={handleKeyDown}
                    aria-label="Field name input"
                />

                {/* Submit Button */}
                <button
                    onClick={submit}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded w-full transition"
                    aria-label="Add field"
                >
                    Add Field
                </button>
            </div>
        </section>
    );
};

AddFieldComponent.propTypes = {
    close: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired
};

export default AddFieldComponent;
