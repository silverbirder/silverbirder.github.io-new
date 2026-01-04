import { jaMessages } from "@repo/message";

type Props = {
  onSignIn?: (formData: FormData) => Promise<void> | void;
  onSignOut?: (formData: FormData) => Promise<void> | void;
  status?: Status;
};

type Status = "default" | "forbidden" | "missingAllowList";

const messages = jaMessages.admin.signIn;

export const SignIn = ({ onSignIn, onSignOut, status = "default" }: Props) => {
  const errorMessage =
    status === "forbidden"
      ? messages.errorForbidden
      : status === "missingAllowList"
        ? messages.errorMissingAllowList
        : null;

  return (
    <main>
      <section>
        <header>
          <h1>{messages.title}</h1>
          <p>{messages.description}</p>
        </header>
        {errorMessage && <p role="alert">{errorMessage}</p>}
        <form action={onSignIn}>
          <button type="submit">{messages.action}</button>
        </form>
        <p>{messages.support}</p>
        {onSignOut && (
          <form action={onSignOut}>
            <button type="submit">{messages.signOut}</button>
          </form>
        )}
      </section>
    </main>
  );
};
