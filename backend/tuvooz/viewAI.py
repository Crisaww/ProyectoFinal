import json
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from google.cloud import texttospeech
import os
from transformers import pipeline
from nltk.corpus import wordnet



# Inicializamos el modelo adecuado para completar palabras
# Cambiamos de GPT-2 a un modelo más adecuado para esta tarea como BERT
text_generator = pipeline("fill-mask", model="dccuchile/bert-base-spanish-wwm-cased")

# Función para obtener palabras relacionadas usando WordNet (opcional)
def get_related_words(word):
    synonyms = []
    for syn in wordnet.synsets(word, lang='spa'):  # Sinónimos en español
        for lemma in syn.lemmas('spa'):
            synonyms.append(lemma.name())
    return set(synonyms)

@csrf_exempt
def predict_text(request):
    if request.method == 'POST':
        try:
            # Parsear los datos del request
            data = json.loads(request.body)
            text = data.get('text', '').strip()  # Eliminar espacios innecesarios
            num_words = data.get('num_words', 3)  # Número de sugerencias
            top_k = data.get('top_k', 5)  # Controlar el número de predicciones posibles

            # Validar que se haya proporcionado texto
            if not text:
                return JsonResponse({'error': 'No text provided'}, status=400)

            # Agregar una máscara al final del texto para que el modelo prediga la siguiente palabra
            masked_text = f"{text} [MASK]"

            # Generar sugerencias usando el modelo
            generated_texts = text_generator(masked_text, top_k=top_k)

            # Obtener las palabras sugeridas
            suggested_texts = [result['token_str'] for result in generated_texts]

            # Filtrar sugerencias que no tengan sentido o que sean demasiado cortas
            filtered_suggestions = [
                word for word in suggested_texts
                if len(word) > 1  # Evitar palabras vacías o muy cortas
            ][:num_words]  # Limitar el número de sugerencias

            # Retornar las sugerencias
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

