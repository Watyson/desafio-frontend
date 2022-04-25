import {useEffect, useState} from "react"
import {useNavigate} from "react-router-dom";
import axios from "../../services/api"
import Menu from "../../components/menu.js"

const PASSWORD = "123456"

const Schedules = () => {
    const navigate = useNavigate()
    const [users, setUsers] = useState([])

    useEffect(() => {
        axios.get("/schedules/1/20")
             .then((response) => setUsers(response.data))
             .catch((error) => console.error(error))
    }, []);

    const onChangeStatus = async (name, schedule, status) => {
        try {
            if(status === "Realizado") return
            const password = prompt("Digite a senha.")
            if(password !== PASSWORD)
                throw "Senha incorreta!"

            await axios.put(`/schedules/${name}/${String(schedule)}`)
                       .then((response) => setUsers(response.data))
                       .catch((error) => console.error(error))
            alert("Alterado com sucesso.")
            document.location.reload(true);
        }
        catch (error) {
            if(error[5] === ' ')
                alert(error)
            else
                console.log(error)
        }
    }

    return (
        <div>
            <Menu/>
            <h1>Agendamentos realizados</h1>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Data de aniversario</th>
                        <th>Data agendada</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((out) => (
                        <tr >
                            <td>{out.name}</td>
                            <td>{Date(out.birth)}</td>
                            <td>{Date(out.schedule)}</td>
                            <td>
                                <button
                                    className = "statusChange"
                                    onClick = {() => onChangeStatus(out.name, out.schedule, out.status)}
                                >{out.status}</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Schedules