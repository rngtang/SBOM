import { Network, Options, DataSet } from "vis-network/standalone";
import { observer } from "mobx-react-lite";
import React from "react";

export const VisJsGraphViewer = observer((props) => {
    const divRef = React.createRef();
    const nodes = new DataSet();
    const edges = new DataSet();

    function synchronizeData() {
        const newNodes = new Set();
        for (const n of props.nodes) {
            newNodes.add(n.id);
            nodes.update({
                id: n.id,
                label: n.label !== undefined ? n.label : n.id,
                color: n.color,
                shape: n.shape,
            });
        }
        nodes.forEach(item => {
            if (!newNodes.has(item.id)) {
                nodes.remove(item);
            }
        });

        function getIdOfEdge(e) {
            if (e.id) {
                return e.id;
            }
            return e.from + "####" + e.to + "|" + e.label;
        }

        const newEdges = new Set();
        for (const n of props.edges) {
            const id = getIdOfEdge(n);
            newEdges.add(id);
            edges.update({
                id: id,
                label: n.label !== undefined ? n.label : "",
                from: n.from,
                to: n.to,
                color: n.color,
                dashes: { dashed: true, dotted: [1, 4], solid: false }[n.style || "solid"],
            });
        }
        edges.forEach(item => {
            if (!newEdges.has(item.id)) {
                edges.remove(item);
            }
        });
    }

    React.useEffect(() => {
        synchronizeData();

        const data = {
            nodes: nodes,
            edges: edges,
        };
        const options = {
            edges: {
                arrows: {
                    to: { enabled: true, scaleFactor: 1, type: "arrow" },
                },
            },
        };
        // @ts-ignore
        const network = new Network(divRef.current, data, options);
    }, [props.nodes, props.edges]);

    return (
        <div
            className="component-VisJsGraphViewer"
            style={props.style}
            ref={divRef}
        />
    );
});
