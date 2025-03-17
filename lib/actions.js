'use server'
import { redirect } from "next/navigation"
import { saveMeal } from "./meals"

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
        redirect("/meals")
    } catch(e) {
        return { message: e.message }
    }
}