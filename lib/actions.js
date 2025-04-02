'use server'
import { redirect } from "next/navigation"
import { saveMeal } from "./meals"
import { revalidatePath } from "next/cache"

export async function shareMeal(prevState, formData) {

    try {
        const meal = {
            title: formData.get('title'),
            summary: formData.get('summary'),
            instructions: formData.get('instructions'),
            image: formData.get('image'),
            creator: formData.get('name'),
            creator_email: formData.get('email')
        }
    
        Object.entries(meal).forEach(([key, value]) => {
            const trimmedValue = typeof value === 'string' ? value.trim() : value;
            const isInvalidEmail = key === "email" && !value.includes('@')
            const isInvalidImage = key === "image" && value?.size === 0
            if (!trimmedValue || isInvalidEmail || isInvalidImage){
                throw new Error("Invalid input")
            }
        })

        await saveMeal(meal)

    } catch(e) {
        return { message: e.message }
    }
    //redirect needs to be called outside of a try catch block
    revalidatePath('/meals')
    redirect("/meals")
}