from django.shortcuts import render
from django.template.loader import get_template
def send_email(email):
    # context = {'email':email}
    # template = get_template('../correo/correoRegistro.html')
    # content = template.render(context)
    print (email)

def correoRegistro(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        send_email(email)
    return render(request, '../correo/index.html',{})