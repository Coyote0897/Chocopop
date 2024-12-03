from selenium import webdriver
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
import time


timeSleep=1
driver = webdriver.Chrome()

driver.maximize_window()

driver.get('https://www.google.com')

driver.find_element(By.XPATH, "//textarea[@aria-label='Buscar']").send_keys("Fecha de hoy")
driver.find_elements(By.XPATH, "//input[@role='button']")[1].click()
time.sleep(timeSleep)
dateValue=driver.find_element(By.XPATH, "//span[contains(text(),'La Paz')]//preceding-sibling::div").text

print(dateValue)
time.sleep(timeSleep)

driver.get('https://www.wikipedia.org')
driver.find_element(By.XPATH, "//input[@id='searchInput']").send_keys(dateValue)
time.sleep(timeSleep)

driver.find_element(By.XPATH, "//button[@type='submit']").click()
time.sleep(timeSleep)

searchResult=driver.find_element(By.XPATH, "//h1").text
print(searchResult)
