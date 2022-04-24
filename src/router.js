import Register from "./pages/register"
import Schedules from "./pages/schedules"
import {BrowserRouter, Routes, Route} from "react-router-dom"

const Router = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/schedules" element={<Schedules />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default Router