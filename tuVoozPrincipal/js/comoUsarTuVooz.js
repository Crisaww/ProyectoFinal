        // Enlace al PDF de prueba
        const url = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';

        // Carga el PDF
        const loadingTask = pdfjsLib.getDocument(url);
        loadingTask.promise.then(function(pdf) {
            console.log('PDF cargado');
            // Carga la primera página
            pdf.getPage(1).then(function(page) {
                console.log('Página cargada');

                const scale = 1.5;  // Escala del PDF
                const viewport = page.getViewport({ scale });

                // Configura el canvas donde se mostrará el PDF
                const canvas = document.getElementById('pdf-canvas');
                const context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                // Renderiza la página en el canvas
                const renderContext = {
                    canvasContext: context,
                    viewport: viewport
                };
                page.render(renderContext);
            });
        }).catch(function(error) {
            console.error('Error al cargar el PDF:', error);
        });