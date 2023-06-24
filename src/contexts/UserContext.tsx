"use client"
import React, { useCallback, useEffect } from 'react'
import _ from "lodash"
import { useRouter } from 'next/navigation'

type UserContextProps = {
  children: React.ReactNode
}

type FormProps = {
  user: any,
  setUser: any
}

export const UserContext = React.createContext<FormProps>({
  user: {},
  setUser: () => {}
})

export const useUserContext = () => {
  const context = React.useContext(UserContext)
  if (!context) {
    throw new Error('useMyContext must be used under MyContextProvider');
  }
  return context;
}

export const UserConnection = (props: UserContextProps) => {
  const [user, setUser] = React.useState<any>()
  const router = useRouter()
  const setUserCaching = (val: any) => {
    setUser(val)
    localStorage.setItem("sev_user_login", JSON.stringify(val))
  }

  useEffect(() => {
    const user_login = localStorage.getItem("sev_user_login")
    if (user_login) {
      setUser(JSON.parse(user_login))
    }
  }, [window.localStorage.getItem("sev_user_login")])


  // useEffect(() => {
  //   if (user) {
  //     router.push("/dashboard")
  //   } else {
  //     router.push("/signin")
  //   }
  // }, [JSON.stringify(user)])


  const value: FormProps = {
    user,
    setUser: setUserCaching
  }
  return (
    <UserContext.Provider value={value}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserConnection