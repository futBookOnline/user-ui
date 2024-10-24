import PublicRouter from "./routes/PublicRouter"
import io  from "socket.io-client"
// export const socket = io('http://localhost:3000');
export const socket = io('https://user-api-k6g6.onrender.com');

function App() {
  return (
    <PublicRouter />
  )
}

export default App
