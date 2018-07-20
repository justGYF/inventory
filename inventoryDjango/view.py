from django.http import HttpResponse
# from django.shortcuts import render

def hello (request):
    # context          = {}
    # context['hello'] = 'Hello World!'
    # return render(request, 'hello.html', context)
    context = {
        'say': 'Hello World!',
        'introduce': 'This Is Django',
        'a': 'This Is Django',
        'b': 'This Is Django',
        'c': 'This Is Django',
        'd': 'This Is Django',
    }
    temp = {'s': context}
    return HttpResponse('a')
    # temp = [
    #     { 'name': 'aaa' },
    #     { 'name': 'bbb' },
    #     { 'name': 'ccc' },
    #     { 'name': 'ddd' },
    #     { 'name': 'eee' },
    #     { 'name': 'fff' }
    # ]
    # context = { 's': temp } 
    # return render(request, 'hello.html', context)