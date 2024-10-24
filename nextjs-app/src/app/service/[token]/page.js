import ServicePage from "./servicePage.js";
import { fetchTokens, getServiceDataByToken } from "@/lib/authHelpers.js";

export const dynamic = "force-dynamic";

export default async function Page({ params }) {
  const { token } = params;

  const serviceData = await getServiceDataByToken(token);

  return <ServicePage serviceData={serviceData} />;
}
