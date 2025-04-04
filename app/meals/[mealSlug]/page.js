import Image from "next/image";
import classes from './page.module.css'
import {getMeal} from "@/lib/meals"
import { notFound } from "next/navigation";

export async function generateMetadata({params}){
    const { mealSlug } = await (params);
    const meal = await getMeal(mealSlug)

    if(!meal){
        notFound()
    }

    return {
        title: meal.title,
        description: meal.description
    }
}

export default async function MealDetailsPage({params}) {
    const { mealSlug } = await (params);
    const meal = await getMeal(mealSlug)

    if(!meal) {
        //reroute to the closest not fount page.
        notFound()
    }

    meal.instructions = meal.instructions.replace(/\n/g, '<br />')

    return (
        <>
            <header className={classes.header}>
                <div className={classes.image}>
                    <Image src={"https://daniel-stephany-onwards-foodies-starting-project.s3.us-east-1.amazonaws.com/" + meal.image} alt={meal.title} fill priority />
                </div>
                <div className={classes.headerText}>
                    <h1>{meal.title}</h1>
                    <p>by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a></p>
                    <p className={classes.summary}>{meal.summary}</p>
                </div>
            </header>
            <main>
                <p className={classes.instructions} dangerouslySetInnerHTML={{__html: meal.instructions}}></p>
            </main>
        </>
    );
}
