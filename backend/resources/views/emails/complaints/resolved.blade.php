<x-mail::message>
# Complaint Successfully Resolved

Dear {{ $complaint->user->first_name }},

We are pleased to inform you that your complaint regarding **"{{ $complaint->title }}"** has been successfully handled and resolved.

**Complaint Summary:**
- **Category:** {{ $complaint->category }}
- **Location:** {{ $complaint->address }}, {{ $complaint->city }}
- **Status:** **Resolved**

We hope the resolution meets your expectations. Your feedback is valuable to us as we strive to improve our services for all citizens.

<x-mail::button :url="config('app.url') . '/my-complaints/' . $complaint->id">
View Details
</x-mail::button>

Thank you for your patience and for helping us make our community better.

Best regards,<br>
{{ config('app.name') }} Team
</x-mail::message>
