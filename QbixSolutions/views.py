from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from django.core.paginator import Paginator
from .models import (
    TeamMember, Service, Portfolio, BlogPost, 
    Testimonial, JobListing, ContactSubmission
)
from .forms import ContactForm, CareerApplicationForm, NewsletterForm, ConsultationForm


def home(request):
    """Home page with hero section, featured services, portfolio, testimonials, and blog"""
    services = Service.objects.all()[:3]
    portfolio_items = Portfolio.objects.filter(featured=True)[:6]
    testimonials = Testimonial.objects.filter(featured=True)[:4]
    # Show latest 3 blog posts, prioritizing featured ones
    blog_posts = BlogPost.objects.all().order_by('-featured', '-published_date')[:3]
    
    # Handle consultation form
    consultation_form = ConsultationForm()
    if request.method == 'POST' and 'consultation_submit' in request.POST:
        consultation_form = ConsultationForm(request.POST)
        if consultation_form.is_valid():
            # Save as contact submission
            ContactSubmission.objects.create(
                name=consultation_form.cleaned_data['name'],
                email=consultation_form.cleaned_data['email'],
                phone=consultation_form.cleaned_data['phone'],
                service=consultation_form.cleaned_data['service'],
                message=consultation_form.cleaned_data['message']
            )
            messages.success(request, 'Thank you! We will contact you soon for your free consultation.')
            return redirect('home')
    
    # Handle newsletter subscription
    newsletter_form = NewsletterForm()
    if request.method == 'POST' and 'newsletter_submit' in request.POST:
        newsletter_form = NewsletterForm(request.POST)
        if newsletter_form.is_valid():
            newsletter_form.save()
            messages.success(request, 'Successfully subscribed to our newsletter!')
            return redirect('home')
    
    context = {
        'services': services,
        'portfolio_items': portfolio_items,
        'testimonials': testimonials,
        'blog_posts': blog_posts,
        'consultation_form': consultation_form,
        'newsletter_form': newsletter_form,
    }
    return render(request, 'index.html', context)


def about(request):
    """About Us page with company vision and team members"""
    team_members = TeamMember.objects.all()[:5]
    
    context = {
        'team_members': team_members,
    }
    return render(request, 'about.html', context)


def services(request):
    """Services page showing all available services"""
    all_services = Service.objects.all()
    
    context = {
        'services': all_services,
    }
    return render(request, 'services.html', context)


def service_detail(request, slug):
    """Individual service detail page"""
    service = get_object_or_404(Service, slug=slug)
    related_services = Service.objects.exclude(slug=slug)[:3]
    
    context = {
        'service': service,
        'related_services': related_services,
    }
    return render(request, 'service_detail.html', context)


def portfolio(request):
    """Portfolio page with all projects"""
    all_portfolio = Portfolio.objects.all()
    
    # Filter by category if provided
    category = request.GET.get('category')
    if category:
        all_portfolio = all_portfolio.filter(category=category)
    
    # Get category choices with display names
    category_choices = Portfolio.CATEGORY_CHOICES
    
    # Get categories that actually have projects
    existing_categories = Portfolio.objects.values_list('category', flat=True).distinct()
    available_categories = [(code, name) for code, name in category_choices if code in existing_categories]
    
    # Pagination
    paginator = Paginator(all_portfolio, 9)
    page_number = request.GET.get('page')
    portfolio_items = paginator.get_page(page_number)
    
    context = {
        'portfolio_items': portfolio_items,
        'categories': available_categories,
        'selected_category': category,
    }
    return render(request, 'portfolio.html', context)


def portfolio_detail(request, slug):
    """Individual portfolio item detail page"""
    portfolio_item = get_object_or_404(Portfolio, slug=slug)
    related_projects = Portfolio.objects.exclude(slug=slug).filter(category=portfolio_item.category)[:3]
    
    context = {
        'portfolio_item': portfolio_item,
        'related_projects': related_projects,
    }
    return render(request, 'portfolio_detail.html', context)


def blog(request):
    """Blog listing page"""
    all_posts = BlogPost.objects.all()
    
    # Filter by category if provided
    category = request.GET.get('category')
    if category:
        all_posts = all_posts.filter(category=category)
    
    # Get unique categories
    categories = BlogPost.objects.values_list('category', flat=True).distinct()
    
    # Pagination
    paginator = Paginator(all_posts, 9)
    page_number = request.GET.get('page')
    blog_posts = paginator.get_page(page_number)
    
    # Featured posts
    featured_posts = BlogPost.objects.filter(featured=True)[:3]
    
    context = {
        'blog_posts': blog_posts,
        'categories': categories,
        'selected_category': category,
        'featured_posts': featured_posts,
    }
    return render(request, 'blog.html', context)


def blog_detail(request, slug):
    """Individual blog post detail page"""
    post = get_object_or_404(BlogPost, slug=slug)
    related_posts = BlogPost.objects.exclude(slug=slug).filter(category=post.category)[:3]
    
    context = {
        'post': post,
        'related_posts': related_posts,
    }
    return render(request, 'blog_detail.html', context)


def careers(request):
    """Careers page with job listings"""
    job_listings = JobListing.objects.filter(active=True)
    
    # Filter by department if provided
    department = request.GET.get('department')
    if department:
        job_listings = job_listings.filter(department=department)
    
    # Get unique departments
    departments = JobListing.objects.filter(active=True).values_list('department', flat=True).distinct()
    
    context = {
        'job_listings': job_listings,
        'departments': departments,
        'selected_department': department,
    }
    return render(request, 'careers.html', context)


def career_apply(request, slug):
    """Career application page for a specific job"""
    job = get_object_or_404(JobListing, slug=slug, active=True)
    
    if request.method == 'POST':
        form = CareerApplicationForm(request.POST, request.FILES)
        if form.is_valid():
            application = form.save(commit=False)
            application.job = job
            application.save()
            messages.success(request, f'Your application for {job.title} has been submitted successfully!')
            return redirect('careers')
    else:
        form = CareerApplicationForm()
    
    context = {
        'job': job,
        'form': form,
    }
    return render(request, 'career_apply.html', context)


def contact(request):
    """Contact page with form"""
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Thank you for contacting us! We will get back to you soon.')
            return redirect('contact')
    else:
        form = ContactForm()
    
    context = {
        'form': form,
    }
    return render(request, 'contact.html', context)


def newsletter_subscribe(request):
    """Handle newsletter subscription from footer"""
    if request.method == 'POST':
        form = NewsletterForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Successfully subscribed to our newsletter!')
        else:
            messages.error(request, 'Please provide a valid email address.')
    
    # Redirect back to the referring page or home
    return redirect(request.META.get('HTTP_REFERER', 'home'))
