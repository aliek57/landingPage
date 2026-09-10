# Nutritionist Landing Page

This is a distinct landing page developed for a nutritionist professional. The goal of this project is to deliver a higly professional, modern, production-ready web application that focus on authority, humanized care, user experience and smooth conversion flows.

### Key Features:

* **Internationalization (i18n):** Full multi-language support using `react-i18next` with automatic browser language detection.
* **Immersive Sections:** Comprises a high-impact Hero, an immersive Storytelling "About Me" section with automatic image transitions, interactive editorial accordions for services, and a reel-based social proof component.
* **Advanced Animations:** Smooth scroll reveals, layout choreography, and micro-interactions powered by Framer Motion.
* **Robust Form Validation & Formspree Integration:** A fully validated contact form featuring real-time phone masking utilities, strict Regex email checks, field-blur error states, and real-time backend delivery via *Formspree*.
* **Modern UI & Bento-Box Layout:** Fully responsive grid layout mimicking native OS widgets, built with Tailwind CSS v4.
* **Async State Management** Clean asynchronous mutations handled through *TanStack React Query* for predictable handling of form states, loading, and error boundaries.

## Tech Stack

* React + TypeScript + Vite
* Tailwind CSS v4
* TanStack React Query (Asynchronous mutations & data flows)
* Framer Motion (Animations)
* Lucide React (Consistent iconography)
* React-i18next (Internationalization)

## How to Run 

The following instructions will help you set up a copy of the project on your local machine for development and testing purposes.

Before starting, ensure you have Node.js installed on your machine. Use the IDE of your preference to open the project.

When you are ready, open your terminal and clone the repository:

```
git clone https://github.com/aliek57/landingPage.git
```

## Initial Configuration

This application does not require any API Keys or *.env* files to run. It connects to Formspree to handle lead submissions from the contact section seamlessly.

Follow these steps to set up your development environment:

1. Navigate to the project folder:

```
cd YOUR_FOLDER_NAME
```

2. Install all necessary dependencies:

```
npm install
```

3. After installation, start the development server:

```
npm run dev
```

You are all set! The Landing Page is now running locally.

---

**Live Demo:** You can also view and interact with the live application here [Landing Page Live Demo](https://nutri-renata-lemos.vercel.app/)
