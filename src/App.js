import { useSelector } from "react-redux";
import Admin from "./component/Admin";
function App() {
    const { darkModeReducer } = useSelector((state) => state);
    return (
        <div className={`${darkModeReducer && "dark"}`}>
            <Admin />
        </div>
    );
}

export default App;
