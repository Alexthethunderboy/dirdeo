import { getCmsData } from '@/lib/cms';
import WorkClient from './page-client';

export default async function WorkServer() {
  const cms = await getCmsData();
  return <WorkClient cms={cms} />;
}
