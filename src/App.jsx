import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Blockchain from "./components/Blockchain/Blockchain";
import { Container } from "reactstrap"

function App() {
  return (
    <div className="App">
        <div class="jumbotron jumbotron-fluid bg-dark">
            <div class="container text-white">
                <h1>Jumbotron</h1>
                <p>Jumbotronのサンプルです</p>
            </div>
        </div>
        <div>
          <Container>
            <Blockchain />
          </Container>
        </div>
    </div>
  )
}
export default App
