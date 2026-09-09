import {
    useEffect,
    useRef,
    useState,
} from "react";


function RelationshipDialog({
    mode,
    person,
    people,
    partnerships,
    onClose,
    onAddParent,
    onAddChild,
    onAddSibling,
    onAddPartner,
}) {

    const inputRef =
        useRef(null);


    const [name, setName] =
        useState("");


    const [relationshipType, setRelationshipType] =
        useState("BIOLOGICAL");


    const [selectedPartnership, setSelectedPartnership] =
        useState("");


    useEffect(() => {

        setName("");

        setSelectedPartnership("");


        if (mode === "partner") {

            setRelationshipType(
                "MARRIAGE"
            );

        } else {

            setRelationshipType(
                "BIOLOGICAL"
            );

        }


        const timer =
            setTimeout(() => {

                inputRef.current?.focus();

            }, 50);


        return () =>
            clearTimeout(timer);

    }, [mode, person]);


    if (!person || !mode) {
        return null;
    }


    const titles = {

        parent: "Add parent",

        child: "Add child",

        sibling: "Add sibling",

        partner: "Add partner",

    };


    const personPartnerships =
        partnerships.filter(
            (partnership) =>
                partnership.personAId === person.id ||
                partnership.personBId === person.id
        );


    function getPartnerName(
        partnership
    ) {

        const partnerId =
            partnership.personAId === person.id
                ? partnership.personBId
                : partnership.personAId;


        const partner =
            people.find(
                (item) =>
                    item.id === partnerId
            );


        return partner
            ? partner.name
            : "Unknown";

    }


    function handleSubmit(event) {

        event.preventDefault();


        const trimmedName =
            name.trim();


        if (!trimmedName) {
            return;
        }


        if (mode === "parent") {

            onAddParent(
                trimmedName,
                relationshipType
            );

            return;
        }


        if (mode === "child") {

            onAddChild(
                trimmedName,
                relationshipType,
                selectedPartnership
            );

            return;
        }


        if (mode === "sibling") {

            onAddSibling(
                trimmedName,
                relationshipType
            );

            return;
        }


        if (mode === "partner") {

            onAddPartner(
                trimmedName,
                relationshipType
            );

        }

    }


    return (

        <div
            className="dialog-overlay"
            onMouseDown={(event) => {

                if (
                    event.target ===
                    event.currentTarget
                ) {

                    onClose();

                }

            }}
        >

            <div
                className="relationship-dialog"
                onMouseDown={(event) =>
                    event.stopPropagation()
                }
            >

                <div className="dialog-header">

                    <h2>
                        {titles[mode]}
                    </h2>


                    <button
                        type="button"
                        className="close-button"
                        onClick={onClose}
                    >
                        ×
                    </button>

                </div>


                <form
                    onSubmit={handleSubmit}
                >

                    <div className="dialog-body">

                        <p className="dialog-description">

                            Adding to{" "}

                            <strong>
                                {person.name}
                            </strong>

                        </p>


                        <label htmlFor="relationship-name">
                            Name
                        </label>


                        <input
                            id="relationship-name"
                            ref={inputRef}
                            type="text"
                            value={name}
                            onChange={(event) =>
                                setName(
                                    event.target.value
                                )
                            }
                            placeholder="Enter name"
                            autoComplete="off"
                        />


                        {mode !== "partner" && (

                            <>

                                <label>
                                    Relationship
                                </label>


                                <div className="radio-group">

                                    <label className="radio-option">

                                        <input
                                            type="radio"
                                            checked={
                                                relationshipType ===
                                                "BIOLOGICAL"
                                            }
                                            onChange={() =>
                                                setRelationshipType(
                                                    "BIOLOGICAL"
                                                )
                                            }
                                        />

                                        Biological

                                    </label>


                                    <label className="radio-option">

                                        <input
                                            type="radio"
                                            checked={
                                                relationshipType ===
                                                "ADOPTIVE"
                                            }
                                            onChange={() =>
                                                setRelationshipType(
                                                    "ADOPTIVE"
                                                )
                                            }
                                        />

                                        Adoptive

                                    </label>

                                </div>

                            </>

                        )}


                        {mode === "partner" && (

                            <>

                                <label>
                                    Relationship
                                </label>


                                <div className="radio-group">

                                    <label className="radio-option">

                                        <input
                                            type="radio"
                                            checked={
                                                relationshipType ===
                                                "MARRIAGE"
                                            }
                                            onChange={() =>
                                                setRelationshipType(
                                                    "MARRIAGE"
                                                )
                                            }
                                        />

                                        Marriage

                                    </label>


                                    <label className="radio-option">

                                        <input
                                            type="radio"
                                            checked={
                                                relationshipType ===
                                                "PARTNER"
                                            }
                                            onChange={() =>
                                                setRelationshipType(
                                                    "PARTNER"
                                                )
                                            }
                                        />

                                        Partner

                                    </label>

                                </div>

                            </>

                        )}


                        {mode === "child" &&
                            personPartnerships.length > 0 && (

                            <>

                                <label>
                                    Child's other parent
                                </label>


                                <div className="partnership-options">

                                    <label className="radio-option">

                                        <input
                                            type="radio"
                                            name="partnership"
                                            checked={
                                                selectedPartnership ===
                                                ""
                                            }
                                            onChange={() =>
                                                setSelectedPartnership(
                                                    ""
                                                )
                                            }
                                        />

                                        {person.name} only

                                    </label>


                                    {personPartnerships.map(
                                        (partnership) => (

                                            <label
                                                key={
                                                    partnership.id
                                                }
                                                className="radio-option"
                                            >

                                                <input
                                                    type="radio"
                                                    name="partnership"
                                                    checked={
                                                        selectedPartnership ===
                                                        partnership.id
                                                    }
                                                    onChange={() =>
                                                        setSelectedPartnership(
                                                            partnership.id
                                                        )
                                                    }
                                                />

                                                {person.name}
                                                {" + "}
                                                {
                                                    getPartnerName(
                                                        partnership
                                                    )
                                                }

                                            </label>

                                        )
                                    )}

                                </div>

                            </>

                        )}

                    </div>


                    <div className="dialog-footer">

                        <button
                            type="button"
                            className="secondary-button"
                            onClick={onClose}
                        >
                            Cancel
                        </button>


                        <button
                            type="submit"
                            className="primary-button"
                            disabled={
                                !name.trim()
                            }
                        >
                            {titles[mode]}
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}


export default RelationshipDialog;