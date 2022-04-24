import React, {useState, useCallback} from "react"
import DatePicker from "react-datepicker"
import Menu from "../../components/layout/menu.js"
import axios from "../../services/api"
import "react-datepicker/dist/react-datepicker.css"

const MINHOUR = 7
const MAXHOUR = 17

const Register = () => {
    const filterPassedTime = (time) => {
        const currentDate = new Date()
        const selectDate  = new Date(time)
        const selectHour  = selectDate.getHours()
    
        return currentDate.getTime() < selectDate.getTime() && selectHour >= MINHOUR && selectHour <= MAXHOUR;
    }
    
    const [form, setForm] = useState({
        name: "",
        birth: "",
        schedule: "",
    })

    const onChange = (event) => {
        setForm((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }))
    }

    const onSubmit = useCallback(async () => {
        try{
            await axios.post("/toschedule", form)
        }
        catch(error){
            console.log(form)
            alert(error.response.data.message)
        }
    }, [form])

    return (
        <div>
            <Menu/>
            <div className = "content">
                <h1>Registre-se abaixo para agendar sua vacinação contra a covid 19</h1>
                <form>
                    <div className="input-container">
                        <label>Nome*</label><br/>
                        <input
                            id = "name"
                            className="form-field"
                            name = "name"
                            type = "text"
                            placeholder = "Jose..."
                            onChange = {onChange}
                            value = {form.name}
                            required = {true}
                        />
                        <p/>
                    </div>
                    
                    <div className="input-container">
                        <label>Data de nascimento*</label><br/>
                        <DatePicker
                            id="birthDate"
                            className = "form-field"
                            name = "birth"
                            placeholderText = "Nascido em..."
                            onChange = {(value) => onChange({target: {name: "birth", value}})}
                            value = {form.birth}
                            maxDate = {Date.now()}
                            dateFormat = "dd/MM/yyyy"
                            selected={form.birth}
                            required = {true}
                        />
                        <p/>
                    </div>
                    
                    <div className="input-container">
                        <label>Data para agendamento*</label><br/>
                        <DatePicker
                            id = "scheduleDate"
                            className = "form-field"
                            name = "schedule"
                            placeholderText = "Agendar..."
                            onChange = {(value) => onChange({target: {name: "schedule", value}})}
                            value = {form.schedule}
                            showTimeSelect
                            timeIntervals={60}
                            filterTime = {filterPassedTime}
                            minDate = {Date.now()}
                            dateFormat = "dd/MM/yyyy, hh:mm a"
                            selected={form.schedule}
                            required = {true}
                        />
                        <p/>
                    </div>
                </form>
                <div><br/><button type="submit" onClick={onSubmit}>Cadastre-se</button></div>
            </div>
        </div>
    )
}
export default Register