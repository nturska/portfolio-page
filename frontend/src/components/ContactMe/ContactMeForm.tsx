import type { FC, FormEvent } from 'react';

export const ContactMeForm: FC = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const message = String(formData.get('message') ?? '');
    const type = String(formData.get('type') ?? '');
    const contact = String(formData.get('contact') ?? '');

    // replace with real submission logic
    alert(`Type: ${type}\nContact: ${contact}\n\n${message}`);

    // close the dialog if form is inside one
    const dialog = e.currentTarget.closest('dialog') as HTMLDialogElement | null;
    dialog?.close();
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <label className='block'>
        <span className='label m-2'>Type</span>
        <select name='type' defaultValue='job' className='select select-bordered w-full'>
          <ul className='menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm'>
            <li>
              <option value='job'>Job Offer</option>
            </li>
            <li>
              <option value='project'>Project</option>
            </li>
            <li>
              <option value='event'>Event</option>
            </li>
          </ul>
        </select>
      </label>

      <label className='block'>
        <span className='label m-2'>Contact Email</span>
        <input
          name='contact'
          type='email'
          required
          className='input input-bordered w-full'
          placeholder='you@example.com'
        />
      </label>

      <label className='block'>
        <span className='label m-2'>Message</span>
        <textarea
          name='message'
          required
          rows={5}
          className='textarea textarea-bordered w-full'
          placeholder='Write your message...'
        />
      </label>

      <div className='modal-action'>
        <button type='submit' className='btn btn-primary'>
          Send
        </button>
      </div>
    </form>
  );
};
