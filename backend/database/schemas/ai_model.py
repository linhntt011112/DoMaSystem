from sqlalchemy import Column, Integer, String, Boolean, Date, DateTime
from sqlalchemy import ForeignKey, Sequence, UniqueConstraint, Table
from sqlalchemy.orm import relationship

from pydantic import BaseModel
from datetime import datetime, date
import typing as t

from . import (
  nguoi_dung as schemas_user,
  company as schemas_company
)



class SaveFile(BaseModel):
    id: int
    save_location: str
    url: str = None

    upload_at: t.Union[date, datetime]



class DatasetCategory(BaseModel):
    id: int
    name: str
    dataset_id: int


class Dataset(SaveFile):
    dataset_type: str

    categories: t.Optional[t.List[DatasetCategory]]
    ai_model_version_id: int
    # ai_model_version = relationship("AIModelVersion", back_populates="datasets")
    description: str = None



class AIModelRule(SaveFile):
    ai_model_version_id: int



class TrainingResult(BaseModel):
    id: int

    model_save_location: str
    starting_time: t.Union[date, datetime] = None
    finishing_time: t.Union[date, datetime] = None

    accuracy: str = None
    ai_model_version_id: int

    test_dataset_result_id: int = None
    test_dataset_result: Dataset = None



class AIModelVersion(BaseModel):
    id: int

    create_at: t.Union[date, datetime] = None
    status: str

    ai_model_id: int

    datasets: Dataset
    ai_model_rule: AIModelRule
    training_result: TrainingResult



class AIModel(BaseModel):
    id: int

    create_at = Column(DateTime, nullable=False)
    description: str = None
    company_id: int
    company: schemas_company.Company

    ai_model_versions: AIModelVersion

