import React,{useState,createContext} from 'react'
export const Mycontext = createContext(null)


function UserContext({children}) {
    const [user, setuser] = useState({})
    

  return (

    <div>
        <Mycontext.Provider value={{user,setuser}}>
            {children}
        </Mycontext.Provider>

    </div>
  )
}

export default UserContext