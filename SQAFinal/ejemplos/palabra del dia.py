from selenium import webdriver
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
import time

# Configuración automática del WebDriver
driver = webdriver.Chrome()

# Maximizar la ventana del navegador
driver.maximize_window()


# Abrir url en el navegador
driver.get('https://yoparticipo.oep.org.bo')
# Establecer el zoom al 80%
driver.execute_script("document.body.style.zoom='80%'")

ci='9869650'
day='12'
month='4'
year='2004'

driver.find_element(By.XPATH, "//input").send_keys(ci)
driver.find_element(By.XPATH, "//select[contains(@aria-label,'month')]").click()
driver.find_element(By.XPATH, f"//select[contains(@aria-label,'month')]//child::option[@value='{month}']").click()

driver.find_element(By.XPATH, "//select[contains(@aria-label,'year')]").click()
driver.find_element(By.XPATH, f"//select[contains(@aria-label,'year')]//child::option[@value='{year}']").click()

driver.find_element(By.XPATH, f"//div[text()='{day}']").click()

driver.find_element(By.XPATH, f"//button[text()='Consultar']").click()
time.sleep(5)

name=driver.find_element(By.XPATH, f"//h2").text
state=driver.find_element(By.XPATH, f"//h4[contains(text(),'Estado')]").text
time.sleep(5)


print(f"'{name}'  {state}")
