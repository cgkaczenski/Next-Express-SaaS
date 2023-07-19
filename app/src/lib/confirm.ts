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
  console.log(typeof openConfirmDialogExternal);
  openConfirmDialogExternal({ title, message, onAnswer });
}
