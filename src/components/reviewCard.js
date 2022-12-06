import React, { useEffect, useState } from 'react'
import { FaWindowClose } from "react-icons/fa";
import axios from 'axios';

const ReviewCard = ({ showMenuCreate, active, Id }) => {
    console.log("rew", Id);
    const url = `http://localhost:3001/books/${Id}/review`;
    const [ratingg, setRating] = useState("");
    const [reviewer, setReviewer] = useState("");
    const [reviews, setReview] = useState("");
    const formData = {
        bookId: Id,
        reviewedBy: reviewer,
        rating: ratingg,
        review: reviews,
    }

    const postDat = async () => {
        try {
            const res = axios.post(url, postData)
            console.log(res);
            console.log(formData);

        } catch (err) {
            console.log(err);
        }
    }

    const postData = (e) => {
        e.preventDefault();
        postDat();

    }

    return (
        <>
            <div className={active
                ? 'absolute w-screen inset-0 h-[94vh] bg-black/70 backdrop-blur-sm flex justify-center items-center'
                : "hidden"}>
                <div className="mt-5 p-5 bg-white rounded-md flex flex-col backdrop-blur-lg top-36">
                    <FaWindowClose onClick={showMenuCreate} className="mx-4 scale-120 text-center mb-2 text-red-500 rounded-sm" />
                    <h1 className='text-center font-bold'>Create Review</h1>
                    <input type='text' placeholder="Reviewer's Name" className="p-2 rounded-md border-b-2" value={reviewer} onChange={(e) => { setReviewer(e.target.value) }} />
                    <textarea id="w3review" name="w3review" rows="3" cols="70" className="p-2  rounded-md border-b-2 mb-2" placeholder='Write Your Review !' value={reviews} onChange={(e) => { setReview(e.target.value) }}>
                    </textarea>
                    <select className='mt-2 mb-2' onChange={(e) => { setRating(e.target.value) }}>
                        <option value="" selected disabled hidden>Give Your Rating</option>
                        <option value="5">5</option>
                        <option value="4">4</option>
                        <option value="3">3</option>
                        <option value="2">2</option>
                        <option value="1">1</option>
                    </select>
                    <div className='flex justify-end p-2'>
                        <button onClick={postData} className="bg-sky-500 text-white p-2 rounded-md ">Submit</button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default ReviewCard