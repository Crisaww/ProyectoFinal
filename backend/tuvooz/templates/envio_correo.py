from django.shortcuts import render

def index(request):
    if request.method == 'POST':
        print('Envio de correo')
    return render(request, './index.html', {})