from fastapi import status, HTTPException


PERMISSION_EXCEPTION_HTTP = HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User does not have permission!",
            headers={"WWW-Authenticate": "Bearer"},
        )

RESOURCE_NOT_FOUND_EXCEPTION_HTTP = HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Resource not found!",
            headers={"WWW-Authenticate": "Bearer"},
        )


class ResourceNotFoundException(Exception):
    pass