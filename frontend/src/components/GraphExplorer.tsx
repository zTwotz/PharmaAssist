'use client';

import React, { useRef, useEffect } from 'react';
import ForceGraph2D from 'react-force-graph-2d';

interface GraphExplorerProps {
  graphData: {
    nodes: any[];
    links: any[];
  };
  onNodeClick?: (node: any) => void;
  onLinkClick?: (link: any) => void;
}

export default function GraphExplorer({ graphData, onNodeClick, onLinkClick }: GraphExplorerProps) {
  const fgRef = useRef<any>(null);

  useEffect(() => {
    // Optionally auto-zoom to fit the graph
    if (fgRef.current && graphData.nodes.length > 0) {
      setTimeout(() => {
        fgRef.current?.zoomToFit(400, 50);
      }, 500);
    }
  }, [graphData]);

  return (
    <ForceGraph2D
      ref={fgRef}
      graphData={graphData}
      nodeLabel={(node: any) => node.properties?.name || node.id}
      nodeAutoColorBy="labels"
      linkDirectionalArrowLength={3.5}
      linkDirectionalArrowRelPos={1}
      linkLabel={(link: any) => link.type}
      onNodeClick={onNodeClick}
      onLinkClick={onLinkClick}
      // Set width/height or make it responsive
      width={typeof window !== 'undefined' ? window.innerWidth - 300 : 800}
      height={typeof window !== 'undefined' ? window.innerHeight - 150 : 600}
    />
  );
}
