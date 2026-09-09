import { db } from "../database/database";


/* =========================================
   PEOPLE
========================================= */

export async function createPerson(person) {
    await db.people.add(person);
    return person;
}


export async function getAllPeople() {
    return await db.people.toArray();
}


export async function getPerson(id) {
    return await db.people.get(id);
}


export async function updatePerson(id, changes) {
    await db.people.update(id, changes);
    return await db.people.get(id);
}


/* =========================================
   DELETE PERSON
========================================= */

export async function deletePerson(id) {

    /*
     * Delete person.
     */
    await db.people.delete(id);


    /*
     * Delete relationships where this
     * person is a parent.
     */
    await db.parentChild
        .where("parentId")
        .equals(id)
        .delete();


    /*
     * Delete relationships where this
     * person is a child.
     */
    await db.parentChild
        .where("childId")
        .equals(id)
        .delete();


    /*
     * Delete sibling relationships.
     */
    await db.siblings
        .where("personAId")
        .equals(id)
        .delete();


    await db.siblings
        .where("personBId")
        .equals(id)
        .delete();


    /*
     * Delete partnerships.
     */
    const partnerships =
        await db.partnerships
            .filter(
                (partnership) =>
                    partnership.personAId === id ||
                    partnership.personBId === id
            )
            .toArray();


    for (const partnership of partnerships) {

        await db.partnerships.delete(
            partnership.id
        );

    }

}


/* =========================================
   CLEAR EVERYTHING
========================================= */

export async function deleteAllPeople() {

    await db.people.clear();

    await db.partnerships.clear();

    await db.parentChild.clear();

    await db.siblings.clear();

}


/* =========================================
   PARTNERSHIPS
========================================= */

export async function createPartnership(
    partnership
) {

    await db.partnerships.add(
        partnership
    );

    return partnership;

}


export async function getAllPartnerships() {

    return await db.partnerships.toArray();

}


export async function getPartnership(id) {

    return await db.partnerships.get(id);

}


export async function updatePartnership(
    id,
    changes
) {

    await db.partnerships.update(
        id,
        changes
    );

    return await db.partnerships.get(id);

}


export async function deletePartnership(id) {

    await db.partnerships.delete(id);

}


/* =========================================
   PARENT / CHILD
========================================= */

export async function createParentChild(
    relationship
) {

    await db.parentChild.add(
        relationship
    );

    return relationship;

}


export async function getAllParentChildRelationships() {

    return await db.parentChild.toArray();

}


export async function getParents(childId) {

    return await db.parentChild
        .where("childId")
        .equals(childId)
        .toArray();

}


export async function getChildren(parentId) {

    return await db.parentChild
        .where("parentId")
        .equals(parentId)
        .toArray();

}


/* =========================================
   SIBLINGS
========================================= */

export async function createSibling(
    relationship
) {

    await db.siblings.add(
        relationship
    );

    return relationship;

}


export async function getAllSiblings() {

    return await db.siblings.toArray();

}


export async function deleteSibling(
    id
) {

    await db.siblings.delete(id);

}