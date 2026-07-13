'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from '@/components/Link'

export default function EbookClient() {
  // Geolocation detection state
  const [isIndia, setIsIndia] = useState<boolean | null>(null)
  const [geoLoading, setGeoLoading] = useState(true)

  // FAQs expanded state
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  // Sticky bottom bar visibility
  const [showStickyBar, setShowStickyBar] = useState(false)

  const purchaseSectionRef = useRef<HTMLDivElement>(null)

  // Detect user location
  useEffect(() => {
    setGeoLoading(true)

    // Quick Timezone Check
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
      if (tz && (tz.includes('Kolkata') || tz.includes('Calcutta') || tz.includes('Bombay') || tz.includes('Madras'))) {
        setIsIndia(true)
        setGeoLoading(false)
        return
      }
    } catch (e) {
      console.error('Timezone check failed', e)
    }

    // IP Geolocation Check Fallback
    fetch('https://ipapi.co/json/')
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok')
        return res.json()
      })
      .then((data) => {
        if (data.country_code === 'IN') {
          setIsIndia(true)
        } else {
          setIsIndia(false)
        }
      })
      .catch((err) => {
        console.error('IP geolocation check failed, falling back to international pricing', err)
        setIsIndia(false)
      })
      .finally(() => {
        setGeoLoading(false)
      })
  }, [])

  // Listen to scrolls to toggle the sticky purchase bar
  useEffect(() => {
    const handleScroll = () => {
      if (!purchaseSectionRef.current) return
      
      const purchaseSectionTop = purchaseSectionRef.current.getBoundingClientRect().top
      const purchaseSectionHeight = purchaseSectionRef.current.getBoundingClientRect().height
      const screenHeight = window.innerHeight

      // Show if scrolled past 600px AND the main purchase section is not yet fully visible
      const isPastHero = window.scrollY > 600
      const isPurchaseSectionVisible = purchaseSectionTop < screenHeight - 80 && purchaseSectionTop + purchaseSectionHeight > 80

      if (isPastHero && !isPurchaseSectionVisible) {
        setShowStickyBar(true)
      } else {
        setShowStickyBar(false)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToPurchase = (e: React.MouseEvent) => {
    e.preventDefault()
    purchaseSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  const handlePurchaseClick = () => {
    if (isIndia) {
      window.open('https://dailydevpost.myinstamojo.com/product/the-future-proof-frontend-developer', '_blank')
    } else {
      window.open('https://dailydevpost.gumroad.com/l/the-future-proof-frontend-developer?wanted=true', '_blank')
    }
  }

  const faqs = [
    {
      q: "What is The Future-Proof Frontend Developer?",
      a: "This is a comprehensive ebook designed to help frontend developers build the skills that remain valuable in the age of AI. It focuses on engineering principles, problem-solving, AI-assisted workflows, career growth, and modern frontend development."
    },
    {
      q: "Who is this ebook for?",
      a: "This ebook is ideal for:\n\n• Frontend Developers (React, Vue, Angular, Next.js)\n• JavaScript & TypeScript Developers\n• Computer Science Students\n• Freshers preparing for tech jobs\n• Experienced developers looking to stay relevant in an AI-driven industry"
    },
    {
      q: "How will I receive the ebook?",
      a: "After your payment is successfully completed, you'll receive instant access to download the ebook. A confirmation email with your purchase details will also be sent to your registered email address."
    },
    {
      q: "What format is the ebook available in?",
      a: "The ebook is provided as a PDF, which can be read on laptops, desktops, tablets, and smartphones."
    },
    {
      q: "Can I download the ebook multiple times?",
      a: "Yes. You can download your purchased ebook using the provided download link 3 times. We recommend saving a backup copy for your personal use."
    },
    {
      q: "Is this a physical book?",
      a: "No. This is a digital ebook. No printed copy will be shipped."
    },
    {
      q: "Do I need prior experience in frontend development?",
      a: "Basic knowledge of HTML, CSS, and JavaScript is helpful, but the concepts are explained in a practical and easy-to-follow manner."
    },
    {
      q: "Are future updates included?",
      a: "Minor updates and corrections may be provided at no additional cost. Major new editions may be released separately."
    },
    {
      q: "What is your refund policy?",
      a: "Due to the nature of digital products, all sales are final. Refunds are only considered if the ebook cannot be delivered due to a verified technical issue that cannot be resolved."
    },
    {
      q: "Can I share this ebook with others?",
      a: "No. Your purchase is licensed for personal use only. Redistribution, resale, sharing, or uploading the ebook to any public platform is strictly prohibited."
    },
    {
      q: "Is my payment secure?",
      a: "Yes. Payments are securely processed through Gumroad or Instamojo, supporting UPI, credit/debit cards, net banking, and other trusted payment methods."
    },
    {
      q: "How can I contact support?",
      a: "If you have any questions or face any issues with your purchase, please contact us at pradip@dailydevpost.com. We'll do our best to respond as quickly as possible."
    }
  ]

  const readerTags = [
    "Frontend Developers", "React Developers", "Vue.js Developers",
    "Angular Developers", "Next.js Developers", "JavaScript Developers",
    "Computer Science Students", "Self-Taught Developers", "Junior Engineers",
    "Mid-Level Engineers", "Freelancers"
  ]

  const learnItems = [
    {
      title: "Think Like an Engineer",
      desc: "Learn how experienced developers approach problems, architecture, debugging, scalability, and decision-making.",
      icon: (
        <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      title: "Use AI Without Dependency",
      desc: "Turn AI into your productivity partner while strengthening, not weakening your core engineering skills.",
      icon: (
        <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: "Build Systems That Last",
      desc: "Write maintainable, scalable, and production-ready code. Understand architectural decisions instead of guessing.",
      icon: (
        <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    {
      title: "Develop Timeless Skills",
      desc: "Frameworks change, but engineering principles don't. Master the mental models that outlast any software trend.",
      icon: (
        <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Stand Out in the AI Era",
      desc: "Discover what separates developers companies promote from those they replace with AI generation tools.",
      icon: (
        <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      )
    }
  ]

  const insideChapters = [
    "Engineering Mindset & Paradigm Shift",
    "AI-Powered Development Strategies",
    "Structured Problem-Solving Frameworks",
    "Architecture Fundamentals & Systems Design",
    "Clean & Maintainable Code Principles",
    "Performance Thinking & Core Web Vitals",
    "Career Growth & Positioning Strategies",
    "Long-Term Developer Roadmap"
  ]

  const deliverables = [
    { title: "Complete eBook", desc: "Available instantly in PDF format.", icon: "📚" },
    { title: "Premium Layout", desc: "Designed professionally for readable, frictionless learning.", icon: "🎨" },
    { title: "Practical Frameworks", desc: "Real-world engineering insights you can apply immediately.", icon: "🛠️" },
    { title: "Lifetime Updates", desc: "Free updates for life whenever new content is added.", icon: "🔄" }
  ]

  const testimonials = [
    {
      quote: "This book completely shifted my perspective. I was relying too much on Copilot to write everything, but this book taught me how to guide AI as an architect rather than a typist. Highly recommended!",
      author: "Siddharth Mehta",
      role: "Senior React Developer at TCS",
      avatar: "SM"
    },
    {
      quote: "I've read dozens of tutorials, but none teach decision-making like Pradip does. The architecture chapter alone is worth ten times the price. My debugging time has cut down in half since applying the frameworks.",
      author: "Sarah Jenkins",
      role: "Frontend Engineer at Vercel",
      avatar: "SJ"
    },
    {
      quote: "As a junior dev, I was terrified of AI taking my job. This book gave me a clear, step-by-step roadmap to become the kind of developer employers pay for critical thinking, not just syntax.",
      author: "Rahul Verma",
      role: "Junior Engineer",
      avatar: "RV"
    }
  ]

  return (
    <div className="py-8 md:py-16">



      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
        <div className="lg:col-span-7 text-left space-y-6">
          <div className="inline-flex items-center space-x-2 bg-primary-100/65 dark:bg-primary-950/40 text-primary-700 dark:text-primary-400 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <span>🚀 Newly Released Guide</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl md:text-6xl leading-none">
            THE FUTURE-PROOF <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-500 dark:from-primary-400 dark:to-indigo-400">
              FRONTEND DEVELOPER
            </span>
          </h1>
          <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-300">
            Build the Skills AI Can't Replace.
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            AI can generate components, write React code, fix bugs, and build entire applications in minutes.
            But here's what AI <strong className="text-gray-900 dark:text-gray-100">can't</strong> do.
            It can't replace developers who think critically, make sound engineering decisions, communicate effectively, and create real business value.
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
            <button
              onClick={scrollToPurchase}
              className="py-4 px-8 rounded-2xl bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-500 hover:to-indigo-500 text-white font-extrabold text-lg shadow-lg hover:shadow-primary-500/25 transition duration-300 text-center"
            >
              Get Instant Access &rarr;
            </button>
            <a
              href="#learn-more"
              className="py-4 px-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 font-bold transition text-center"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Cover Image Showcase Column */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative group max-w-sm w-full transition-transform duration-500 hover:scale-[1.03] perspective-1000">
            {/* Ambient background glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/30 to-indigo-500/30 rounded-3xl blur-2xl group-hover:blur-3xl transition duration-500 -z-10"></div>

            {/* Visual cover display */}
            <div className="bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-950 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-2xl relative">
              <div className="relative w-full overflow-hidden rounded-2xl shadow-lg border border-black/10">
                <Image
                  src="/static/images/ebook/the-future-proof-frontend-dev/front-page-cover.png"
                  alt="The Future-Proof Frontend Developer Ebook Cover"
                  width={500}
                  height={667}
                  className="w-full h-auto"
                  priority
                />
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium px-1">
                <span>Format: PDF</span>
                <span>Includes Lifetime Updates</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className="border-slate-200 dark:border-slate-800 my-16" id="learn-more" />

      {/* Is This You Section */}
      <div className="space-y-12 max-w-4xl mx-auto">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight sm:text-4xl">
            Is This You?
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            If you nodded to even one of these, this book was written specifically for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            "You worry AI might make your frontend skills obsolete.",
            "You know JavaScript or modern frameworks (React, Vue, Angular) but feel there's a ceiling to your growth.",
            "You're tired of endless syntax tutorials that don't improve your career.",
            "You want to become a senior developer, not just someone who writes lines of code.",
            "You want employers to value your critical thinking, not just your styling skills."
          ].map((text, idx) => (
            <div key={idx} className="flex p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-900">
              <span className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 mr-4 font-bold">
                💡
              </span>
              <p className="text-base text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>

      <hr className="border-slate-200 dark:border-slate-800 my-16" />

      {/* What You'll Learn Section */}
      <div className="space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight sm:text-4xl">
            What You'll Learn
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Master the timeless engineering skills that remain valuable regardless of technology shifts or AI advancements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {learnItems.map((item, idx) => (
            <div key={idx} className="flex flex-col p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900/20 shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition">
              <div className="h-12 w-12 rounded-xl bg-primary-100 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400 flex items-center justify-center mb-5">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">{item.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <hr className="border-slate-200 dark:border-slate-800 my-16" />

      {/* What's Inside Section */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-5 space-y-6">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight sm:text-4xl">
            What's Inside
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            This eBook is structured into high-impact, actionable chapters that skip the fluff and focus purely on development workflows and structural engineering principles.
          </p>
          <div className="border-l-2 border-primary-500 pl-4 py-1">
            <span className="block text-sm font-bold text-slate-900 dark:text-slate-200">Zero Placeholders</span>
            <span className="block text-xs text-slate-500">Every lesson is backed by real-world frontend struggles and debugging experience.</span>
          </div>
        </div>

        <div className="md:col-span-7 bg-slate-50 dark:bg-slate-900/30 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8">
          <ul className="space-y-4">
            {insideChapters.map((chapter, idx) => (
              <li key={idx} className="flex items-center">
                <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 mr-3">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="text-base font-semibold text-slate-800 dark:text-slate-200">{chapter}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <hr className="border-slate-200 dark:border-slate-800 my-16" />

      {/* Who Should Read This Book */}
      <div className="space-y-8 text-center max-w-4xl mx-auto">
        <div className="space-y-3">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Who Should Read This Book?
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            No matter where you are in your career, if you build user interfaces, this book will level up your mindset.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {readerTags.map((tag, idx) => (
            <span
              key={idx}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-sm rounded-full transition"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <hr className="border-slate-200 dark:border-slate-800 my-16" />

      {/* Why This Book Is Different Section */}
      <div className="space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight sm:text-4xl">
            Why This Book Is Different
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Most resources teach syntax that expires tomorrow. This book teaches principles that last a lifetime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Traditional tutorials */}
          <div className="bg-slate-50 dark:bg-slate-900/20 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-red-500/10 text-red-500 text-[10px] font-bold tracking-widest px-3 py-1 rounded-bl-xl uppercase">
              Traditional Tutorials
            </div>
            <h3 className="text-xl font-extrabold text-slate-800 dark:text-slate-300 mb-6">Syntax &amp; APIs</h3>
            <ul className="space-y-4">
              {[
                "Teach specific framework features (like React hooks, Vue directives, or Angular decorators).",
                "Explain API syntax without deep context on when NOT to use them.",
                "Quickly become outdated as frameworks release new major versions.",
                "Encourage copy-pasting code fragments without understanding design tradeoffs."
              ].map((text, idx) => (
                <li key={idx} className="flex items-start text-sm">
                  <span className="text-red-500 mr-2.5 font-bold">✕</span>
                  <span className="text-slate-600 dark:text-slate-400 leading-relaxed">{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* This Book */}
          <div className="bg-gradient-to-br from-primary-500/10 to-indigo-500/10 border border-primary-500/30 p-8 rounded-3xl relative overflow-hidden ring-2 ring-primary-500/20">
            <div className="absolute top-0 right-0 bg-primary-500/20 text-primary-600 dark:text-primary-400 text-[10px] font-bold tracking-widest px-3 py-1 rounded-bl-xl uppercase">
              This Book
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 mb-6">Mental Models &amp; Design</h3>
            <ul className="space-y-4">
              {[
                "Teaches engineer-level thinking and structural patterns.",
                "Explains decision-making frameworks, architecture, and tradeoffs.",
                "Focuses on timeless software principles that survive library churn.",
                "Leverages AI as an accelerator while retaining deep design ownership."
              ].map((text, idx) => (
                <li key={idx} className="flex items-start text-sm">
                  <span className="text-emerald-500 mr-2.5 font-bold">✓</span>
                  <span className="text-slate-700 dark:text-slate-300 font-semibold leading-relaxed">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <hr className="border-slate-200 dark:border-slate-800 my-16" />

      {/* What You'll Get Section */}
      <div className="space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight sm:text-4xl">
            What You'll Get
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            A comprehensive, digital bundle designed to give you direct access to high-impact content.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {deliverables.map((item, idx) => (
            <div key={idx} className="bg-slate-50 dark:bg-slate-900/30 border border-slate-200/80 dark:border-slate-800/80 p-6 rounded-2xl text-center space-y-3">
              <span className="text-3xl inline-block mb-1">{item.icon}</span>
              <h4 className="text-base font-bold text-slate-950 dark:text-slate-100">{item.title}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <hr className="border-slate-200 dark:border-slate-800 my-16" />

      {/* About the Author Section */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-slate-50 dark:bg-slate-900/30 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-8 max-w-4xl mx-auto">
        <div className="md:col-span-4 flex flex-col items-center text-center space-y-4">
          <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-primary-500 shadow-md">
            <Image
              src="/static/images/avatar.png"
              alt="Pradip Jarhad"
              fill
              sizes="112px"
              className="object-cover"
            />
          </div>
          <div>
            <h4 className="text-base font-bold text-slate-950 dark:text-slate-100">Pradip Jarhad</h4>
            <span className="text-xs text-slate-500">Software Dev &amp; Writer</span>
          </div>
        </div>

        <div className="md:col-span-8 space-y-4">
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Meet the Author</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Hi, I'm <strong>Pradip Jarhad</strong>. I'm a frontend software developer passionate about building products, solving real-world engineering problems, and helping developers grow beyond tutorials.
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            After years of building products and adapting to a rapidly changing industry, I realized one truth:
            The developers who thrive aren't the ones who memorize the most API methods. They're the ones who learn <em>how to think</em>. That's why I wrote this book.
          </p>
        </div>
      </div>

      <hr className="border-slate-200 dark:border-slate-800 my-16" />

      {/* Purchase Section Card */}
      <div ref={purchaseSectionRef} className="max-w-xl mx-auto my-12 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 rounded-3xl p-8 shadow-2xl relative overflow-hidden ring-2 ring-primary-500/10">

        {/* Glow accent */}
        <div className="absolute top-0 right-0 -mr-24 -mt-24 h-48 w-48 bg-primary-500/10 dark:bg-primary-400/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="text-center space-y-4 relative">
          <span className="text-3xl">💻</span>
          <h3 className="text-2xl font-extrabold text-slate-950 dark:text-slate-100">
            Invest in Skills That Compound
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            AI will improve. Frameworks will change. But frontend developers who can think clearly, solve meaningful problems, make sound technical decisions, and deliver business value will always be in demand.
          </p>

          <hr className="border-slate-100 dark:border-slate-900 my-6" />

          {geoLoading ? (
            <div className="py-6 flex flex-col items-center justify-center space-y-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
              <span className="text-xs text-slate-500">Detecting local price...</span>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Price Details display */}
              <div className="flex flex-col items-center justify-center">
                <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">
                  {isIndia ? "Special Indian Pricing" : "Digital eBook Package"}
                </span>
                <div className="mt-2 flex items-baseline justify-center">
                  <span className="text-5xl font-black text-slate-900 dark:text-white">
                    {isIndia ? "₹299" : "$9.99"}
                  </span>
                  <span className="ml-2 text-base text-slate-400 line-through">
                    {isIndia ? "₹599" : "$19.99"}
                  </span>
                </div>
                <span className="mt-1.5 text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wide">
                  50% OFF TODAY
                </span>
              </div>

              {/* Security check banner */}
              <div className="bg-slate-50 dark:bg-slate-900/30 border border-slate-100 dark:border-slate-800/80 rounded-xl p-3 text-[11px] text-slate-600 dark:text-slate-400 flex items-center justify-center space-x-2">
                <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.9L10 1.154l7.834 3.746a1 1 0 01.616.92v5.184c0 4.14-2.316 7.842-6 9.5a1 1 0 01-.834 0c-3.684-1.658-6-5.36-6-9.5V5.82a1 1 0 01.616-.92zM10 13a1 1 0 100-2 1 1 0 000 2zm1-5a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" />
                </svg>
                <span>
                  {isIndia
                    ? "Secured checkout via Instamojo. Instantly downloads PDF."
                    : "Secured checkout via Gumroad. Instant digital download."}
                </span>
              </div>

              {/* Purchase CTA Buttons */}
              <div>
                <button
                  onClick={handlePurchaseClick}
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-500 hover:to-indigo-500 text-white font-extrabold text-lg shadow-lg hover:shadow-primary-500/25 transition duration-300 transform active:scale-98 flex items-center justify-center space-x-2"
                >
                  <span>Buy Now &amp; Download Instantly ({isIndia ? "₹299" : "$9.99"}) &rarr;</span>
                </button>
              </div>

              <div className="text-[11px] text-slate-500 dark:text-slate-400 space-y-1">
                <p>✓ Fast checkout process. Lifetime access to your purchase.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <hr className="border-slate-200 dark:border-slate-800 my-16" />

      {/* FAQ Section */}
      <div className="space-y-8 max-w-3xl mx-auto">
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight text-center">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isExpanded = expandedFaq === idx
            return (
              <div
                key={idx}
                className="border border-slate-200 dark:border-slate-800/80 rounded-2xl overflow-hidden bg-white dark:bg-slate-900/10 transition"
              >
                <button
                  onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                  className="w-full text-left p-5 font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900/30 flex items-center justify-between transition"
                >
                  <span className="pr-4">{faq.q}</span>
                  <span className="text-primary-500 flex-shrink-0 text-xl">
                    {isExpanded ? '−' : '+'}
                  </span>
                </button>
                {isExpanded && (
                  <div className="p-5 pt-0 text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-900 whitespace-pre-line">
                    {faq.a}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Sticky Purchase Bar */}
      <div 
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-3xl bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-2xl p-3 shadow-2xl flex items-center justify-between transition-all duration-500 ease-out ${
          showStickyBar ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-center space-x-3.5 pl-1.5">
          {/* Small Cover Image */}
          <div className="relative w-10 h-14 rounded-md overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800 flex-shrink-0">
            <Image
              src="/static/images/ebook/the-future-proof-frontend-dev/front-page-cover.png"
              alt="Ebook cover"
              fill
              sizes="40px"
              className="object-cover"
            />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white leading-tight line-clamp-1">
              The Future-Proof Frontend Developer
            </h4>
            <div className="flex items-center space-x-2 mt-0.5">
              <span className="text-sm font-black text-slate-800 dark:text-slate-200">
                {isIndia ? "₹299" : "$9.99"}
              </span>
              <span className="text-[10px] text-slate-400 line-through">
                {isIndia ? "₹599" : "$19.99"}
              </span>
              <span className="hidden sm:inline-block px-1.5 py-0.5 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 text-[9px] font-bold rounded">
                50% OFF
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={handlePurchaseClick}
          className="bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-extrabold px-5 py-3 rounded-xl shadow-md hover:shadow-primary-500/25 transition duration-300 transform active:scale-95"
        >
          Buy Now &rarr;
        </button>
      </div>

    </div>
  )
}
