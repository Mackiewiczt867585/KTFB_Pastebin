import graphene
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
from graphene_file_upload.scalars import Upload
from graphql_auth import mutations
from graphql_auth.schema import MeQuery, UserQuery
from graphql_relay import from_global_id

from .models import CopyCasket, CustomUser


class CopyCasketTypes(DjangoObjectType):
    class Meta:
        model = CopyCasket
        fields = ("id", "title", "private", "creator", "author", "creation_date", "type", "content", "image")
        filter_fields = ["title", "author", "type", "creation_date"]
        interfaces = (graphene.relay.Node,)


class CustomUserTypes(DjangoObjectType):
    class Meta:
        model = CustomUser
        fields = (
            "id",
            "email",
            "username",
            "first_name",
            "creation_date",
            "organisation",
        )


class Query(UserQuery, MeQuery, graphene.ObjectType):
    all_accounts = DjangoFilterConnectionField(CopyCasketTypes)
    all_copies = graphene.List(CopyCasketTypes)
    copy = graphene.Field(CopyCasketTypes, copy_id=graphene.ID())

    all_private_copies = graphene.List(CopyCasketTypes, creator=graphene.ID())
    all_public_copies = graphene.List(CopyCasketTypes)
    all_users_copies = graphene.List(CopyCasketTypes, creator=graphene.ID())
    filtered_copies = DjangoFilterConnectionField(CopyCasketTypes)

    all_users = graphene.List(CustomUserTypes)
    user_email = graphene.Field(CustomUserTypes, email=graphene.String())

    def resolve_all_copies(self, info):
        return CopyCasket.objects.all()

    def resolve_copy(self, info, copy_id):
        return CopyCasket.objects.get(pk=copy_id)

    def resolve_all_users(self, info):
        return CustomUser.objects.all()

    def resolve_user_email(self, info, email):
        return CustomUser.objects.get(email=email)

    def resolve_user(self, info, user_id):
        return CustomUser.objects.get(pk=user_id)

    def resolve_all_public_copies(self, info):
        return CopyCasket.objects.all().filter(private=False)

    def resolve_all_private_copies(
            self, info, creator
    ):  # take logged in user from context to show his private pastes
        return CopyCasket.objects.all().filter(private=True, creator=creator)

    def resolve_all_users_copies(self, info, creator):
        return CopyCasket.objects.all().filter(creator=creator)


class CopyCasketUpdateMutation(graphene.Mutation):
    class Arguments:
        title = graphene.String(required=False)
        author = graphene.String(required=False)
        type = graphene.String(required=False)
        content = graphene.String(required=False)
        private = graphene.Boolean(required=False)
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
        private = graphene.Boolean(required=False)
        creator = graphene.String(required=False)
        image = Upload(required=False)

    copycasket = graphene.Field(CopyCasketTypes)

    @classmethod
    def mutate(cls, root, info, creator=None, **kwargs):
        instance = CopyCasket.objects.create(**kwargs)
        instance.creator = CustomUser.objects.get(email=creator)
        instance.save()
        return CopyCasketCreateMutation(copycasket=instance)


class CustomUserCreateMutation(graphene.Mutation):
    class Arguments:
        email = graphene.String(required=True)
        username = graphene.String(required=True)
        password = graphene.String(required=True)
        first_name = graphene.String()
        organisation = graphene.String()

    user = graphene.Field(CustomUserTypes)

    @classmethod
    def mutate(cls, root, info, **kwargs):
        instance = CustomUser.objects.create(**kwargs)
        instance.save()
        return CustomUserCreateMutation(user=instance)


class CustomUserUpdateMutation(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
        email = graphene.String(required=False)
        username = graphene.String(required=False)
        first_name = graphene.String(required=False)
        organisation = graphene.String(required=False)

    user = graphene.Field(CustomUserTypes)

    @classmethod
    def mutate(cls, root, info, id, **kwargs):
        instance = CustomUser.objects.get(pk=id)
        instance.update(**kwargs)
        return CustomUserUpdateMutation(user=instance)


class CustomUserDeleteMutation(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)

    user = graphene.Field(CustomUserTypes)

    @classmethod
    def mutate(cls, root, info, id):
        instance = CustomUser.objects.get(pk=id)
        instance.delete()
        return CustomUserDeleteMutation(user=instance)


class Mutation(graphene.ObjectType):
    update_copy = CopyCasketUpdateMutation.Field()
    delete_copy = CopyCasketDeleteMutation.Field()
    create_copy = CopyCasketCreateMutation.Field()

    create_user = CustomUserCreateMutation.Field()
    update_user = CustomUserUpdateMutation.Field()
    delete_user = CustomUserDeleteMutation.Field()

    register = mutations.Register.Field()  # register
    verify_account = mutations.VerifyAccount.Field()  # veryfication
    resend_activation_email = mutations.ResendActivationEmail.Field()
    reset_email = mutations.SendPasswordResetEmail.Field()
    password_reset = mutations.PasswordReset.Field()
    password_change = mutations.PasswordChange.Field()
    archive_account = mutations.ArchiveAccount.Field()
    delete_account = mutations.DeleteAccount.Field()
    update_account = mutations.UpdateAccount.Field()

    token_auth = mutations.ObtainJSONWebToken.Field()  # login
    verify_token = mutations.VerifyToken.Field()
    refresh_token = mutations.RefreshToken.Field()
    revoke_token = mutations.RevokeToken.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
