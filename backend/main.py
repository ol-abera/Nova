from fastapi import FastAPI

app = FastAPI(
    title="NOVA API",
    description="Backend API for the NOVA e-commerce platform",
    version="1.0.0",
)


@app.get("/")
def root():
    return {
        "message": "NOVA API is running 🚀"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }