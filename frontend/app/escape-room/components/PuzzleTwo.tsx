"use client";

import { useCallback, useEffect, useMemo } from "react";
import {
  ReactFlow,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  addEdge,
  Background,
  Controls,
  Handle,
  Position,
  type Connection,
  type Edge,
  type Node,
  type NodeProps,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { usePlayerStore } from "@/store/usePlayerStore";

type CyberNodeData = {
  label: string;
  sublabel: string;
  icon: string;
};

type CyberFlowNode = Node<CyberNodeData, "cyber">;

const TARGET_ONLY_IDS = new Set(["db", "cache", "auth"]);

function CyberNode({ id, data, selected }: NodeProps<CyberFlowNode>) {
  return (
    <div
      className={`px-4 py-3 rounded bg-black/90 border font-mono transition-all duration-200 min-w-[160px] flex items-center gap-3
      ${selected ? "border-success shadow-[0_0_20px_rgba(34,197,94,0.6)] scale-105 z-50 ring-2 ring-success/50" : "border-success/40 shadow-none"}
    `}
    >
      {id !== "client" && (
        <Handle
          type="target"
          position={Position.Left}
          className="w-5 h-5 bg-error border-black border-2 after:absolute after:-inset-4"
        />
      )}

      <div className="text-2xl">{data.icon}</div>
      <div className="flex flex-col">
        <span className="text-success font-bold text-sm tracking-wider">
          {data.label}
        </span>
        <span className="text-success/50 text-[10px] uppercase">
          {data.sublabel}
        </span>
      </div>

      {!TARGET_ONLY_IDS.has(id) && (
        <Handle
          type="source"
          position={Position.Right}
          className="w-5 h-5 bg-success border-black border-2 after:absolute after:-inset-4 after:bg-transparent after:content-[''] cursor-crosshair hover:scale-125 transition-transform duration-200"
        />
      )}
    </div>
  );
}

const initialNodes: CyberFlowNode[] = [
  {
    id: "client",
    type: "cyber",
    position: { x: 50, y: 150 },
    data: {
      label: "FRONTEND",
      sublabel: "Next.js Client",
      icon: "💻",
    },
  },
  {
    id: "gateway",
    type: "cyber",
    position: { x: 50, y: 350 },
    data: {
      label: "API GATEWAY",
      sublabel: "Load Balancer",
      icon: "🚪",
    },
  },
  {
    id: "auth",
    type: "cyber",
    position: { x: 250, y: 50 },
    data: { label: "AUTH", sublabel: "JWT Service", icon: "🔑" },
  },
  {
    id: "core",
    type: "cyber",
    position: { x: 300, y: 400 },
    data: {
      label: "CORE API",
      sublabel: "Python Backend",
      icon: "⚙️",
    },
  },
  {
    id: "db",
    type: "cyber",
    position: { x: 600, y: 100 },
    data: { label: "DATABASE", sublabel: "PostgreSQL", icon: "🗄️" },
  },
  {
    id: "cache",
    type: "cyber",
    position: { x: 650, y: 350 },
    data: { label: "CACHE", sublabel: "Redis", icon: "⚡" },
  },
];

const REQUIRED_CONNECTIONS: Pick<Edge, "source" | "target">[] = [
  { source: "client", target: "gateway" },
  { source: "gateway", target: "auth" },
  { source: "gateway", target: "core" },
  { source: "core", target: "db" },
  { source: "core", target: "cache" },
];

const isArchitectureRestored = (edges: Edge[]): boolean =>
  REQUIRED_CONNECTIONS.every((req) =>
    edges.some(
      (edge) => edge.source === req.source && edge.target === req.target,
    ),
  );

export default function PuzzleTwo() {
  const advanceLevel = usePlayerStore((state) => state.advanceLevel);
  const nodeTypes = useMemo(() => ({ cyber: CyberNode }), []);

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const isSuccess = isArchitectureRestored(edges);

  const onConnect = useCallback(
    (params: Connection) => {
      const newEdge = {
        ...params,
        animated: true,
        style: {
          stroke: "#22c55e",
          strokeWidth: 3,
          filter: "drop-shadow(0px 0px 5px rgba(34,197,94,0.8))",
        },
      };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [setEdges],
  );

  useEffect(() => {
    if (!isSuccess) return undefined;

    const timeoutId = window.setTimeout(() => {
      advanceLevel();
    }, 4000);

    return () => window.clearTimeout(timeoutId);
  }, [isSuccess, advanceLevel]);

  return (
    <div className="max-w-5xl mx-auto mt-6">
      <div className="mb-4 bg-black p-4 border border-success/30 rounded">
        <h3 className="text-success text-xl font-mono">
          {">"} TASK_02: CLOUD_INFRASTRUCTURE_REPAIR
        </h3>
        <p className="text-success/70 font-mono text-sm mt-2">
          The distributed system is down. Rearrange the servers (drag) and
          connect the nodes (drag cables from green ports to red ports).
        </p>
        <ul className="text-xs text-success/50 mt-2 list-disc pl-5">
          <li>Inbound traffic must pass through the Gateway.</li>
          <li>
            The Gateway verifies tokens with Auth and routes requests to Core
            API.
          </li>
          <li>Core API talks to the relational database and the Cache.</li>
        </ul>
      </div>

      <div className="h-[600px] w-full border-2 border-success/30 rounded-lg overflow-hidden bg-[#050505] relative shadow-inner">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          defaultEdgeOptions={{ type: "smoothstep" }}
        >
          <Background
            color="#166534"
            gap={30}
            size={1.5}
            variant={BackgroundVariant.Dots}
          />
          <Controls className="fill-success border-success" />
        </ReactFlow>

        {isSuccess && (
          <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center z-50 backdrop-blur-md">
            <h2 className="text-5xl text-success font-bold tracking-widest drop-shadow-[0_0_20px_rgba(34,197,94,1)] mb-4">
              ARCHITECTURE RESTORED
            </h2>
            <div className="text-success/70 font-mono animate-pulse">
              {">"} Initializing services... 100%
            </div>
            <div className="text-success/70 font-mono animate-pulse delay-75">
              {">"} Database synchronized.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
