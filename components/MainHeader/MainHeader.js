import React from 'react'
import Link from "next/link"
import Image from "next/image"
import logoImg from "@/assets/logo.png"
import styles from './MainHeader.module.css'
import MainHeaderBackground from './MainHeaderBackground'

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
                            <Link href="/meals">Browse Meals</Link>
                        </li>
                        <li>
                            <Link href="/community">Foodies Community</Link>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    )
}

export default MainHeader