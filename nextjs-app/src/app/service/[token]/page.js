import ServicePage from './servicePage.js';
import {fetchTokens, getServiceDataByToken} from '@/lib/authHelpers.js';

// Required for static generation
export async function generateStaticParams() {
  const tokens = await fetchTokens();

  // Return an array of params for each dynamic route
  return tokens.map((item) => ({
    token: item.token,
  }));
}

// Required for static generation
export default async function Page({ params }) {
  const { token } = params;

  const serviceData = await getServiceDataByToken(token);

  return <ServicePage serviceData={serviceData}/>;
}
