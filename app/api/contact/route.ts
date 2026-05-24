import { NextResponse } from 'next/server'
import siteMetadata from '@/data/siteMetadata'

export async function POST(request: Request) {
    try {
        const contentType = request.headers.get('content-type') || ''
        let name = ''
        let email = ''
        let message = ''

        // Handle both form URL-encoded and JSON submissions
        if (contentType.includes('application/x-www-form-urlencoded')) {
            const formData = await request.formData()
            name = formData.get('name') as string || ''
            email = formData.get('email') as string || ''
            message = formData.get('message') as string || ''
        } else {
            const body = await request.json()
            name = body.name || ''
            email = body.email || ''
            message = body.message || ''
        }

        // Simple validation
        if (!email || !message) {
            return NextResponse.json({ error: 'Email and message are required.' }, { status: 400 })
        }

        const resendApiKey = process.env.NEXT_PUBLIC_RESEND_API_KEY
        if (!resendApiKey) {
            console.error('NEXT_PUBLIC_RESEND_API_KEY is not defined in environment variables.')
            return NextResponse.json({ error: 'Mail delivery service not configured.' }, { status: 500 })
        }

        // Determine sender and receiver email
        // onboarding@resend.dev is standard for testing/unverified Resend domains.
        // Once domain is verified in Resend, you can use contact@dailydevpost.com as the 'from' address.
        const fromEmail = process.env.RESEND_FROM_EMAIL || 'Contact Form <onboarding@resend.dev>'
        const toEmail = process.env.RESEND_TO_EMAIL || siteMetadata.email || 'pradip@dailydevpost.com'

        // Construct HTML email body
        const emailHtml = `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                <h2 style="color: #4f46e5; border-bottom: 2px solid #eee; padding-bottom: 10px;">📬 New Contact Form Message</h2>
                <p style="font-size: 16px; margin: 10px 0;"><strong>Name:</strong> ${name || 'Anonymous'}</p>
                <p style="font-size: 16px; margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #4f46e5;">${email}</a></p>
                <div style="margin-top: 20px; padding: 15px; background-color: #f9fafb; border-radius: 8px; border-left: 4px solid #4f46e5;">
                    <p style="font-size: 15px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
                </div>
                <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;" />
                <p style="font-size: 12px; color: #9ca3af; text-align: center;">DailyDevPost Form Guard running on Cloudflare Edge</p>
            </div>
        `

        // Call Resend REST API via edge-compatible fetch
        const resendResponse = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${resendApiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                from: fromEmail,
                to: toEmail,
                subject: `📬 DailyDevPost: Message from ${name || 'Anonymous'}`,
                html: emailHtml,
                reply_to: email
            })
        })

        const resendData = await resendResponse.json() as { id?: string; error?: { message: string } }

        if (!resendResponse.ok) {
            console.error('Resend API response error:', resendData)
            return NextResponse.json({
                error: resendData.error?.message || 'Failed to deliver message via email provider.'
            }, { status: resendResponse.status })
        }

        return NextResponse.json({ success: true, message: 'Message sent successfully!', id: resendData.id })
    } catch (error) {
        console.error('Contact route handler caught error:', error)
        return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
    }
}
