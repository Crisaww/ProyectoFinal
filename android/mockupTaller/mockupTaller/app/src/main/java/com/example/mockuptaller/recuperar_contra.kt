package com.example.mockuptaller

import android.os.Bundle
import android.text.InputType
import android.util.Patterns
import android.widget.Button
import android.widget.EditText
import android.widget.ImageView
import android.widget.Toast
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat

class recuperar_contra : AppCompatActivity() {
    private lateinit var editTextTextCorreo: EditText

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.recuperar_contra)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }

        // Initialize email EditText
        editTextTextCorreo = findViewById(R.id.editTextTextCorreo)

        val btnEnviar: Button = findViewById(R.id.btnRecuperarContra)
        btnEnviar.setOnClickListener {
            if (validarCorreo()) {
            mostrarAlerta()
            }
        }
    }

    // Validación para el correo electrónico
    private fun validarCorreo(): Boolean {
        val email = editTextTextCorreo.text.toString()
        return if (email.isEmpty()) {
            editTextTextCorreo.error = "El correo no debe estar vacío"
            false
        } else if (!Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
            editTextTextCorreo.error = "El correo debe cumplir con el formato (por ejemplo usuario@dominio.com)"
            false
        } else {
            editTextTextCorreo.error = null
            true
        }
    }

    private fun mostrarAlerta() {
        val builder = AlertDialog.Builder(this)
        builder.setTitle("Correo Enviado")
        builder.setMessage("Por favor revise su bandeja de entrada.")
        builder.setPositiveButton("OK") { dialog, _ ->
            dialog.dismiss()
        }

        val alerta = builder.create()
        alerta.show()
        alerta.getButton(android.app.AlertDialog.BUTTON_POSITIVE)?.setTextColor(ContextCompat.getColor(this, R.color.morado3))
    }
}
