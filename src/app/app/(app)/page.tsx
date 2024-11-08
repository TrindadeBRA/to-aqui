import { DashboardPage, DashboardPageMain } from '@/components/dashboard/page';
import SimpleImage from '../_components/simple-image';

export default async function Page() {


  // Chamada de processamento de imagem

  return (
    <DashboardPage>
      <DashboardPageMain>
        <SimpleImage />
      </DashboardPageMain>
    </DashboardPage>
  );
}
