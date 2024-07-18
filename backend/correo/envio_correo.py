import smtplib
import os
from dotenv import load_dotenv
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

# Carga las variables de entorno desde el archivo .env
load_dotenv()

# Obtiene las credenciales del archivo .env
remitente = os.getenv('user')
contrasena = os.getenv('pass')

# Verifica que las credenciales están presentes
if not remitente or not contrasena:
    raise ValueError("Las credenciales no están definidas en el archivo .env")

destinatario = 'tuvoozsoporte@gmail.com'
asunto = 'Bienvenida/o a Tu Vooz'

# Crea el objeto del mensaje
msg = MIMEMultipart()
msg['Subject'] = asunto
msg['From'] = remitente
msg['To'] = destinatario

# Lee el contenido del archivo HTML
try:
    with open('./email.html', 'r', encoding='utf-8') as archivo:
        html = archivo.read()
except FileNotFoundError:
    raise FileNotFoundError("El archivo email.html no se encuentra en el directorio actual")

# Adjunta el contenido HTML al mensaje
msg.attach(MIMEText(html, 'html'))

# Conéctate al servidor SMTP de Gmail
try:
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()  # Inicia la conexión segura
    server.login(remitente, contrasena)  # Inicia sesión con las credenciales
    server.sendmail(remitente, destinatario, msg.as_string())  # Envía el correo
    print("Correo enviado exitosamente")
except Exception as e:
    print(f"Error al enviar el correo: {e}")
finally:
    server.quit()  # Cierra la conexión
