"""Script to set current forms accessible to all designers.
Existing forms are added to authorization table with auth_type DESIGNER.

Revision ID: e1ccede6ab26
Revises: 7dcad446d35c
Create Date: 2023-04-20 12:27:54.081388

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = 'e1ccede6ab26'
down_revision = '7dcad446d35c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    conn = op.get_bind()
    # Get the latest row for each parent_form_id group
    # Each form has one or more versions so we need latest from based on parentId
    forms = conn.execute(sa.text("""SELECT form.parent_form_id, form.id, form.tenant, form.created_by
                                    FROM form_process_mapper form JOIN (
                                    SELECT parent_form_id, max(id) as max_id FROM form_process_mapper
                                    WHERE deleted = false 
                                    GROUP BY parent_form_id, tenant) subq ON form.id = subq.max_id;"""))
    if forms:
        # insert the current forms to authorization table
        insert_stmt = """INSERT INTO public.authorization (created, created_by, tenant, auth_type, resource_id)
          VALUES (:created, :created_by, :tenant, :auth_type, :resource_id);"""
        for row in forms:
            # insert the values into the target table
            conn.execute(sa.text(insert_stmt), {'created': 'now()', 'created_by': row[3],'tenant': row[2], 'auth_type':'DESIGNER','resource_id':row[0]})
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    pass
    # ### end Alembic commands ###