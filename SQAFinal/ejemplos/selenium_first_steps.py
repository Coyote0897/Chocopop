"""
Antes de ejecutar el test, ejecutar el siguiente comando para instalar la libreria necesaria

pip install selenium webdriver-manager
"""

from selenium import webdriver
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
import time 


# Configuración automática del WebDriver
driver = webdriver.Edge()

# Maximizar la ventana del navegador
driver.maximize_window()

# Abrir url en el navegador
driver.get('https://www.youtube.com/')

# Acciones para interactuar con el navegador
driver.find_element(By.XPATH, "//input[@id='search']").send_keys("the hot wind blowing")
driver.find_element(By.XPATH, "//button[@aria-label='Search']").click()

time.sleep(3)
driver.find_element(By.XPATH, "//ytd-video-renderer[@class='style-scope ytd-item-section-renderer'][1]").click()
time.sleep(5)



driver.quit()

print("Prueba visual completada")
