import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

import { Loader2, Send } from "lucide-react";

interface SubmitButtonProps {
  isSubmitting: boolean;
}

export const SubmitButton = ({ isSubmitting }: SubmitButtonProps) => {
  const t = useTranslations("ContactForm");

  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className={cn(
        "flex w-full cursor-pointer items-center justify-center gap-x-2 rounded border p-2 font-extrabold transition-all duration-300",
        "border-black/20 bg-darkest text-off-w hover:border-acc-yellow-3 hover:bg-acc-yellow-2 hover:text-darkest",
        "dark:border-off-w/50 dark:bg-off-w dark:text-black",
        isSubmitting && "pointer-events-none opacity-50",
      )}
    >
      {isSubmitting ? (
        <Loader2 className="size-6 animate-spin" />
      ) : (
        <>
          <p>{t("submit")}</p>
          <Send className="size-5 stroke-3" />
        </>
      )}
    </button>
  );
};
