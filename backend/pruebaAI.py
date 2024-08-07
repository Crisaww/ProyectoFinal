"""Synthesizes speech from the input string of text."""
from google.cloud import texttospeech

client = texttospeech.TextToSpeechClient()

input_text = texttospeech.SynthesisInput(text="Buenas tardes compañeros, se preguntarán porqué estan escuchando a una maquina hablar, pues verán.... Cristian cambia de pantalla porfavor. Todo esto se debe a la Inteligencia Artificial de Google Cloud")

# Note: the voice can also be specified by name.
# Names of voices can be retrieved with client.list_voices().
voice = texttospeech.VoiceSelectionParams(
    language_code="es-US",
    name="es-US-Wavenet-A",
)

audio_config = texttospeech.AudioConfig(
    audio_encoding=texttospeech.AudioEncoding.LINEAR16,
    speaking_rate=1
)

response = client.synthesize_speech(
    request={"input": input_text, "voice": voice, "audio_config": audio_config}
)

# The response's audio_content is binary.
with open("VozIA.mp3", "wb") as out:
    out.write(response.audio_content)
    print('Tu audio ha sido exportado')