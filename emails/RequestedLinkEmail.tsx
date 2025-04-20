import { OrderWithProduct } from "@/server/client/getUserOrser";
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
  
  interface RequestedDownloadEmailProps {
    order: OrderWithProduct;
  }
  
  export default function RequestedDownloadEmail({
    order,
  }: RequestedDownloadEmailProps) {
    const downloadUrl = order.product.filePath;
    const year = new Date().getFullYear();
  
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
            <Container className="bg-white rounded-xl max-w-xl mx-auto shadow-lg overflow-hidden">
              {/* Header */}
              <Section className="bg-blue-700 p-6 flex justify-center">
                <Img
                  src="https://towdejwn9d.ufs.sh/f/Az3lKpDvuMjPtWmsNEJXFcxm9HrfdD0ZOvp3e5JshQkMVylN"
                  width="220"
                  alt="Study Buddy Logo"
                />
              </Section>
  
              {/* Main Content */}
              <Section className="p-6 text-center">
                <Heading className="text-[26px] font-bold text-gray-900">
                  Your e-book is ready ✨
                </Heading>
                <Text className="text-[16px] text-gray-800 mt-2">
                  As requested, here’s your personal download link for the book : {order.product.name} you previously purchased.
                </Text>
  
                <div className="mt-6">
                  <Button
                    href={downloadUrl}
                    className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-full text-sm font-semibold"
                  >
                    📘 Download Your E-book
                  </Button>
                </div>
              </Section>
  
              {/* Explore More */}
              <Section className="mt-8 p-6 bg-gray-50 border-t border-gray-200 text-center">
                <Text className="text-[14px] text-gray-600">
                  Enjoy your reading! Looking for more? Explore new releases on our platform anytime.
                </Text>
                <a
                  href={process.env.NEXT_PUBLIC_BASE_URL}
                  className="text-blue-600 text-sm font-medium underline mt-2 inline-block"
                >
                  📚 Browse More E-books
                </a>
              </Section>
  
              {/* Footer */}
              <Section className="p-4 text-center border-t border-gray-200">
                <Text className="text-[12px] text-gray-400">
                  &copy; {year} Study Buddy, Inc. All rights reserved.
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