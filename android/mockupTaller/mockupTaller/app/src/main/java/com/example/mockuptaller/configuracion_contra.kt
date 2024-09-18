package com.example.mockuptaller

import android.os.Bundle
import android.text.InputType
import android.widget.EditText
import android.widget.ImageView
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat

class configuracion_contra : AppCompatActivity() {

    private lateinit var txtActual: EditText
    private lateinit var txtNueva: EditText
    private lateinit var txtConfirmacion: EditText
    private lateinit var eyeToggleActual: ImageView
    private lateinit var eyeToggleNueva: ImageView
    private lateinit var eyeToggleConfirmacion: ImageView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.configuracion_contra)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }

        // Inicializar los elementos de UI
        txtActual = findViewById(R.id.txtActual)
        txtNueva = findViewById(R.id.txtNueva)
        txtConfirmacion = findViewById(R.id.txtConfirmacion)
        eyeToggleActual = findViewById(R.id.eyeToggleActual)
        eyeToggleNueva = findViewById(R.id.eyeToggleNueva)
        eyeToggleConfirmacion = findViewById(R.id.eyeToggleConfirmacion)

        // Manejar el clic para alternar la visibilidad de la contraseña actual
        eyeToggleActual.setOnClickListener {
            togglePasswordVisibility(txtActual, eyeToggleActual)
        }

        // Manejar el clic para alternar la visibilidad de la nueva contraseña
        eyeToggleNueva.setOnClickListener {
            togglePasswordVisibility(txtNueva, eyeToggleNueva)
        }

        // Manejar el clic para alternar la visibilidad de la confirmación de la nueva contraseña
        eyeToggleConfirmacion.setOnClickListener {
            togglePasswordVisibility(txtConfirmacion, eyeToggleConfirmacion)
        }

        // Botón de volver
        var btnVolver = findViewById<ImageView>(R.id.btnVolver)
        btnVolver.setOnClickListener {
            finish()  // Cierra la actividad actual
        }
    }

    private fun togglePasswordVisibility(editText: EditText, toggleButton: ImageView) {
        if (editText.inputType == InputType.TYPE_TEXT_VARIATION_PASSWORD or InputType.TYPE_CLASS_TEXT) {
            editText.inputType = InputType.TYPE_CLASS_TEXT or InputType.TYPE_TEXT_VARIATION_VISIBLE_PASSWORD
            toggleButton.setImageResource(R.drawable.ojo_svgrepo_com) // Cambiar icono si es necesario
        } else {
            editText.inputType = InputType.TYPE_TEXT_VARIATION_PASSWORD or InputType.TYPE_CLASS_TEXT
            toggleButton.setImageResource(R.drawable.ojo_svgrepo_com) // Cambiar icono si es necesario
        }
        editText.setSelection(editText.text.length)  // Mantener el cursor al final del texto
    }
}
