import jsPDF from "jspdf";

interface Company {
  _id: string;
  userId: string;
  name: string;
  sector: string;
  otherSector?: string;
  type?: string;
  stage?: string;
  email: string;
  phone?: string;
  address?: string;
  website?: string;
  socialLinks?: { name: string; link: string }[];
  location?: string;
  foundedAt?: string;
  registrationNumber?: string;
  description?: string;
  missionStatement?: string;
  employeesRange?: string;
  fundingStatus?: string;
  amountRaised?: number;
  fundingNeeded?: number;
  fundingDocuments?: string;
  pitchDeck?: string;
  headOfficeAddress?: string;
  logo?: string;
  businessModel?: string;
  otherBusinessModel?: string;
  isYouthLed?: boolean;
  isWomanLed?: boolean;
  founderName?: string;
  founderGender?: string;
  founderDob?: string;
  founderEducation?: string;
  taxCompliance?: string[];
  sectorLicenses?: string;
  hasIntellectualProperty?: boolean;
  annualTurnoverBefore?: string;
  annualTurnoverCurrent?: string;
  annualTurnoverNext?: string;
  hasBusinessBankAccount?: boolean;
  externalFunding?: string[];
  otherExternalFunding?: string;
  keepsFinancialRecords?: string;
  usesDigitalTools?: boolean;
  digitalTools?: string[];
  otherDigitalTools?: string;
  isInnovative?: boolean;
  innovationExplanation?: string;
  businessChallenges?: string[];
  otherBusinessChallenges?: string;
  supportNeeded?: string;
  planningExpansion?: boolean;
  expansionPlans?: string;
  employsVulnerableGroups?: boolean;
  addressesEnvironmentalSustainability?: boolean;
  impactInitiatives?: string;
  joinEcosystemPrograms?: boolean;
  consentToDataUsage?: boolean;
  additionalComments?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface EmailForm {
  to: string;
  subject: string;
  message: string;
}

export const generateCompanyPDF = async (
  company: Company,
  rounds: any[] = []
) => {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  let yPosition = 20;

  // Helper function to add text with word wrapping
  const addWrappedText = (
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    fontSize = 10
  ) => {
    pdf.setFontSize(fontSize);
    const lines = pdf.splitTextToSize(text, maxWidth);
    pdf.text(lines, x, y);
    return y + lines.length * fontSize * 0.4;
  };

  // Helper function to format currency
  const formatCurrency = (amount: number | undefined) => {
    if (!amount) return "N/A";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Helper function to format date
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  // Helper function to calculate business age
  const getBusinessAge = (dateString: string | undefined) => {
    if (!dateString) return "N/A";
    const today = new Date();
    const foundedDate = new Date(dateString);
    let years = today.getFullYear() - foundedDate.getFullYear();
    const m = today.getMonth() - foundedDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < foundedDate.getDate())) {
      years--;
    }
    return `${years} ${years === 1 ? "year" : "years"}`;
  };

  // Header
  pdf.setFillColor(59, 130, 246); // Blue background
  pdf.rect(0, 0, pageWidth, 40, "F");

  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(24);
  pdf.setFont("helvetica", "bold");
  pdf.text("BUSINESS PROFILE", 20, 25);

  pdf.setFontSize(12);
  pdf.setFont("helvetica", "normal");
  pdf.text(
    `Generated on ${new Date().toLocaleDateString()}`,
    pageWidth - 80,
    32
  );

  yPosition = 60;

  // Company Name and Basic Info
  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(20);
  pdf.setFont("helvetica", "bold");
  pdf.text(company.name || "Company Name", 20, yPosition);
  yPosition += 15;

  if (company.missionStatement) {
    pdf.setFontSize(12);
    pdf.setFont("helvetica", "italic");
    yPosition = addWrappedText(
      `"${company.missionStatement}"`,
      20,
      yPosition,
      pageWidth - 40,
      12
    );
    yPosition += 10;
  }

  // Company Overview Section
  pdf.setFillColor(248, 250, 252);
  pdf.rect(15, yPosition - 5, pageWidth - 30, 80, "F");

  pdf.setFontSize(16);
  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(51, 65, 85);
  pdf.text("COMPANY OVERVIEW", 20, yPosition + 10);
  yPosition += 25;

  pdf.setFontSize(10);
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(0, 0, 0);

  // Two column layout for basic info
  const leftColumn = 20;
  const rightColumn = pageWidth / 2 + 10;
  let leftY = yPosition;
  let rightY = yPosition;

  // Left column
  pdf.setFont("helvetica", "bold");
  pdf.text("Industry:", leftColumn, leftY);
  pdf.setFont("helvetica", "normal");
  pdf.text(company.sector || "Not specified", leftColumn + 25, leftY);
  leftY += 12;

  pdf.setFont("helvetica", "bold");
  pdf.text("Founded:", leftColumn, leftY);
  pdf.setFont("helvetica", "normal");
  pdf.text(formatDate(company.foundedAt), leftColumn + 25, leftY);
  leftY += 12;

  pdf.setFont("helvetica", "bold");
  pdf.text("Business Age:", leftColumn, leftY);
  pdf.setFont("helvetica", "normal");
  pdf.text(getBusinessAge(company.foundedAt), leftColumn + 25, leftY);
  leftY += 12;

  pdf.setFont("helvetica", "bold");
  pdf.text("Location:", leftColumn, leftY);
  pdf.setFont("helvetica", "normal");
  pdf.text(company.location || "Not specified", leftColumn + 25, leftY);

  // Right column
  pdf.setFont("helvetica", "bold");
  pdf.text("Stage:", rightColumn, rightY);
  pdf.setFont("helvetica", "normal");
  pdf.text(company.stage || "Not specified", rightColumn + 25, rightY);
  rightY += 12;

  pdf.setFont("helvetica", "bold");
  pdf.text("Team Size:", rightColumn, rightY);
  pdf.setFont("helvetica", "normal");
  pdf.text(company.employeesRange || "Not specified", rightColumn + 25, rightY);
  rightY += 12;

  pdf.setFont("helvetica", "bold");
  pdf.text("Business Model:", rightColumn, rightY);
  pdf.setFont("helvetica", "normal");
  const businessModel =
    company.businessModel === "Other"
      ? company.otherBusinessModel || "Not specified"
      : company.businessModel || "Not specified";
  pdf.text(businessModel, rightColumn + 35, rightY);
  rightY += 12;

  pdf.setFont("helvetica", "bold");
  pdf.text("Registration #:", rightColumn, rightY);
  pdf.setFont("helvetica", "normal");
  pdf.text(
    company.registrationNumber || "Not specified",
    rightColumn + 35,
    rightY
  );

  yPosition = Math.max(leftY, rightY) + 20;

  // Company Description
  if (company.description) {
    pdf.setFontSize(16);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(51, 65, 85);
    pdf.text("COMPANY DESCRIPTION", 20, yPosition);
    yPosition += 15;

    pdf.setFontSize(10);
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(0, 0, 0);
    yPosition = addWrappedText(
      company.description,
      20,
      yPosition,
      pageWidth - 40,
      10
    );
    yPosition += 15;
  }

  // Check if we need a new page
  if (yPosition > pageHeight - 60) {
    pdf.addPage();
    yPosition = 20;
  }

  // Founder Information
  if (company.founderName) {
    pdf.setFillColor(248, 250, 252);
    pdf.rect(15, yPosition - 5, pageWidth - 30, 50, "F");

    pdf.setFontSize(16);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(51, 65, 85);
    pdf.text("FOUNDER INFORMATION", 20, yPosition + 10);
    yPosition += 25;

    pdf.setFontSize(10);
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(0, 0, 0);

    pdf.setFont("helvetica", "bold");
    pdf.text("Name:", leftColumn, yPosition);
    pdf.setFont("helvetica", "normal");
    pdf.text(company.founderName, leftColumn + 25, yPosition);

    if (company.founderEducation) {
      pdf.setFont("helvetica", "bold");
      pdf.text("Education:", rightColumn, yPosition);
      pdf.setFont("helvetica", "normal");
      pdf.text(company.founderEducation, rightColumn + 30, yPosition);
    }

    yPosition += 35;
  }

  // Financial Information
  pdf.setFontSize(16);
  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(51, 65, 85);
  pdf.text("FINANCIAL OVERVIEW", 20, yPosition);
  yPosition += 15;

  pdf.setFillColor(248, 250, 252);
  pdf.rect(15, yPosition - 5, pageWidth - 30, 60, "F");

  pdf.setFontSize(10);
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(0, 0, 0);

  leftY = yPosition + 10;
  rightY = yPosition + 10;

  // Left column - Financial
  pdf.setFont("helvetica", "bold");
  pdf.text("Funding Status:", leftColumn, leftY);
  pdf.setFont("helvetica", "normal");
  pdf.text(company.fundingStatus || "Not specified", leftColumn + 35, leftY);
  leftY += 12;

  pdf.setFont("helvetica", "bold");
  pdf.text("Amount Raised:", leftColumn, leftY);
  pdf.setFont("helvetica", "normal");
  pdf.text(formatCurrency(company.amountRaised), leftColumn + 35, leftY);
  leftY += 12;

  pdf.setFont("helvetica", "bold");
  pdf.text("Funding Needed:", leftColumn, leftY);
  pdf.setFont("helvetica", "normal");
  pdf.text(formatCurrency(company.fundingNeeded), leftColumn + 35, leftY);

  // Right column - Business Banking
  pdf.setFont("helvetica", "bold");
  pdf.text("Business Bank Account:", rightColumn, rightY);
  pdf.setFont("helvetica", "normal");
  pdf.text(
    company.hasBusinessBankAccount ? "Yes" : "No",
    rightColumn + 50,
    rightY
  );
  rightY += 12;

  pdf.setFont("helvetica", "bold");
  pdf.text("Financial Records:", rightColumn, rightY);
  pdf.setFont("helvetica", "normal");
  pdf.text(
    company.keepsFinancialRecords || "Not specified",
    rightColumn + 45,
    rightY
  );

  yPosition = Math.max(leftY, rightY) + 20;

  // Check if we need a new page
  if (yPosition > pageHeight - 80) {
    pdf.addPage();
    yPosition = 20;
  }

  // Business Characteristics
  pdf.setFontSize(16);
  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(51, 65, 85);
  pdf.text("BUSINESS CHARACTERISTICS", 20, yPosition);
  yPosition += 15;

  const characteristics = [];
  if (company.isYouthLed) characteristics.push("Youth-led Business");
  if (company.isWomanLed) characteristics.push("Woman-led Business");
  if (company.isInnovative) characteristics.push("Innovative Business");
  if (company.hasIntellectualProperty)
    characteristics.push("Has Intellectual Property");
  if (company.planningExpansion) characteristics.push("Planning Expansion");
  if (company.employsVulnerableGroups)
    characteristics.push("Employs Vulnerable Groups");
  if (company.addressesEnvironmentalSustainability)
    characteristics.push("Addresses Environmental Sustainability");

  if (characteristics.length > 0) {
    pdf.setFontSize(10);
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(0, 0, 0);

    characteristics.forEach((characteristic, index) => {
      pdf.text(`• ${characteristic}`, 25, yPosition);
      yPosition += 10;
    });
  } else {
    pdf.setFontSize(10);
    pdf.setFont("helvetica", "italic");
    pdf.text("No specific business characteristics highlighted", 20, yPosition);
    yPosition += 10;
  }

  yPosition += 10;

  // Innovation & Impact
  if (company.isInnovative && company.innovationExplanation) {
    pdf.setFontSize(16);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(51, 65, 85);
    pdf.text("INNOVATION", 20, yPosition);
    yPosition += 15;

    pdf.setFontSize(10);
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(0, 0, 0);
    yPosition = addWrappedText(
      company.innovationExplanation,
      20,
      yPosition,
      pageWidth - 40,
      10
    );
    yPosition += 15;
  }

  // Contact Information
  if (yPosition > pageHeight - 80) {
    pdf.addPage();
    yPosition = 20;
  }

  pdf.setFontSize(16);
  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(51, 65, 85);
  pdf.text("CONTACT INFORMATION", 20, yPosition);
  yPosition += 15;

  pdf.setFillColor(248, 250, 252);
  pdf.rect(15, yPosition - 5, pageWidth - 30, 50, "F");

  pdf.setFontSize(10);
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(0, 0, 0);

  leftY = yPosition + 10;
  rightY = yPosition + 10;

  // Contact details
  if (company.email) {
    pdf.setFont("helvetica", "bold");
    pdf.text("Email:", leftColumn, leftY);
    pdf.setFont("helvetica", "normal");
    pdf.text(company.email, leftColumn + 20, leftY);
    leftY += 12;
  }

  if (company.phone) {
    pdf.setFont("helvetica", "bold");
    pdf.text("Phone:", leftColumn, leftY);
    pdf.setFont("helvetica", "normal");
    pdf.text(company.phone, leftColumn + 20, leftY);
    leftY += 12;
  }

  if (company.website) {
    pdf.setFont("helvetica", "bold");
    pdf.text("Website:", rightColumn, rightY);
    pdf.setFont("helvetica", "normal");
    pdf.text(company.website, rightColumn + 25, rightY);
    rightY += 12;
  }

  if (company.address) {
    pdf.setFont("helvetica", "bold");
    pdf.text("Address:", rightColumn, rightY);
    pdf.setFont("helvetica", "normal");
    const addressLines = pdf.splitTextToSize(company.address, 80);
    pdf.text(addressLines, rightColumn + 25, rightY);
  }

  yPosition = Math.max(leftY, rightY) + 20;

  // Funding Rounds (if any)
  if (rounds && rounds.length > 0) {
    if (yPosition > pageHeight - 100) {
      pdf.addPage();
      yPosition = 20;
    }

    pdf.setFontSize(16);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(51, 65, 85);
    pdf.text("FUNDING ROUNDS", 20, yPosition);
    yPosition += 20;

    // Table headers
    pdf.setFillColor(59, 130, 246);
    pdf.rect(20, yPosition - 5, pageWidth - 40, 15, "F");

    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(10);
    pdf.setFont("helvetica", "bold");
    pdf.text("Round Type", 25, yPosition + 5);
    pdf.text("Amount", 80, yPosition + 5);
    pdf.text("Date", 130, yPosition + 5);
    pdf.text("Status", 160, yPosition + 5);

    yPosition += 20;

    // Table rows
    pdf.setTextColor(0, 0, 0);
    pdf.setFont("helvetica", "normal");

    rounds.slice(0, 5).forEach((round: any, index) => {
      if (index % 2 === 0) {
        pdf.setFillColor(248, 250, 252);
        pdf.rect(20, yPosition - 8, pageWidth - 40, 12, "F");
      }

      pdf.text(round.roundType || "N/A", 25, yPosition);
      pdf.text(formatCurrency(round.amount), 80, yPosition);
      pdf.text(formatDate(round.date), 130, yPosition);
      pdf.text(round.status || "N/A", 160, yPosition);

      yPosition += 12;
    });
  }

  // Footer
  const footerY = pageHeight - 20;
  pdf.setFillColor(59, 130, 246);
  pdf.rect(0, footerY - 10, pageWidth, 30, "F");

  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(8);
  pdf.setFont("helvetica", "normal");
  pdf.text(
    "This business profile was generated automatically. For the most up-to-date information, please contact the company directly.",
    20,
    footerY
  );
  pdf.text(`Generated on ${new Date().toLocaleString()}`, 20, footerY + 8);

  // Save the PDF
  const fileName = `${
    company.name?.replace(/[^a-z0-9]/gi, "_").toLowerCase() || "company"
  }_business_profile.pdf`;
  pdf.save(fileName);

  return pdf;
};

export const emailCompanyPDF = async (
  company: Company,
  rounds: any[] = [],
  emailForm: EmailForm
) => {
  // Generate the PDF
  const pdf = await generateCompanyPDF(company, rounds);

  // Convert PDF to blob
  const pdfBlob = pdf.output("blob");

  // Create form data for email
  const formData = new FormData();
  formData.append("to", emailForm.to);
  formData.append("subject", emailForm.subject);
  formData.append("message", emailForm.message);
  formData.append(
    "pdf",
    pdfBlob,
    `${
      company.name?.replace(/[^a-z0-9]/gi, "_").toLowerCase() || "company"
    }_business_profile.pdf`
  );

  // In a real application, you would send this to your email API endpoint
  // For demo purposes, we'll simulate the email sending
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate successful email sending
      console.log("Email would be sent with:", {
        to: emailForm.to,
        subject: emailForm.subject,
        message: emailForm.message,
        attachment: `${company.name}_business_profile.pdf`,
      });
      resolve(true);
    }, 2000);
  });
};
