import {
    createPerson,
    createPartnership,
    createParentChild,
    createSibling,
} from "./personService";


/* =========================================
   BUILD PERSON
========================================= */

export function buildPerson(name) {

    return {

        id: crypto.randomUUID(),

        name: name.trim(),

        gender: "",

        birthDate: null,

        deathDate: null,

        notes: "",

        createdAt:
            new Date().toISOString(),

    };

}


/* =========================================
   BUILD PARTNERSHIP
========================================= */

export function buildPartnership(
    personAId,
    personBId,
    type = "MARRIAGE"
) {

    return {

        id: crypto.randomUUID(),

        personAId,

        personBId,

        type,

        startDate: null,

        endDate: null,

        createdAt:
            new Date().toISOString(),

    };

}


/* =========================================
   BUILD PARENT / CHILD
========================================= */

export function buildParentChild(
    parentId,
    childId,
    type = "BIOLOGICAL"
) {

    return {

        id: crypto.randomUUID(),

        parentId,

        childId,

        type,

        createdAt:
            new Date().toISOString(),

    };

}


/* =========================================
   BUILD SIBLING
========================================= */

export function buildSibling(
    personAId,
    personBId,
    type = "BIOLOGICAL"
) {

    return {

        id: crypto.randomUUID(),

        personAId,

        personBId,

        type,

        createdAt:
            new Date().toISOString(),

    };

}


/* =========================================
   ADD PARENT
========================================= */

export async function addParent(
    childId,
    parentName,
    relationshipType = "BIOLOGICAL"
) {

    const parent =
        buildPerson(parentName);

    await createPerson(parent);


    const relationship =
        buildParentChild(
            parent.id,
            childId,
            relationshipType
        );

    await createParentChild(
        relationship
    );


    return {
        parent,
        relationship,
    };

}


/* =========================================
   ADD CHILD
========================================= */

export async function addChild(
    parentId,
    childName,
    relationshipType = "BIOLOGICAL"
) {

    const child =
        buildPerson(childName);

    await createPerson(child);


    const relationship =
        buildParentChild(
            parentId,
            child.id,
            relationshipType
        );

    await createParentChild(
        relationship
    );


    return {
        child,
        relationship,
    };

}


/* =========================================
   ADD CHILD TO PARTNERSHIP
========================================= */

export async function addChildToPartnership(
    partnership,
    childName,
    relationshipType = "BIOLOGICAL"
) {

    const child =
        buildPerson(childName);

    await createPerson(child);


    const parentA =
        buildParentChild(
            partnership.personAId,
            child.id,
            relationshipType
        );


    const parentB =
        buildParentChild(
            partnership.personBId,
            child.id,
            relationshipType
        );


    await createParentChild(parentA);

    await createParentChild(parentB);


    return {

        child,

        relationships: [
            parentA,
            parentB,
        ],

    };

}


/* =========================================
   ADD PARTNER
========================================= */

export async function addPartner(
    personId,
    partnerName,
    partnershipType = "MARRIAGE"
) {

    const partner =
        buildPerson(partnerName);

    await createPerson(partner);


    const partnership =
        buildPartnership(
            personId,
            partner.id,
            partnershipType
        );


    await createPartnership(
        partnership
    );


    return {
        partner,
        partnership,
    };

}


/* =========================================
   ADD SIBLING
========================================= */

export async function addSibling(
    personId,
    siblingName,
    relationshipType = "BIOLOGICAL"
) {

    const sibling =
        buildPerson(siblingName);

    await createPerson(sibling);


    const siblingRelationship =
        buildSibling(
            personId,
            sibling.id,
            relationshipType
        );


    await createSibling(
        siblingRelationship
    );


    return {

        sibling,

        siblingRelationship,

    };

}