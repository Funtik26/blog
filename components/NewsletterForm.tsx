'use client'

import { FormEvent, useRef, useState, useTransition } from 'react'

interface NewsletterFormProps {
  title?: string
  apiUrl?: string
}

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error'

const DEFAULT_TITLE = 'Subscribe to the newsletter'
const DEFAULT_API_URL = '/api/newsletter'

const NewsletterForm = ({
  title = DEFAULT_TITLE,
  apiUrl = DEFAULT_API_URL,
}: NewsletterFormProps) => {
  const inputEl = useRef<HTMLInputElement | null>(null)
  const [status, setStatus] = useState<SubmitStatus>('idle')
  const [message, setMessage] = useState('')
  const [isPending, startTransition] = useTransition()

  const subscribe = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!inputEl.current) {
      return
    }

    const email = inputEl.current.value.trim()
    if (!email) {
      setStatus('error')
      setMessage('Please enter a valid email address.')
      return
    }

    setStatus('loading')
    setMessage('')

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const { error } = await response.json()

      if (error) {
        setStatus('error')
        setMessage('Your e-mail address is invalid or you are already subscribed!')
        return
      }

      startTransition(() => {
        if (inputEl.current) {
          inputEl.current.value = ''
        }
        setStatus('success')
        setMessage('Thanks for subscribing! Please check your inbox.')
      })
    } catch (error) {
      setStatus('error')
      setMessage('Something went wrong. Please try again later.')
    }
  }

  return (
    <div>
      <div className="pb-1 text-lg font-semibold text-gray-800 dark:text-gray-100">{title}</div>
      <form className="flex flex-col sm:flex-row" onSubmit={subscribe} noValidate>
        <div>
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            ref={inputEl}
            id="newsletter-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="Enter your email"
            className="focus:ring-primary-600 w-72 rounded-md px-4 focus:border-transparent focus:ring-2 focus:outline-none dark:bg-black"
            aria-describedby="newsletter-feedback"
            suppressHydrationWarning
          />
        </div>
        <div className="mt-2 flex w-full rounded-md shadow-sm sm:mt-0 sm:ml-3">
          <button
            type="submit"
            className="bg-primary-500 focus:ring-primary-600 hover:bg-primary-600 dark:hover:bg-primary-400 w-full rounded-md px-4 py-2 font-medium text-white focus:ring-2 focus:ring-offset-2 focus:outline-none sm:py-0 dark:ring-offset-black"
            aria-live="polite"
            disabled={status === 'loading' || isPending}
            suppressHydrationWarning
          >
            {status === 'success' ? 'Thank you!' : status === 'loading' ? 'Signing up…' : 'Sign up'}
          </button>
        </div>
      </form>
      {message && (
        <div
          id="newsletter-feedback"
          className={`w-72 pt-2 text-sm sm:w-96 ${status === 'error' ? 'text-red-500 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}
        >
          {message}
        </div>
      )}
    </div>
  )
}

export default NewsletterForm
