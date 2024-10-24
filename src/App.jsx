import PublicRouter from "./routes/PublicRouter"
import io  from "socket.io-client"
export const socket = io('http://localhost:3000');

function App() {
  return (
    <PublicRouter />
  )
}

export default App
