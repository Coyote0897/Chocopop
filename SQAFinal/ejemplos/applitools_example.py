"""
Antes de ejecutar el test, ejecutar los siguientes comandos para instalar las librerias necesarias

pip install selenium webdriver-manager
pip install eyes-selenium

"""

from selenium import webdriver
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
from applitools.selenium import Eyes, Target

# Applitools - Configura tu API Key
APPLITOOLS_API_KEY = 'a7LRC3CaZVqMAtOBCwMsIzVhhTl1110TWuPRbFXjbjNt8110'

# Inicializar Applitools Eyes
eyes = Eyes()
eyes.api_key = APPLITOOLS_API_KEY

# Configuración automática del WebDriver sin usar Service
driver = webdriver.Chrome()

# Maximizar la ventana del navegador
driver.maximize_window()

try:
    # Empezar una sesión de prueba visual con Applitools
    eyes.open(driver=driver, app_name='Univalle App', test_name='Prueba Visual con Applitools para Univalle')

    # Navegar a la página que queremos probar
    driver.get('https://gonzaloalarconroldan.github.io/univalle_test/')

    # Tomar una captura de pantalla completa de la página
    eyes.check("Página completa", Target.window().fully())



    # Tomar una captura de pantalla después de la interacción
    eyes.check("Después del Login", Target.window().fully())

    # Cerrar los ojos de Applitools y finalizar la prueba
    eyes.close()

finally:
    # Finalizar la sesión de Selenium y Applitools
    driver.quit()
    eyes.abort_if_not_closed()

print("Prueba visual completada")
