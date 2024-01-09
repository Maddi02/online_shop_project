
type ArticelCommentProps = {
    comment: {
        comment: string;
        date: string;
        userId: string;
    };
};

const ArticelComment: React.FC<ArticelCommentProps> = ({ comment }) => {
    return (
        <div className="border p-4 rounded-lg shadow mb-4">
            <p className="text-gray-800 font-semibold">{comment.comment}</p>
            <div className="flex justify-between items-center text-gray-600 text-sm mt-2">
                <span>Posted on: {new Date(comment.date).toLocaleDateString()}</span>
                <span>User ID: {comment.userId}</span>
            </div>
        </div>
    );
};

export default ArticelComment;