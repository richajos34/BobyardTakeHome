from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from db import SessionLocal, engine, Base 
from backend import schemas, models, service
import os
from dotenv import load_dotenv

load_dotenv()

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("FRONTEND_ORIGIN")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/comments", response_model=list[schemas.CommentOut])
async def read_comments(db: Session = Depends(get_db)):
    """
    @param db: Database session
    @return List of comments
    Fetch all comments
    """
    comments = service.get_comments(db)
    return comments

@app.post("/comments", response_model=schemas.CommentOut)
async def create_comment(comment: schemas.CommentCreate, db: Session = Depends(get_db)):
    """
    @param comment: Comment input data
    @param db: Database session
    @return Created comment
    Create new comment
    """
    if not comment.text.strip():
        raise HTTPException(status_code=400, detail="Comment text cannot be empty")
    
    return service.create_comment(db=db, comment=comment)

@app.patch("/comments/{comment_id}", response_model=schemas.CommentOut)
async def update_comment(comment_id: int, comment: schemas.CommentUpdate, db: Session = Depends(get_db)):
    """
    @param comment_id: Comment identifier
    @param comment: Updated text
    @param db: Database session
    @return Updated comment
    Edit existing comment
    """
    if not comment.text.strip():
        raise HTTPException(status_code=400, detail="Comment text cannot be empty")
    
    db_comment = service.update_comment(db, comment_id, comment)
    if db_comment is None:
        raise HTTPException(status_code=404, detail="Comment not found")
    
    return db_comment

@app.delete("/comments/{comment_id}")
async def delete_comment(comment_id: int, db: Session = Depends(get_db)):
    """
    @param comment_id: Comment identifier
    @param db: Database session
    @return Deletion status
    Delete comment
    """
    success = service.delete_comment(db, comment_id)
    if not success:
        raise HTTPException(status_code=404, detail="Comment not found")
    
    return {"detail": "Comment deleted successfully"}

@app.post("/comments/{comment_id}/like", response_model=schemas.CommentOut)
def like_comment(comment_id: int, db: Session = Depends(get_db)):
    """
    @param comment_id: Comment identifier
    @param db: Database session
    @return Updated comment
    Increment comment likes
    """
    updated = service.like_comment(db, comment_id)
    if not updated:
        raise HTTPException(status_code=404, detail="Comment not found")
    return updated