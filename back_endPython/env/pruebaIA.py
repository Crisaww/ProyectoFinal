#Para que exporte un archivo*************************

from google.cloud import texttospeech

client = texttospeech.TextToSpeechClient()
input_text = texttospeech.SynthesisInput(text="Buenas tardes Señor papacito rico")

# Note: the voice can also be specified by name.
# Names of voices can be retrieved with client.list_voices().
voice = texttospeech.VoiceSelectionParams(
    language_code="es-US",
    name="es-US-News-F",
)

audio_config = texttospeech.AudioConfig(
    audio_encoding=texttospeech.AudioEncoding.LINEAR16,
    speaking_rate=1
)

response = client.synthesize_speech(
    request={"input": input_text, "voice": voice, "audio_config": audio_config}
)

# The response's audio_content is binary.
with open("VoozCliente.mp3", "wb") as out:
    out.write(response.audio_content)
    print('Tu audio ha sido exportado "VoozCliente.mp3"')



#Para que suene en consola***************************

# from google.cloud import texttospeech
# import pyaudio
# import wave

# # Crear cliente de Text-to-Speech
# client = texttospeech.TextToSpeechClient()

# # Definir el texto a convertir en voz
# input_text = texttospeech.SynthesisInput(text="Hola mi amor, que mas pues?")

# # Seleccionar la voz y el idioma
# voice = texttospeech.VoiceSelectionParams(
#     language_code="es-US",
#     name="es-US-Studio-B",
# )

# # Configurar el audio
# audio_config = texttospeech.AudioConfig(
#     audio_encoding=texttospeech.AudioEncoding.LINEAR16,
#     speaking_rate=1
# )

# # Solicitar la síntesis de texto a voz
# response = client.synthesize_speech(
#     request={"input": input_text, "voice": voice, "audio_config": audio_config}
# )

# # Guardar el contenido del audio en un archivo temporal
# with open("temp_audio.wav", "wb") as out:
#     out.write(response.audio_content)

# # Reproducir el archivo de audio
# def play_audio(file):
#     # Abrir el archivo WAV
#     wf = wave.open(file, 'rb')

#     # Crear un objeto PyAudio
#     p = pyaudio.PyAudio()

#     # Abrir un stream de PyAudio
#     stream = p.open(format=p.get_format_from_width(wf.getsampwidth()),
#                     channels=wf.getnchannels(),
#                     rate=wf.getframerate(),
#                     output=True)

#     # Leer datos del archivo y reproducirlos
#     data = wf.readframes(1024)
#     while data:
#         stream.write(data)
#         data = wf.readframes(1024)

#     # Finalizar el stream
#     stream.stop_stream()
#     stream.close()

#     # Cerrar PyAudio
#     p.terminate()

# # Llamar a la función para reproducir el audio
# play_audio("temp_audio.wav")
