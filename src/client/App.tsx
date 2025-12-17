import Header from "./components/header/Header";
// import CreatePantryItemContainer from './components/create-container/CreatePantryItemContainer'
import Footer from "./components/footer/Footer";
// import PantryItemContainer from './components/pantry/PantryItemContainer'
import PantryPage from "./components/pantry/PantryPage";

import "./App.css";
import CreatePantryItemContainer from "./components/create-container/CreatePantryItemContainer";
import PantryItemContainer from "./components/pantry/PantryItemContainer";

function App() {
  return (
    <>
      <div className="app-container">
        <Header />
        <PantryPage />
        {/* <CreatePantryItemContainer/>
      <PantryItemContainer/> */}
      </div>

      <Footer />
    </>
  );
}

export default App;
