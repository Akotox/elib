import {
    Tailwind,
    Html,
    Head,
    Body,
    Font,
    Container,
    Section,
    Img,
    Heading,
    Text,
    Button,
  } from "@react-email/components";
  
  interface PurchaseConfirmationEmailProps {
    firstName: string;
    downloadUrl: string;
    receiptUrl: string;
  }
  
  export default function PurchaseConfirmationEmail({
    firstName,
    downloadUrl,
    receiptUrl,
  }: PurchaseConfirmationEmailProps) {
    return (
      <Html lang="en">
        <Head>
          <Font
            fontFamily="Roboto"
            fallbackFontFamily="Verdana"
            webFont={{
              url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
              format: "woff2",
            }}
            fontWeight={400}
            fontStyle="normal"
          />
        </Head>
        <Body className="bg-gray-100">
          <Tailwind>
            <Container className="bg-white rounded-xl max-w-xl mx-auto shadow-md">
              {/* Logo Header */}
              <Section className="bg-blue-700 p-6 flex justify-center">
                <Img
                  src="https://towdejwn9d.ufs.sh/f/Az3lKpDvuMjPtWmsNEJXFcxm9HrfdD0ZOvp3e5JshQkMVylN"
                  width="250"
                  alt="Study Buddy Logo"
                />
              </Section>
  
              {/* Main Content */}
              <Section className="p-6 text-center">
                <Heading className="text-[28px] font-bold text-gray-900 mt-2">
                  Hello {firstName},
                </Heading>
                <Text className="text-[16px] text-gray-800 mt-4">
                  Thank you for your purchase with E-lib. Your transaction was successful!
                </Text>
  
                <Text className="text-[16px] text-gray-800 mt-4">
                  You can download your purchased e-book and save it locally using the buttons below.
                </Text>
  
                <div className="mt-6 flex flex-col gap-4">
                  <Button
                    href={downloadUrl}
                    className="bg-blue-600 text-white px-5 py-3 rounded-lg text-sm font-medium"
                  >
                    📦 Download E-book
                  </Button>
                  {/* <Button
                    href={receiptUrl}
                    className="bg-gray-200 text-blue-600 px-5 py-3 rounded-lg text-sm font-medium"
                  >
                    🧾 View Your Receipt
                  </Button> */}
                </div>
              </Section>
  
              {/* Security Note */}
              <Section className="p-6 border-t border-gray-200">
                <Text className="text-[14px] text-gray-500">
                  Study Buddy will never email you asking to disclose or verify your password, credit card, or bank account number.
                </Text>
              </Section>
  
              {/* Footer */}
              <Section className="p-4 text-center">
                <Text className="text-[12px] text-gray-400">
                  &copy; {new Date().getFullYear()} Study Buddy, Inc. All rights reserved.
                </Text>
                <Text className="text-[12px] text-gray-400">
                  <a
                    href="https://studybuddy.ing/en/TermsandConditions"
                    className="text-blue-500 underline"
                  >
                    Terms
                  </a>{" "}
                  |{" "}
                  <a
                    href="https://studybuddy.ing/en/privacyPolicy"
                    className="text-blue-500 underline"
                  >
                    Privacy
                  </a>
                </Text>
              </Section>
            </Container>
          </Tailwind>
        </Body>
      </Html>
    );
  }