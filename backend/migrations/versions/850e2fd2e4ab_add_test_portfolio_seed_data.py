from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '850e2fd2e4ab'
down_revision = '9bfb48098cce'
branch_labels = None
depends_on = None


def upgrade():
    op.execute("""
        INSERT INTO portfolio_item (id, title, description, media_url)
        VALUES (1, 'Test Video', 'Test Description', 'https://res.cloudinary.com/your-cloud/video/upload/sample.mp4');
    """)


def downgrade():
    op.execute("""
        DELETE FROM portfolio_item WHERE id = 1;
    """)
