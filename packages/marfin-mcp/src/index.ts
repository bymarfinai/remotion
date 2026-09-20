#!/usr/bin/env node

import {spawn} from 'node:child_process';
import {mkdir, readFile, writeFile} from 'node:fs/promises';
import {dirname, isAbsolute, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js';
import {StdioServerTransport} from '@modelcontextprotocol/sdk/server/stdio.js';
import * as z from 'zod/v4';
import {findStyle, STYLE_REGISTRY} from './styles';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const REPO_ROOT = resolve(__dirname, '../../..');

const server = new McpServer({
  name: 'marfin-remotion-mcp',
  version: '0.0.3',
});

server.registerTool(
  'marfin_status',
  {
    title: 'Check Marfin Remotion MCP',
    description: 'Checks whether the local Marfin Remotion MCP server is running.',
  },
  async () => ({
    content: [
      {
        type: 'text',
        text: `Marfin Remotion MCP is running locally. Repo: ${REPO_ROOT}`,
      },
    ],
  }),
);

server.registerTool(
  'list_styles',
  {
    title: 'List Marfin Motion styles',
    description:
      'Lists the named creative-direction styles available to the Marfin Remotion workflow, including IDs and aliases.',
  },
  async () => ({
    content: [
      {
        type: 'text',
        text: STYLE_REGISTRY.map(
          (style, index) =>
            `${String(index + 1).padStart(3, '0')} | ${style.displayName}\n` +
            `ID: ${style.id}\n` +
            `Aliases: ${style.aliases.join(', ')}\n` +
            `${style.summary}`,
        ).join('\n\n'),
      },
    ],
  }),
);

server.registerTool(
  'get_style',
  {
    title: 'Get Marfin Motion style',
    description:
      'Resolves a style by ID, display name, or alias and returns its full creative-direction guide for video generation.',
    inputSchema: {
      style: z
        .string()
        .min(1)
        .describe(
          'Style ID, display name, or alias, for example KEC or kinetic-editorial-collage.',
        ),
    },
  },
  async ({style}) => {
    const match = findStyle(style);

    if (!match) {
      return {
        content: [
          {
            type: 'text',
            text:
              `Unknown style: ${style}\nAvailable styles: ` +
              STYLE_REGISTRY.map((item) => item.displayName).join(', '),
          },
        ],
        isError: true,
      };
    }

    const guide = await readFile(
      resolve(__dirname, '..', match.guidePath),
      'utf8',
    );

    return {
      content: [
        {
          type: 'text',
          text:
            `STYLE_ID: ${match.id}\n` +
            `DISPLAY_NAME: ${match.displayName}\n` +
            `ALIASES: ${match.aliases.join(', ')}\n\n` +
            guide,
        },
      ],
    };
  },
);

server.registerTool(
  'create_video',
  {
    title: 'Create Remotion video',
    description:
      'Creates a standalone Remotion composition inside the local Marfin video workspace from React/TSX source code.',
    inputSchema: {
      name: z
        .string()
        .regex(/^[A-Za-z0-9_-]+$/)
        .describe('Safe video folder name, for example trezio-launch'),
      compositionId: z
        .string()
        .regex(/^[A-Za-z0-9_-]+$/)
        .describe('Remotion composition ID, for example TrezioLaunch'),
      sourceCode: z
        .string()
        .min(1)
        .describe(
          'Complete TSX source for a named React component exported as Video.',
        ),
      durationInFrames: z.number().int().positive(),
      fps: z.number().int().positive().default(30),
      width: z.number().int().positive().default(1920),
      height: z.number().int().positive().default(1080),
    },
  },
  async ({
    name,
    compositionId,
    sourceCode,
    durationInFrames,
    fps,
    width,
    height,
  }) => {
    const videoDirectory = resolve(
      REPO_ROOT,
      'packages',
      'marfin-video',
      'src',
      'generated',
      name,
    );

    await mkdir(videoDirectory, {recursive: true});

    const videoPath = resolve(videoDirectory, 'Video.tsx');
    const entryPath = resolve(videoDirectory, 'index.tsx');

    const entrySource = `import {Composition, registerRoot} from 'remotion';
import {Video} from './Video';

const GeneratedVideo: React.FC = () => {
  return (
    <Composition
      id="${compositionId}"
      component={Video}
      durationInFrames={${durationInFrames}}
      fps={${fps}}
      width={${width}}
      height={${height}}
    />
  );
};

registerRoot(GeneratedVideo);
`;

    await writeFile(videoPath, sourceCode, 'utf8');
    await writeFile(entryPath, entrySource, 'utf8');

    const relativeEntry =
      `packages/marfin-video/src/generated/${name}/index.tsx`;

    return {
      content: [
        {
          type: 'text',
          text:
            `Video source created successfully.\n` +
            `Name: ${name}\n` +
            `Composition: ${compositionId}\n` +
            `Entry point: ${relativeEntry}\n` +
            `Video source: packages/marfin-video/src/generated/${name}/Video.tsx`,
        },
      ],
    };
  },
);

server.registerTool(
  'render_video',
  {
    title: 'Render Remotion video',
    description:
      'Renders a Remotion composition locally using the Marfin Remotion fork.',
    inputSchema: {
      entryPoint: z.string().describe(
        'Remotion entry file relative to the repository root.',
      ),
      compositionId: z.string().describe(
        'The Remotion composition ID to render.',
      ),
      outputPath: z.string().default('outputs/render.mp4').describe(
        'Output file path relative to the repository root.',
      ),
    },
  },
  async ({entryPoint, compositionId, outputPath}) => {
    const entry = isAbsolute(entryPoint)
      ? entryPoint
      : resolve(REPO_ROOT, entryPoint);

    const output = isAbsolute(outputPath)
      ? outputPath
      : resolve(REPO_ROOT, outputPath);

    await mkdir(dirname(output), {recursive: true});

    return await new Promise((resolvePromise) => {
      const child = spawn(
        process.execPath,
        [
          resolve(REPO_ROOT, 'packages/cli/remotion-cli.js'),
          'render',
          entry,
          compositionId,
          output,
        ],
        {
          cwd: REPO_ROOT,
          windowsHide: true,
        },
      );

      let stdout = '';
      let stderr = '';

      child.stdout.on('data', (data) => {
        stdout += data.toString();
      });

      child.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      child.on('error', (error) => {
        resolvePromise({
          content: [
            {
              type: 'text',
              text: `Render failed to start: ${error.message}`,
            },
          ],
          isError: true,
        });
      });

      child.on('close', (code) => {
        if (code !== 0) {
          resolvePromise({
            content: [
              {
                type: 'text',
                text:
                  `Render failed with exit code ${code}.\n\n` +
                  `STDOUT:\n${stdout}\n\nSTDERR:\n${stderr}`,
              },
            ],
            isError: true,
          });

          return;
        }

        resolvePromise({
          content: [
            {
              type: 'text',
              text:
                `Render completed successfully.\n` +
                `Composition: ${compositionId}\n` +
                `Output: ${output}\n\n${stdout}`,
            },
          ],
        });
      });
    });
  },
);

const transport = new StdioServerTransport();
await server.connect(transport);
