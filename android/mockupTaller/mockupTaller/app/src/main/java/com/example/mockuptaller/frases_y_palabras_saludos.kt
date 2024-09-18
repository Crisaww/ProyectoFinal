package com.example.mockuptaller

import android.content.Intent
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat

// TODO: Rename parameter arguments, choose names that match
// the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
private const val ARG_PARAM1 = "param1"
private const val ARG_PARAM2 = "param2"

/**
 * A simple [Fragment] subclass.
 * Use the [frases_y_palabras_saludos.newInstance] factory method to
 * create an instance of this fragment.
 */
class frases_y_palabras_saludos : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.frases_y_palabras_saludos)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }
        var btnVolver = findViewById<ImageView>(R.id.btnVolver)
        btnVolver.setOnClickListener{
            /*
            finish elimina o cierra la activity actual
             */
            finish()
        }

        /*var volverInicio = findViewById<ImageView>(R.id.imageInicio)
        volverInicio.setOnClickListener {
            val intent = Intent(this, inicio_pagina::class.java)
            startActivity(intent)
            finish()
        }*/
    }
}