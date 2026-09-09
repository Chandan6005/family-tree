import {
    useEffect,
    useRef,
} from "react";


function SidePanel({
    selectedPerson,
    onClose,
    onAddFirstPerson,
    newPersonName,
    setNewPersonName,
    isAddingPerson,
    onStartAddingPerson,
    onCancelAddingPerson,
    onRelationshipAction,
    onEditPerson,
    onDeletePerson,
}) {

    const inputRef =
        useRef(null);


    useEffect(() => {

        if (
            isAddingPerson &&
            inputRef.current
        ) {

            inputRef.current.focus();

        }

    }, [isAddingPerson]);


    /*
     * Nothing selected.
     */

    if (!selectedPerson) {

        return (

            <aside className="side-panel">

                <div className="empty-panel">

                    <h2>
                        Family Tree
                    </h2>


                    {!isAddingPerson ? (

                        <>

                            <p>
                                Start building your
                                family tree by adding
                                the first person.
                            </p>


                            <button
                                className="primary-button"
                                onClick={
                                    onStartAddingPerson
                                }
                            >
                                + Add person
                            </button>

                        </>

                    ) : (

                        <div className="create-person-box">

                            <label>
                                Person's name
                            </label>


                            <input
                                ref={inputRef}
                                type="text"
                                value={
                                    newPersonName
                                }
                                onChange={(event) =>
                                    setNewPersonName(
                                        event.target.value
                                    )
                                }
                                onKeyDown={(event) => {

                                    if (
                                        event.key ===
                                        "Enter"
                                    ) {

                                        onAddFirstPerson();

                                    }


                                    if (
                                        event.key ===
                                        "Escape"
                                    ) {

                                        onCancelAddingPerson();

                                    }

                                }}
                                placeholder="Enter name"
                            />


                            <button
                                className="primary-button"
                                onClick={
                                    onAddFirstPerson
                                }
                                disabled={
                                    !newPersonName.trim()
                                }
                            >
                                Create person
                            </button>


                            <button
                                className="secondary-button"
                                onClick={
                                    onCancelAddingPerson
                                }
                            >
                                Cancel
                            </button>

                        </div>

                    )}

                </div>

            </aside>

        );
    }


    return (

        <aside className="side-panel">

            <div className="person-header">

                <h2>
                    {selectedPerson.name}
                </h2>


                <button
                    className="close-button"
                    onClick={onClose}
                >
                    ×
                </button>

            </div>


            <section className="panel-section">

                <button
                    onClick={onEditPerson}
                >
                    Edit person
                </button>

            </section>


            <section className="panel-section">

                <h3>
                    Family
                </h3>


                <button
                    onClick={() =>
                        onRelationshipAction(
                            "parent"
                        )
                    }
                >
                    + Add parent
                </button>


                <button
                    onClick={() =>
                        onRelationshipAction(
                            "sibling"
                        )
                    }
                >
                    + Add sibling
                </button>


                <button
                    onClick={() =>
                        onRelationshipAction(
                            "partner"
                        )
                    }
                >
                    + Add partner
                </button>


                <button
                    onClick={() =>
                        onRelationshipAction(
                            "child"
                        )
                    }
                >
                    + Add child
                </button>

            </section>


            <section className="panel-section danger-section">

                <button
                    className="delete-button"
                    onClick={onDeletePerson}
                >
                    Delete person
                </button>

            </section>

        </aside>

    );

}


export default SidePanel;