from django.contrib.auth.models import User
from rest_framework import serializers, fields

# from api.models import (
#     Equity_Security_Master,
#     Position,
#     Trade,
#     Live_Target_Portfolio,
#     Portfolio_ExAnte_Stats,
#     # Performance,
#     Security_Performance,
# )
# from django.db import models
# from django.utils import timezone


# class DynamicFieldsModelSerializer(serializers.ModelSerializer):
#     """
#     A ModelSerializer that takes an additional `fields` argument that
#     controls which fields should be displayed.
#     """

#     def __init__(self, *args, **kwargs):
#         # Don't pass the 'fields' arg up to the superclass
#         fields = kwargs.pop('fields', None)

#         # Instantiate the superclass normally
#         super(DynamicFieldsModelSerializer, self).__init__(*args, **kwargs)

#         if fields is not None:
#             # Drop any fields that are not specified in the `fields` argument.
#             allowed = set(fields)
#             existing = set(self.fields)
#             for field_name in existing - allowed:
#                 self.fields.pop(field_name)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "url",
            "first_name",
            "last_name",
            "username",
            "email",
            "password",
            "is_staff",
        ]


# class ChangePasswordSerializer(serializers.Serializer):
#     model = User

#     """
#     Serializer for password change endpoint.
#     """
#     old_password = serializers.CharField(required=True)
#     new_password = serializers.CharField(required=True)


# class EquitySecurityMasterSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Equity_Security_Master
#         fields = "__all__"


# # class PerformanceSerializer(serializers.ModelSerializer):
# #     class Meta:
# #         model = Performance
# #         fields = "__all__"


# class SecurityPerformanceSerializer(DynamicFieldsModelSerializer):
#     ticker = serializers.SerializerMethodField(
#         "get_ticker_from_equity_security_master")
#     graph_data = serializers.SerializerMethodField(
#         "get_graph_data"
#     )

#     class Meta:
#         model = Security_Performance
#         fields = [
#             "asset_id",
#             "date",
#             "ticker",
#             "graph_data",
#             "exante_total_annual_standard_deviation",
#             "exante_active_annual_standard_deviation",
#             "exante_total_annual_standard_deviation_partial",
#             "exante_active_annual_standard_deviation_partial",
#             "exante_total_annual_standard_deviation_contrib",
#             "exante_active_annual_standard_deviation_contrib",
#         ]

#     def get_ticker_from_equity_security_master(self, security):
#         ticker = security.asset.ticker
#         return ticker

#     def get_graph_data(self, sec):
#         for f in self.fields:
#             if f != 'ticker':
#                 if f == 'exante_active_annual_standard_deviation':
#                     return sec.exante_active_annual_standard_deviation
#                 if f == 'exante_active_annual_standard_deviation_contrib':
#                     return sec.exante_active_annual_standard_deviation_contrib
#                 if f == 'exante_active_annual_standard_deviation_partial':
#                     return sec.exante_active_annual_standard_deviation_partial
#                 if f == 'exante_total_annual_standard_deviation':
#                     return sec.exante_total_annual_standard_deviation
#                 if f == 'exante_total_annual_standard_deviation_contrib':
#                     return sec.exante_total_annual_standard_deviation_contrib
#                 if f == 'exante_total_annual_standard_deviation_partial':
#                     return sec.exante_total_annual_standard_deviation_partial
#         return None


# class PositionSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Position
#         fields = [
#             "asset_id",
#             "ticker",
#             "num_of_shares",
#             "asset_type",
#             "price",
#             "position_value",
#             "date",
#         ]


# class TradeSerializer(serializers.ModelSerializer):
#     ticker = serializers.SerializerMethodField(
#         "get_ticker_from_equity_security_master")

#     class Meta:
#         model = Trade
#         fields = [
#             "trade_id",
#             "asset_id",
#             "ticker",
#             "trade_type",
#             "num_of_shares",
#             "price",
#             "tot_price",
#             "trade_status",
#             "trade_time",
#         ]

#     def get_ticker_from_equity_security_master(self, trd):
#         ticker = trd.asset.ticker
#         return ticker


# class LiveTargetPortfolioSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Live_Target_Portfolio
#         fields = [
#             "asset",
#             "ticker",
#             "model_er",
#             "annualized_er",
#             "beta_to_b",
#             "alpha",
#             "oa_weight",
#             "b_weight",
#             "c_weight",
#             "backlog",
#             "backlog_risk",
#             "commit_time",
#             "commit_maker",
#             "is_latest",
#         ]


# class PortfolioExAnteStatsSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Portfolio_ExAnte_Stats
#         fields = "__all__"
