import Header from "@/components/Header";
import Registry from "@/components/Registry";
import serversData from "@/data/mcp-servers.json";
import { MCPServer } from "@/data/types";

const servers: MCPServer[] = serversData as MCPServer[];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Registry servers={servers} />
    </div>
  );
}
