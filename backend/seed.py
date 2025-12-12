import json
from db import SessionLocal
from backend.models import Comment

COMMENT_TABLE_NAME = "comments"
COMMENTS_FILE = "comments.json"

def seed():
    db = SessionLocal()
    try:
        exsisting = db.query(Comment).first()
        if exsisting:
            return
        
        with open(COMMENT_TABLE_NAME, "r") as f:
            comments_data = json.load(f)
            
        comments = comments_data.get(COMMENT_TABLE_NAME, comments_data)
        
        for item in comments:
            db_comment = Comment(
                author=item.get("author", "Admin"),
                text=item["text"],
                created_at=item.get("datetime"),
                likes=item.get("likes", 0),
                image=item.get("image"),
            )
            db.add(db_comment)
            
        db.commit()
    finally:
        db.close()
        
if __name__ == "__main__":
    seed()