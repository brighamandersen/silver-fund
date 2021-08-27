from django.contrib import admin
from django.contrib.auth.models import Group, User
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from api.models import (
    Equity_Security_Master,
    Position,
    Trade,
    Live_Target_Portfolio,
    Portfolio_ExAnte_Stats,
)


admin.site.unregister(Group)
admin.site.unregister(User)
admin.site.site_header = "Admin - Silver Fund"
admin.site.site_title = "Silver Fund"


# username - BYU Net ID
# password - Personal email username (everything before the '@') - temporary password until they change it
class UserAdmin(BaseUserAdmin):
    list_display = (
        "username",
        "first_name",
        "last_name",
        "email",
        "is_staff",
        "date_joined",
        "is_active",
    )
    fieldsets = ()
    fields = (
        "first_name",
        "last_name",
        "username",
        "email",
        "password",
        "is_staff",
        "is_active",
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "first_name",
                    "last_name",
                    "username",
                    "email",
                    "password1",
                    "password2",
                    "is_staff",
                    "is_active",
                ),
            },
        ),
    )


class Live_Target_Porfolio_Admin(admin.ModelAdmin):
    readonly_fields = ("commit_time",)


class Portfolio_ExAnte_Stats_Admin(admin.ModelAdmin):
    readonly_fields = ("commit_time",)


admin.site.register(User, UserAdmin)
admin.site.register(Equity_Security_Master)
admin.site.register(Position)
admin.site.register(Trade)
admin.site.register(Live_Target_Portfolio, Live_Target_Porfolio_Admin)
admin.site.register(Portfolio_ExAnte_Stats, Portfolio_ExAnte_Stats_Admin)

