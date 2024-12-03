from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from webdriver_manager.chrome import ChromeDriverManager 
import time

class TestActualizarEstadoPedido:
    def setup_method(self):
        self.driver = webdriver.Chrome()
        self.driver.maximize_window()
        self.driver.get('http://localhost:3001')
        time.sleep(3)

    def teardown_method(self):
        self.driver.quit()
        print("El test case de actualización del estado del pedido se realizó de manera correcta.")

    def test_view_button_functionality(self):
        
        usuario_actual = self.driver.find_element(By.XPATH, "//input[@type = 'text']")
        contrasena_actual  = self.driver.find_element(By.XPATH, "//input[@type = 'password']")
        
        usuario_actual.send_keys("choco")
        contrasena_actual.send_keys("popqwerty")
        
        btn_inicio_sesion = self.driver.find_element(By.XPATH, "//button[@type = 'submit']")
        btn_inicio_sesion.click()
        
        time.sleep(3)  
        
        pedidos = self.driver.find_element(By.XPATH, "//a[@href = '/pedidos']")
        pedidos.click()

        time.sleep(4)  
        
        boton_actualizar_estado = self.driver.find_element(By.XPATH, "(//button[contains(@class, 'bg-green-500')])[1]")
        boton_actualizar_estado.click()
        time.sleep(4)
        
        actestado = self.driver.find_element(By.XPATH, "//select[@id = 'swal2-select']")
        actestado.click()
        time.sleep(4)

        opciones = self.driver.find_element(By.XPATH, "//option[@value = 'Enviado']")
        opciones.click()
        time.sleep(4)

        boton_ok = self.driver.find_element(By.XPATH, "//button[contains(@class, 'confirm')]")
        boton_ok.click()
        time.sleep(5)

        texto_esperado = "¡Actualizado!"
        texto_actual = self.driver.find_element(By.XPATH, "//h2[@class = 'swal2-title']").text

        print(f"Texto esperado de actualización: {texto_esperado}")
        print(f"Texto actual: {texto_actual}")

        assert texto_esperado  == texto_actual, f"FALLÓ: El texto del mensaje no es el esperado. Esperado: '{texto_esperado }', Actual: '{texto_actual}'"

        time.sleep(4)
