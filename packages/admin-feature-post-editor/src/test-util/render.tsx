import type { ReactNode } from "react";

import { jaMessages } from "@repo/message";
import { Provider } from "@repo/ui";
import { NextIntlClientProvider } from "next-intl";
import { render } from "vitest-browser-react";

export const renderWithProvider = (ui: ReactNode) => {
  return render(
    <Provider>
      <NextIntlClientProvider locale="ja" messages={jaMessages}>
        {ui}
      </NextIntlClientProvider>
    </Provider>,
  );
};
