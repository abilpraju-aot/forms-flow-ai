"""theme customization

Revision ID: 95387de7067e
Revises: fdfe787a197c
Create Date: 2024-04-30 03:34:31.937798

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '95387de7067e'
down_revision = 'fdfe787a197c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('themes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('logo_name', sa.String(length=50), nullable=False),
    sa.Column('logo_type', sa.String(length=100), nullable=False),
    sa.Column('logo_data', sa.String(), nullable=False),
    sa.Column('application_title', sa.String(length=50), nullable=False),
    sa.Column('theme', sa.JSON(), nullable=False),
    sa.Column('created', sa.DateTime(), nullable=False),
    sa.Column('modified', sa.DateTime(), nullable=True),
    sa.Column('created_by', sa.String(), nullable=False),
    sa.Column('modified_by', sa.String(), nullable=True),
    sa.Column('tenant', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('themes')
    # ### end Alembic commands ###
