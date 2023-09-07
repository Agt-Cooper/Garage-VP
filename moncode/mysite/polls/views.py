from django.http import Http404, HttpResponse
from django.shortcuts import get_object_or_404, render
from django.template import loader



from .models import Question

def index(request):
    latest_question_list = Question.objects.order_by("-pub_date")[:5]
    template = loader.get_template("polls/index.html")
    context = {
        "latest_question_list": latest_question_list,
    }
    return HttpResponse(template.render(context, request))

# def index(request):
#     latest_question_list = Question.objects.order_by("pub_date")[:5]
#     texts = [q.question_text for q in latest_question_list]
#     output = ", ".join(texts)
#     return HttpResponse(output) Petite astuce pour donner plus de visibilité (texts)

# ...
def detail(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    return render(request, "polls/detail.html", {"question": question})


def results(request, question_id):
    response = "You're looking at the results of question %s."
    return HttpResponse(response % question_id)


def vote(request, question_id):
    return HttpResponse("You're voting on question %s." % question_id)



# name = "Willow"
# "Hello my name is " + name

# "Hello my name is %s" % name

# "Hello my name is {}".format(name)
# "Hello my name is {the_name}".format(the_name=name)
# "Hello my name is {1}, {0} {1}".format("james", "bond")

# f"Hello my name is {name}"



