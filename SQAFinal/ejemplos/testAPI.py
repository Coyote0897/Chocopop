import requests

url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita"

payload = {}
headers = {}

response = requests.request("GET", url, headers=headers, data=payload)

def test_verify_status_code_200():
    esperado=200
    actual=response.status_code
    assert actual == esperado, f"Expected {esperado}, got {actual}"

def test_verify_name_strDrink():
    esperado="Margarita"
    json_respuesta=response.json()
    actual=json_respuesta['drinks'][0]['strDrink']
    assert actual == esperado, f"Expected {esperado}, got {actual}"

def test_verify_nested_value_Blue_Margarita_dont_have_video():
    bebida_esperada='Blue Margarita'
    esperado=None
    json_respuesta=response.json()
    bebida_actual=json_respuesta['drinks'][1]['strDrink']
    actual=json_respuesta['drinks'][1]['strVideo']
    assert bebida_esperada==bebida_actual and actual == esperado, f"Expected {esperado}, got {actual}"