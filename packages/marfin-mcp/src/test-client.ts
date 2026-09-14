import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {Client} from '@modelcontextprotocol/sdk/client/index.js';
import {StdioClientTransport} from '@modelcontextprotocol/sdk/client/stdio.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const serverPath = resolve(__dirname, 'index.ts');

const client = new Client({
  name: 'marfin-mcp-smoke-test',
  version: '0.0.1',
});

const transport = new StdioClientTransport({
  command: 'bun',
  args: [serverPath],
});

await client.connect(transport);

const tools = await client.listTools();

console.log(
  'Available tools:',
  tools.tools.map((tool) => tool.name).join(', '),
);

const result = await client.callTool({
  name: 'render_video',
  arguments: {
    entryPoint: 'packages/template-helloworld/src/index.ts',
    compositionId: 'OnlyLogo',
    outputPath: 'outputs/mcp-test.mp4',
  },
});

console.log(JSON.stringify(result, null, 2));

await client.close();
