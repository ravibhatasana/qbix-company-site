from django import forms
from .models import ContactSubmission, CareerApplication, NewsletterSubscriber
import re


class ContactForm(forms.ModelForm):
    class Meta:
        model = ContactSubmission
        fields = ['name', 'email', 'phone', 'service', 'message']
        widgets = {
            'name': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Your Name',
                'required': True
            }),
            'email': forms.EmailInput(attrs={
                'class': 'form-control',
                'placeholder': 'Your Email',
                'required': True
            }),
            'phone': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Your Phone Number',
                'required': True
            }),
            'service': forms.Select(attrs={
                'class': 'form-control',
                'required': True
            }, choices=[
                ('', 'Select a Service'),
                ('Web Development', 'Web Development'),
                ('Mobile App Development', 'Mobile App Development'),
                ('SaaS Solutions', 'SaaS Solutions'),
                ('Consulting', 'Consulting'),
                ('Other', 'Other'),
            ]),
            'message': forms.Textarea(attrs={
                'class': 'form-control',
                'placeholder': 'Tell us about your project',
                'rows': 5,
                'required': True
            }),
        }
    
    def clean_phone(self):
        phone = self.cleaned_data.get('phone')
        # Remove all non-digit characters
        phone_digits = re.sub(r'\D', '', phone)
        if len(phone_digits) < 10:
            raise forms.ValidationError("Please enter a valid phone number with at least 10 digits.")
        return phone
    
    def clean_name(self):
        name = self.cleaned_data.get('name')
        if len(name) < 2:
            raise forms.ValidationError("Name must be at least 2 characters long.")
        return name


class CareerApplicationForm(forms.ModelForm):
    class Meta:
        model = CareerApplication
        fields = ['name', 'email', 'phone', 'cover_letter', 'resume', 'portfolio_url']
        widgets = {
            'name': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Full Name',
                'required': True
            }),
            'email': forms.EmailInput(attrs={
                'class': 'form-control',
                'placeholder': 'Email Address',
                'required': True
            }),
            'phone': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Phone Number',
                'required': True
            }),
            'cover_letter': forms.Textarea(attrs={
                'class': 'form-control',
                'placeholder': 'Tell us why you\'re a great fit for this role',
                'rows': 5,
                'required': True
            }),
            'resume': forms.FileInput(attrs={
                'class': 'form-control',
                'required': True,
                'accept': '.pdf,.doc,.docx'
            }),
            'portfolio_url': forms.URLInput(attrs={
                'class': 'form-control',
                'placeholder': 'Portfolio URL (Optional)'
            }),
        }
    
    def clean_resume(self):
        resume = self.cleaned_data.get('resume')
        if resume:
            # Check file size (max 5MB)
            if resume.size > 5 * 1024 * 1024:
                raise forms.ValidationError("Resume file size must not exceed 5MB.")
            
            # Check file extension
            ext = resume.name.split('.')[-1].lower()
            if ext not in ['pdf', 'doc', 'docx']:
                raise forms.ValidationError("Only PDF, DOC, and DOCX files are allowed.")
        return resume
    
    def clean_phone(self):
        phone = self.cleaned_data.get('phone')
        phone_digits = re.sub(r'\D', '', phone)
        if len(phone_digits) < 10:
            raise forms.ValidationError("Please enter a valid phone number.")
        return phone


class NewsletterForm(forms.ModelForm):
    class Meta:
        model = NewsletterSubscriber
        fields = ['email']
        widgets = {
            'email': forms.EmailInput(attrs={
                'class': 'form-control',
                'placeholder': 'Enter your email',
                'required': True
            })
        }
    
    def clean_email(self):
        email = self.cleaned_data.get('email')
        if NewsletterSubscriber.objects.filter(email=email, active=True).exists():
            raise forms.ValidationError("This email is already subscribed to our newsletter.")
        return email


class ConsultationForm(forms.Form):
    name = forms.CharField(
        max_length=100,
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'Your Name',
            'required': True
        })
    )
    email = forms.EmailField(
        widget=forms.EmailInput(attrs={
            'class': 'form-control',
            'placeholder': 'Your Email',
            'required': True
        })
    )
    phone = forms.CharField(
        max_length=20,
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'Your Phone',
            'required': True
        })
    )
    service = forms.ChoiceField(
        choices=[
            ('', 'Select a Service'),
            ('Web Development', 'Web Development'),
            ('Mobile App Development', 'Mobile App Development'),
            ('SaaS Solutions', 'SaaS Solutions'),
            ('Consulting', 'Consulting'),
        ],
        widget=forms.Select(attrs={
            'class': 'form-control',
            'required': True
        })
    )
    message = forms.CharField(
        widget=forms.Textarea(attrs={
            'class': 'form-control',
            'placeholder': 'Brief description of your needs',
            'rows': 4,
            'required': True
        })
    )
    
    def clean_phone(self):
        phone = self.cleaned_data.get('phone')
        phone_digits = re.sub(r'\D', '', phone)
        if len(phone_digits) < 10:
            raise forms.ValidationError("Please enter a valid phone number.")
        return phone
