import { defineConfig } from 'vite';
import { VitePluginNode } from 'vite-plugin-node';
import tsconfigPaths from 'vite-tsconfig-paths'
export default defineConfig({
  // ...vite configures
  server: {
    // vite server configs, for details see \[vite doc\](https://vitejs.dev/config/#server-host)
    port: 3000
  },
  plugins: [
    tsconfigPaths(),
    ...VitePluginNode({
      adapter: 'nest',
      appPath: './backend/main.ts',
      tsCompiler: 'swc',
      swcOptions: {
        jsc: {
          parser: {
            decorators: true,
            syntax: 'typescript',
            dynamicImport: true,
          },
          transform: {
            decoratorMetadata: true,
          },
        },
      },
      appName: 'graphql-server',
    }),
  ],
  optimizeDeps: {
    // Vite does not work well with optionnal dependencies,
    // mark them as ignored for now
    exclude: [
        '@nestjs/microservices',
        '@nestjs/websockets',
        'cache-manager',
        'class-transformer',
        'class-validator',
        'fastify-swagger',
      ],
  },
});