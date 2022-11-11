import React from "react"
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import FirebaseContext from '../../utils/FirebaseContext'
import StudentService from '../../services/StudentService'

const ListStudentPage = () => {
    return (
        <FirebaseContext.Consumer>
            {value => <ListStudent firebase={value} />}
        </FirebaseContext.Consumer>
    )
}

const ListStudent = (props) => {

    const [students, setStudents] = useState([])

    useEffect(
        () => {
            StudentService.listOnSnapshot(
                props.firebase.getFirestoreDb(),
                (students) => {
                    setStudents(students)
                }
            )
        }
        ,
        []
    )

    function deleteStudent(id) {
        if (window.confirm('Deseja excluir o estudante?')) {
            StudentService.delete(
                props.firebase.getFirestoreDb(),
                ()=>{
                    let studentsResult = students.filter(
                        (student)=>student.id !== id
                    )
                    setStudents(studentsResult)
                },
                id
            )
        }
    }

    const generateTableBody = () => {
        return students.map(
            (element, index) => {
                element.key = index
                return (
                    <tr>
                        <td>{element.id}</td>
                        <td>{element.name}</td>
                        <td>{element.course}</td>
                        <td>{element.ira}</td>
                        <td>
                            <Link to={'/editStudent/' + element.id} className='btn btn-info'>
                                Editar
                            </Link>
                        </td>
                        <td>
                            <button className='btn btn-danger' onClick={() => deleteStudent(element.id)}>
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
            <h1>Listar Estudante</h1>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Curso</th>
                        <th>IRA</th>
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

export default ListStudentPage;