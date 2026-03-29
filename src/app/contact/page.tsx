import { getCmsData } from '@/lib/cms';
import ContactClient from './page-client';

export default async function ContactServer() {
  const cms = await getCmsData();
  return <ContactClient cms={cms} />;
}
