import {
    useEffect,
    useState,
} from "react";


import FamilyTree
    from "./components/FamilyTree";


import SidePanel
    from "./components/SidePanel";


import RelationshipDialog
    from "./components/RelationshipDialog";


import EditPersonDialog
    from "./components/EditPersonDialog";


import {
    createPerson,
    getAllPeople,
    getAllPartnerships,
    getAllParentChildRelationships,
    getAllSiblings,
    updatePerson,
    deletePerson,
} from "./services/personService";


import {
    addParent,
    addChild,
    addChildToPartnership,
    addSibling,
    addPartner,
} from "./services/familyService";


import "./index.css";


function App() {

    /* =====================================
       PEOPLE
    ===================================== */

    const [
        people,
        setPeople,
    ] = useState([]);


    const [
        selectedPerson,
        setSelectedPerson,
    ] = useState(null);


    /* =====================================
       RELATIONSHIPS
    ===================================== */

    const [
        partnerships,
        setPartnerships,
    ] = useState([]);


    const [
        parentChildRelationships,
        setParentChildRelationships,
    ] = useState([]);


    const [
        siblings,
        setSiblings,
    ] = useState([]);


    /* =====================================
       FIRST PERSON
    ===================================== */

    const [
        newPersonName,
        setNewPersonName,
    ] = useState("");


    const [
        isAddingPerson,
        setIsAddingPerson,
    ] = useState(false);


    /* =====================================
       DIALOGS
    ===================================== */

    const [
        relationshipMode,
        setRelationshipMode,
    ] = useState(null);


    const [
        isEditingPerson,
        setIsEditingPerson,
    ] = useState(false);


    /* =====================================
       LOAD DATABASE
    ===================================== */

    async function loadFamilyData() {

        try {

            const [
                storedPeople,
                storedPartnerships,
                storedParentChild,
                storedSiblings,
            ] = await Promise.all([

                getAllPeople(),

                getAllPartnerships(),

                getAllParentChildRelationships(),

                getAllSiblings(),

            ]);


            setPeople(
                storedPeople
            );


            setPartnerships(
                storedPartnerships
            );


            setParentChildRelationships(
                storedParentChild
            );


            setSiblings(
                storedSiblings
            );


        } catch (error) {

            console.error(
                "Failed to load family data:",
                error
            );

        }

    }


    useEffect(() => {

        loadFamilyData();

    }, []);


    /* =====================================
       FIRST PERSON
    ===================================== */

    function handleStartAddingPerson() {

        setNewPersonName("");

        setIsAddingPerson(true);

    }


    function handleCancelAddingPerson() {

        setNewPersonName("");

        setIsAddingPerson(false);

    }


    async function handleAddFirstPerson() {

        const name =
            newPersonName.trim();


        if (!name) {
            return;
        }


        const person = {

            id:
                crypto.randomUUID(),

            name,

            gender: "",

            birthDate: null,

            deathDate: null,

            notes: "",

            createdAt:
                new Date().toISOString(),

        };


        try {

            await createPerson(
                person
            );


            setPeople(
                (current) => [
                    ...current,
                    person,
                ]
            );


            setSelectedPerson(
                person
            );


            setNewPersonName("");

            setIsAddingPerson(false);


        } catch (error) {

            console.error(
                "Failed to create person:",
                error
            );

            alert(
                "Unable to create the person."
            );

        }

    }


    /* =====================================
       SELECT PERSON
    ===================================== */

    function handleSelectPerson(
        personId
    ) {

        const person =
            people.find(
                (item) =>
                    item.id === personId
            );


        if (person) {

            setSelectedPerson(
                person
            );

        }

    }


    /* =====================================
       RELATIONSHIP DIALOG
    ===================================== */

    function handleRelationshipAction(
        mode
    ) {

        if (!selectedPerson) {
            return;
        }


        setRelationshipMode(
            mode
        );

    }


    function closeRelationshipDialog() {

        setRelationshipMode(null);

    }


    /* =====================================
       ADD PARENT
    ===================================== */

    async function handleAddParent(
        name,
        relationshipType
    ) {

        if (!selectedPerson) {
            return;
        }


        try {

            const result =
                await addParent(
                    selectedPerson.id,
                    name,
                    relationshipType
                );


            setPeople(
                (current) => [
                    ...current,
                    result.parent,
                ]
            );


            setParentChildRelationships(
                (current) => [
                    ...current,
                    result.relationship,
                ]
            );


            setRelationshipMode(null);


        } catch (error) {

            console.error(
                "Failed to add parent:",
                error
            );

            alert(
                "Unable to add parent."
            );

        }

    }


    /* =====================================
       ADD CHILD
    ===================================== */

    async function handleAddChild(
        name,
        relationshipType,
        partnershipId
    ) {

        if (!selectedPerson) {
            return;
        }


        try {

            if (partnershipId) {

                const partnership =
                    partnerships.find(
                        (item) =>
                            item.id ===
                            partnershipId
                    );


                if (!partnership) {

                    alert(
                        "Partnership not found."
                    );

                    return;

                }


                const result =
                    await addChildToPartnership(
                        partnership,
                        name,
                        relationshipType
                    );


                setPeople(
                    (current) => [
                        ...current,
                        result.child,
                    ]
                );


                setParentChildRelationships(
                    (current) => [
                        ...current,
                        ...result.relationships,
                    ]
                );


            } else {

                const result =
                    await addChild(
                        selectedPerson.id,
                        name,
                        relationshipType
                    );


                setPeople(
                    (current) => [
                        ...current,
                        result.child,
                    ]
                );


                setParentChildRelationships(
                    (current) => [
                        ...current,
                        result.relationship,
                    ]
                );

            }


            setRelationshipMode(null);


        } catch (error) {

            console.error(
                "Failed to add child:",
                error
            );

            alert(
                "Unable to add child."
            );

        }

    }


    /* =====================================
       ADD SIBLING
    ===================================== */

    async function handleAddSibling(
        name,
        relationshipType
    ) {

        if (!selectedPerson) {
            return;
        }


        try {

            const result =
                await addSibling(
                    selectedPerson.id,
                    name,
                    relationshipType
                );


            setPeople(
                (current) => [
                    ...current,
                    result.sibling,
                ]
            );


            setSiblings(
                (current) => [
                    ...current,
                    result.siblingRelationship,
                ]
            );


            setRelationshipMode(null);


        } catch (error) {

            console.error(
                "Failed to add sibling:",
                error
            );

            alert(
                "Unable to add sibling."
            );

        }

    }


    /* =====================================
       ADD PARTNER
    ===================================== */

    async function handleAddPartner(
        name,
        relationshipType
    ) {

        if (!selectedPerson) {
            return;
        }


        try {

            const result =
                await addPartner(
                    selectedPerson.id,
                    name,
                    relationshipType
                );


            setPeople(
                (current) => [
                    ...current,
                    result.partner,
                ]
            );


            setPartnerships(
                (current) => [
                    ...current,
                    result.partnership,
                ]
            );


            setRelationshipMode(null);


        } catch (error) {

            console.error(
                "Failed to add partner:",
                error
            );

            alert(
                "Unable to add partner."
            );

        }

    }


    /* =====================================
       EDIT PERSON
    ===================================== */

    function handleStartEditPerson() {

        if (!selectedPerson) {
            return;
        }


        setIsEditingPerson(true);

    }


    async function handleSavePerson(
        changes
    ) {

        if (!selectedPerson) {
            return;
        }


        try {

            const updatedPerson =
                await updatePerson(
                    selectedPerson.id,
                    changes
                );


            /*
             * Update people.
             */
            setPeople(
                (current) =>
                    current.map(
                        (person) =>
                            person.id ===
                            updatedPerson.id
                                ? updatedPerson
                                : person
                    )
            );


            /*
             * Update selected person.
             */
            setSelectedPerson(
                updatedPerson
            );


            setIsEditingPerson(
                false
            );


        } catch (error) {

            console.error(
                "Failed to update person:",
                error
            );

            alert(
                "Unable to update person."
            );

        }

    }


    /* =====================================
       DELETE PERSON
    ===================================== */

    async function handleDeletePerson() {

        if (!selectedPerson) {
            return;
        }


        const confirmed =
            window.confirm(
                `Delete ${selectedPerson.name}?\n\n` +
                "This will remove the person " +
                "and their relationships."
            );


        if (!confirmed) {
            return;
        }


        const deletedId =
            selectedPerson.id;


        try {

            await deletePerson(
                deletedId
            );


            setPeople(
                (current) =>
                    current.filter(
                        (person) =>
                            person.id !==
                            deletedId
                    )
            );


            setPartnerships(
                (current) =>
                    current.filter(
                        (partnership) =>
                            partnership.personAId !==
                                deletedId &&
                            partnership.personBId !==
                                deletedId
                    )
            );


            setParentChildRelationships(
                (current) =>
                    current.filter(
                        (relationship) =>
                            relationship.parentId !==
                                deletedId &&
                            relationship.childId !==
                                deletedId
                    )
            );


            setSiblings(
                (current) =>
                    current.filter(
                        (relationship) =>
                            relationship.personAId !==
                                deletedId &&
                            relationship.personBId !==
                                deletedId
                    )
            );


            setSelectedPerson(null);


        } catch (error) {

            console.error(
                "Failed to delete person:",
                error
            );

            alert(
                "Unable to delete person."
            );

        }

    }


    /* =====================================
       RENDER
    ===================================== */

    return (

        <div className="app">

            <header className="topbar">

                <h1>
                    Family Tree
                </h1>


                <div className="topbar-actions">

                    <button>
                        Search
                    </button>

                </div>

            </header>


            <main className="main-container">

                <SidePanel

                    selectedPerson={
                        selectedPerson
                    }

                    onClose={() =>
                        setSelectedPerson(null)
                    }

                    onAddFirstPerson={
                        handleAddFirstPerson
                    }

                    newPersonName={
                        newPersonName
                    }

                    setNewPersonName={
                        setNewPersonName
                    }

                    isAddingPerson={
                        isAddingPerson
                    }

                    onStartAddingPerson={
                        handleStartAddingPerson
                    }

                    onCancelAddingPerson={
                        handleCancelAddingPerson
                    }

                    onRelationshipAction={
                        handleRelationshipAction
                    }

                    onEditPerson={
                        handleStartEditPerson
                    }

                    onDeletePerson={
                        handleDeletePerson
                    }

                />


                <section className="tree-area">

                    <FamilyTree

                        people={
                            people
                        }

                        partnerships={
                            partnerships
                        }

                        parentChildRelationships={
                            parentChildRelationships
                        }

                        siblings={
                            siblings
                        }

                        selectedPerson={
                            selectedPerson
                        }

                        onSelectPerson={
                            handleSelectPerson
                        }

                    />

                </section>

            </main>


            {/* =================================
                RELATIONSHIP DIALOG
            ================================= */}

            {relationshipMode &&
                selectedPerson && (

                <RelationshipDialog

                    mode={
                        relationshipMode
                    }

                    person={
                        selectedPerson
                    }

                    people={
                        people
                    }

                    partnerships={
                        partnerships
                    }

                    onClose={
                        closeRelationshipDialog
                    }

                    onAddParent={
                        handleAddParent
                    }

                    onAddChild={
                        handleAddChild
                    }

                    onAddSibling={
                        handleAddSibling
                    }

                    onAddPartner={
                        handleAddPartner
                    }

                />

            )}


            {/* =================================
                EDIT DIALOG
            ================================= */}

            {isEditingPerson &&
                selectedPerson && (

                <EditPersonDialog

                    person={
                        selectedPerson
                    }

                    onClose={() =>
                        setIsEditingPerson(false)
                    }

                    onSave={
                        handleSavePerson
                    }

                />

            )}

        </div>

    );

}


export default App;