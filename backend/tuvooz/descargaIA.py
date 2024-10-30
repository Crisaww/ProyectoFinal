import json
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from google.cloud import texttospeech
import os

def synthesize_text_to_speech(text, output_file='MenWhereAreYou.wav', voice_name="en-US-Journey-D", language_code="en-US", audio_format=texttospeech.AudioEncoding.LINEAR16, speaking_rate=1.0):
    # Verificar si las credenciales están configuradas en las variables de entorno
    if not os.getenv('GOOGLE_APPLICATION_CREDENTIALS'):
        return JsonResponse({'error': 'Google Cloud credentials not configured'}, status=500)

    try:
        # Crear el cliente de text-to-speech
        client = texttospeech.TextToSpeechClient()

        # El texto que se convertirá en audio
        input_text = texttospeech.SynthesisInput(text=text)

        # Parámetros de selección de voz
        voice = texttospeech.VoiceSelectionParams(
            language_code=language_code,
            name=voice_name,
        )

        # Configuración del audio
        audio_config = texttospeech.AudioConfig(
            audio_encoding=audio_format,  # Puedes cambiar a MP3 si prefieres
            speaking_rate=speaking_rate  # Velocidad de la voz (ajustable)
        )

        # Realiza la solicitud de síntesis de texto a voz
        response = client.synthesize_speech(
            request={"input": input_text, "voice": voice, "audio_config": audio_config}
        )

        # Escribir el contenido del audio en el archivo de salida
        with open(output_file, "wb") as out:
            out.write(response.audio_content)
            print(f'Audio content written to file "{output_file}"')

        return JsonResponse({'message': 'Audio generated successfully'}, status=200)

    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

# Vista Django que utiliza la función synthesize_text_to_speech
@csrf_exempt
def synthesizetts(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        text = data.get('text', 'Hello, this is a test.')  # Texto por defecto
        response = synthesize_text_to_speech(text=text)

        return response

    return JsonResponse({'error': 'Invalid request method'}, status=405)
