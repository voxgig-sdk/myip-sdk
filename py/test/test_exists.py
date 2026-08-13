# Myip SDK exists test

import pytest
from myip_sdk import MyipSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = MyipSDK.test(None, None)
        assert testsdk is not None
