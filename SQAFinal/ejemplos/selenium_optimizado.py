"""
Antes de ejecutar el test, ejecutar el siguiente comando para instalar la libreria necesaria

pip install selenium webdriver-manager
"""

from selenium import webdriver
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
import time


# Configuración automática del WebDriver
driver = webdriver.Chrome()

# Maximizar la ventana del navegador
driver.maximize_window()

# Abrir url en el navegador
driver.get('https://enlace.univalle.edu/san/webform/PAutenticar.aspx')

driver.find_element(By.XPATH, "//input[contains(@name, 'txtCuenta')]").send_keys("ARG2017149")

pin = "123456"
for number in pin:
    print(f"Escrbiendo el numero {number}")
    driver.find_element(By.XPATH, f"//img[@alt = '{number}']").click()
    time.sleep(1)

driver.find_element(By.XPATH, "//td[contains(@id, 'TableCell7')]//select[contains(@name, 'TipoUsuario')]").click()
time.sleep(2)

driver.find_element(By.XPATH, "//option[text() = 'ESTUDIANTE']").click()

time.sleep(2)
driver.find_element(By.XPATH, "//input[contains(@id, 'btnInicioSession')]").click()

time.sleep(5)




driver.quit()

print("Prueba visual completada")
