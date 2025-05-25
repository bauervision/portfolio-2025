import { useState } from 'react';
import { TextField, Button, Alert, CircularProgress } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export default function ContactForm() {
  const [status, setStatus] = useState<
    'idle' | 'submitting' | 'success' | 'error'
  >('idle');
  const [error, setError] = useState<string | null>(null);

  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/yourFormId';

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('submitting');
    setError(null);

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.ok) {
        setStatus('success');
        if (
          event.currentTarget &&
          typeof event.currentTarget.reset === 'function'
        ) {
          event.currentTarget.reset();
        }
      } else {
        setError(data.error || 'An error occurred. Please try again.');
        setStatus('error');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      setStatus('error');
    }
  };

  return (
    <section className='w-full max-w-xl mx-auto p-6 rounded-2xl shadow-lg bg-white dark:bg-gray-900'>
      {status === 'success' ? (
        <div className='flex flex-col items-center justify-center py-16'>
          <CheckCircleOutlineIcon color='success' sx={{ fontSize: 72 }} />
          <h3 className='text-2xl mt-4 mb-2 font-semibold text-green-700 dark:text-green-300'>
            Thank you!
          </h3>
          <p className='text-center text-lg text-gray-700 dark:text-gray-300'>
            Your message has been sent. I’ll get back to you as soon as
            possible.
          </p>
        </div>
      ) : (
        <>
          <h2 className='text-3xl font-bold mb-4 text-center'>Contact Me</h2>
          <p className='mb-6 text-center text-gray-600 dark:text-gray-300'>
            Let’s build something together! Fill out the form and I’ll get back
            to you soon.
          </p>
          {status === 'error' && (
            <Alert severity='error' className='mb-4'>
              {error}
            </Alert>
          )}
          <form onSubmit={handleSubmit} className='space-y-6'>
            <TextField
              fullWidth
              label='Name'
              name='name'
              required
              variant='outlined'
              autoComplete='name'
            />
            <TextField
              fullWidth
              label='Email'
              name='email'
              required
              type='email'
              variant='outlined'
              autoComplete='email'
            />
            <TextField
              fullWidth
              label='Message'
              name='message'
              required
              multiline
              minRows={4}
              variant='outlined'
            />
            <div className='flex items-center justify-between'>
              <Button
                type='submit'
                variant='contained'
                color='primary'
                disabled={status === 'submitting'}
                className='rounded-xl px-6 py-2'
              >
                {status === 'submitting' ? (
                  <CircularProgress size={24} color='inherit' />
                ) : (
                  'Send'
                )}
              </Button>
            </div>
          </form>
        </>
      )}
    </section>
  );
}
