from http.client import BAD_REQUEST
from fastapi import status, HTTPException


def make_exceptions(status_code, msg=''):
    return HTTPException(
            status_code=status_code,
            detail=msg,
            headers={"WWW-Authenticate": "Bearer"},
        )


PERMISSION_EXCEPTION = lambda msg="User does not have permission!": HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=msg,
            headers={"WWW-Authenticate": "Bearer"},
        )


NOT_FOUND_EXCEPTION = lambda msg="Resource not found!": HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=msg,
                headers={"WWW-Authenticate": "Bearer"},
            ) 



INTERNAL_SERVER_ERROR = lambda msg='': HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=msg,
                headers={"WWW-Authenticate": "Bearer"},
            ) 

BAD_REQUEST = lambda msg='Bad request!': HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=msg,
                headers={"WWW-Authenticate": "Bearer"},
            ) 

UNPROCESSABLE_ENTITY = lambda msg='Unprocessable entity!': HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail=msg,
                headers={"WWW-Authenticate": "Bearer"},
            ) 



class ResourceNotFoundException(Exception):
    pass