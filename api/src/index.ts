import express from 'express';
import * as trpcExpress from '@trpc/server/adapters/express';
import * as trpc from '@trpc/server';
import { AppRouter, appRouter } from './server';
import cors from 'cors';


const api = express();
const PORT = 4000;

api.use(cors());
//api.use(express.json());

api.use((req, _res, next) => {
    // request logger
    console.log('⬅️ ', req.method, req.path, req.body ?? req.query);

    next();
  });

  api.get("/testar", (req, res) => {
      res.end("hej");
  });

const createContext = ({
    req,
    res
}: trpcExpress.CreateExpressContextOptions) => ({});
type Context = trpc.inferAsyncReturnType<typeof createContext>;

api.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
        router: appRouter,
        createContext
    })
);


if (process.env.NODE_ENV !== 'test') {
  api.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default api;