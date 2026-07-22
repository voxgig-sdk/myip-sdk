# Myip SDK feature factory

from feature.base_feature import MyipBaseFeature
from feature.test_feature import MyipTestFeature


def _make_feature(name):
    features = {
        "base": lambda: MyipBaseFeature(),
        "test": lambda: MyipTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
