package com.example.mockuptaller

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.Button
import android.widget.ImageView
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat

class inicio_pagina : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.inicio_pagina)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }

        findViewById<ImageView>(R.id.cerrarSesion).setOnClickListener {
            val dialog = AlertDialog.Builder(this)
                .setTitle("Advertencia")
                .setMessage("¿Estas seguro de que quieres cerrar sesión?")
                .setPositiveButton("Sí, cerrar sesión") { _, _ ->
                    val sharedPreferences = getSharedPreferences("app_preferences", MODE_PRIVATE)
                    with(sharedPreferences.edit()) {
                        remove("access_token")
                        remove("refresh_token")
                        apply()
                    }
                    val confirmDialog = AlertDialog.Builder(this)
                        .setTitle("Sesión cerrada")
                        .setMessage("Has cerrado sesión correctamente")
                        .setPositiveButton("OK") { _, _ ->

                            val intent = Intent(this, iniciar_sesion::class.java).apply {
                                flags =
                                    Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
                            }
                            startActivity(intent)
                        }
                        .create()
                    confirmDialog.show()
                    confirmDialog.getButton(AlertDialog.BUTTON_POSITIVE)?.setTextColor(
                        ContextCompat.getColor(this, R.color.morado3))
                }
                .setNegativeButton("Cancelar", null)
                .create()
            //mostrar la advertencia
            dialog.show()
            // Cambiar el color del botón positivo (Sí, cerrar sesión)
            dialog.getButton(AlertDialog.BUTTON_POSITIVE)?.setTextColor(
                ContextCompat.getColor(this, R.color.morado3)
            )

            // Cambiar el color del botón negativo (Cancelar)
            dialog.getButton(AlertDialog.BUTTON_NEGATIVE)?.setTextColor(
                ContextCompat.getColor(this, R.color.morado3)
            )
        }
    }

   fun palabra_comun(view: View) {
       startActivity(Intent(this, palabras_comunes::class.java))
   }

    fun quienesSomos(view: View) {
        startActivity(Intent(this, quienes_somos::class.java))
    }

    fun manual(view: View) {
        startActivity(Intent(this, como_usar_tuvooz::class.java))
    }

    fun escribir(view: View) {
        startActivity(Intent(this, texto::class.java))
    }

    fun configuracion(view: View) {
        val dialogView = layoutInflater.inflate(R.layout.ventana_emergente, null)
        val builder = AlertDialog.Builder(this).apply {
            setView(dialogView)
        }
        val dialog: AlertDialog = builder.create()

        dialogView.findViewById<Button>(R.id.btnMiCuenta).setOnClickListener {
            startActivity(Intent(this, configuracion_mi_cuenta::class.java))
            dialog.dismiss()
        }

        dialogView.findViewById<Button>(R.id.btnAccesibilidad).setOnClickListener {
            startActivity(Intent(this, configuracion_accesibilidad::class.java))
            dialog.dismiss()
        }

        dialogView.findViewById<Button>(R.id.btnContrasena).setOnClickListener {
            startActivity(Intent(this, configuracion_contra::class.java))
            dialog.dismiss()
        }

        dialogView.findViewById<ImageView>(R.id.cerrarVentana).setOnClickListener {
            dialog.dismiss()
        }

        dialog.show()
    }
}