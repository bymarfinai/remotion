#!/usr/bin/env node

import {spawn} from 'node:child_process';
import {mkdir} from 'node:fs/promises';
import {dirname, isAbsolute, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js';
import {StdioServerTransport} from '@modelcontextprotocol/sdk/server/stdio.js';
import * as z from 'zod/v4';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const REPO_ROOT = resolve(__dirname, '../../..');

const server = new McpServer({
  name: 'marfin-remotion-mcp',
  version: '0.0.2',
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
        'bun',
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
