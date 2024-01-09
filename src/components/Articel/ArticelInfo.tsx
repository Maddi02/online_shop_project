import React, {useEffect, useState} from 'react';
import {Article} from "../../utilits/State/productSlice.ts";
import {BsArrowLeft} from "react-icons/bs";
import {fetchComments} from "../../utilits/State/commentSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../utilits/State/store.ts";
import {fetchRates} from "../../utilits/State/reviewSlice.ts";

interface ArticleInfoProps {
    article: Article;
    onBack: () => void;
    onAddToCart: (article: Article, quantity: number) => void;
}

const ArticleInfo: React.FC<ArticleInfoProps> = ({article, onBack, onAddToCart}) => {
    const [quantity, setQuantity] = useState(1);

    const dispatch = useDispatch<AppDispatch>()
       useEffect(() => {
        if (article && article._id) {
            dispatch(fetchComments(article._id));
            dispatch(fetchRates(article._id));
        }
    }, [article, dispatch]);
      const comments = useSelector((state: RootState) => state.commend.comments);
      const reviews = useSelector((state: RootState) => state.review.reviews);
      const filteredReviews = Object.values(reviews).filter(review => review.articleId === article._id)
      const filteredCommments = Object.values(comments).filter(comment => comment.articleId === article._id)
        console.log(filteredReviews.map((a) => console.log(a.rate)))
        console.log(filteredCommments.map((a) => console.log(a.comment)))
    return (
        <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
            <button
                onClick={onBack}
                className="text-white font-bold py-2 px-4 rounded">
                <BsArrowLeft className="text-black">Back</BsArrowLeft>
            </button>
            <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
                <img src={article.href} alt={article.name}
                     className="w-full h-64 object-cover object-center rounded-t-lg"/>
                <div className="p-4">
                    <div className="font-bold text-xl mb-2">{article.name}</div>
                    <div className="text-gray-700 text-base mb-2">{article.description}</div>
                    <div className="text-gray-600 text-sm mb-2">{article.shortdescription}</div>
                    <div className="text-gray-600 mb-2">Quantity: {article.quantity}</div>
                    <div className="text-green-600 font-bold mb-2">Price: €{article.price}</div>
                    <div className="text-yellow-500 mb-2">Rating: {article.rating} / 5</div>
                </div>
            </div>

            <div className="flex  items-center justify-center mt-4">

                <div>
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => {
                            const newQuantity = Number(e.target.value);
                            if (newQuantity >= 1 && newQuantity <= article.quantity) {
                                setQuantity(newQuantity);
                            }
                        }}
                        className="shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        min="1"
                        max={article.quantity}
                    />
                    <button
                        onClick={() => onAddToCart(article, quantity)}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ArticleInfo;
