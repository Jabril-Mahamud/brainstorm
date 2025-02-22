import { redirect } from "next/navigation";
import { RedirectOptions } from "./types";

export function encodedRedirect(options: RedirectOptions): never {
  const { type, path, message } = options;
  return redirect(`${path}?${type}=${encodeURIComponent(message)}`);
}
