from db import Base 
from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime, timezone

class Comment(Base):
    __tablename__ = "comments"

    id = Column(Integer, primary_key=True, index=True)
    author = Column(String, nullable=False)
    text = Column(String, nullable=False)
    created_at = Column(DateTime,  default=lambda: datetime.now(timezone.utc), nullable=False)
    likes = Column(Integer, default=0)
    image = Column(String, nullable=True)