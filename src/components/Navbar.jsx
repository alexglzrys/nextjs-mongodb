import Image from 'next/image'
import React from 'react'
import { Menu } from 'semantic-ui-react'

const Navbar = () => {

  return (
    <Menu inverted attached>
        <Menu.Item>
            <Image src='/favicon.ico' alt='Logotipo' width={24} height={24} />
        </Menu.Item>
        <Menu.Menu position='right'>
            <Menu.Item name='Tareas' />
            <Menu.Item name='Registrar Tareas'/>
        </Menu.Menu>
    </Menu>
  )
}

export default Navbar