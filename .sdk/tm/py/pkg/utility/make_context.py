# Myip SDK utility: make_context

from projectname_sdk.core.context import MyipContext


def make_context_util(ctxmap, basectx):
    return MyipContext(ctxmap, basectx)
