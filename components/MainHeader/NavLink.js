"use client"
import React from 'react'
import { usePathname } from "next/navigation"
import Link from "next/link"
import classes from './navlink.module.css'

export default function NavLink({href, children}) {
    const path = usePathname()

    return <Link href={href} className={path.startsWith(href) ? (classes["nav-link"] + " " + classes.active) : ""}>{children}</Link>
}