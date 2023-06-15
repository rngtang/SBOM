import {
    sOpenObject,
    sLiteral,
    sArrayOf,
    sString,
    optionalProp,
    sUnion,
} from "@hediet/semantic-json";
import { visualizationNs } from "./consts";

export const sGraphNode = sOpenObject({
    id: sString(),
    label: optionalProp(sString(), {}),
    color: optionalProp(sString(), {}),
    shape: optionalProp(sUnion([sLiteral("ellipse"), sLiteral("box")]), {}),
}).defineAs(visualizationNs("GraphNode"));

export const sGraphEdge = sOpenObject({
    from: sString(),
    to: sString(),
    label: optionalProp(sString(), {}),
    id: optionalProp(sString(), {}),
    color: optionalProp(sString(), {}),
    style: optionalProp(
        sUnion([sLiteral("solid"), sLiteral("dashed"), sLiteral("dotted")]),
        {}
    ),
}).defineAs(visualizationNs("GraphEdge"));

export const sGraph = sOpenObject({
    kind: sOpenObject({ graph: sLiteral(true) }),
    nodes: sArrayOf(sGraphNode),
    edges: sArrayOf(sGraphEdge),
}).defineAs(visualizationNs("GraphVisualizationData"));
