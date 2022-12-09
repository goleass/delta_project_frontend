import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import axios from "axios";
import { Header } from "../partials/Header";

type StudentProps = {
  _id: string;
  props: {
    id: string;
    name: string;
    address: string;
    phoneNumber: string;
    avatarUrl: string;
  }
}

function Home() {

  const navigate = useNavigate();
  const [students, setStudents] = useState<StudentProps[] | []>([])

  const getStudents = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_URL_API}/students`)

      setStudents(res.data)
    } catch (error) {

    }
  }

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${import.meta.env.VITE_URL_API}/student?id=${id}`)

      setStudents(students.filter(student => student._id !== id))
    } catch (error) {

    }
  }

  const handleUpdate = (id: string) => {
    navigate(`/student/edit/${id}`)
  }

  useEffect(() => {
    getStudents()
  }, [])

  return (
    <div>
      <Header />
      <div className="container mx-auto p-4">
        <div className='flex justify-center mt-6'>
          <StudentTable
            students={students}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
          />
        </div>
      </div>
    </div>
  )
}

type TableProps = {
  students: StudentProps[],
  handleDelete: (id: string) => Promise<void>,
  handleUpdate: (id: string) => void
}

function StudentTable({ students, handleDelete, handleUpdate }: TableProps) {
  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg max-w-3xl">
      <table className="w-full text-sm text-left text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
          <tr>
            <th scope="col" className="py-3 px-6">
              Avatar
            </th>
            <th scope="col" className="py-3 px-6">
              Nome
            </th>
            <th scope="col" className="py-3 px-6">
              Endereço
            </th>
            <th scope="col" className="py-3 px-6">
              Telefone
            </th>
            <th scope="col" className="py-3 px-6">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {students.map(({ props: student, _id }) => (
            <tr key={_id} className="bg-white border-b">
              <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                <img className="w-10 h-10 rounded-full" src={!student.avatarUrl ? "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=": student.avatarUrl} alt="Rounded avatar" />
              </th>
              <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                {student.name}
              </th>
              <td className="py-4 px-6">
                {student.address}
              </td>
              <td className="py-4 px-6">
                {student.phoneNumber}
              </td>
              <td className="py-4 px-6">
                <div className="flex gap-1">
                  <PencilIcon
                    className="h-4 w-4 text-blue-500 cursor-pointer"
                    onClick={() => handleUpdate(_id)}
                  />
                  <TrashIcon
                    className="h-4 w-4 text-red-500 cursor-pointer"
                    onClick={async () => { await handleDelete(_id) }}
                  />
                </div>
              </td>
            </tr>
          ))
          }

        </tbody>
      </table>
    </div>
  )
}

export { Home }