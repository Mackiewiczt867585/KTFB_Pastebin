import graphene
from graphene_django import DjangoObjectType
from .models import CopyCasket


class CopyCasketTypes(DjangoObjectType):
    class Meta:
        model = CopyCasket
        fields = ("id", "title", "author", "creation_date", "type", "content")


class Query(graphene.ObjectType):
    all_copies = graphene.List(CopyCasketTypes)

    def resolve_all_copies(root, info):
        return CopyCasket.objects.all()


class CopyCasketUpdateMutation(graphene.Mutation):
    class Arguments:
        title = graphene.String(required=True)
        author = graphene.String(required=True)
        type = graphene.String(required=True)
        content = graphene.String(required=True)
        id = graphene.Int(required=True)

    copycasket = graphene.Field(CopyCasketTypes)

    @classmethod
    def mutate(cls, root, info, title, author, type, content, id):
        copy = CopyCasket.objects.get(pk=id)
        copy.title = title
        copy.author = author
        copy.type = type
        copy.content = content
        copy.save()

        return CopyCasketUpdateMutation(copycasket=copy)


class Mutation(graphene.ObjectType):
    update_copy = CopyCasketUpdateMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
