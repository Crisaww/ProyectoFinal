package com.example.mockuptaller

import android.app.AlertDialog
import android.content.Intent
import android.os.Bundle
import android.provider.ContactsContract.CommonDataKinds.Email
import android.text.Editable
import android.text.InputType
import android.text.TextWatcher
import android.util.Patterns
import android.view.View
import android.widget.EditText
import android.widget.ImageView
import android.widget.Toast
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import com.example.mockuptaller.config.Config
import org.json.JSONObject
import com.android.volley.Request



class crear_cuenta : AppCompatActivity() {
    private lateinit var txtNombre : EditText
    private lateinit var editTextTextCorreo : EditText
    private lateinit var editTextTextPassword: EditText
    private lateinit var editTextTextConfirmPassword: EditText
    private lateinit var eyeTogglePassword: ImageView
    private lateinit var eyeToggleConfirmPassword: ImageView

    private var isPasswordVisible = false
    private var isConfirmPasswordVisible = false

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.crear_cuenta)


        // Inicializa los elementos de la vista
        txtNombre = findViewById(R.id.txtNombre)
        editTextTextCorreo = findViewById(R.id.editTextTextCorreo)
        editTextTextPassword = findViewById(R.id.editTextTextPassword)
        editTextTextConfirmPassword = findViewById(R.id.editTextTextConfirmPassword)
        eyeTogglePassword = findViewById(R.id.eyeTogglePassword)
        eyeToggleConfirmPassword = findViewById(R.id.eyeToggleConfirmPassword)

        //configuracion de validaciones en tiempor real
        setupTextWatchers()

        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }

        // Configura el evento onClick para el ícono de visibilidad de la contraseña
        eyeTogglePassword.setOnClickListener {
            togglePasswordVisibility(editTextTextPassword, eyeTogglePassword)
            isPasswordVisible = !isPasswordVisible
        }

        eyeToggleConfirmPassword.setOnClickListener {
            togglePasswordVisibility(editTextTextConfirmPassword, eyeToggleConfirmPassword)
            isConfirmPasswordVisible = !isConfirmPasswordVisible
        }
    }

    // Función para configurar los TextWatchers
    private fun setupTextWatchers() {
        txtNombre.addTextChangedListener(object : TextWatcher {
            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}
            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {
                validarNombre()
            }
            override fun afterTextChanged(s: Editable?) {}
        })

        editTextTextCorreo.addTextChangedListener(object : TextWatcher {
            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}
            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {
                validarCorreo()
            }
            override fun afterTextChanged(s: Editable?) {}
        })

        editTextTextPassword.addTextChangedListener(object : TextWatcher {
            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}
            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {
                validarContrasenas()
            }
            override fun afterTextChanged(s: Editable?) {}
        })

        editTextTextConfirmPassword.addTextChangedListener(object : TextWatcher {
            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}
            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {
                validarContrasenas()
            }
            override fun afterTextChanged(s: Editable?) {}
        })
    }


    // Validación para el nombre
    private fun validarNombre(): Boolean {
        return if (txtNombre.text.toString().isEmpty()) {
            txtNombre.error = "El nombre del usuario no debe contener espacios ni caracteres espaciales. "
            false
        } else {
            txtNombre.error = null
            true
        }
    }

    // Validación para el correo electrónico
    private fun validarCorreo(): Boolean {
        val email = editTextTextCorreo.text.toString()
        return if (email.isEmpty()) {
            editTextTextCorreo.error = "El correo no debe estar vacio "
            false
        } else if (!Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
            editTextTextCorreo.error = "El correo debe cumplir con el formato (por ejemplo usuario@dominio.com)"
            false
        } else {
            editTextTextCorreo.error = null
            true
        }
    }

    // Validación para las contraseñas
    private fun validarContrasenas(): Boolean {
        val password = editTextTextPassword.text.toString()
        val confirmPassword = editTextTextConfirmPassword.text.toString()

        return when {
            password.isEmpty() -> {
                editTextTextPassword.error = "La contraseña debe tener entre 8 y 20 caracteres, una letra mayuscula, al menos un numero y un caracter especial"
                false
            }
            confirmPassword.isEmpty() -> {
                editTextTextConfirmPassword.error = "Confirmar la contraseña es obligatorio"
                false
            }
            password != confirmPassword -> {
                editTextTextConfirmPassword.error = "Las contraseñas no coinciden"
                false
            }
            else -> {
                editTextTextPassword.error = null
                editTextTextConfirmPassword.error = null
                true
            }
        }
    }

    fun registrarUsuario(username: String, email: String, password: String){
        val queue = Volley.newRequestQueue(this)
        val url = Config.urlRegistro


        // Cuerpo de la solicitud POST
        val requestBody = JSONObject()
        requestBody.put("username", username)
        requestBody.put("email", email)
        requestBody.put("password", password)

        // Crea una solicitud POST
        val stringRequest = object : StringRequest(
            Request.Method.POST, url,
            { response ->
                mostrarAlertaExitosa()
            },
            { error ->
                mostrarAlertaError(error.message)
            }
        ) {
            override fun getBody(): ByteArray {
                return requestBody.toString().toByteArray(Charsets.UTF_8)
            }

            override fun getBodyContentType(): String {
                return "application/json; charset=utf-8"
            }
        }

        // Añade la solicitud a la cola de peticiones
        queue.add(stringRequest)
    }

    private fun mostrarAlertaExitosa() {
        // Construir el AlertDialog
        val builder = android.app.AlertDialog.Builder(this)
        builder.setTitle("Registro exitoso")
        builder.setMessage("¡Tu cuenta ha sido creada exitosamente!")

        // Configura el botón "OK" para redirigir al Activity de inicio de sesión
        builder.setPositiveButton("OK") { dialog, _ ->
            // Redirigir al Activity de inicio de sesión
            val intent = Intent(this, iniciar_sesion::class.java)
            startActivity(intent)
            // Finaliza el Activity actual para que no pueda regresar con el botón de retroceso
            finish()
        }

        // Muestra el diálogo
        val dialog = builder.create()
        dialog.show()
        dialog.getButton(AlertDialog.BUTTON_POSITIVE)?.setTextColor(ContextCompat.getColor(this, R.color.morado3))
    }

    private fun mostrarAlertaError(mensajeError: String?) {
        // Construir el AlertDialog
        val builder = android.app.AlertDialog.Builder(this)
        builder.setTitle("Error en el registro")
        builder.setMessage("Ocurrió un error al intentar registrar tu cuenta: $mensajeError")

        // Configura el botón "OK" para cerrar el diálogo
        builder.setPositiveButton("OK") { dialog, _ ->
            dialog.dismiss() // Cierra el diálogo
        }

        // Muestra el diálogo
        val dialog = builder.create()
        dialog.show()
        dialog.getButton(AlertDialog.BUTTON_POSITIVE)?.setTextColor(ContextCompat.getColor(this, R.color.morado3))
    }

    fun registrarse(view:View) {
        val username = txtNombre.text.toString()
        val email = editTextTextCorreo.text.toString()
        val password = editTextTextPassword.text.toString()
        val confirmPassword = editTextTextConfirmPassword.text.toString()

        // Validación básica
        if (username.isEmpty() || email.isEmpty() || password.isEmpty() || confirmPassword.isEmpty()) {
            mostrarAlerta()
            return
        }

        if (password != confirmPassword) {
            Toast.makeText(this, "Las contraseñas no coinciden", Toast.LENGTH_SHORT).show()
            return
        }

        // Llamada al método para registrar el usuario
        registrarUsuario(username, email, password)
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

    private fun togglePasswordVisibility(editText: EditText, eyeToggle: ImageView) {
        if (editText.inputType == InputType.TYPE_TEXT_VARIATION_PASSWORD ||
            editText.inputType == (InputType.TYPE_CLASS_TEXT or InputType.TYPE_TEXT_VARIATION_PASSWORD)) {
            // Muestra la contraseña
            editText.inputType = InputType.TYPE_CLASS_TEXT or InputType.TYPE_TEXT_VARIATION_VISIBLE_PASSWORD
            eyeToggle.setImageResource(R.drawable.ojo_svgrepo_com) // Cambia al ícono de ojo abierto
        } else {
            // Oculta la contraseña
            editText.inputType = InputType.TYPE_CLASS_TEXT or InputType.TYPE_TEXT_VARIATION_PASSWORD
            eyeToggle.setImageResource(R.drawable.ojo_svgrepo_com) // Cambia al ícono de ojo cerrado
        }
        editText.setSelection(editText.text.length)
    }

    fun iniciarSesion(view: View) {
        val intent = Intent(this, iniciar_sesion::class.java)
        startActivity(intent)
    }

}
