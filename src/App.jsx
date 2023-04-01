import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Blockchain from "./components/Blockchain/Blockchain";
import { Container } from "reactstrap"

function App() {
  return (
    <div className="App">
        <div class="jumbotron jumbotron-fluid back-image">
            <div class="container text-white">
                <h1>Check Crypto Assets</h1>
                <p>Check out these popular crypto assets that fluctuate!</p>
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
