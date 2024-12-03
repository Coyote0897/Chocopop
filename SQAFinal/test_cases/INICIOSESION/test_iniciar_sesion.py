from selenium import webdriver
from selenium.webdriver.common.by import By
import time

class TestIniciarSesion:
    def setup_method(self):
        self.driver = webdriver.Chrome()
        self.driver.maximize_window()
        self.driver.get('http://localhost:3001')
        time.sleep(2)

    def teardown_method(self):
        self.driver.quit()
        print("El test case de inicio de sesión del administrador se hizo de manera correcta.")

    def test_inicio_sesion_correcto(self):
       
        usuario_esperado = "choco"
        contrasena_esperada = "popqwerty"
        
        
        usuario_actual = self.driver.find_element(By.XPATH, "//input[@type = 'text']")
        contrasena_actual  = self.driver.find_element(By.XPATH, "//input[@type = 'password']")
        
        usuario_actual.send_keys("choco")
        contrasena_actual.send_keys("popqwerty")
        
        print(f"Usuario esperado: {usuario_esperado}")
        print(f"Contraseña esperada: {contrasena_esperada}")
        print(f"Usuario actual: {usuario_actual.get_attribute('value')}")
        print(f"Contraseña actual: {contrasena_actual.get_attribute('value')}")


        btn_inicio_sesion = self.driver.find_element(By.XPATH, "//button[@type = 'submit']")
        btn_inicio_sesion.click()
        
        time.sleep(3)  

        texto_dashboard_esperado = "¡Bienvenido al Dashboard!"
        texto_dashboard_actual = self.driver.find_element(By.XPATH, "//h1[contains(text(),'Bienvenido')]").text
        
        print(f"Título del dashboard esperado: {texto_dashboard_esperado}")
        print(f"Título del dashboard actual: {texto_dashboard_actual}")

        assert texto_dashboard_esperado  == texto_dashboard_actual, f"FALLÓ: El título del dashboard no es el esperado. Esperado: '{texto_dashboard_esperado}', Actual: '{texto_dashboard_actual}'"

        time.sleep(2)
