import React from 'react'
import { FaWindowClose } from "react-icons/fa";

const UpdateReview = ({ showMenuUpdate, actives ,Id}) => {
    return (
        <>
            <div className={actives
                ? 'absolute w-screen inset-0 h-[94vh] bg-black/70 backdrop-blur-sm flex justify-center items-center'
                : "hidden"}>
                <div className="mt-5 p-5 bg-white rounded-md flex flex-col backdrop-blur-lg top-36">
                    <FaWindowClose onClick={showMenuUpdate} className="mx-4 scale-120 text-center mb-2 text-red-500 rounded-sm" />
                    <h1 className='text-center font-bold'>Update Review</h1>
                    <input type='text' placeholder="Reviewer's Name" className="p-2 rounded-md border-b-2" />
                    <textarea id="w3review" name="w3review" rows="3" cols="70" className="p-2  rounded-md border-b-2 mb-2" placeholder='Write Your Review !'>
                    </textarea>
                    <select className='mt-2 mb-2'>
                        <option value="" selected disabled hidden>Give Your Rating</option>
                        <option value="5">5</option>
                        <option value="4">4</option>
                        <option value="3">3</option>
                        <option value="2">2</option>
                        <option value="1">1</option>
                    </select>
                    <div className='flex justify-end p-2'>
                        <button type="submit" className="bg-sky-500 text-white p-2 rounded-md ">Submit</button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default UpdateReview