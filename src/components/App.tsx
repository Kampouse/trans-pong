import Avatar from 'components/Avatar'
import {Menu} from 'components/menu'
import PlayMenu from 'components/PlayMenu'
import CreateGame from 'components/CreateGame'
import Chat from 'components/Chat'

export default function App() {
  return (

        <div className="bg-im w-full min-h-screen overflow-x-hidden bg-gradient-to-r from-purple-500 to-pink-500 py-18  h-screen">
			<PlayMenu />
			<CreateGame />
			<Menu />
			<Chat />
    </div>
  )
}

