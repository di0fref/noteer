import Home from "./pages/Home";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

function App() {
    return (
        // <div className={"antialiased"}>
        <DndProvider backend={HTML5Backend} debugMode={true}>
            <Home/>
        </DndProvider>
        // </div>
    );
}

export default App;
