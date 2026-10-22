import { defineConfig } from 'vitest/config';
import { pterodactylTestAliases, pterodactylTestSetup, pterodactylTestDirectory } from '@pterodactyl/sdk/vitest';

export default defineConfig({
    server: { fs: { allow: [process.cwd(), pterodactylTestDirectory] } },
    resolve: { alias: pterodactylTestAliases() },
    // Only this extension's tests: CI checks the panel out into .panel/, whose own specs would otherwise be collected.
    test: { environment: 'jsdom', setupFiles: [pterodactylTestSetup], include: ['src/**/*.spec.{ts,tsx}'] },
});
