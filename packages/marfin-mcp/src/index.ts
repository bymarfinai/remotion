#!/usr/bin/env node

import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js';
import {StdioServerTransport} from '@modelcontextprotocol/sdk/server/stdio.js';

const server = new McpServer({
  name: 'marfin-remotion-mcp',
  version: '0.0.1',
});

server.registerTool(
  'marfin_status',
  {
    title: 'Check Marfin Remotion MCP',
    description: 'Checks whether the local Marfin Remotion MCP server is running.',
  },
  async () => {
    return {
      content: [
        {
          type: 'text',
          text: 'Marfin Remotion MCP is running locally.',
        },
      ],
    };
  },
);

const transport = new StdioServerTransport();
await server.connect(transport);
