import { createReactQueryHooks } from "@trpc/react";
import type { appRouter } from '../../api/src/server';

export const trpc = createReactQueryHooks<appRouter>();