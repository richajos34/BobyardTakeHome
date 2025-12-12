import {useContext, createContext, useState, useEffect} from 'react';
import {fetchComments, createComment, updateComment as apiUpdateComment, deleteComment as apiDeleteComment, likeComment as apiLikeComment} from '../api/comments';


const CommentsContext = createContext(null);

export function CommentsProvider({ children }) {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let cancelled = false;
        (async () => {
          try {
            const data = await fetchComments();
            if (!cancelled) setComments(data);
          } catch (err) {
            if (!cancelled) setError("Failed to load comments.");
          } finally {
            if (!cancelled) setLoading(false);
          }
        })();
      
        return () => {
          cancelled = true;
        };
      }, []);

    const addComment = async (text) => {
        setError("");
        const create = await createComment(text);
        setComments((prev) => [create, ...prev]);
    };

    const updateComment = async (id, text) => { 
        setError("");
        const updated = await apiUpdateComment(id, text);
        setComments((prevComments) =>
            prevComments.map((comment) =>
                comment.id === id ? updated : comment
            )
        );
    };

    const deleteComment = async (id) => {
        setError("");
        await apiDeleteComment(id);
        setComments((prev) =>
            prev.filter((comment) => comment.id !== id)
        );
    };

    const likeComment = async (id) => {
        setError("");
      
        setComments((prev) =>
          prev.map((c) => (c.id === id ? {...c, likes: c.likes + 1 } : c))
        );
      
        try {
          const updated = await apiLikeComment(id);
          setComments((prev) => prev.map((c) => (c.id === id ? updated : c)));
        } catch (e) {
          setComments((prev) =>
            prev.map((c) => (c.id === id ? {...c, likes: c.likes - 1 } : c))
          );
          throw e;
        }
      };

    const value = {
        comments,
        loading,
        error,
        addComment,
        updateComment,
        deleteComment,
        likeComment,
    }

    return (
        <CommentsContext.Provider value={value}>
            {children}
        </CommentsContext.Provider>
    );
}

export function useComments() {
    const ctx = useContext(CommentsContext);
    if (!ctx) {
        throw new Error("useComments must be used within a CommentsProvider");
    }
    return ctx;
}