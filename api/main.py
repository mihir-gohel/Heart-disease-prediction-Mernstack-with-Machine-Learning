from fastapi import FastAPI
import uvicorn
import pickle
from pydantic import BaseModel

# =---------------------------------------------------------join python server to react --------------------------------------------------------------
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()
origins = [
    "http://localhost:3000",
    "http://localhost:3000",
    "http://localhost.tiangolo.com"
    "http://localhost:8080"
    "https://localhost.tiangolo.com"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

model = pickle.load(open('../Model/heartable.pkl', 'rb'))

class Patient(BaseModel):
    age : int
    anaemia: int
    creatinine_phosphokinase:int
    diabetes:int
    ejection_fraction:int
    high_blood_pressure:int
    platelets:int
    serum_creatinine:float
    serum_sodium:int
    sex:int
    smoking:int
    
        

@app.get('/')
def hello(): 
    return {'data': 'Welcome to online Heart disease prediction model'}

@app.post("/prediction/")
async def get_predict(data: Patient):

    sample = [[
        data.age,
        data.anaemia,
        data.creatinine_phosphokinase,
        data.diabetes,
        data.ejection_fraction,
        data.high_blood_pressure,
        data.platelets,
        data.serum_creatinine,
        data.serum_sodium,
        data.sex,
        data.smoking,
       
    ]]
    
    death = model.predict(sample).tolist()[0]
    return{
        "data" : {
        'prediction' : death,
        'interpretation' : 'Patient can have disease'
        if death == 1 else 'Patient can not have disease.'
        }
    }

if __name__ == '__main__':
    uvicorn.run(app, port=8080, host='0.0.0.0')