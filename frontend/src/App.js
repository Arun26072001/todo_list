import './App.css';
import UserList from './components/UserList';
import {ToastContainer} from "react-toastify";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <UserList />
      <ToastContainer />
    </div>
  );
}

export default App;
