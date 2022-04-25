import React, {useCallback} from "react"
import {Formik, Field, Form} from "formik"
import axios from "../../services/api"
import Menu from "../../components/menu.js"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

const MINHOUR = 7
const MAXHOUR = 17

const Register = () => {
    const filterPassedTime = (time) => {
        const selectDate  = new Date(time)
        return selectDate.getHours() >= MINHOUR && selectDate.getHours() <= MAXHOUR;
    }

    const values = {
        name: "",
        birth: new Date(),
        schedule: new Date(),
    }

    const onSubmit = useCallback(async (values) => {
        try{
            console.log(values)
            await axios.post("/toschedule", values)
            alert("Usuario cadastrado com sucesso.")
        }
        catch(error){
            if(!error.response){
                alert("Ocorreu algum erro ao se conectar com o servidor.\n"+
                      "Provavelmente o erro do (CORS)... Não consgui arrumar ;-;\n"+
                      "Nos commit do frontend eu disse o que fiz para testar o meu programa"+
                      "\n\nErro: Cross-Origin Resource Sharing error")
            }
            alert(error.response.data.message)
        }
    }, [values])

    return (
        <div>
            <Menu/>
            <h1>Agende abaixo sua vacinação contra a covid 19</h1>
            <Formik
                onSubmit={onSubmit}
                initialValues={values}
                render = {({values, setFieldValue}) => (
                    <Form className="content">
                        <div>
                            <label>*Nome</label><br/>
                            <Field name="name" type="text" className="form-field" placeholder = "Seu nome..."/><p/>
                        </div>
                        <div>
                            <label>*Data de nascimento</label><br/>
                            <DatePicker name="birth"
                                        className="form-control"
                                        placeholderText = "Nasceu em..."
                                        selected = {values.birth}
                                        dateFormat = "dd/MM/yyyy"
                                        maxDate = {Date.now()}
                                        onChange = {date => setFieldValue("birth", date)}/><p/>
                        </div>
                        <div>
                            <label>*Data do agendamento</label><br/>
                            <DatePicker name="schedule"
                                        className="form-control"
                                        placeholderText = "Agendar..."
                                        selected = {values.schedule}
                                        showTimeSelect
                                        timeIntervals={60}
                                        filterTime = {filterPassedTime}
                                        dateFormat = "dd/MM/yyyy, hh:mm a"
                                        minDate = {Date.now()}
                                        onChange = {date => setFieldValue("schedule", date)}/><p/>
                        </div>
                        <button type="submit">Enviar</button>
                    </Form>
                )}
            />
        </div>
    )
}

export default Register