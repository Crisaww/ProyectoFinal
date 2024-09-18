package com.example.mockuptaller

import android.content.Context
import android.content.SharedPreferences
import android.os.Bundle
import android.widget.Button
import android.widget.CheckBox
import android.widget.ImageView
import android.widget.Switch
import android.widget.TextView
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.app.AppCompatDelegate
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat

class configuracion_accesibilidad : AppCompatActivity() {
    private lateinit var sharedPreferences: SharedPreferences

    override fun onCreate(savedInstanceState: Bundle?) {
        // Initialize SharedPreferences
        sharedPreferences = getSharedPreferences("AppPreferences", Context.MODE_PRIVATE)

        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.configuracion_accesibilidad)

        // Configurar las insets para el diseño
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }
        // Dentro de onCreate()
        val checkboxFemenina: CheckBox = findViewById(R.id.checkboxFemenina)
        val checkboxMasculino: CheckBox = findViewById(R.id.checkboxMasculino)

       // Listener para voz femenina
        checkboxFemenina.setOnClickListener {
          checkboxFemenina.isChecked = true
            checkboxMasculino.isChecked = false // Desmarcar el otro CheckBox
        }

        // Listener para voz masculina
        checkboxMasculino.setOnClickListener {
           checkboxMasculino.isChecked = true
            checkboxFemenina.isChecked = false // Desmarcar el otro CheckBox
        }

        //Botones
        val tamañoPequeño: Button = findViewById(R.id.btnPequeña)
        val tamañoGrande: Button = findViewById(R.id.btnGrande)

        //Asignar los listeners a los botones para cambiar el tamaño
        tamañoPequeño.setOnClickListener{
            setTextSizePreference("small")
        }

        tamañoGrande.setOnClickListener{
            setTextSizePreference("large")
        }

        //aplica el tamaño basado en las preferencias guardados
        applyTextSize()

        // Configurar el Switch con el estado actual
        val switchDarkMode: Switch = findViewById(R.id.switch1)
        val isDarkMode = sharedPreferences.getBoolean("dark_mode", false)
        switchDarkMode.isChecked = isDarkMode

        // Configurar el listener para el Switch
        switchDarkMode.setOnCheckedChangeListener { _, isChecked ->
            // Guardar la preferencia del usuario
            with(sharedPreferences.edit()) {
                putBoolean("dark_mode", isChecked)
                apply()
            }

            // Cambiar el modo oscuro/claro
            AppCompatDelegate.setDefaultNightMode(
                if (isChecked) AppCompatDelegate.MODE_NIGHT_YES else AppCompatDelegate.MODE_NIGHT_NO
            )
        }

        // Configurar el botón de volver
        val btnVolver: ImageView = findViewById(R.id.btnVolver)
        btnVolver.setOnClickListener {
            finish() // Cierra la actividad y vuelve a la anterior
        }
    }

    private fun setTextSizePreference(size: String){
        val editor = sharedPreferences.edit()
        editor.putString("text_size", size)
        editor.apply()
        recreate()
    }

    private fun applyTextSize(){
        val textSize = sharedPreferences.getString("text_size", "small")

        // Referencia a las vistas de las que quieres cambiar el tamaño de texto
        val titulo: TextView = findViewById(R.id.text_configuracion_accesibilidad)
        val subtitulo1: TextView = findViewById(R.id.textTema)
        val subtitulo2: TextView = findViewById(R.id.textSalida_de_voz) // Ejemplo de un TextView
        val subtitulo3: TextView = findViewById(R.id.textTamaño_de_texto)
        val subtitulo4: TextView = findViewById(R.id.switch1)
        val subtitulo5: TextView = findViewById(R.id.checkboxFemenina)
        val subtitulo6: TextView = findViewById(R.id.checkboxMasculino)

        //aplica el tamaño del texto en toda la app
        when (textSize) {
            "samll" -> {
                titulo.textSize = 5f // Cambia el tamaño de texto del botón a 12sp (pequeño)
                subtitulo1.textSize = 5f
                subtitulo2.textSize = 5f // Cambia el tamaño de un TextView a 14sp
                subtitulo3.textSize = 5f
                subtitulo4.textSize = 5f
                subtitulo5.textSize = 5f
                subtitulo6.textSize = 5f
            }
            "large" -> {
                titulo.textSize = 24f // Cambia el tamaño de texto del botón a 18sp (grande)
                subtitulo1.textSize = 24f
                subtitulo2.textSize = 24f // Cambia el tamaño de un TextView a 20sp
                subtitulo3.textSize = 24f
                subtitulo4.textSize = 24f
                subtitulo5.textSize = 24f
                subtitulo6.textSize = 24f
            }
        }
    }
}