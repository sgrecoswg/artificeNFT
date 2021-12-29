import { Button, InputGroup, Spinner } from "react-bootstrap";
import { BsX, BsPlus } from "react-icons/bs";
import React, { useState } from "react";

const AddOnList = ({label,value,update,readonly,allowRemovalOfExist,className,loading,loadingText}) => {
    const [typedText, setTypedText] = useState("");
    const [newItems, setNewItems] = useState([]);

    if (loading) {
        return (<Spinner size="sm" animation="border" role="status"></Spinner>);
    }

    return(
        <>
            <label className={className ? className : ''}>{label}</label>
            <InputGroup className="mb-3">
                <input placeholder="Name"
                    aria-label="Name"
                    aria-describedby="basic-addon2"
                    value={typedText}
                    onChange={(e) => { setTypedText(e.target.value); }}
                />
                <Button variant="outline-success"
                    id="button-addon-2"
                    onClick={(e) => {
                        if (typedText && typedText!== "") {
                            setNewItems(i => [...newItems, typedText]);
                            if (value) {
                                update([...value, typedText]);

                            } else {
                                update([typedText]);
                            }
                            setTypedText("");
                        }
                    }}>
                    <BsPlus />
                </Button>
            </InputGroup>
            <ul style={{listStyleType:"none", padding:"0", margin:"0"}}>
                {value ? value.map((listItem, i) => {
                    return (
                        <li key={`list-item-${i}`}>
                            {readonly || (allowRemovalOfExist === false && !newItems.includes(listItem)) ? '' :
                                <BsX fontSize="1.5rem" color="#dc3545"
                                    onClick={(e) => {
                                        const idx = value.indexOf(listItem);
                                        update([...value.slice(0, idx),
                                                ...value.slice(idx + 1),]);
                                    }}
                                />
                            }
                            {listItem}
                        </li>
                        );
                })
                : null
                }
            </ul>
        </>
    );
};

export default AddOnList;