import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import data from './data.json';

const Tree = () => {
    const svgRef = useRef(null);

    useEffect(() => {
        if (!svgRef.current) return;

        const width = 600;
        const height = 600;
        const margin = { top: 20, right: 20, bottom: 20, left: 20 };

        const svg = d3
            .select(svgRef.current)
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        const root = d3.hierarchy(data);

        const treeLayout = d3.tree().size([width, height]);

        treeLayout(root);

        const links = root.links();
        const nodes = root.descendants();

        const link = svg
            .selectAll('.link')
            .data(links)
            .enter()
            .append('path')
            .attr('class', 'link')
            .attr('d', d3.linkHorizontal().x(d => d.y).y(d => d.x));

        const node = svg
            .selectAll('.node')
            .data(nodes)
            .enter()
            .append('g')
            .attr('class', 'node')
            .attr('transform', d => `translate(${d.y},${d.x})`);

        node.append('circle').attr('r', 4);

        node.append('text')
            .attr('dy', 5)
            .attr('x', d => (d.children ? -8 : 8))
            .style('text-anchor', d => (d.children ? 'end' : 'start'))
            .text(d => d.data.name);
    }, []);

    return <svg ref={svgRef}></svg>;
};

export default Tree;
