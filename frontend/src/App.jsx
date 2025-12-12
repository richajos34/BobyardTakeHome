
import CommentsPage from "./pages/CommentsPage";
import { CommentsProvider } from "./context/CommentsContext";
function App() {

  return (
    <CommentsProvider>
      <CommentsPage />
    </CommentsProvider>
  )
}

export default App
