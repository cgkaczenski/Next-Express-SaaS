import { openConfirmDialogExternal } from "@/components/confirmer";

export default function confirm({
  title,
  message,
  onAnswer,
}: {
  title: string;
  message: string;
  onAnswer: (answer: boolean) => void;
}) {
  openConfirmDialogExternal({ title, message, onAnswer });
}
