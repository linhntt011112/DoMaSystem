
from datetime import datetime

from loguru import logger
from .. import common_queries, db_models
from ..schemas import company as company_schemas

from sqlalchemy import select, insert
from sqlalchemy.orm import Session
import typing 
from . import exceptions


def get_company_by_id(db, company_id):
    company = common_queries.query_filter(db, db_models.Company, db_models.Company.id==company_id)
    if len(company) >= 1:
        return company[0]
    else:
        return None

def select_list_company(db, condition=None, **kwargs):
    users = common_queries.select_with_options(db, db_models.Company, condition=condition, **kwargs)
    return users
  
  
def create_company(db, company: company_schemas.CompanyCreate):

    now = datetime.now()
    new_company = db_models.Company(
        full_name=company.full_name,
        description=company.description,
        create_at=company.create_at if company.create_at is not None else now,
        
        creator_id=company.creator_id,
    )

    new_company = common_queries.add_and_commit(db, new_company)
    return new_company
  
  
def delete_company(db, company: db_models.Company):
    return common_queries.delete(db, company)
  