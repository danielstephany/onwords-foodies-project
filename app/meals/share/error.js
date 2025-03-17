"use client"

export default function Error({error}){
    return (
        <main className="error">
            <h1>An error occorred</h1>
            <p>{error?.message || "Something went wrong"}, please try again later.</p>
        </main>
    )
}