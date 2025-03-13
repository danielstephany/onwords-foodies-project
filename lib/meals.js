import fs from 'node:fs'

import sql from 'better-sqlite3'
import slugify from 'slugify'
import xss from 'xss'

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

export async function saveMeal(meal){
    //create a slug
    meal.slug = slugify(meal.title, {lower: true});
    //sanitize instructions
    meal.instructions = xss(meal.instructions);
    
    const extension = meal.image.name?.split(".").pop();
    const fileName = `${meal.slug}.${extension}`

    // save image in public/images
    const stream = fs.createWriteStream(`public/images/${fileName}`);
    const bufferedImage =  await meal.image.arrayBuffer();
    stream.write(Buffer.from(bufferedImage), (error) => {
        if(error){
            throw new Error('Saving image failed')
        }
    });

    //over write image with image path
    meal.image = `/images/${fileName}`

    db.prepare(`
        INSERT INTO meals
            (slug, title, summary, instructions, creator, creator_email, image)
        VALUES (
            @slug,
            @title,
            @summary,
            @instructions,
            @creator,
            @creator_email,
            @image
        )
    `).run(meal)
}