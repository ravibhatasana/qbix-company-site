# QbixSolutions Company Website

A Django-based company website featuring portfolio, blog, careers, and contact sections.

## Features

- Portfolio showcase with categories
- Blog system
- Team members display
- Testimonials
- Career opportunities
- Contact form

## Tech Stack

- **Backend**: Django
- **Database**: SQLite (development)
- **Frontend**: HTML, CSS, JavaScript

## Local Setup

### Prerequisites

- Python 3.8+
- pip

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd company_site
```

2. Create and activate virtual environment:
```bash
python -m venv venv

# On Windows
venv\Scripts\activate

# On macOS/Linux
source venv/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run migrations:
```bash
python manage.py migrate
```

5. Create a superuser:
```bash
python manage.py createsuperuser
```

6. Collect static files:
```bash
python manage.py collectstatic
```

7. Run the development server:
```bash
python manage.py runserver
```

8. Access the site at `http://127.0.0.1:8000/`

## Deployment Options

### Option 1: PythonAnywhere (Free Tier Available)
- Sign up at [PythonAnywhere](https://www.pythonanywhere.com)
- Upload your code
- Configure WSGI file
- Set up static files

### Option 2: Heroku
- Install Heroku CLI
- Create Procfile and runtime.txt
- Deploy using Git

### Option 3: Railway/Render
- Connect your GitHub repository
- Configure environment variables
- Deploy with one click

### Option 4: DigitalOcean/AWS/Azure
- Set up a virtual server
- Install dependencies
- Configure Nginx/Apache
- Use Gunicorn as WSGI server

## Important Notes

- **GitHub Pages won't work** for this project as it's a Django application requiring a Python server
- Update `ALLOWED_HOSTS` in settings.py before deployment
- Set `DEBUG = False` in production
- Use environment variables for sensitive data
- Change `SECRET_KEY` before deploying

## License

[Your License Here]
