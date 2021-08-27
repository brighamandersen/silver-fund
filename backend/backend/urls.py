from django.urls import include, path
from rest_framework import routers
from api import views
from django.contrib import admin
from rest_framework.authtoken.views import obtain_auth_token


router = routers.DefaultRouter()
router.register(r"api/users", views.UserViewSet)
# router.register(r"api/positions", views.PositionViewSet)
# router.register(r"api/trades", views.TradeViewSet)
# router.register(r"api/securities", views.EquitySecurityMasterViewSet)
# router.register(r"api/portfolio_performance",
#                 views.PortfolioPerformanceViewSet)
# router.register(r"api/securityrisk", views.SecurityPerformanceViewSet)

urlpatterns = [
    path("api-auth/", include("rest_framework.urls", namespace="rest_framework")),
    path("admin/", admin.site.urls),
    path("api/login/", obtain_auth_token),
#     path("api/change-password/", views.ChangePasswordView.as_view(),),
#     path("api/securities/r3000/", views.get_securities_r3000),
#     path("api/securities/filter/asset-id/", views.get_securities_by_assetid),
#     path("api/positions/current/", views.get_cur_positions),
#     path("api/positions/filter/date/", views.filter_positions_by_date),
#     path("api/trades/current/", views.get_cur_trades),
#     path("api/trades/filter/date/", views.filter_trades_by_date),
#     path("api/trades/unsettled/", views.get_unsettled_trades),
#     path("api/ibaccount/cashbalance/", views.get_cashbalance),
#     path("api/update/positions/", views.update_positions),
#     path("api/update/trades/", views.update_trades),
#     path("api/portfolio_performance/filter/date/",
#          views.filter_portfolio_performance_by_date),
#     path("api/portfolio_performance/filter/feild/",
#          views.get_port_risk_time_series),
#     path("api/live-target-portfolio/history/",
#          views.get_live_target_portfolio_history),
#     path("api/live-target-portfolio/latest/",
#          views.get_live_target_portfolio_latest),
#     path("api/live-target-portfolio/commit/",
#          views.commit_live_target_portfolio),
#     path("api/portfolio-stats/history/", views.get_portfolio_stats_history),
#     path("api/portfolio-stats/latest/", views.get_portfolio_stats_latest),
#     path("api/portfolio-stats/commit/", views.commit_portfolio_stats),
#     path("api/bench-stats/commit/", views.commit_benchmark_stats),
#     path("api/bench-stats/latest/", views.get_bench_stats_latest),
#     path("api/security-risk/filter/date/", views.filter_security_risk_by_date),
#     path("api/port-opt", views.port_opt),
    path("", include(router.urls)),
]
