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
        print("El test case para responder al reclamo se hizo de manera correcta.")

    def test_claim_details_answer(self):
        
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


        #Seleccionar el botón de responder a algún reclamo de la lista 
        
        boton_responder = self.driver.find_element(By.XPATH, "(//button[contains(@class, 'bg-green-500')])[1]")
        boton_responder.click()
        time.sleep(4)
        


        #Guardar e ingresar la respuesta al reclamo 
        respuesta_texto = "Su problema será atendido cuando venga a la tienda. Gracias por su comprensión."
        textarea = self.driver.find_element(By.XPATH, "//textarea[@id = 'swal2-textarea']")
        textarea.send_keys(respuesta_texto)
        

        #Imprimir la respuesta del reclamo al usuario
        print(f"Respuesta enviada al reclamo: {respuesta_texto}")

        time.sleep(5)


        #Enviar la respuesta del reclamo al usuario
        boton_enviar = self.driver.find_element(By.XPATH, "//button[contains(text(),'Enviar')]")
        boton_enviar.click()
        time.sleep(5)


        #Buscar y guardar la ventana emergente de los detalles del reclamo

        respuesta = self.driver.find_element(By.XPATH, "//div[contains(@class, 'swal2-popup')]")

        assert respuesta.is_displayed(), "FALLÓ: La respuesta del reclamo no se puede ver."

        time.sleep(5)
