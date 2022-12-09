import { useNavigate } from "react-router-dom";

function Header() {

  const navigate = useNavigate()

  return (
    <nav className="bg-white px-2 sm:px-4 py-2.5 w-full z-20 top-0 left-0 border-b border-gray-200">
      <div className="container flex flex-wrap items-center justify-end mx-auto">
        <div className="flex md:order-2">
          <button 
          onClick={() => navigate('/student/new')}
          type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0">Adicionar</button>
        </div>
      </div>
    </nav>
  )
}

export { Header }