import { useSelector } from "react-redux";
import Admin from "./component/Admin";
import { ToastContainer } from "react-toastify";
function App() {
    const { darkModeReducer } = useSelector((state) => state);
    return (
        <div className={`${darkModeReducer && "dark"}`}>
            <ToastContainer position={"top-center"} />
            <Admin />
            hello boss
        </div>
    );
}

export default App;
