import { getCmsData } from '@/lib/cms';
import PageClient from './page-client';

export default async function HomeServer() {
  const cms = await getCmsData();
  return <PageClient cms={cms} />;
}
