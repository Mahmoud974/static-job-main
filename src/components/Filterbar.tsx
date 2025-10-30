
interface Props {
    setSearchRole: React.Dispatch<React.SetStateAction<string>>
    setSearchLevel: React.Dispatch<React.SetStateAction<string>>
    setSearchLanguage: React.Dispatch<React.SetStateAction<string>>
    searchRole: string
    searchLevel: string
    searchLanguage: string
}

const Filterbar:React.FC<Props> = ({setSearchRole,setSearchLevel, setSearchLanguage, searchRole,searchLevel, searchLanguage }) => {

 const deleteItem = (item:string):void => {
  switch (item) {
    case "role":
      setSearchRole("");
      break;
    case "level":
      setSearchLevel("");
      break;
    case "language":
      setSearchLanguage("");
      break;
    default:
      break;
  }
}

const clearAll = ():void =>{
        setSearchRole("");
        setSearchLevel("");
        setSearchLanguage("");
}
  return (
    <div className={`${searchRole || searchLevel || searchLanguage ? 'flex' : 'hidden'} md:max-w-6xl mx-6 h-auto py-4 bg-white md:h-16 relative -mt-6 rounded-md shadow-lg justify-around items-center space-x-6 lg:w-auto w-auto xl:mx-auto lg:mx-20 sm:mx-8   ` }>
        <div className="lg:ml-6 flex rounded-sm font-bold text-teal-600 cursor-pointer w-20 justify-between ">
     
              <ul className="flex space-x-3 md:flex-row md:space-y-0 space-y-2 flex-col">
                <li className={`flex ${searchRole  ? "" : "hidden" }`}>
                  <div className="ml-2 bg-[#eef6f6] px-2">{searchRole}</div>
                  <div className="bg-teal-700 hover:bg-black flex justify-center text-white w-6 rounded-r-sm" onClick={()=> deleteItem("role")}>
                    X
                  </div>
                </li>
                 <li className={`flex ${searchLevel ? "" : "hidden" }`}>
                  <div className="ml-2 bg-[#eef6f6] px-2">{searchLevel}</div>
                  <div className="bg-teal-700 hover:bg-black flex justify-center text-white w-6 rounded-r-sm" onClick={()=> deleteItem("level")}>
                    X
                  </div>
                </li>
                 <li className={`flex ${searchLanguage ? "" : "hidden" }`}>
                  <div className="ml-2 bg-[#eef6f6] px-2">{searchLanguage}</div>
                  <div className="bg-teal-700 hover:bg-black flex justify-center text-white w-6 rounded-r-sm" onClick={()=> deleteItem("language")}>
                    X
                  </div>
                </li>
                
              </ul>
              </div>
              <div>
                <p className="text-teal-600 cursor-pointer hover:underline" onClick={() => clearAll()}>Clear</p>
              </div>
            
      </div>
  )
}

export default Filterbar