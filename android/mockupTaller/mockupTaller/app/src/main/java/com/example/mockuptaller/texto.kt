package com.example.mockuptaller

import android.media.MediaPlayer
import android.os.Bundle
import android.util.Log
import android.widget.EditText
import android.widget.ImageView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.mockuptaller.config.Config.Companion.urlGenerarTexto
import okhttp3.*
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import org.json.JSONObject
import java.io.File
import java.io.IOException

class texto : AppCompatActivity() {


    private lateinit var editText: EditText
    private val client = OkHttpClient()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.texto)

        editText = findViewById(R.id.cuadroTexto)  // Obtén referencia al EditText

        // Configurar botón Volver
        val btnVolver = findViewById<ImageView>(R.id.btnVolver)
        btnVolver.setOnClickListener {
            finish()  // Cierra la actividad actual
        }
    }

    // Método que se llama cuando se hace clic en el botón "Reproducir sonido"
    fun reproducirAudio(view: android.view.View) {
        val texto = editText.text.toString()

        if (texto.isBlank()) {
            Toast.makeText(this, "Por favor, escriba un texto", Toast.LENGTH_SHORT).show()
            return
        }

        // Enviar el texto a la API para convertirlo a voz
        convertirTexto(texto)
    }

    private fun convertirTexto(texto: String) {
        val jsonBody = JSONObject().apply {
            put("text", texto)
        }

        Log.d("texto", "Iniciando solicitud POST a la API con el texto: $texto")

        val requestBody = RequestBody.create(
            "application/json; charset=utf-8".toMediaTypeOrNull(),
            jsonBody.toString()
        )

        val request = Request.Builder()
            .url(urlGenerarTexto)
            .post(requestBody)
            .build()

        client.newCall(request).enqueue(object : Callback {
            override fun onFailure(call: Call, e: IOException) {
                runOnUiThread {
                    Toast.makeText(this@texto, "Error de conexión", Toast.LENGTH_SHORT).show()
                }
                Log.e("texto", "Error en la solicitud: ${e.message}")
            }

            override fun onResponse(call: Call, response: Response) {
                Log.d("texto", "Codigo de respuesta: ${response.code}")
                if (response.isSuccessful) {
                    val audioBytes = response.body?.bytes()
                    if (audioBytes != null) {
                        Log.d("texto", "Audio recibido con exito")
                        reproducirAudio(audioBytes)
                    } else {
                        runOnUiThread {
                            Toast.makeText(this@texto, "Error al obtener el audio", Toast.LENGTH_SHORT).show()
                        }
                    }
                } else {
                    runOnUiThread {
                        Toast.makeText(this@texto, "Error en la conversión de texto a voz", Toast.LENGTH_SHORT).show()
                    }
                    Log.e("texto", "Error en la respuesta: ${response.message}")
                }
            }
        })
    }

    private fun reproducirAudio(audioData: ByteArray) {
        try {
            val tempFile = File.createTempFile("audio", "mp3", cacheDir)
            tempFile.writeBytes(audioData)

            val mediaPlayer = MediaPlayer()
            mediaPlayer.setDataSource(tempFile.absolutePath)
            mediaPlayer.prepare()
            mediaPlayer.start()

            mediaPlayer.setOnCompletionListener {
                tempFile.delete()
            }

        } catch (e: IOException) {
            Log.e("texto", "Error al reproducir el audio: ${e.message}")
        }
    }

}