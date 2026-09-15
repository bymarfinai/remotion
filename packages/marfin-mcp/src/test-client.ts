import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {Client} from '@modelcontextprotocol/sdk/client/index.js';
import {StdioClientTransport} from '@modelcontextprotocol/sdk/client/stdio.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const serverPath = resolve(__dirname, 'index.js');

const client = new Client({
  name: 'marfin-create-video-test',
  version: '0.0.1',
});

const transport = new StdioClientTransport({
  command: 'node',
  args: [serverPath],
});

await client.connect(transport);

const tools = await client.listTools();

console.log(
  'Available tools:',
  tools.tools.map((tool) => tool.name).join(', '),
);

const sourceCode = `
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export const Video = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const enter = spring({
    frame,
    fps,
    config: {
      damping: 16,
      stiffness: 120,
    },
  });

  const y = interpolate(enter, [0, 1], [100, 0]);
  const scale = interpolate(enter, [0, 1], [0.9, 1]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#080B10',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        style={{
          transform: \`translateY(\${y}px) scale(\${scale})\`,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            color: '#7CFFB2',
            fontSize: 28,
            letterSpacing: 8,
            marginBottom: 28,
          }}
        >
          MARFIN MOTION
        </div>

        <div
          style={{
            color: 'white',
            fontSize: 120,
            fontWeight: 700,
            letterSpacing: -6,
          }}
        >
          CREATED BY MCP.
        </div>
      </div>
    </AbsoluteFill>
  );
};
`;

const createResult = await client.callTool(
  {
    name: 'create_video',
    arguments: {
      name: 'mcp-create-test',
      compositionId: 'McpCreateTest',
      sourceCode,
      durationInFrames: 90,
      fps: 30,
      width: 1920,
      height: 1080,
    },
  },
  undefined,
  {
    timeout: 120_000,
  },
);

console.log('CREATE RESULT');
console.log(JSON.stringify(createResult, null, 2));

const renderResult = await client.callTool(
  {
    name: 'render_video',
    arguments: {
      entryPoint:
        'packages/marfin-video/src/generated/mcp-create-test/index.tsx',
      compositionId: 'McpCreateTest',
      outputPath: 'outputs/mcp-create-test.mp4',
    },
  },
  undefined,
  {
    timeout: 300_000,
  },
);

console.log('RENDER RESULT');
console.log(JSON.stringify(renderResult, null, 2));

await client.close();