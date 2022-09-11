import { useState } from 'react'
import { QueryClient } from 'react-query'
import {QueryClientProvider} from 'react-query'
import Avatar from 'components/Avatar'
import {Menu} from 'components/menu'
import PlayMenu from 'components/PlayMenu'
import CreateGame from 'components/CreateGame'
import Game from 'components/Game'
import {trpc} from "../../utils/trpc"
import { json } from 'node:stream/consumers'




function Test() {
  const hello = trpc.useQuery(["getStudent","jean"]);
  return <div>  {hello.data?.id} </div>;
}

export default function App() {
  

const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      url: 'http://localhost:4000/trpc'
    }),
  );

  return (

  <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
                <div className="bg-im w-full min-h-screen overflow-x-hidden bg-gradient-to-r from-purple-500 to-pink-500 py-18  h-screen">
              <Test></Test>
			<PlayMenu />
			<CreateGame />
			<Menu />
      <Game/>
    </div>
      </QueryClientProvider>
    </trpc.Provider>


  )
}

