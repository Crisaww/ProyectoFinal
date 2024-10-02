function toggleFolder(folderId) {
    const folder = document.getElementById(folderId);
    folder.style.display = (folder.style.display === 'block') ? 'none' : 'block';
}
document.getElementById("pdfLink").addEventListener("click", function() {
    this.style.color = "#008000"; // Cambiar el color cuando se hace clic
    this.style.backgroundColor = "#f0f8ff"; 
})
