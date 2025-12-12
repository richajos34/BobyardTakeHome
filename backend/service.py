from datetime import datetime, timezone
from backend import schemas
from backend.models import Comment
from sqlalchemy.orm import Session

def get_comments(db: Session):
    return db.query(Comment).order_by(Comment.created_at.desc()).all()

def create_comment(db: Session, comment: schemas.CommentCreate):
    db_comment = Comment(
        author="Admin",
        text=comment.text,
        created_at=datetime.now(timezone.utc),
        likes=0,
        image=None,
    )
    db.add(db_comment)
    db.commit()
    db.refresh(db_comment)
    return db_comment

def update_comment(db: Session, comment_id: int, comment: schemas.CommentUpdate):
    db_comment = db.query(Comment).filter(Comment.id == comment_id).first()
    if db_comment:
        db_comment.text = comment.text
        db.commit()
        db.refresh(db_comment)
        return db_comment
    
    return None

def delete_comment(db: Session, comment_id: int):
    db_comment = db.query(Comment).filter(Comment.id == comment_id).first()
    if db_comment:
        db.delete(db_comment)
        db.commit()
        return True
    return False

def like_comment(db: Session, comment_id: int) -> Comment:
    comment = db.query(Comment).filter(Comment.id == comment_id).first()
    if not comment:
        return None
    comment.likes += 1
    db.commit()
    db.refresh(comment)
    return comment