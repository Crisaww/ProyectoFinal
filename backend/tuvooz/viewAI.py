import json
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from google.cloud import texttospeech
import os

@csrf_exempt
def synthesize(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            text = data.get('text', '')
            voice_name = data.get('voice', 'es-US-Wavenet-B')  # Voz por defecto

            if not text:
                return JsonResponse({'error': 'No text provided'}, status=400)

            if not os.getenv('GOOGLE_APPLICATION_CREDENTIALS'):
                return JsonResponse({'error': 'Google Cloud credentials not configured'}, status=500)

            client = texttospeech.TextToSpeechClient()
            input_text = texttospeech.SynthesisInput(text=text)
            voice = texttospeech.VoiceSelectionParams(language_code="es-US", name=voice_name)
            audio_config = texttospeech.AudioConfig(audio_encoding=texttospeech.AudioEncoding.MP3)
            response = client.synthesize_speech(input=input_text, voice=voice, audio_config=audio_config)

            return HttpResponse(response.audio_content, content_type='audio/mpeg')
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=405)

