from fastapi import FastAPI


API_DATA = [
  {
    "id": 1,
    "mood": "happy",
    "quote": "Sunshine is a state of mind, let yours radiate today.",
  },
  {
    "id": 2,
    "mood": "sad",
    "quote": "Even the darkest night will end and the sun will rise.",
  },
  {
    "id": 3,
    "mood": "motivated",
    "quote":
      "The only limit to our realization of tomorrow will be our doubts of today.",
  },
  {
    "id": 4,
    "mood": "anxious",
    "quote":
      "Breathe. Let go. And remind yourself that this very moment is the only one you know you have for sure.",
  },
  {
    "id": 5,
    "mood": "calm",
    "quote": "Peace is the stillness of the soul in the presence of purpose.",
  },
  {
    "id": 6,
    "mood": "angry",
    "quote":
      "Holding onto anger is like drinking poison and expecting the other person to die.",
  },
  {
    "id": 7,
    "mood": "hopeful",
    "quote": "Every new day is a chance to change your life.",
  },
  {
    "id": 8,
    "mood": "grateful",
    "quote": "Appreciate what you have, where you are, and who you are with.",
  },
  {
    "id": 9,
    "mood": "lonely",
    "quote": "Sometimes, solitude is the most healing thing.",
  },
  {
    "id": 10,
    "mood": "inspired",
    "quote":
      "Create the kind of self that you will be happy to live with all your life.",
  },
]

app = FastAPI()

@app.get('/')
async def reda_root():
    return {"status":"success", "data":API_DATA}