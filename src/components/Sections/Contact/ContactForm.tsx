import {FC, memo, useCallback, useMemo, useState} from 'react';

interface FormData {
  name: string;
  email: string;
  message: string;
}

type SubmissionState = {kind: 'error' | 'success'; message: string} | null;

const ContactForm: FC = memo(() => {
  const defaultData = useMemo(
    () => ({
      name: '',
      email: '',
      message: '',
    }),
    [],
  );

  const [data, setData] = useState<FormData>(defaultData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionState, setSubmissionState] = useState<SubmissionState>(null);

  const onChange = useCallback(
    <T extends HTMLInputElement | HTMLTextAreaElement>(event: React.ChangeEvent<T>): void => {
      const {name, value} = event.target;

      const fieldData: Partial<FormData> = {[name]: value};

      setData({...data, ...fieldData});
    },
    [data],
  );

  const handleSendMessage = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      setIsSubmitting(true);
      setSubmissionState(null);

      try {
        const response = await fetch('/api/contact', {
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        });

        const result = (await response.json()) as {error?: string; ok: boolean};

        if (!response.ok || !result.ok) {
          setSubmissionState({
            kind: 'error',
            message: result.error ?? 'Could not send your message. Please try again.',
          });
          return;
        }

        setSubmissionState({
          kind: 'success',
          message: 'Message sent successfully. I will get back to you soon.',
        });
        setData(defaultData);
      } catch {
        setSubmissionState({
          kind: 'error',
          message: 'Network error while sending message. Please try again.',
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [data, defaultData],
  );

  const inputClasses =
    'bg-neutral-700 border-0 focus:border-0 focus:outline-none focus:ring-1 focus:ring-violet-500 rounded-md placeholder:text-neutral-400 placeholder:text-sm text-neutral-200 text-sm';

  return (
    <form className="grid min-h-[320px] grid-cols-1 gap-y-4" method="POST" onSubmit={handleSendMessage}>
      <input
        className={inputClasses}
        name="name"
        onChange={onChange}
        placeholder="Name"
        required
        type="text"
        value={data.name}
      />
      <input
        autoComplete="email"
        className={inputClasses}
        name="email"
        onChange={onChange}
        placeholder="Email"
        required
        type="email"
        value={data.email}
      />
      <textarea
        className={inputClasses}
        maxLength={250}
        name="message"
        onChange={onChange}
        placeholder="Message"
        required
        rows={6}
        value={data.message}
      />
      {submissionState && (
        <p className={submissionState.kind === 'success' ? 'text-sm text-green-300' : 'text-sm text-red-300'}>
          {submissionState.message}
        </p>
      )}
      <button
        aria-label="Submit contact form"
        className="w-max rounded-full border-2 border-violet-500 bg-stone-900 px-4 py-2 text-sm font-medium text-white shadow-md outline-none hover:bg-stone-800 focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-stone-800 disabled:cursor-not-allowed disabled:opacity-60"
        disabled={isSubmitting}
        type="submit">
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
});

ContactForm.displayName = 'ContactForm';
export default ContactForm;
