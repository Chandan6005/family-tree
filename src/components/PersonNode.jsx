import {
    Handle,
    Position,
} from "reactflow";


function PersonNode({ data }) {

    return (

        <div className="person-node">

            <Handle
                type="target"
                position={Position.Top}
                id="parent-target"
            />

            <Handle
                type="target"
                position={Position.Left}
                id="sibling-target-left"
            />

            <div className="person-node-name">

                {data.name}

            </div>


            {data.gender && (

                <div className="person-node-gender">

                    {data.gender}

                </div>

            )}


            <Handle
                type="source"
                position={Position.Right}
                id="sibling-source-right"
            />

            <Handle
                type="source"
                position={Position.Bottom}
                id="child-source"
            />

        </div>

    );
}


export default PersonNode;