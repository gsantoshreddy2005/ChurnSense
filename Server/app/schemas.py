from pydantic import BaseModel, Field, ConfigDict


class CustomerData(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    gender: str = Field(alias="Gender")
    age: int = Field(alias="Age")
    under_30: str = Field(alias="Under 30")
    senior_citizen: str = Field(alias="Senior Citizen")
    married: str = Field(alias="Married")
    dependents: str = Field(alias="Dependents")
    number_of_dependents: int = Field(alias="Number of Dependents")

    latitude: float = Field(alias="Latitude")
    longitude: float = Field(alias="Longitude")
    population: int = Field(alias="Population")

    quarter: str = Field(alias="Quarter")
    referred_a_friend: str = Field(alias="Referred a Friend")
    number_of_referrals: int = Field(alias="Number of Referrals")

    tenure_in_months: int = Field(alias="Tenure in Months")
    offer: str = Field(alias="Offer")

    phone_service: str = Field(alias="Phone Service")
    avg_monthly_long_distance_charges: float = Field(
        alias="Avg Monthly Long Distance Charges"
    )
    multiple_lines: str = Field(alias="Multiple Lines")

    internet_service: str = Field(alias="Internet Service")
    internet_type: str = Field(alias="Internet Type")
    avg_monthly_gb_download: float = Field(
        alias="Avg Monthly GB Download"
    )

    online_security: str = Field(alias="Online Security")
    online_backup: str = Field(alias="Online Backup")
    device_protection_plan: str = Field(alias="Device Protection Plan")
    premium_tech_support: str = Field(alias="Premium Tech Support")

    streaming_tv: str = Field(alias="Streaming TV")
    streaming_movies: str = Field(alias="Streaming Movies")
    streaming_music: str = Field(alias="Streaming Music")
    unlimited_data: str = Field(alias="Unlimited Data")

    contract: str = Field(alias="Contract")
    paperless_billing: str = Field(alias="Paperless Billing")
    payment_method: str = Field(alias="Payment Method")

    monthly_charge: float = Field(alias="Monthly Charge")
    total_charges: float = Field(alias="Total Charges")
    total_refunds: float = Field(alias="Total Refunds")
    total_extra_data_charges: float = Field(
        alias="Total Extra Data Charges"
    )
    total_long_distance_charges: float = Field(
        alias="Total Long Distance Charges"
    )
    total_revenue: float = Field(alias="Total Revenue")

    satisfaction_score: int = Field(alias="Satisfaction Score")
    cltv: float = Field(alias="CLTV")