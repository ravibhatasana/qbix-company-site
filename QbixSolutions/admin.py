from django.contrib import admin
from .models import (
    TeamMember, Service, Portfolio, BlogPost, 
    Testimonial, JobListing, ContactSubmission, 
    CareerApplication, NewsletterSubscriber
)

# Register your models here.

@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ['name', 'position', 'order']
    list_editable = ['order']
    search_fields = ['name', 'position']


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ['title', 'slug', 'order']
    list_editable = ['order']
    search_fields = ['title']
    prepopulated_fields = {'slug': ('title',)}


@admin.register(Portfolio)
class PortfolioAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'featured', 'completion_date', 'order']
    list_filter = ['category', 'featured']
    list_editable = ['featured', 'order']
    search_fields = ['title', 'category']
    prepopulated_fields = {'slug': ('title',)}
    date_hierarchy = 'completion_date'


@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ['title', 'author', 'category', 'published_date', 'featured']
    list_filter = ['category', 'featured', 'published_date']
    list_editable = ['featured']
    search_fields = ['title', 'author', 'content']
    prepopulated_fields = {'slug': ('title',)}
    date_hierarchy = 'published_date'


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ['client_name', 'company', 'rating', 'featured', 'order']
    list_filter = ['rating', 'featured']
    list_editable = ['featured', 'order']
    search_fields = ['client_name', 'company']


@admin.register(JobListing)
class JobListingAdmin(admin.ModelAdmin):
    list_display = ['title', 'department', 'employment_type', 'location', 'posted_date', 'active']
    list_filter = ['department', 'employment_type', 'active']
    list_editable = ['active']
    search_fields = ['title', 'department']
    prepopulated_fields = {'slug': ('title',)}
    date_hierarchy = 'posted_date'


@admin.register(ContactSubmission)
class ContactSubmissionAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'phone', 'service', 'submitted_at']
    list_filter = ['service', 'submitted_at']
    search_fields = ['name', 'email', 'message']
    readonly_fields = ['submitted_at']
    date_hierarchy = 'submitted_at'


@admin.register(CareerApplication)
class CareerApplicationAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'job', 'submitted_at']
    list_filter = ['job', 'submitted_at']
    search_fields = ['name', 'email']
    readonly_fields = ['submitted_at']
    date_hierarchy = 'submitted_at'


@admin.register(NewsletterSubscriber)
class NewsletterSubscriberAdmin(admin.ModelAdmin):
    list_display = ['email', 'subscribed_at', 'active']
    list_filter = ['active', 'subscribed_at']
    list_editable = ['active']
    search_fields = ['email']
    readonly_fields = ['subscribed_at']
    date_hierarchy = 'subscribed_at'
