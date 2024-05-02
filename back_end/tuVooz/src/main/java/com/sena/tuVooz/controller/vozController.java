package com.sena.tuVooz.controller;

import java.nio.file.Paths;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.api.gax.core.FixedCredentialsProvider;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.auth.oauth2.ServiceAccountCredentials;
import com.google.cloud.texttospeech.v1.*;
import com.google.protobuf.ByteString;

import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/v1/voz")
public class vozController {
    @GetMapping("/")
    public String home() throws Exception  {
     
        // Path al archivo JSON de credenciales
        String credFilePath = "C:\\Users\\SENA\\AppData\\Roaming\\gcloud\\application_default_credentials.json";

        // Inicializar el cliente
        try (FileInputStream credentialsStream = new FileInputStream(credFilePath)) {
            TextToSpeechSettings settings = TextToSpeechSettings.newBuilder()
                    .setCredentialsProvider(FixedCredentialsProvider.create(ServiceAccountCredentials.fromStream(credentialsStream)))
                    .build();
            try (TextToSpeechClient textToSpeechClient = TextToSpeechClient.create(settings)) {

            // Configurar la solicitud de síntesis
            SynthesisInput input = SynthesisInput.newBuilder()
                    .setText("Hola, este es un ejemplo de texto a voz con Google Cloud Text-to-Speech.")
                    .build();

            VoiceSelectionParams voice = VoiceSelectionParams.newBuilder()
                    .setLanguageCode("es-ES") // Elige el idioma adecuado
                    .setSsmlGender(SsmlVoiceGender.FEMALE) // Elige el género adecuado
                    .build();

            AudioConfig audioConfig = AudioConfig.newBuilder()
                    .setAudioEncoding(AudioEncoding.LINEAR16)
                    .build();

            // Realizar la solicitud de síntesis
            SynthesizeSpeechResponse response = textToSpeechClient.synthesizeSpeech(input, voice, audioConfig);

            // Escribir la respuesta a un archivo de audio
            ByteString audioContents = response.getAudioContent();
            try (java.io.FileOutputStream out = new java.io.FileOutputStream("output.wav")) {
                out.write(audioContents.toByteArray());
            }
            System.out.println("Audio content written to file \"output.wav\"");
        }
    }
}
