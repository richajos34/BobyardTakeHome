from pydantic import BaseModel
from datetime import datetime

class CommentBase(BaseModel):
    text: str

class CommentCreate(CommentBase):
    pass
class CommentUpdate(CommentBase):
    pass

class CommentOut(BaseModel):
    id: int
    author: str
    text: str
    created_at: datetime
    likes: int
    image: str | None = None
    
    class config:
        from_attributes = True