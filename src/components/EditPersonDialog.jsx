import {
    useEffect,
    useRef,
    useState,
} from "react";


function EditPersonDialog({
    person,
    onClose,
    onSave,
}) {

    const inputRef =
        useRef(null);


    const [name, setName] =
        useState(person?.name || "");


    const [gender, setGender] =
        useState(person?.gender || "");


    const [birthDate, setBirthDate] =
        useState(person?.birthDate || "");


    const [deathDate, setDeathDate] =
        useState(person?.deathDate || "");


    const [notes, setNotes] =
        useState(person?.notes || "");


    useEffect(() => {

        if (!person) {
            return;
        }


        setName(
            person.name || ""
        );

        setGender(
            person.gender || ""
        );

        setBirthDate(
            person.birthDate || ""
        );

        setDeathDate(
            person.deathDate || ""
        );

        setNotes(
            person.notes || ""
        );


        setTimeout(() => {

            inputRef.current?.focus();

        }, 50);

    }, [person]);


    if (!person) {
        return null;
    }


    function handleSubmit(event) {

        event.preventDefault();


        const trimmedName =
            name.trim();


        if (!trimmedName) {
            return;
        }


        onSave({

            name: trimmedName,

            gender,

            birthDate:
                birthDate || null,

            deathDate:
                deathDate || null,

            notes,

        });

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
                        Edit person
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

                        <label>
                            Name
                        </label>


                        <input
                            ref={inputRef}
                            type="text"
                            value={name}
                            onChange={(event) =>
                                setName(
                                    event.target.value
                                )
                            }
                        />


                        <label>
                            Gender
                        </label>


                        <select
                            value={gender}
                            onChange={(event) =>
                                setGender(
                                    event.target.value
                                )
                            }
                        >

                            <option value="">
                                Not specified
                            </option>

                            <option value="MALE">
                                Male
                            </option>

                            <option value="FEMALE">
                                Female
                            </option>

                            <option value="OTHER">
                                Other
                            </option>

                        </select>


                        <label>
                            Birth date
                        </label>


                        <input
                            type="date"
                            value={birthDate}
                            onChange={(event) =>
                                setBirthDate(
                                    event.target.value
                                )
                            }
                        />


                        <label>
                            Death date
                        </label>


                        <input
                            type="date"
                            value={deathDate}
                            onChange={(event) =>
                                setDeathDate(
                                    event.target.value
                                )
                            }
                        />


                        <label>
                            Notes
                        </label>


                        <textarea
                            value={notes}
                            onChange={(event) =>
                                setNotes(
                                    event.target.value
                                )
                            }
                            rows="4"
                            placeholder="Optional notes"
                        />

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
                            Save changes
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}


export default EditPersonDialog;