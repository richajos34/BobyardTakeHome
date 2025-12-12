import { useState } from 'react';
import { useComments } from '../context/CommentsContext';
import { Heart } from "lucide-react";

export default function CommentCard({ comment }) {
    const { updateComment, deleteComment } = useComments();
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(comment.text);
    const [saving, setSaving] = useState(false);
    const [removing, setRemoving] = useState(false);
    const { likeComment } = useComments();
    const [liked, setLiked] = useState(false)

    const onLiked = async () => {
        if (liked) return;
        setLiked(true);
        try{
            await likeComment(comment.id);
        } catch (e){
            setLiked(false);
            console.error("Exception: ", e)
        }
    }
    const createdAtLabel = comment.created_at ? new Date(comment.created_at).toLocaleString() : "";
    return (
        <div className='bg-white rounded-md p-4 mb-4'>
            <div className='flex items-center justify-left gap-2'>
                {comment.image ? (
                    <img src={comment.image} alt="Profile" className='w-10 h-10 rounded-md' />
                ) : (
                    <div className='w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600'>
                        {comment.author.charAt(0).toUpperCase()}
                    </div>
                )}
                <h3 className='text-lg ml-2 font-semibold'>{comment.author}</h3>
            </div>
            <div className='flex-2 mt-2'>
                <p className='text-sm text-gray-500'>{createdAtLabel}</p>
            </div>
            <div className='mt-2'>
                <div className='text-md text-black'>
                    {isEditing ? (
                        <>
                            <textarea
                                className='w-full p-2 border border-gray-300 rounded-md'
                                value={editedText}
                                onChange={(e) => setEditedText(e.target.value)}
                                rows={4}
                            />
                            <button className='mr-2 mt-2 px-4 py-1 bg-slate-500 text-white rounded-sm'
                                onClick={async () => {
                                    setSaving(true);
                                    await updateComment(comment.id, editedText);
                                    setIsEditing(false);
                                    setSaving(false);
                                }}
                                disabled={saving}
                            >
                                Save
                            </button>
                            <button className='mr-2 mt-2 px-4 py-1  bg-slate-500 text-white rounded-sm'
                                onClick={() => {
                                    setIsEditing(false);
                                    setEditedText(comment.text);
                                }}
                                disabled={saving}
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <>
                            <p className='text-gray-800'>{comment.text}</p>
                            <div className='mt-4 flex justify-end'>
                                <button className='mr-2 mt-2 px-4 py-1  bg-slate-500 text-white rounded-sm'
                                    onClick={() => setIsEditing(true)}
                                >
                                    Edit
                                </button>
                                <button className='mr-2 mt-2 px-4 py-1  bg-slate-500 text-white rounded-sm'
                                    onClick={async () => {
                                        setRemoving(true);
                                        await deleteComment(comment.id);
                                        setRemoving(false);
                                    }}
                                    disabled={removing}
                                >
                                    Delete
                                </button>
                            </div>
                        </>
                    )}
                    <div className="flex items-center gap-1 text-gray-600">
                        <button onClick={onLiked}>
                            <Heart className={`w-4 h-4 ${liked? "fill-red-500" : ""}`} />
                            <span className="text-sm">{comment.likes}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}