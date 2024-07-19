from flask import Flask, request, send_file
from google.cloud import texttospeech
import os

app = Flask(__name__)

# Configura la autenticación de Google Cloud
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'd:\SENA\Documents\CristianNarvaez\Software\credencialesGoogleCloud\tuvooz-31b621c52443.json'

@app.route('/synthesize', methods=['POST'])
def synthesize():
    data = request.get_json()
    text = data.get('text', '')

    client = texttospeech.TextToSpeechClient()

    input_text = texttospeech.SynthesisInput(text=text)

    voice = texttospeech.VoiceSelectionParams(
        language_code="es-US",
        name="es-US-Standard-B",
    )

    audio_config = texttospeech.AudioConfig(
        audio_encoding=texttospeech.AudioEncoding.MP3,
        speaking_rate=1
    )

    response = client.synthesize_speech(
        request={"input": input_text, "voice": voice, "audio_config": audio_config}
    )

    with open("output.mp3", "wb") as out:
        out.write(response.audio_content)

    return send_file("output.mp3", mimetype="audio/mp3")

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
