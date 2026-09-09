import {
    useCallback,
    useEffect,
    useMemo,
} from "react";


import ReactFlow, {
    Background,
    Controls,
    MiniMap,
    useEdgesState,
    useNodesState,
} from "reactflow";


import "reactflow/dist/style.css";


import PersonNode from "./PersonNode";


function FamilyTree({
    people,
    partnerships,
    parentChildRelationships,
    siblings,
    selectedPerson,
    onSelectPerson,
}) {


    /* =========================================
       NODES
    ========================================= */

    const generatedNodes =

        useMemo(() => {

            const nodes = [];


            /*
             * Person nodes
             */

            people.forEach(
                (person, index) => {

                    nodes.push({

                        id:
                            `person-${person.id}`,

                        type:
                            "person",

                        position: {

                            x:
                                150 +
                                (index * 250),

                            y:
                                100,

                        },

                        data: {

                            name:
                                person.name,

                            gender:
                                person.gender,

                            personId:
                                person.id,

                        },

                    });

                }
            );


            /*
             * Partnership nodes.
             *
             * These are invisible anchors
             * between two partners.
             */

            partnerships.forEach(
                (partnership, index) => {

                    const personAIndex =
                        people.findIndex(
                            (person) =>
                                person.id ===
                                partnership.personAId
                        );


                    const personBIndex =
                        people.findIndex(
                            (person) =>
                                person.id ===
                                partnership.personBId
                        );


                    const xA =

                        150 +

                        (
                            Math.max(
                                personAIndex,
                                0
                            ) * 250
                        );


                    const xB =

                        150 +

                        (
                            Math.max(
                                personBIndex,
                                0
                            ) * 250
                        );


                    const x =
                        (xA + xB) / 2;


                    nodes.push({

                        id:
                            `partnership-${partnership.id}`,

                        type:
                            "default",

                        position: {

                            x:
                                x,

                            y:
                                220 +
                                (index * 250),

                        },

                        data: {

                            label: "",

                        },

                        style: {

                            width:
                                1,

                            height:
                                1,

                            border:
                                "none",

                            background:
                                "transparent",

                            boxShadow:
                                "none",

                        },

                    });

                }
            );


            return nodes;

        }, [

            people,

            partnerships,

        ]);


    /* =========================================
       EDGES
    ========================================= */

    const generatedEdges =

        useMemo(() => {

            const edges = [];


            /*
             * =====================================
             * PARTNERSHIP LINES
             * =====================================
             */

            partnerships.forEach(
                (partnership) => {

                    const relationshipNode =
                        `partnership-${partnership.id}`;


                    /*
                     * Person A → partnership anchor
                     */

                    edges.push({

                        id:
                            `partner-a-${partnership.id}`,

                        source:
                            `person-${partnership.personAId}`,

                        target:
                            relationshipNode,

                        type:
                            "straight",

                    });


                    /*
                     * Person B → partnership anchor
                     */

                    edges.push({

                        id:
                            `partner-b-${partnership.id}`,

                        source:
                            `person-${partnership.personBId}`,

                        target:
                            relationshipNode,

                        type:
                            "straight",

                    });

                }
            );


            /*
             * =====================================
             * PARENT → CHILD
             * =====================================
             */

            parentChildRelationships.forEach(
                (relationship) => {

                    /*
                     * If the parent belongs to a
                     * partnership, connect the child
                     * to the partnership anchor.
                     */

                    const partnership =
                        partnerships.find(
                            (item) =>

                                item.personAId ===
                                    relationship.parentId ||

                                item.personBId ===
                                    relationship.parentId
                        );


                    if (partnership) {

                        edges.push({

                            id:
                                `parent-child-${relationship.id}`,

                            source:
                                `partnership-${partnership.id}`,

                            target:
                                `person-${relationship.childId}`,

                            type:
                                "smoothstep",

                            label:

                                relationship.type ===
                                "ADOPTIVE"

                                    ? "Adoptive"

                                    : "",

                        });


                    } else {

                        edges.push({

                            id:
                                `parent-child-${relationship.id}`,

                            source:
                                `person-${relationship.parentId}`,

                            target:
                                `person-${relationship.childId}`,

                            type:
                                "smoothstep",

                            label:

                                relationship.type ===
                                "ADOPTIVE"

                                    ? "Adoptive"

                                    : "",

                        });

                    }

                }
            );


            /*
             * =====================================
             * SIBLING RELATIONSHIPS
             * =====================================
             *
             * Siblings use dedicated SIDE handles.
             *
             * Person A
             *      │
             *      └──────── Person B
             *
             * This intentionally differs from
             * partner relationships.
             */

            siblings.forEach(
                (sibling) => {

                    edges.push({

                        id:
                            `sibling-${sibling.id}`,

                        source:
                            `person-${sibling.personAId}`,

                        target:
                            `person-${sibling.personBId}`,

                        /*
                         * Dedicated sibling handles
                         */

                        sourceHandle:
                            "sibling-source-right",

                        targetHandle:
                            "sibling-target-left",

                        /*
                         * Straight horizontal line
                         */

                        type:
                            "straight",

                        /*
                         * Visually distinguish
                         * sibling relationship.
                         */

                        style: {

                            strokeWidth:
                                2,

                            strokeDasharray:
                                "7 5",

                        },

                        /*
                         * Adoptive sibling label
                         */

                        label:

                            sibling.type ===
                            "ADOPTIVE"

                                ? "Adoptive"

                                : "",

                    });

                }
            );


            return edges;

        }, [

            partnerships,

            parentChildRelationships,

            siblings,

        ]);


    /* =========================================
       REACT FLOW STATE
    ========================================= */

    const [
        nodes,
        setNodes,
        onNodesChange,
    ] =
        useNodesState(
            generatedNodes
        );


    const [
        edges,
        setEdges,
        onEdgesChange,
    ] =
        useEdgesState(
            generatedEdges
        );


    /* =========================================
       UPDATE GRAPH WHEN DATA CHANGES
    ========================================= */

    useEffect(() => {

        setNodes(
            generatedNodes
        );


        setEdges(
            generatedEdges
        );

    }, [

        generatedNodes,

        generatedEdges,

        setNodes,

        setEdges,

    ]);


    /* =========================================
       NODE TYPES
    ========================================= */

    const nodeTypes =

        useMemo(

            () => ({

                person:
                    PersonNode,

            }),

            []

        );


    /* =========================================
       PERSON CLICK
    ========================================= */

    const handleNodeClick =

        useCallback(

            (_, node) => {

                /*
                 * Ignore partnership anchors.
                 */

                if (
                    node.type !==
                    "person"
                ) {

                    return;

                }


                onSelectPerson(
                    node.data.personId
                );

            },

            [
                onSelectPerson,
            ]

        );


    /* =========================================
       RENDER
    ========================================= */

    return (

        <div className="family-tree">

            <ReactFlow

                nodes={

                    nodes.map(
                        (node) => ({

                            ...node,

                            selected:

                                node.type ===
                                    "person" &&

                                selectedPerson?.id ===
                                    node.data.personId,

                        })
                    )

                }

                edges={edges}

                onNodesChange={
                    onNodesChange
                }

                onEdgesChange={
                    onEdgesChange
                }

                onNodeClick={
                    handleNodeClick
                }

                nodeTypes={
                    nodeTypes
                }

                fitView

                minZoom={
                    0.15
                }

                maxZoom={
                    2
                }

            >

                <Background />

                <Controls />

                <MiniMap />

            </ReactFlow>

        </div>

    );

}


export default FamilyTree;
