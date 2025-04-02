import fs from 'node:fs'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import sql from 'better-sqlite3'
import slugify from 'slugify'
import xss from 'xss'

const s3Client = new S3Client();

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

    // const stream = fs.createWriteStream(`public/images/${fileName}`);
    const bufferedImage =  await meal.image.arrayBuffer();
    // save image in public/images
    // stream.write(Buffer.from(bufferedImage), (error) => {
    //     if(error){
    //         throw new Error('Saving image failed')
    //     }
    // });

    await s3Client.send(
        new PutObjectCommand({
            Bucket: 'daniel-stephany-onwards-foodies-starting-project',
            Key: fileName,
            Body: Buffer.from(bufferedImage),
            ContentType: meal.image.type,
        }),
    );

    //over write image with image path
    meal.image = `${fileName}`

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