import traceback


def get_error_description(e: Exception):
    return f"{str(e)}:   {traceback.format_exc()}"


class DBException(Exception):
    pass


class EmailTakenException(Exception):
    pass


class CompanyNameTakenException(Exception):
    pass


class ResourceNotFoundException(DBException):
    pass


