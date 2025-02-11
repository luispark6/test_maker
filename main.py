from fastapi import FastAPI, UploadFile, File, Request
from pypdf import PdfReader
from openai import AsyncOpenAI
from contextlib import asynccontextmanager
from dotenv import load_dotenv
import os, io
from google.cloud import vision
from google.cloud.vision_v1 import types
from pdf2image import convert_from_path
import asyncio
import aiofiles
from pydantic import BaseModel


class mutliple_choice(BaseModel):
    questions: list[str]
    multiple_choice: list[list[str]]
    correct_answer: list[str]


@asynccontextmanager
async def lifespan(app: FastAPI):
    load_dotenv()
    app.state.openai_client = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    app.state.google_client = vision.ImageAnnotatorClient()
    yield


app = FastAPI(lifespan=lifespan)

@app.post("/parse_pdf")
async def parse_pdf(request: Request, file: UploadFile = File(...), handwritten: bool= False):
    if file.content_type != "application/pdf":
        return {"Message": f"Please import a PDF"}
    try:
        file_name = file.filename
        filepath = f"/code/app/{file_name}"
        with open(filepath, "wb") as f:
            f.write(await file.read())
    except Exception as e:
        return JSONResponse(status_code=500, content={"message": str(e)})

    if not handwritten:
        reader = PdfReader(filepath)
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"
        os.remove(filepath)
        return text

    client = request.app.state.google_client
    async with aiofiles.open(filepath, 'rb') as image_file:
        content = await image_file.read()

    pages = await asyncio.to_thread(convert_from_path, filepath, 500)
    i=0
    for page in pages:
        page.save(f'{filepath}{i}.jpg', 'JPEG')
        i+=1
    text = []
    for j in range(i):
        async with aiofiles.open(f"{filepath}{j}.jpg", 'rb') as image_file:
            content = await image_file.read()
        image_context = vision.ImageContext(language_hints=['en-t-i0-handwrit'])
        image = vision.Image(content=content)
        response = await asyncio.to_thread(client.document_text_detection, image=image, image_context=image_context)
        text.append(response.full_text_annotation.text)
        os.remove(f"{filepath}{j}.jpg")
    os.remove(filepath)
    return " ".join(text)
    


@app.post("/call_openai")
async def call_openai(prompt: str, request: Request, nq: int):
    client = request.app.state.openai_client
    completion = await client.beta.chat.completions.parse(
    model="gpt-4o-2024-08-06",
    messages=[
        {"role": "system", "content": f"You are going to be given notes. Please make a list of {nq} questions given the topic, \
             a list of multiple choice for these questions, and a list of the answers to the questions"},
        {"role": "user", "content": prompt},
        ],
        response_format=mutliple_choice,
    )
    return completion.choices[0].message.parsed







