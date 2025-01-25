import React from 'react'
import Link from "next/link"
import Image from "next/image"
import logoImg from "@/assets/logo.png"
import styles from './MainHeader.module.css'
import MainHeaderBackground from './MainHeaderBackground'
import NavLink from './NavLink'

const MainHeader = () => {

    return (
        <>
            <MainHeaderBackground />
            <header className={styles.header}>
                <Link className={styles.logo} href="/">
                    <Image priority src={logoImg} alt="a plate with food on it"/>
                    NextLevel Food
                </Link>
                <nav className={styles.nav}>
                    <ul>
                        <li>
                            <NavLink href="/meals">Browse Meals</NavLink>
                        </li>
                        <li>
                            <NavLink href="/community">Foodies Community</NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    )
}

export default MainHeader