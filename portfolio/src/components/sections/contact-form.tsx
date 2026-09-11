"use client";

import { useState, FormEvent } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    
    // Simulate form submission - integrate with your preferred email service
    // Examples: Resend, Formspree, or Next.js API Route with nodemailer
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setStatus("sent");
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setStatus("idle");
      (e.target as HTMLFormElement).reset();
    }, 3000);
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10 space-y-4">
      <div>
        <label htmlFor="name" className="sr-only">Name</label>
        <input 
          id="name"
          name="name" 
          placeholder="Name" 
          required 
          className="w-full rounded-lg bg-foreground/5 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent" 
        />
      </div>
      <div>
        <label htmlFor="email" className="sr-only">Email</label>
        <input 
          id="email"
          name="email" 
          type="email" 
          placeholder="Email" 
          required 
          className="w-full rounded-lg bg-foreground/5 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent" 
        />
      </div>
      <div>
        <label htmlFor="message" className="sr-only">Message</label>
        <textarea 
          id="message"
          name="message" 
          placeholder="Message" 
          required 
          rows={5} 
          className="w-full rounded-lg bg-foreground/5 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent" 
        />
      </div>
      <button 
        type="submit" 
        disabled={status !== "idle"} 
        className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-white hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {status === "sending" ? "Sending..." : status === "sent" ? "Sent ✓" : "Send message"}
      </button>
    </form>
  );
}
