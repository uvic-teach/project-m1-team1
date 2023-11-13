import "./App.css";
import AuthProvider from "./context/auth_provider";
import Routes from "./routes/routes";



function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes/>
      </AuthProvider>
    </div>
  );
}

export default App;
