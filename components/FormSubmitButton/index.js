'use client'

import { useFormStatus } from 'react-dom';

export default function FormSubmitButton({children}) {
    const { pending } = useFormStatus();
    return (
        <button 
            disabled={pending} 
            type="submit"
        >{pending ? 'Submitting...' : children}</button>
    )
}