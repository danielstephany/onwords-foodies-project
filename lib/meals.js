import sql from 'better-sqlite3'

const db = sql('meals.db');

const pause = async (ms) => new Promise(resolve => { setTimeout(() => { resolve() }, ms) })

export async function getMeals(){
    await pause(700)
    return db.prepare('SELECT * FROM meals').all()
}

export async function getMeal(slug) {
    await pause(700)
    return db.prepare(`SELECT * FROM meals WHERE slug = ?`).get(slug)
}