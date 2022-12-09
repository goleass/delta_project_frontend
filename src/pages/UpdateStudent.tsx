import { SetStateAction, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Header } from '../partials/Header';
import { Upload } from '../components/Upload';

type StudentProps = {
  name: string;
  address?: string;
  phoneNumber?: string;
  avatarUrl?: string;
}

function UpdateStudent() {

  const { id } = useParams()
  const navigate = useNavigate();

  const [student, setStudent] = useState<StudentProps | null>(null)
  const [file, setFile] = useState()

  const getStudent = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_URL_API}/student?id=${id}`)

      setStudent(res.data.props)
    } catch (error) {

    }
  }

  const handleSave = async () => {
    try {
      if (!student?.name)
        return

      let data = student

      if (file) {
        const config = {
          method: 'post',
          url: `${import.meta.env.VITE_URL_FILEPROVIDER_API}/api/store/S3?key=${import.meta.env.VITE_API_KEY}`,
          headers: {
            'Content-Type': 'image/png'
          },
          data: file
        };

        const res = await axios(config)

        data = {...data, avatarUrl: res.data.url}
      }

      await axios.put(`${import.meta.env.VITE_URL_API}/student?id=${id}`, data)

      navigate('/')
    } catch (error) {

    }
  }

  useEffect(() => {
    getStudent()
  }, [])

  if (!student) return <h1>Carregando...</h1>

  return (
    <div>
      <Header />

      <div className="container mx-auto p-4">
        <div className='flex justify-center mt-6'>
          <form className="flex-1 max-w-xl">
            <div className="relative z-0 mb-6 w-full group">
              <input
                defaultValue={student.name}
                onChange={(e) => setStudent((s) => ({ ...s, name: e.target.value }))}
                type="text" name="floating_name" id="floating_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label htmlFor="floating_name" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nome</label>
            </div>
            <div className="relative z-0 mb-6 w-full group">
              <input
                defaultValue={student.address}
                onChange={(e) => setStudent((s) => ({ ...s, address: e.target.value }))}
                type="text" name="floating_address" id="floating_address" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
              <label htmlFor="floating_address" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Endereço</label>
            </div>
            <div className="relative z-0 mb-6 w-full group">
              <input
                defaultValue={student.phoneNumber}
                onChange={(e) => setStudent((s) => ({ ...s, phoneNumber: e.target.value }))}
                type="text" name="repeat_phone_number" id="floating_repeat_phone_number" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label htmlFor="floating_repeat_phone_number" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Telefone</label>
            </div>
            <div className="relative z-0 mb-6 w-full group">
              <Upload onUpload={(f: SetStateAction<undefined>[]) => setFile(f[0])} />
            </div>
            <div className='flex gap-1'>
              <button
                onClick={() => navigate('/')}
                type="button" className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200  ">Cancelar</button>
              <button
                onClick={() => handleSave()}
                type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2  ">Salvar</button>
            </div>
          </form>
        </div>

      </div>
    </div>
  )
}

export { UpdateStudent }