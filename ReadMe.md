#Project

## Clone the Repository

```
git clone https://github.com/richajos34/BobyardTakeHome.git
cd BobyardTakeHome
```

## Activate enviorment
```
python -m venv .venv
source .venv/bin/activate
```

## Install backend deps

```
pip install fastapi uvicorn sqlalchemy psycopg2-binary python-dotenv

```

## Create .env
Refer to emailed values and .env.reference

## Install frontend deps
```
cd frontend
npm install
```

## Run Project
backend
```
uvicorn backend.main:app --reload --port 8000

```
In another terminal

```
cd frontend
npm run dev
```

## Seed Database in from root
```
python -m backend.seed
```

Open http://localhost:5173
