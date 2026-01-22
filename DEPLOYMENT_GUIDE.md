# Step-by-Step Guide to Deploy on GitHub

## Prerequisites
1. Install Git from https://git-scm.com/download/win
2. Create a GitHub account at https://github.com if you don't have one

## Steps to Push to GitHub

### 1. Initialize Git Repository
Open PowerShell in the project directory and run:

```powershell
cd D:\QbixSolutions\company_site
git init
```

### 2. Configure Git (First Time Only)
```powershell
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"
```

### 3. Add Files to Git
```powershell
git add .
git commit -m "Initial commit: QbixSolutions company website"
```

### 4. Create GitHub Repository
1. Go to https://github.com
2. Click the "+" icon in top right → "New repository"
3. Name it (e.g., "qbix-company-site")
4. Don't initialize with README (we already have one)
5. Click "Create repository"

### 5. Connect and Push to GitHub
Replace `yourusername` with your GitHub username:

```powershell
git remote add origin https://github.com/yourusername/qbix-company-site.git
git branch -M main
git push -u origin main
```

## Important: Update Settings Before Deploying

### Security Settings
Edit `company_site/settings.py`:

1. **Generate a new SECRET_KEY**
2. **Set DEBUG = False** for production
3. **Update ALLOWED_HOSTS**

Example:
```python
import os

SECRET_KEY = os.environ.get('SECRET_KEY', 'your-secret-key-here')
DEBUG = False
ALLOWED_HOSTS = ['yourdomain.com', 'www.yourdomain.com']
```

## Deployment Options (Django Cannot Run on GitHub Pages)

### Option 1: PythonAnywhere (Easiest & Free)
1. Sign up at https://www.pythonanywhere.com
2. Create a new web app (Python 3.x)
3. Clone your GitHub repository
4. Configure WSGI file
5. Set up virtualenv and install requirements
6. Configure static files mapping

### Option 2: Heroku (Easy with GitHub Integration)
1. Sign up at https://heroku.com
2. Install Heroku CLI
3. Create these files:

**Procfile:**
```
web: gunicorn company_site.wsgi
```

**runtime.txt:**
```
python-3.11.7
```

**Update requirements.txt:**
```
Django>=5.2.8,<5.3
Pillow>=10.0.0
gunicorn>=20.1.0
whitenoise>=6.5.0
```

4. Deploy:
```powershell
heroku login
heroku create your-app-name
git push heroku main
heroku run python manage.py migrate
```

### Option 3: Railway.app (Easy & Free Tier)
1. Go to https://railway.app
2. Sign in with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Add environment variables
6. Deploy

### Option 4: Render.com (Free Tier Available)
1. Sign up at https://render.com
2. Click "New +" → "Web Service"
3. Connect GitHub repository
4. Configure:
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `gunicorn company_site.wsgi:application`
5. Add environment variables
6. Deploy

## Environment Variables to Set

For any deployment platform, set these:

- `SECRET_KEY`: Generate a new one
- `DEBUG`: False
- `DATABASE_URL`: Your database connection string (if using PostgreSQL)
- `ALLOWED_HOSTS`: Your domain name

## After Deployment

1. Run migrations:
   ```
   python manage.py migrate
   ```

2. Create superuser:
   ```
   python manage.py createsuperuser
   ```

3. Collect static files:
   ```
   python manage.py collectstatic
   ```

## Need Help?

- Django Deployment: https://docs.djangoproject.com/en/stable/howto/deployment/
- PythonAnywhere: https://help.pythonanywhere.com/pages/DeployExistingDjangoProject/
- Heroku Django: https://devcenter.heroku.com/articles/django-app-configuration

---

**Note**: GitHub Pages is for static HTML/CSS/JS sites only. It cannot run Python/Django applications. Choose one of the deployment options above instead.
