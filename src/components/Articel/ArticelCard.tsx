import {Article} from "../../utilits/State/productSlice.ts";
import React from "react";

interface ArticleProps {
    article: Article;
}

interface ArticleCardProps extends ArticleProps {
    onAddToCart: (article: Article, quantity: number) => void;
    onItemClicked: (article: Article) => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({article, onAddToCart, onItemClicked}) => {

    const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if ((event.target as HTMLElement).closest('.prevent-click')) {
            return;
        }
        onItemClicked(article);
    };

    const handleAddToCartClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();
        onAddToCart(article, 1);
    };


    return (
        <div className="bg-white p-4 flex border border-gray-200 rounded-xl shadow-md overflow-hidden"
             onClick={handleClick}>
            <div className="w-40 h-40 flex-shrink-0">
                <img className="object-cover h-full w-full" src={article.href} alt={article.name}/>
            </div>
            <div className="ml-4 flex flex-col justify-between">
                <div>
                    <h2 className="text-lg font-semibold">{article.name}</h2>
                    <p className="text-gray-500 mt-1">{article.shortdescription}</p>
                </div>

                <div>
                    <div className="flex items-center mt-2">
                        <div className="text-yellow-400">⭐️</div>
                        <div className="text-sm text-gray-600 ml-2">({article.rating.toFixed(1)})</div>
                    </div>
                    <div className="text-lg font-bold mt-3">€{article.price.toFixed(2)}</div>
                </div>
                <div className="flex mt-4">
                    <button
                        onClick={handleAddToCartClick}
                        className="prevent-click bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ArticleCard;