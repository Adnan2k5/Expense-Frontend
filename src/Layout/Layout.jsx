import React from 'react'
import { Nabvar } from './Nabvar'
import { Footer } from './Footer'

export const Layout = ({children}) => {
  return (
    <div>
        <Nabvar/>
        <div className="content h-[80vh] w-full">
                {children}
        </div>
        <Footer/>
        
    </div>

  )
}
