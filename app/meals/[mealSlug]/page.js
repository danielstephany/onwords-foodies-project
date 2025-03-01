import Image from "next/image";
import classes from './page.module.css'
import {getMeal} from "@/lib/meals"
import { notFound } from "next/navigation";

export default async function MealDetailsPage({params}) {
    const { mealSlug } = await (params);
    const meal = getMeal(mealSlug)

    if(!meal) {
        //reroute to the closest not fount page.
        notFound()
    }

    meal.instructions = meal.instructions.replace(/\n/g, '<br />')

    return (
        <>
            <header className={classes.header}>
                <div className={classes.image}>
                    <Image src={meal.image} alt={meal.title} fill/>
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
