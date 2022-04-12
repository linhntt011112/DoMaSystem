import React, { useState, useRef, useEffect } from "react";
import "./dropdown.css";

export default function Dropdown({ 
    datas, 
    id,
    label,
    prompt, 
    value, 
    onChange,
}) {

    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const ref = useRef(null);

    useEffect(() => {
        document.addEventListener("click", close)
        return () => document.removeEventListener("click", close);
    }, []);

    function close(e) {
        setOpen(e && e.target === ref.current);
    }

    function filter(datas) {
        return datas.filter(
            (data) => 
                data[label].toLowerCase().indexOf(query.toLowerCase()) > -1
        );
    }

    function displayValue() {
        if (query.length > 0) return query;
        if (value) return value[label];
        return "";
    }

    return (
        <div className="dropdown">
            <div className="control" onClick={() => setOpen((prev) => !prev)}>
                <div className="selected-value" ref={ref} >
                    <input
                        type="text" 
                        ref={ref}
                        placeholder={value ? value[label] : prompt}
                        value={displayValue()}
                        onChange={e => {
                            setQuery(e.target.value)
                            onChange(null)
                        }}
                        onClick={() => setOpen((prev) => !prev)}
                    />
                </div>
                <div className={`arrow ${open ? "open" : null}`}></div>
            </div>
            <div className={`datas ${open ? "open" : null}`}>
                {filter(datas).map((data) => (
                    <div
                        key={data[id]} 
                        className={`data ${
                            value === data ? "selected" : null
                        }`}
                        onClick={() => {
                            setQuery("");
                            onChange(data);
                            setOpen(false);
                        }}>
                            {data[label]}
                    </div>
                ))}
            </div>
        </div>
    )
}