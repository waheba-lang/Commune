<x-mail::message>
# Complaint Received

Dear {{ $complaint->user->first_name }},

Thank you for reaching out to us. This is to confirm that we have successfully received your complaint regarding **"{{ $complaint->title }}"**.

**Details of your request:**
- **Category:** {{ $complaint->category }}
- **Location:** {{ $complaint->address }}, {{ $complaint->city }}
- **Status:** {{ $complaint->status }}

Our administrative team is currently reviewing your request. You will receive another notification once the status of your complaint changes.

<x-mail::button :url="config('app.url') . '/my-complaints'">
View My Complaints
</x-mail::button>

If you have any further questions, please don't hesitate to contact us.

Thanks,<br>
{{ config('app.name') }} Team
</x-mail::message>
