import { getCompanyByIdAction } from "@/app/actions/company-actions";
import CompanyDetailsPage from "@/components/company-details";

export default async function CompanyDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const company = await getCompanyByIdAction(id);

  return (
    <div className="">
      <CompanyDetailsPage company={company} />
    </div>
  );
}
