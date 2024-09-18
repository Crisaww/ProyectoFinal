package com.example.mockuptaller

import android.app.Dialog
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.widget.ImageView
import android.widget.Toast
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat

class quienes_somos : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.quienes_somos)

        // Aplicar ajustes a la ventana
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }

        // Botón para volver
        val btnVolver = findViewById<ImageView>(R.id.btnVolver)
        btnVolver.setOnClickListener {
            finish() // Cierra la actividad actual
        }

        // Configuración de iconos e imágenes
        setupImageAndEmail(R.id.imagenAngie, R.id.googleAngie, "angietrujillotuvooz@gmail.com", R.drawable.angie)
        setupLinkedIn(R.id.linkedinAngie, "https://www.linkedin.com/in/angie-trujillo-tu-vooz-638304324")
        setupGitHub(R.id.githubAngie, "https://github.com/Angie1107liz")

        setupImageAndEmail(R.id.imagenCarolina, R.id.googleCarolina, "carolina22tuvooz@gmail.com", R.drawable.carolina)
        setupLinkedIn(R.id.linkedinCarolina, "https://www.linkedin.com/in/carolina-martinez-cortes-564505323")
        setupGitHub(R.id.githubCarolina, "https://github.com/CMC-22")

        setupImageAndEmail(R.id.imagencristian2, R.id.googleCristian, "cristian11tuvooz@gmail.com", R.drawable.cristian2)
        setupLinkedIn(R.id.linkedinCristian, "https://www.linkedin.com/in/cristian-narváez-582097316")
        setupGitHub(R.id.githubCristian, "https://github.com/Crisaww")

        setupImageAndEmail(R.id.imagenMar2, R.id.googleMaria, "mar09tuvooz@gmail.com", R.drawable.mar2)
        setupLinkedIn(R.id.linkedinMaria, "https://www.linkedin.com/in/mariadelmarartunduaga")
        setupGitHub(R.id.githubMaria, "https://github.com/delmar911")

        setupImageAndEmail(R.id.imagenmariajose, R.id.googleMariaJose, "mariajose24tuvooz@gmail.com", R.drawable.mariajose2)
        setupLinkedIn(R.id.linkedinMariaJose, "https://www.linkedin.com/in/maria-jose-murcia-martinez-859313311")
        setupGitHub(R.id.githubMariaJose, "https://github.com/Maria-jose24")

        setupImageAndEmail(R.id.imagenMayra, R.id.googleMayra, "mayra18tuvooz@gmail.com", R.drawable.mayra)
        setupLinkedIn(R.id.linkedinMayra, "https://www.linkedin.com/in/mayra-alejandra-tamayo-perdomo-622156291")
        setupGitHub(R.id.githubMayra, "https://github.com/MayraTamayo18")
    }

    private fun setupImageAndEmail(imageId: Int, emailId: Int, emailAddress: String, imageResource: Int) {
        val imageView = findViewById<ImageView>(imageId)
        imageView.setImageResource(imageResource)
        imageView.setOnClickListener {
            val dialog = Dialog(this)
            dialog.setContentView(R.layout.dialog_image)
            val imageViewDialog = dialog.findViewById<ImageView>(R.id.imageViewDialog)
            imageViewDialog.setImageResource(imageResource)
            dialog.show()
        }

        val emailIcon = findViewById<ImageView>(emailId)
        emailIcon.setOnClickListener {
            Toast.makeText(this, "Ícono de Gmail clickeado", Toast.LENGTH_SHORT).show()
            val emailIntent = Intent(Intent.ACTION_SENDTO).apply {
                data = Uri.parse("mailto:")
                putExtra(Intent.EXTRA_EMAIL, arrayOf(emailAddress))
                putExtra(Intent.EXTRA_SUBJECT, "Asunto")
            }
            try {
                startActivity(Intent.createChooser(emailIntent, "Selecciona una aplicación de correo"))
            } catch (e: Exception) {
                Toast.makeText(this, "No hay aplicaciones de correo disponibles", Toast.LENGTH_SHORT).show()
            }
        }
    }

    private fun setupLinkedIn(linkedInId: Int, linkedInUrl: String) {
        val linkedInIcon = findViewById<ImageView>(linkedInId)
        linkedInIcon.setOnClickListener {
            val linkedInIntent = Intent(Intent.ACTION_VIEW).apply {
                data = Uri.parse(linkedInUrl)
            }
            try {
                startActivity(linkedInIntent)
            } catch (e: Exception) {
                Toast.makeText(this, "No se puede abrir LinkedIn", Toast.LENGTH_SHORT).show()
            }
        }
    }

    private fun setupGitHub(githubId: Int, githubUrl: String) {
        val githubIcon = findViewById<ImageView>(githubId)
        githubIcon.setOnClickListener {
            val githubIntent = Intent(Intent.ACTION_VIEW).apply {
                data = Uri.parse(githubUrl)
            }
            try {
                startActivity(githubIntent)
            } catch (e: Exception) {
                Toast.makeText(this, "No se puede abrir GitHub", Toast.LENGTH_SHORT).show()
            }
        }
    }
}
