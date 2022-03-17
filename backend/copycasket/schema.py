import graphene
from graphene_django import DjangoObjectType

from .models import CopyCasket


class CopyCasketTypes(DjangoObjectType):
    class Meta:
        model = CopyCasket
        fields = ("id", "title", "author", "creation_date", "type", "content")


class Query(graphene.ObjectType):
    all_copies = graphene.List(CopyCasketTypes)
    copy = graphene.Field(CopyCasketTypes, copy_id=graphene.ID())

    def resolve_all_copies(self, info):
        return CopyCasket.objects.all()

    def resolve_copy(self, info, copy_id):
        return CopyCasket.objects.get(pk=copy_id)


class CopyCasketUpdateMutation(graphene.Mutation):
    class Arguments:
        title = graphene.String(required=False)
        author = graphene.String(required=False)
        type = graphene.String(required=False)
        content = graphene.String(required=False)
        id = graphene.ID(required=True)

    copycasket = graphene.Field(CopyCasketTypes)

    @classmethod
    def mutate(cls, root, info, id, **kwargs):
        instance = CopyCasket.objects.get(pk=id)
        instance.update(**kwargs)
        return CopyCasketUpdateMutation(copycasket=instance)


class CopyCasketDeleteMutation(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)

    copycasket = graphene.Field(CopyCasketTypes)

    @classmethod
    def mutate(cls, root, info, id):
        CopyCasket.objects.get(pk=id).delete()


class CopyCasketCreateMutation(graphene.Mutation):
    class Arguments:
        title = graphene.String(required=False)
        author = graphene.String(required=False)
        type = graphene.String(required=False)
        content = graphene.String(required=False)

    copycasket = graphene.Field(CopyCasketTypes)

    @classmethod
    def mutate(cls, root, info, **kwargs):
        instance = CopyCasket.objects.create(**kwargs)
        instance.save()
        return CopyCasketUpdateMutation(copycasket=instance)


class Mutation(graphene.ObjectType):
    update_copy = CopyCasketUpdateMutation.Field()
    delete_copy = CopyCasketDeleteMutation.Field()
    create_copy = CopyCasketCreateMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
