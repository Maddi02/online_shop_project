import {fetchUsers, User} from "../../utilits/State/authSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../utilits/State/store.ts";
import {useEffect} from "react";


type ArticelCommentProps = {
    comment: {
        comment: string;
        date: string;
        userId: string;
    };
};

const getUserLastname = (commentUserId: string, users: User[]) => {
    return users.filter((user) => user._id === commentUserId).map((user) => user.lastname)
}
const ArticelComment: React.FC<ArticelCommentProps> = ({comment}) => {

    const dispatch = useDispatch<AppDispatch>()
    const userArray = useSelector((state: RootState) => state.auth.userArray);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    return (
        <div className="border p-4 rounded-lg shadow mb-4">
            <p className="text-gray-800 font-semibold">User: {getUserLastname(comment.userId, userArray)}</p>
            <p className="text-gray-800 font-semibold">Comment: {comment.comment}</p>
            <div className="flex justify-between items-center text-gray-600 text-sm mt-2">
                <span>Posted on: {new Date(comment.date).toLocaleDateString()}</span>
                <div>
                    <span>User ID: {comment.userId}</span><br/>
                </div>
            </div>
        </div>
    );
};

export default ArticelComment;