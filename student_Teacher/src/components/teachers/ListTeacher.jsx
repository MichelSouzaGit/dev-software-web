import React from "react"
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import FirebaseContext from '../../utils/FirebaseContext'
import TeacherService from '../../services/TeacherService'

const ListTeacherPage = () => {
    return (
        <FirebaseContext.Consumer>
            {value => <ListTeacher firebase={value} />}
        </FirebaseContext.Consumer>
    )
}

const ListTeacher = (props) => {

    const [teachers, setTeachers] = useState([])

    useEffect(
        () => {
            TeacherService.listOnSnapshot(
                props.firebase.getFirestoreDb(),
                (teachers) => {
                    setTeachers(teachers)
                }
            )
        }
        ,
        []
    )

    function deleteTeacher(id) {
        if (window.confirm('Deseja excluir o professor?')) {
            TeacherService.delete(
                props.firebase.getFirestoreDb(),
                ()=>{
                    let teachersResult = teachers.filter(
                        (teacher)=>teacher.id !== id
                    )
                    setTeachers(teachersResult)
                },
                id
            )
        }
    }

    const generateTableBody = () => {
        return teachers.map(
            (element, index) => {
                element.key = index
                return (
                    <tr>
                        <td>{element.id}</td>
                        <td>{element.name}</td>
                        <td>{element.course}</td>
                        <td>{element.salary}</td>
                        <td>
                            <Link to={'/editTeacher/' + element.id} className='btn btn-info'>
                                Editar
                            </Link>
                        </td>
                        <td>
                            <button className='btn btn-danger' onClick={() => deleteTeacher(element.id)}>
                                Apagar
                            </button>
                        </td>
                    </tr>
                )
            }
        )
    }

    return (
        <div>
            <h1>Listar Professor</h1>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Curso</th>
                        <th>Salário</th>
                        <th colSpan={2}>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {generateTableBody()}
                </tbody>
            </table>
        </div>
    )
}

export default ListTeacherPage;