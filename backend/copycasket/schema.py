import graphene
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
from graphene_file_upload.scalars import Upload
from graphql_auth import mutations
from graphql_auth.schema import MeQuery, UserQuery
from graphql_relay import from_global_id

from .models import CopyCasket, CustomUser, Report, UserReport


class CopyCasketTypes(DjangoObjectType):
    class Meta:
        model = CopyCasket
        fields = "__all__"
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


class ReportTypes(DjangoObjectType):
    class Meta:
        model = Report
        fields = "__all__"
        filter_fields = ["copy", "reason"]
        interfaces = (graphene.relay.Node,)


class UserReportTypes(DjangoObjectType):
    class Meta:
        model = UserReport
        fields = "__all__"
        filter_fields = ["user", "reason"]
        interfaces = (graphene.relay.Node,)


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

    all_reports = graphene.List(ReportTypes)
    report = graphene.Field(ReportTypes, report_id=graphene.ID())

    all_user_reports = graphene.List(UserReportTypes)
    user_report = graphene.Field(UserReportTypes, user_report_id=graphene.ID())

    def resolve_all_copies(self, info):
        return CopyCasket.objects.all()

    def resolve_copy(self, info, copy_id):
        global_id = from_global_id(copy_id)[-1]
        return CopyCasket.objects.get(pk=global_id)

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

    def resolve_all_reports(self, info):
        return Report.objects.all()

    def resolve_report(self, info, id):
        global_id = from_global_id(id)[-1]
        return Report.objects.get(pk=global_id)

    def resolve_all_user_reports(self, info):
        return UserReport.objects.all()

    def resolve_user_report(self, info, user_report_id):
        global_id = from_global_id(user_report_id)[-1]
        return UserReport.objects.get(pk=global_id)


class CopyCasketUpdateMutation(graphene.Mutation):
    class Arguments:
        title = graphene.String(required=True)
        author = graphene.String(required=True)
        type = graphene.String(required=False)
        content = graphene.String(required=False)
        private = graphene.Boolean(required=False)
        id = graphene.ID(required=True)

    copycasket = graphene.Field(CopyCasketTypes)

    @classmethod
    def mutate(cls, root, info, id, **kwargs):
        global_id = from_global_id(id)[-1]
        instance = CopyCasket.objects.get(pk=global_id)
        instance.update(**kwargs)
        return CopyCasketUpdateMutation(copycasket=instance)


class CopyCasketDeleteMutation(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)

    copycasket = graphene.Field(CopyCasketTypes)

    @classmethod
    def mutate(cls, root, info, id):
        global_id = from_global_id(id)[-1]
        CopyCasket.objects.get(pk=global_id).delete()


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


class ReportCreateMutation(graphene.Mutation):
    class Arguments:
        reason = graphene.String(required=True)
        note = graphene.String(required=False)
        copy_id = graphene.ID(required=True)

    report = graphene.Field(ReportTypes)

    @classmethod
    def mutate(cls, root, info, copy_id, **kwargs):
        instance = Report.objects.create(**kwargs)
        global_id = from_global_id(copy_id)[-1]
        instance.copy = CopyCasket.objects.get(pk=global_id)
        instance.save()
        return ReportCreateMutation(report=instance)


class ReportDeleteMutation(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)

    report = graphene.Field(ReportTypes)

    @classmethod
    def mutate(cls, root, info, id):
        report_id = from_global_id(id)[-1]
        instance = Report.objects.get(pk=report_id)
        instance.delete()
        return ReportDeleteMutation(report=instance)


class UserReportCreateMutation(graphene.Mutation):
    class Arguments:
        reason = graphene.String(required=True)
        note = graphene.String(required=False)
        user = graphene.ID(required=True)

    user_report = graphene.Field(UserReportTypes)

    @classmethod
    def mutate(cls, root, info, user, **kwargs):
        instance = UserReport.objects.create(**kwargs)
        global_id = from_global_id(user)[-1]
        instance.user = CustomUser.objects.get(pk=global_id)
        instance.save()
        return UserReportCreateMutation(user_report=instance)


class UserReportDeleteMutation(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)

    user_report = graphene.Field(UserReportTypes)

    @classmethod
    def mutate(cls, root, info, id, **kwargs):
        global_id = from_global_id(id)[-1]
        instance = Report.objects.get(pk=global_id)
        instance.delete()
        return ReportDeleteMutation(user_report=instance)


class Mutation(graphene.ObjectType):
    update_copy = CopyCasketUpdateMutation.Field()
    delete_copy = CopyCasketDeleteMutation.Field()
    create_copy = CopyCasketCreateMutation.Field()

    create_user = CustomUserCreateMutation.Field()
    update_user = CustomUserUpdateMutation.Field()
    delete_user = CustomUserDeleteMutation.Field()

    create_report = ReportCreateMutation.Field()
    delete_report = ReportDeleteMutation.Field()

    create_user_report = UserReportCreateMutation.Field()
    delete_user_report = UserReportDeleteMutation.Field()

    register = mutations.Register.Field()  # register
    verify_account = mutations.VerifyAccount.Field()  # verification
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
