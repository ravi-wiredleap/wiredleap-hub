import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { name, phone, message } = await request.json();

    // Validate input
    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Email configuration
    const emailData = {
      to: "ravi@wiredleap.com",
      subject: `New Contact Form Submission from ${name}`,
      body: `
Name: ${name}
Phone: ${phone}
Message: ${message}

---
This message was sent from the WiredLeap AI contact form.
      `,
    };

    // Send email using your preferred email service
    // For now, we'll use a simple mailto approach or you can integrate with services like:
    // - Resend: https://resend.com
    // - SendGrid: https://sendgrid.com
    // - Nodemailer with SMTP

    // Example with Resend (recommended):
    // import { Resend } from 'resend';
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'contact@wiredleap.com',
    //   to: emailData.to,
    //   subject: emailData.subject,
    //   html: `<p><strong>Name:</strong> ${name}</p><p><strong>Phone:</strong> ${phone}</p><p><strong>Message:</strong> ${message}</p>`,
    // });

    // For demonstration, we'll log to console
    // You should replace this with actual email sending logic
    console.log("=== NEW CONTACT FORM SUBMISSION ===");
    console.log(`Name: ${name}`);
    console.log(`Phone: ${phone}`);
    console.log(`Message: ${message}`);
    console.log(`To: ${emailData.to}`);
    console.log("===================================");

    // TODO: Replace this with actual email sending
    // For now, we'll send via webhook or use a third-party service

    // Option 1: Use a webhook service (like Zapier, Make.com)
    // await fetch(process.env.CONTACT_WEBHOOK_URL!, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ name, phone, message, to: emailData.to }),
    // });

    // Option 2: Use Resend (recommended - add RESEND_API_KEY to .env.local)
    // Uncomment when you have Resend API key:
    /*
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    if (RESEND_API_KEY) {
      const resendResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: 'WiredLeap Contact <noreply@wiredleap.com>',
          to: emailData.to,
          subject: emailData.subject,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #0ff3a3;">New Contact Form Submission</h2>
              <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Message:</strong> ${message}</p>
              </div>
              <p style="color: #666; font-size: 12px;">This message was sent from the WiredLeap AI contact form.</p>
            </div>
          `,
        }),
      });

      if (!resendResponse.ok) {
        throw new Error('Failed to send email via Resend');
      }
    }
    */

    return NextResponse.json(
      {
        success: true,
        message: "Contact form submitted successfully",
        note: "Email logged to console. Configure email service for production."
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Failed to process contact form" },
      { status: 500 }
    );
  }
}
