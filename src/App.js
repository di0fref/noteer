import Home from "./pages/Home";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {
    BrowserRouter,
    Switch,
    Route,
    Link, Routes
} from "react-router-dom";

function App() {
    return (
        <div className={""}>
            <DndProvider backend={HTML5Backend} debugMode={true}>
                <Routes>
                    <Route path={"/:type/:id"} element={<Home/>}/>
                    <Route exact path={"/"} element={<Home/>}/>
                </Routes>
                {/*<Home/>*/}
            </DndProvider>
        </div>
        // <DndProvider backend={HTML5Backend} debugMode={true}>
        // <Home/>
        // </DndProvider>
    );
}

export default App;
