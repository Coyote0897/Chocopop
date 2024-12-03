from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from webdriver_manager.chrome import ChromeDriverManager 
import time

class TestVerDetalles:
    def setup_method(self):
        self.driver = webdriver.Chrome()
        self.driver.maximize_window()
        self.driver.get('http://localhost:3001')
        time.sleep(3)

    def teardown_method(self):
        self.driver.quit()
        print("El test case para ver los detalles del reclamo se hizo de manera correcta.")

    def test_claim_details_view(self):
        
        #Iniciar sesión como administrador

        usuario_actual = self.driver.find_element(By.XPATH, "//input[@type = 'text']")
        contrasena_actual  = self.driver.find_element(By.XPATH, "//input[@type = 'password']")
        
        usuario_actual.send_keys("choco")
        contrasena_actual.send_keys("popqwerty")
        
        btn_inicio_sesion = self.driver.find_element(By.XPATH, "//button[@type = 'submit']")
        btn_inicio_sesion.click()
        
        time.sleep(3)  


        #Ir al apartado de Contactos y Reclamos
        
        contacto = self.driver.find_element(By.XPATH, "//a[@href = '/Contacto']")
        contacto.click()

        time.sleep(4)  


        #Seleccionar el botón de ver detalles de algún reclamo de la lista 
        
        boton_ver_detalles = self.driver.find_element(By.XPATH, "(//button[contains(@class, 'bg-blue-500')])[2]")
        boton_ver_detalles.click()
        time.sleep(4)
        
        #Buscar y guardar la ventana emergente de los detalles del reclamo

        detalles = self.driver.find_element(By.XPATH, "//div[contains(@class, 'swal2-popup')]")


        #Buscar e imprimir el correo, el asunto y el mensaje del usuario

        correo = self.driver.find_element(By.XPATH, "(//div[contains(@class, 'swal2-html')]//p)[1]").text
        correo = correo.lower()

        asunto = self.driver.find_element(By.XPATH, "(//div[contains(@class, 'swal2-html')]//p)[2]").text
        asunto = asunto.lower()

        mensaje = self.driver.find_element(By.XPATH, "(//div[contains(@class, 'swal2-html')]//p)[3]").text
        mensaje = mensaje.lower()

        print(correo)
        print(asunto)
        print(mensaje)

        assert detalles.is_displayed(), "FALLÓ: Los detalles del reclamo no se pueden ver."

        time.sleep(3)
