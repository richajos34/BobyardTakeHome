import { useState } from 'react';
import { useComments } from '../context/CommentsContext';

export default function CommentForm() {
    const [inputValue, setInputValue] = useState('');
    const [submitting , setSubmitting] = useState(false);
    const { addComment, setError } = useComments();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        const trimmed_input = inputValue.trim();
        if (!trimmed_input) return;
        setSubmitting(false);
        setError?.("");
        try{
            await addComment(trimmed_input);
            setInputValue("");
        } catch (error) {
            console.error("Error submitting comment:", error);
            setError?.("Failed to submit comment.");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="w-full mx-auto p-4 bg-white rounded-md">
                <textarea className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    rows={4}
                    disabled={submitting}
                />
                <div className="flex justify-end mt-2">
                    <button disabled={submitting || !inputValue.trim()} type="submit" className={`mr-2 mt-2 px-4 py-1  bg-slate-500 text-white rounded-sm`}>
                        Submit
                    </button>
                </div>
            </form>
        </>
    )

}