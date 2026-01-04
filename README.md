## Overview
[Build and Deploy a Python AI Agent](https://youtu.be/eSbeub2ZeNk?si=weXtyqePy0jQaYvD) by Tech with Tim

## Setup
```bash
cd backend
conda create -n langchain-env python=3.11 -y
conda activate langchain-env
pip install requirements.txt
```

under `backend/` create a `.env` file and add `OPENAI_API_KEY=""`

## Running the app
### Frontend
```bash
cd frontend
pnpm run dev
```
### Backend
```bash
cd backend
conda activate langchain-env
python main.py
```