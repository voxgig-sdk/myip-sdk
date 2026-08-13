# Myip SDK feature factory

from myip_sdk.feature.base_feature import MyipBaseFeature
from myip_sdk.feature.test_feature import MyipTestFeature


def _make_feature(name):
    features = {
        "base": lambda: MyipBaseFeature(),
        "test": lambda: MyipTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
