import { getCmsData } from '@/lib/cms';
import ProjectClient from './page-client';

export default async function ProjectServer() {
  const cms = await getCmsData();
  return <ProjectClient cms={cms} />;
}
