import { getCmsData } from '@/lib/cms';
import AboutClient from './page-client';

export default async function AboutServer() {
  const cms = await getCmsData();
  return <AboutClient cms={cms} />;
}
