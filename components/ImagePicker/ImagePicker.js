"use client"
import {useRef, useState} from 'react'
import classes from './image-picker.module.css'
import Image from 'next/image'

export default function ImagePicker({ label, name }){
    const imgInputRef = useRef()
    const [pickedImg, setPickedImg] = useState(null);

    const handlePickedImgChange = (e) => {
        const file = e.target.files[0];
        if(file){
            const fileReader = new FileReader();
            fileReader.onload = (url) => {
                setPickedImg(fileReader.result)
            }
            fileReader.readAsDataURL(file)
        } else {
            setPickedImg(null)
        }
    }

    const handlePickClick = (e) => {
        imgInputRef.current.click();
    }
 
    return (
        <div className={classes.picker}>
            <label htmlFor={name}>{label}</label>
            <div className={classes.controls}>
                <div className={classes.preview}>
                    {
                        !pickedImg ?
                        <p>No image picked yet.</p>
                        : 
                        <Image 
                            src={pickedImg}
                            alt="selected image"
                            fill
                        />
                    }
                </div>
                <input 
                    className={classes.input}
                    type="file" 
                    id={name} 
                    accept="image/png, image/jpeg" 
                    name={name}
                    ref={imgInputRef}
                    onChange={handlePickedImgChange}
                    required
                />
                <button 
                    className={classes.button}
                    type="button"
                    onClick={handlePickClick}
                >Pick an Image</button>
            </div>
        </div>
    )
}