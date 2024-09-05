from google.cloud import texttospeech

# Crear un cliente para la API de Text-to-Speech
client = texttospeech.TextToSpeechClient()

# Configurar el texto de entrada
input_text = texttospeech.SynthesisInput(text="Hola")

# Configurar los parámetros de la voz
voice = texttospeech.VoiceSelectionParams(
    language_code="es-ES",  # Cambié de es-US a es-ES, que es más adecuado para español
    name="es-ES-Wavenet-A", # Cambié de es-US-Wavenet-A a es-ES-Wavenet-A, el nombre debe coincidir con el idioma
)

# Configurar los parámetros del audio
audio_config = texttospeech.AudioConfig(
    audio_encoding=texttospeech.AudioEncoding.MP3,  # Cambié a MP3 para que coincida con la extensión del archivo
    speaking_rate=1.0  # Mantenido el valor 1.0 para la velocidad normal
)

# Realizar la solicitud de síntesis de voz
response = client.synthesize_speech(
    request={"input": input_text, "voice": voice, "audio_config": audio_config}
)

# Guardar el contenido de audio en un archivo
with open("VozIA.mp3", "wb") as out:
    out.write(response.audio_content)
    print('Tu audio ha sido exportado')
