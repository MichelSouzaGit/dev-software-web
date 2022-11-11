import React from "react"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FirebaseContext from '../../utils/FirebaseContext'
import TeacherService from '../../services/TeacherService'

const CreateTeacherPage = () => {
    return (
        <FirebaseContext.Consumer>
            {value => <CreateTeacher firebase={value} />}
        </FirebaseContext.Consumer>
    )
}


const CreateTeacher = (props) => {

    const [name, setName] = useState(' ')
    const [course, setCourse] = useState(' ')
    const [salary, setSalary] = useState(0.0)
    const navigate = useNavigate()

    const handleSubmit = (event)=> {
        event.preventDefault()
        const newTeacher = {name, course, salary}
        TeacherService.add(
            props.firebase.getFirestoreDb(),
            (id)=>{
                alert(`Professor ${id} adicionado!`)
                navigate('/listTeacher')
            },
            newTeacher
        )
    }


    return (
        <div style={{marginTop:20}}>
            <h2> Criar Professor </h2>
            <form onSubmit={handleSubmit}>

                <div className='form-group'>
                    <label> Nome: </label>
                    <input 
                        type='text'
                        className='form-control'
                        placeholder='Digite o nome'
                        onChange={
                            (event)=>{
                                setName(event.target.value)
                            }
                        }
                    />
                </div>

                <div className='form-group'>
                    <label> Curso: </label>
                    <input 
                        type='text'
                        className='form-control'
                        placeholder='Digite o curso'
                        onChange={
                            (event)=>{
                                setCourse(event.target.value)
                            }
                        }
                    />
                </div>

                <div className='form-group'>
                    <label> Salário: </label>
                    <input 
                        type='number'
                        step='any'
                        className='form-control'
                        placeholder='Digite o salário'
                        onChange={
                            (event)=>{
                                setSalary(event.target.value)
                            }
                        }
                         />
                </div>

                <div className='form-group' style={{marginTop:15}}>
                    <input 
                        type='submit' 
                        value='Criar Professor'
                        className='btn btn-info' 
                        />
                </div>

            </form>
        </div>
    )
}

export default CreateTeacherPage;