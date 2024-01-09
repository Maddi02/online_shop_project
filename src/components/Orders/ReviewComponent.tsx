import React, {useState} from 'react';
import SendIcon from '@mui/icons-material/Send';
import {Article} from "../../utilits/State/productSlice.ts";
import {useSelector} from "react-redux";
import {RootState} from "../../utilits/State/store.ts";

interface ReviewComponentsProps {
    handelReviewfield: (state: boolean) => void
    article: Article
}

const ReviewComponent: React.FC<ReviewComponentsProps> = ({handelReviewfield, article}) => {
    const [rating, setRating] = useState<number>(0);
    const [comment, setComment] = useState<string>("");
    const [hover, setHover] = useState<number>(0);
    const user = useSelector((state: RootState) => state.auth.user);
    const sendReview = (articleId: string, comment: string, date: string, rating: number) => {
        console.log(user?._id + "  " + articleId + "  " + comment + "  " + date + "  " + rating)
    }

    return (
        <div className="p-4">
            <textarea
                className="mt-2 p-2 border border-gray-300 rounded w-full"
                placeholder="Your review"
                onChange={(comment) => setComment(comment.target.value)}
            />

            <div className="flex mt-2">
                {[...Array(5)].map((_, index) => {
                    const ratingValue = index + 1;

                    return (
                        <label key={index}>
                            <input
                                type="radio"
                                name="rating"
                                value={ratingValue}
                                onClick={() => setRating(ratingValue)}
                                className="hidden"
                            />
                            <span
                                className={`text-xl cursor-pointer ${
                                    ratingValue <= (hover || rating) ? 'text-yellow-400' : 'text-gray-400'
                                }`}
                                onMouseEnter={() => setHover(ratingValue)}
                                onMouseLeave={() => setHover(0)}
                            >
                                &#9733;
                            </span>
                        </label>

                    );
                })}
            </div>
            <div className="flex justify-between">
                <button className="bg-red-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                        onClick={() => handelReviewfield(false)}>Close
                </button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                        onClick={() => sendReview(article._id, comment,  new Date().toISOString(), rating)}><SendIcon/>
                </button>
            </div>
        </div>
    );
};

export default ReviewComponent;
