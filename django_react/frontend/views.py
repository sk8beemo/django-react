from django.shortcuts import render


def index(request):
    print()
    return render(request, 'frontend/index.html')
