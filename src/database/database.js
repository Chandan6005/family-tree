import Dexie from "dexie";

export const db = new Dexie("FamilyTreeDatabase");

db.version(1).stores({
    people: "id, name, createdAt",
});

db.version(2).stores({
    people: "id, name, createdAt",
    partnerships: "id, personAId, personBId, createdAt",
    parentChild: "id, parentId, childId, type, createdAt",
});

db.version(3).stores({
    people: "id, name, createdAt",
    partnerships: "id, personAId, personBId, createdAt",
    parentChild: "id, parentId, childId, type, createdAt",
    siblings: "id, personAId, personBId, type, createdAt",
});