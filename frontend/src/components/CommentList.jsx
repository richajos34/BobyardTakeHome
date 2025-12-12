import {useComments} from '../context/CommentsContext';
import CommentCard from './CommentCard';

export default function CommentList() {
    const {comments} = useComments();
    return (
        <div>
            {comments && comments.map((comment) => (
                <CommentCard key={comment.id} comment={comment} />
            ))}
        </div>
    );
}       