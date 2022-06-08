import datetime

from django.test import TestCase
from django.utils.timezone import make_aware
from graphql_relay import to_global_id

from .models import CopyCasket, CustomUser, Report, UserReport
from .schema import (
    CopyCasketCreateMutation,
    CopyCasketDeleteMutation,
    CopyCasketUpdateMutation,
    CustomUserCreateMutation,
    CustomUserDeleteMutation,
    CustomUserUpdateMutation,
    Query,
    ReportCreateMutation,
    ReportDeleteMutation,
    UserReportCreateMutation,
)


class CustomTestCase(TestCase):
    def setUp(self):
        naive_datetime = datetime.datetime.now()
        self.aware_datetime = make_aware(naive_datetime)
        kowal = CustomUser.objects.create(
            id=1,
            email="kowalski@op.pl",
            username="kowal",
            first_name="adam",
            organisation="org1",
        )
        nadol = CustomUser.objects.create(
            id=2,
            email="nadolny@op.pl",
            username="nadol",
            first_name="pawel",
            organisation="org2",
        )
        x = CopyCasket.objects.create(
            id=1,
            title="testowe_1",
            author="nadol",
            type="jk",
            content="lorem ipsum",
            private=False,
            creator=nadol,
        )
        y = CopyCasket.objects.create(
            id=2,
            title="testowe_2",
            author=2,
            type="jk",
            content="lorem ipsum",
            private=False,
            creator=kowal,
        )
        CopyCasket.objects.create(
            id=3,
            title="testowe_3",
            author="nadol",
            type="as",
            content="lorem ipsum",
            private=True,
            creator=kowal,
        )
        CopyCasket.objects.create(
            id=4,
            title="testowe_4",
            author="kowal",
            type="us",
            content="lorem ipsum",
            private=True,
            creator=kowal,
        )
        CopyCasket.objects.create(
            id=5,
            title="testowe_5",
            author="kowal",
            type="us",
            content="lorem ipsum",
            private=True,
            creator=nadol,
        )
        Report.objects.create(
            id=1, copy=y, reason="us", note="jestesmy na dobrej drodze"
        )
        Report.objects.create(
            id=2, copy=x, reason="us", note="nie mam pojęcia co robię"
        )
        UserReport.objects.create(
            id=1, user=kowal, reason="us", note="niech juz dziala"
        )
        UserReport.objects.create(id=2, user=nadol, reason="us", note="prosze")

    def test_resolve_all_reports(self):
        query = Query()
        self.assertEqual(2, len(query.resolve_all_reports(self)))

    def test_res_report(self):
        query = Query()
        rep = Report.objects.get(id=1)
        self.assertEqual(rep, query.resolve_report(self, to_global_id("id", 1)))

    def test_def_all_user_reports(self):
        query = Query()
        self.assertEqual(2, len(query.resolve_all_user_reports(self)))

    def test_res_user_report(self):
        query = Query()
        rep = UserReport.objects.get(id=1)
        self.assertEqual(rep, query.resolve_user_report(self, to_global_id("id", 1)))

    def test_report_create(self):
        query = Query()
        creater = ReportCreateMutation()
        creater.mutate(
            self,
            None,
            id=3,
            reason="us",
            note="no nie dziala",
            copy_id=to_global_id("id", 1),
        )
        self.assertEqual(3, len(query.resolve_all_reports(self)))

    def test_report_delete(self):
        query = Query()
        delr = ReportDeleteMutation()
        delr.mutate(self, None, id=to_global_id("id", 1))
        self.assertEqual(1, len(query.resolve_all_reports(self)))

    def test_user_report_create(self):
        query = Query()
        creater = UserReportCreateMutation()
        creater.mutate(
            self, None, id=3, reason="us", note="dobry boże", user=to_global_id("id", 1)
        )
        self.assertEqual(3, len(query.resolve_all_user_reports(self)))

    def test_query_CopyCasket(self):
        query = Query()
        copyx = CopyCasket.objects.get(id=1)
        copyy = CopyCasket.objects.get(id=2)
        self.assertEqual(copyx, query.resolve_copy(self, to_global_id("id", 1)))
        self.assertEqual(copyy, query.resolve_copy(self, to_global_id("id", 2)))

    def test_query_User(self):
        query = Query()
        userx = CustomUser.objects.get(email="kowalski@op.pl")
        usery = CustomUser.objects.get(email="nadolny@op.pl")
        self.assertEqual(userx, query.resolve_user(self, 1))
        self.assertEqual(usery, query.resolve_user(self, 2))

    def test_query_all(self):
        query = Query()
        self.assertEqual(5, len(query.resolve_all_copies(self)))

    def test_users_all(self):
        query = Query()
        self.assertEqual(2, len(query.resolve_all_users(self)))

    def test_resolve_all_public_copies(self):
        query = Query()
        self.assertEqual(2, len(query.resolve_all_public_copies(self)))

    def test_resolve_all_private_copies(self):
        query = Query()
        copies = query.resolve_all_private_copies(self, creator=2)
        copies2 = query.resolve_all_private_copies(self, creator=1)
        self.assertEqual(1, len(copies))
        self.assertEqual(2, len(copies2))

    def test_resolve_all_users_copies(self):
        query = Query()
        copies = query.resolve_all_users_copies(self, creator=2)
        copies2 = query.resolve_all_users_copies(self, creator=1)
        self.assertEqual(2, len(copies))
        self.assertEqual(3, len(copies2))

    def test_resolve_user_email(self):
        query = Query()
        userx = CustomUser.objects.get(email="kowalski@op.pl")
        usery = CustomUser.objects.get(email="nadolny@op.pl")
        self.assertEqual(userx, query.resolve_user_email(self, "kowalski@op.pl"))
        self.assertEqual(usery, query.resolve_user_email(self, "nadolny@op.pl"))

    def test_createcasket_mut(self):
        query = Query()
        createq = CopyCasketCreateMutation()
        createq.mutate(
            self,
            None,
            id=6,
            title="createtest",
            author="zawiso",
            creation_date=self.aware_datetime,
            type="cd",
            content="lorem ipsum",
            creator="kowalski@op.pl",
        )
        self.assertEqual("createtest", CopyCasket.objects.get(id=6).title)
        self.assertEqual(6, len(query.resolve_all_copies(self)))

    def test_updatecasket_mut(self):
        updateq = CopyCasketUpdateMutation()
        updateq.mutate(
            self,
            None,
            id=to_global_id("id", 2),
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
        delq.mutate(self, None, id=to_global_id("id", 2))
        self.assertEqual(4, len(query.resolve_all_copies(self)))
        delq.mutate(self, None, id=to_global_id("id", 3))
        self.assertEqual(3, len(query.resolve_all_copies(self)))

    def test_createuser_mut(self):
        query = Query()
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
        self.assertEqual(3, len(query.resolve_all_users(self)))

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
        self.assertEqual("cukiernia", CustomUser.objects.get(id=2).organisation)

    def test_deleteuser_mut(self):
        query = Query()
        delu = CustomUserDeleteMutation()
        delu.mutate(self, None, id=2)
        self.assertEqual(1, len(query.resolve_all_users(self)))
