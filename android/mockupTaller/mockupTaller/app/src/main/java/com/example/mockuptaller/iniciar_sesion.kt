package com.example.mockuptaller

import android.app.AlertDialog
import android.app.DownloadManager
import android.content.Context
import android.content.Intent
import android.content.SharedPreferences
import android.os.Bundle
import android.text.Editable
import android.text.TextWatcher
import android.text.method.PasswordTransformationMethod
import android.view.View
import android.widget.EditText
import android.widget.ImageView
import android.widget.TextView
import android.widget.Toast
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.app.AppCompatDelegate
import androidx.core.content.ContextCompat
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import com.android.volley.Request
import com.android.volley.Response
import com.android.volley.toolbox.JsonObjectRequest
import com.android.volley.toolbox.Volley
import com.example.mockuptaller.config.Config
import org.json.JSONObject

class iniciar_sesion : AppCompatActivity() {

    // Variable para controlar la visibilidad de la contraseña
    private var isPasswordVisible = false
    private lateinit var sharedPreferences: SharedPreferences

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Initialize SharedPreferences
        sharedPreferences = getSharedPreferences("AppPreferences", Context.MODE_PRIVATE)

        // Aplicar el estado actual del tema antes de configurar la vista de contenido
        val isDarkMode = sharedPreferences.getBoolean("dark_mode", false)
        AppCompatDelegate.setDefaultNightMode(
            if (isDarkMode) AppCompatDelegate.MODE_NIGHT_YES else AppCompatDelegate.MODE_NIGHT_NO
        )

        enableEdgeToEdge()
        setContentView(R.layout.iniciar_sesion)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }

        val emailEditText = findViewById<EditText>(R.id.editTextTextCorreo)
        val passwordEditText = findViewById<EditText>(R.id.editTextTextPassword)
        val emailErrorTextView = findViewById<TextView>(R.id.emailErrorTextView)
        val passwordErrorTextView = findViewById<TextView>(R.id.passwordErrorTextView)

        emailErrorTextView.visibility = View.GONE
        passwordErrorTextView.visibility = View.GONE

        /*emailEditText.addTextChangedListener(object : TextWatcher {
            override fun afterTextChanged(p0: Editable?) {
                validateEmail(emailEditText, emailErrorTextView)
            }

            override fun beforeTextChanged(s: CharSequence?, star: Int, count: Int, after: Int) {}
            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {}

        })

        passwordEditText.addTextChangedListener(object : TextWatcher {
            override fun afterTextChanged(p0: Editable?) {
                validatePassword(passwordEditText, passwordErrorTextView)
            }
            override fun beforeTextChanged(s: CharSequence?, star: Int, count: Int, after: Int) {}
            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {}
        })

        // Configurar el click listener para el ojo
        val eyeTogglePassword = findViewById<ImageView>(R.id.eyeTogglePassword)
        eyeTogglePassword.setOnClickListener {
            togglePasswordVisibility()
        }
    }

    // Función para alternar la visibilidad de la contraseña
    private fun togglePasswordVisibility() {
        val passwordEditText = findViewById<EditText>(R.id.editTextTextPassword)
        val eyeTogglePassword = findViewById<ImageView>(R.id.eyeTogglePassword)

        if (isPasswordVisible) {
            // Ocultar la contraseña
            passwordEditText.transformationMethod = PasswordTransformationMethod.getInstance()
            eyeTogglePassword.setImageResource(R.drawable.ojo_svgrepo_com)
        } else {
            // Mostrar la contraseña
            passwordEditText.transformationMethod = null
            eyeTogglePassword.setImageResource(R.drawable.ojo_svgrepo_com)
        }
        isPasswordVisible = !isPasswordVisible
        passwordEditText.setSelection(passwordEditText.text.length) // Mantener el cursor al final
    }

    // Botón de Iniciar Sesión
   fun iniciarSesion(view: View) {
        val emailEditText = findViewById<EditText>(R.id.editTextTextCorreo)
        val passwordEditText = findViewById<EditText>(R.id.editTextTextPassword)
        val emailErrorTextView = findViewById<TextView>(R.id.emailErrorTextView)
        val passwordErrorTextView = findViewById<TextView>(R.id.passwordErrorTextView)

        val isEmailValid = validateEmail(emailEditText, emailErrorTextView)
        val isPasswordValid = validatePassword(passwordEditText, passwordErrorTextView)

        if (isEmailValid && isPasswordValid) {
            val  email = emailEditText.text.toString().trim()
            val password = passwordEditText.text.toString().trim()
            login(email, password)
        } else {
            mostrarAlerta()
        }*/
    }

    /*private fun login(email: String, password: String){
        val url = Config.urlLogin
        val queue = Volley.newRequestQueue(this)

        //crear el json con las credenciales
        val jsonBody = JSONObject()
        jsonBody.put("email", email)
        jsonBody.put("password", password)

        //Peticion a la API
        val jsonObjectRequest = JsonObjectRequest(
            Request.Method.POST, url, jsonBody,
            Response.Listener { response ->
                //si la respuesta es exitosa, redirige al inicio
                val  intent = Intent(this, inicio_pagina::class.java)
                startActivity(intent)
                finish()
            },
            Response.ErrorListener { error ->
                mostrarErrorAlerta("Error de Inicio de Sesión", "No se pudo iniciar sesión. Error: ${error.message}")
            }
        )
        //añade la peticion a la cola de volley
        queue.add(jsonObjectRequest)
    }
    // Función para mostrar un alerta en caso de error
    private fun mostrarErrorAlerta(titulo: String, mensaje: String) {
        val builder = AlertDialog.Builder(this)
        builder.setTitle(titulo)
        builder.setMessage(mensaje)
        builder.setPositiveButton("OK") { dialog, _ ->
            dialog.dismiss()
        }
        val dialog = builder.create()
        dialog.show()
        dialog.getButton(AlertDialog.BUTTON_POSITIVE)?.setTextColor(ContextCompat.getColor(this, R.color.morado3))
    }

    // Función para mostrar una alerta cuando los datos son incorrectos
    fun mostrarAlerta() {
        val builder = AlertDialog.Builder(this)
        builder.setTitle("Advertencia")
        builder.setMessage("Todos los campos son obligatorios")
        builder.setPositiveButton("Ok") { dialog, _ ->
            dialog.dismiss() // Cierra el diálogo cuando se presiona "Aceptar"
        }
        val dialog = builder.create()
        dialog.show()
        dialog.getButton(AlertDialog.BUTTON_POSITIVE)?.setTextColor(ContextCompat.getColor(this, R.color.morado3))
    }

    // Función para validar el formato del correo electrónico
    private fun validateEmail(emailEditText: EditText, errorTextView: TextView): Boolean {
        val email = emailEditText.text.toString().trim()
        val emailPattern = android.util.Patterns.EMAIL_ADDRESS
        val isValid = emailPattern.matcher(email).matches() && email.length <= 100

        if (!isValid) {
            errorTextView.visibility = View.VISIBLE
            errorTextView.text = "El correo electrónico no tiene un formato válido o es muy largo."
        } else {
            errorTextView.visibility = View.GONE
        }
        return isValid
    }

    private fun validatePassword(passwordEditText: EditText, errorTextView: TextView): Boolean {
        val password = passwordEditText.text.toString().trim()
        var isValid = true
        var errorMessage = ""

        when {
            password.length !in 8..20 -> {
                isValid = false
                errorMessage = "La contraseña debe tener entre 8 y 20 caracteres."
            }
            !password.any { it.isUpperCase() } -> {
                isValid = false
                errorMessage = "La contraseña debe tener al menos una letra mayúscula."
            }
            !password.any { it.isLowerCase() } -> {
                isValid = false
                errorMessage = "La contraseña debe tener al menos una letra minúscula."
            }
            !password.any { it.isDigit() } -> {
                isValid = false
                errorMessage = "La contraseña debe tener al menos un número."
            }
            !password.any { "!@#$%^&*(),.?\":{}|<>".contains(it) } -> {
                isValid = false
                errorMessage = "La contraseña debe tener al menos un carácter especial."
            }
        }

        if (!isValid) {
            errorTextView.visibility = View.VISIBLE
            errorTextView.text = errorMessage
        } else {
            errorTextView.visibility = View.GONE
        }
        return isValid
    }*/


    // Función para manejar el click en "Olvidó su contraseña"
    fun olvidoContra(view: View) {
        val intent = Intent(this, recuperar_contra::class.java)
        startActivity(intent)
    }

    // Función para manejar el click en "Crear cuenta"
    fun crearCuenta(view: View) {
        //se configura el cambio activity
        val intent = Intent(application, crear_cuenta::class.java)
        //se ejecuta la actividad
        startActivity(intent)
    }
    fun iniciarSesion(view: View) {
        //se configura el cambio activity
        val intent = Intent(application, inicio_pagina::class.java)
        //se ejecuta la actividad
        startActivity(intent)
    }
}
