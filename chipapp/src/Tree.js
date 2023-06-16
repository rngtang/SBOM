import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3'

const Tree = () => {
    useEffect(() => {
      // D3 code for your visualization
      // You can use d3.select and other D3 functions here
      
      // Example: Create an SVG element
      const svg = d3
        .select('#d3-container')
        .append('svg')
        .attr('width', 400)
        .attr('height', 200);
  
      svg
        .append('rect')
        .attr('x', 50)
        .attr('y', 50)
        .attr('width', 300)
        .attr('height', 100)
        .attr('fill', 'steelblue');
    }, []);
  
    return <div id="d3-container"></div>;
  };

export default Tree;