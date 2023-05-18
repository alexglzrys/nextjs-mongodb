import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { Menu } from 'semantic-ui-react'

const Navbar = () => {
    const router = useRouter();

  return (
    <Menu inverted attached>
        <Menu.Item>
            <Link href='/'>
                <Image src='/favicon.ico' alt='Logotipo' width={24} height={24} />
            </Link>
        </Menu.Item>
        <Menu.Menu position='right'>
            <Menu.Item name='Nueva Tarea' onClick={() => router.push('/tasks/new')}/>
        </Menu.Menu>
    </Menu>
  )
}

export default Navbar