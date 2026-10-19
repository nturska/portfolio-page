type FieldErrorProps = {
  id: string;
  message?: string;
};

export const FieldError = ({ id, message }: FieldErrorProps) => {
  if (!message) return null;

  return (
    <p id={id} className="mt-1 text-xs text-error">
      {message}
    </p>
  );
};
