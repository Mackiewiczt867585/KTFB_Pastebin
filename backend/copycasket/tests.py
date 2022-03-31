import datetime

from django.utils.timezone import make_aware
from django.test import TestCase
from .models import CopyCasket, CustomUser
from .schema import Query, CopyCasketUpdateMutation, CustomUserUpdateMutation, CopyCasketCreateMutation, \
    CustomUserCreateMutation, CopyCasketDeleteMutation, CustomUserDeleteMutation


class TestCase(TestCase):


    def setUp(self):
        naive_datetime = datetime.datetime.now()
        self.aware_datetime = make_aware(naive_datetime)
        CopyCasket.objects.create(id=1, title="testowe_dobre", author="zawis", creation_date=self.aware_datetime,
                                  type="jk", content="lorem ipsum")
        CopyCasket.objects.create(id=2, title="testowe_zle", author="zawis",
                                  creation_date=self.aware_datetime, type="jk", content="lorem ipsum")
        CustomUser.objects.create(id=1, email="kowalski@op.pl", username="kowal", first_name="adam",
                                  creation_date=self.aware_datetime, organisation="szwalnia")
        CustomUser.objects.create(id=2, email="nadolny@op.pl", username="nadol", first_name="pawel",
                                  creation_date=self.aware_datetime, organisation="pralnia")

    def test_query_CopyCasket(self):
        query = Query()
        copyx = CopyCasket.objects.get(id=1)
        copyy = CopyCasket.objects.get(id=2)
        self.assertEqual(copyx, query.resolve_copy(self, 1))
        self.assertEqual(copyy, query.resolve_copy(self, 2))

    def test_query_User(self):
        query = Query()
        userx = CustomUser.objects.get(email="kowalski@op.pl")
        self.assertEqual(userx, query.resolve_user(self, 1))

    def test_query_all(self):
        query = Query()
        self.assertEqual(2, len(query.resolve_all_copies(self)))

    def test_users_all(self):
        query = Query()
        self.assertEqual(2, len(query.resolve_all_users(self)))

