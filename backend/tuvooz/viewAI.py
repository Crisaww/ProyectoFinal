import json
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from google.cloud import texttospeech
import os
from transformers import pipeline


# Inicializar el generador de texto con el modelo adecuado
text_generator = pipeline("text-generation", model="datificate/gpt2-small-spanish")

@csrf_exempt
def predict_text(request):
    if request.method == 'POST':
        try:
            # Parsear los datos del request
            data = json.loads(request.body)
            text = data.get('text', '')
            num_words = data.get('num_words', 5)  # Número de palabras a generar
            temperature = data.get('temperature', 2.0)  # Controlar la creatividad del modelo

            # Validar que se haya proporcionado texto
            if not text:
                return JsonResponse({'error': 'No text provided'}, status=400)

            # Generar varias sugerencias
            generated_texts = text_generator(
                text, 
                max_length=num_words + len(text.split()),  # Ajustar para la longitud total
                num_return_sequences=1,  # Obtener solo una secuencia para extraer palabras
                temperature=temperature, 
                pad_token_id=50256,
                truncation=True  # Activar el truncamiento
            )

            # Limpiar el texto generado y filtrar sugerencias irrelevantes
            suggested_texts = generated_texts[0]['generated_text'].split()  # Obtener palabras

            # Filtrar sugerencias que no tengan sentido
            filtered_suggestions = [
                word for word in suggested_texts 
                if word not in text and len(word) > 1  # Evitar palabras vacías o repetidas
            ][:num_words]  # Limitar el número de palabras sugeridas

            return JsonResponse({'suggested_texts': filtered_suggestions}, status=200)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=405)


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

