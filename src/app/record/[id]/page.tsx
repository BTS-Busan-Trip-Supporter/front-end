import { RecordReview } from '@/app/pages';

export default function RecordReviewPage({
  params: { id },
}: {
  params: { id: number };
}) {
  return <RecordReview id={id} />;
}
