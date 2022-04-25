import {Link} from "react-router-dom"

const menu = () => {
    return (
        <ul>
            <li><Link to="/register">Registrar</Link></li>
            <li><Link to="/schedules">Agendamentos</Link></li>
        </ul>
    )
}

export default menu