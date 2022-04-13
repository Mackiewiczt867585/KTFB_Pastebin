import datetime

from django.test import TestCase
from django.utils.timezone import make_aware

from .models import CopyCasket, CustomUser
from .schema import (
    CopyCasketCreateMutation,
    CopyCasketDeleteMutation,
    CopyCasketUpdateMutation,
    CustomUserCreateMutation,
    CustomUserDeleteMutation,
    CustomUserUpdateMutation,
    Query,
)


class CustomTestCase(TestCase):
    def setUp(self):
        naive_datetime = datetime.datetime.now()
        self.aware_datetime = make_aware(naive_datetime)
        CopyCasket.objects.create(
            id=1,
            title="testowe_dobre",
            author="zawis",
            creation_date=self.aware_datetime,
            type="jk",
            content="lorem ipsum",
        )
        CopyCasket.objects.create(
            id=2,
            title="testowe_zle",
            author="zawis",
            creation_date=self.aware_datetime,
            type="jk",
            content="lorem ipsum",
        )
        CustomUser.objects.create(
            id=1,
            email="kowalski@op.pl",
            username="kowal",
            first_name="adam",
            creation_date=self.aware_datetime,
            organisation="szwalnia",
        )
        CustomUser.objects.create(
            id=2,
            email="nadolny@op.pl",
            username="nadol",
            first_name="pawel",
            creation_date=self.aware_datetime,
            organisation="pralnia",
        )

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

    def test_createcasket_mut(self):
        createq = CopyCasketCreateMutation()
        createq.mutate(
            self,
            None,
            id=3,
            title="trzecia_strona",
            author="zawiso",
            creation_date=self.aware_datetime,
            type="cd",
            content="lorem ipsum",
        )
        self.assertEqual("trzecia_strona", CopyCasket.objects.get(id=3).title)

    def test_updatecasket_mut(self):
        updateq = CopyCasketUpdateMutation()
        updateq.mutate(
            self,
            None,
            id=2,
            title="nowe_testowe",
            author="zawis",
            creation_date=self.aware_datetime,
            type="cd",
            content="lorem ipsum",
        )
        self.assertEqual("nowe_testowe", CopyCasket.objects.get(id=2).title)

    def test_deletecasket_mut(self):
        query = Query()
        delq = CopyCasketDeleteMutation()
        delq.mutate(self, None, id=2)
        self.assertEqual(1, len(query.resolve_all_copies(self)))

    def test_createuser_mut(self):
        createu = CustomUserCreateMutation()
        createu.mutate(
            self,
            None,
            id=3,
            email="test3@op.pl",
            username="randomuser",
            first_name="pablo",
            creation_date=self.aware_datetime,
            organisation="brak",
        )
        self.assertEqual("brak", CustomUser.objects.get(id=3).organisation)

    def test_updateuser_mut(self):
        updateu = CustomUserUpdateMutation()
        updateu.mutate(
            self,
            None,
            id=2,
            email="rodzynek@op.pl",
            username="usernamexd",
            first_name="adrian",
            creation_date=self.aware_datetime,
            organisation="cukiernia",
        )
        self.assertEqual(
            "cukiernia",
            CustomUser.objects.get(id=2).organisation
        )

    def test_deleteuser_mut(self):
        query = Query()
        delu = CustomUserDeleteMutation()
        delu.mutate(self, None, id=2)
        self.assertEqual(1, len(query.resolve_all_users(self)))
