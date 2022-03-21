from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class Hasher:
    @staticmethod
    def salt_password(plain_password, salt):
        return plain_password + salt

    @staticmethod
    def verify_password(salted_password, hashed_password):
        return pwd_context.verify(salted_password, hashed_password)

    @staticmethod
    def get_password_hash(salted_password):
        return pwd_context.hash(salted_password)