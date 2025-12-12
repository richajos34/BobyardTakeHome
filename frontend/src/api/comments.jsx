const API_BASE = import.meta.env.VITE_API_BASE;

async function request(path, options = {}) {
    const res = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });

    if (res.status === 204) {
      return null;
    }       
    const data = await res.json().catch(() => null);

    if (!res.ok) {
      throw new Error(errorData.message);
    }
    return data;
}

export async function fetchComments() {
    return await request('/comments', {
      method: 'GET',
    });
}

export async function createComment(text) {
    return await request('/comments', {
        method: 'POST',
        body: JSON.stringify({ text }),
    });
}

export async function updateComment(id, text) {
    return await request(`/comments/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ text }),
    });
}

export async function deleteComment(id) {
    return await request(`/comments/${id}`, {
        method: 'DELETE',
    });
}

export async function likeComment(id) {
  return await request(`/comments/${id}/like`, {
    method: "POST",
  });
}

