import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function PrivacyPolicy() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        maxWidth: 900,
        mx: "auto",
        my: { xs: 4, md: 8 },
        px: { xs: 2, md: 4 },
      }}
    >
      {/* Heading */}
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          fontWeight: 700,
          mb: 2,
          fontSize: { xs: "1.8rem", md: "2rem" },
        }}
      >
        Privacy Policy
      </Typography>

      {/* Last Updated */}
      <Typography
        sx={{
          fontSize: "0.9rem",
          color: "#6b7280",
          textAlign: "center",
          mb: { xs: 4, md: 6 },
        }}
      >
        Last Updated: 12/01/2025
      </Typography>

      {/* Introduction Section */}
      <Typography sx={{ mb: 3, lineHeight: 1.8, color: "#4b5563" }}>
        3S Smart Solutions Star, Inc. (“3S Smart Solutions,” “we,” “us,” or “our”) operates the website www.3sproshop.com (the “Site”) and provides ecommerce products and related services (the “Services”).
      </Typography>
      <Typography sx={{ mb: 3, lineHeight: 1.8, color: "#4b5563" }}>
        This Privacy Policy explains how we collect, use, disclose, and protect your Personal Information when you visit or use our Site and Services.
      </Typography>
      <Typography sx={{ mb: 6, lineHeight: 1.8, color: "#4b5563" }}>
        By accessing or using our Site, you agree to the practices described in this Privacy Policy. If you do not agree, please discontinue use of our Site and Services.
      </Typography>

      <Divider sx={{ my: 6 }} />

      {/* Section 1: Information We Collect */}
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
        1. Information We Collect
      </Typography>
      <Typography sx={{ mb: 4, lineHeight: 1.8, color: "#4b5563" }}>
        We collect the following types of information to operate and improve our Services:
      </Typography>

      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
        A. Personal Information You Provide
      </Typography>
      <Typography sx={{ mb: 3, lineHeight: 1.8, color: "#4b5563" }}>
        When you use our Site or make a purchase, we may collect:
        <br />● Name
        <br />● Email address
        <br />● Phone number
        <br />● Billing and shipping address
        <br />● Payment-related information (processed securely by our payment partners; we do not store full card details)
        <br />● Account login details (if you create an account)
      </Typography>

      <Typography variant="h6" sx={{ fontWeight: 600, mt: 4, mb: 1 }}>
        B. Automatically Collected Information (Log Data)
      </Typography>
      <Typography sx={{ mb: 3, lineHeight: 1.8, color: "#4b5563" }}>
        When you visit our Site, your browser automatically sends information such as:
        <br />● IP address
        <br />● Browser type and version
        <br />● Device type
        <br />● Pages visited
        <br />● Time and date of visit
        <br />● Time spent on pages
        <br />● Referring website
        <br />● General location data
        <br />● Other standard analytics data
      </Typography>

      <Typography variant="h6" sx={{ fontWeight: 600, mt: 4, mb: 1 }}>
        C. Cookies & Tracking Technologies
      </Typography>
      <Typography sx={{ mb: 3, lineHeight: 1.8, color: "#4b5563" }}>
        We use cookies and similar technologies to:
        <br />● Improve site functionality
        <br />● Remember your preferences
        <br />● Analyze website traffic
        <br />● Support secure shopping
        <br />● Enhance user experience
      </Typography>
      <Typography sx={{ mb: 6, lineHeight: 1.8, color: "#4b5563" }}>
        You can choose to accept or decline cookies in your browser settings. If you disable cookies, certain features of our Site may not function properly.
      </Typography>

      <Divider sx={{ my: 6 }} />

      {/* Section 2: How We Use Your Information */}
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
        2. How We Use Your Information
      </Typography>
      <Typography sx={{ mb: 4, lineHeight: 1.8, color: "#4b5563" }}>
        We use your information to:
        <br />● Provide, operate, and improve our Services
        <br />● Process and fulfill orders
        <br />● Deliver products and provide customer support
        <br />● Communicate order updates, promotions, and service notices
        <br />● Personalize your shopping experience
        <br />● Detect and prevent fraud or unauthorized activity
        <br />● Comply with legal obligations
        <br />● Analyze website usage to improve performance
      </Typography>
      <Typography sx={{ mb: 6, lineHeight: 1.8, color: "#4b5563", fontWeight: 'bold' }}>
        We do not sell your personal information.
      </Typography>

      <Divider sx={{ my: 6 }} />

      {/* Section 3: Sharing Your Information */}
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
        3. Sharing Your Information
      </Typography>
      <Typography sx={{ mb: 4, lineHeight: 1.8, color: "#4b5563" }}>
        We may share information with trusted third parties only for business purposes, including:
      </Typography>

      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
        A. Service Providers
      </Typography>
      <Typography sx={{ lineHeight: 1.8, color: "#4b5563", mb: 2 }}>
        Examples include:
        <br />● Payment processors
        <br />● Shipping carriers
        <br />● Website hosting providers
        <br />● Analytics partners
        <br />● Marketing tools or email service providers
      </Typography>
      <Typography sx={{ mb: 4, lineHeight: 1.8, color: "#4b5563" }}>
        These companies are permitted to use your Personal Information only to perform tasks on our behalf.
      </Typography>

      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
        B. Legal Requirements
      </Typography>
      <Typography sx={{ lineHeight: 1.8, color: "#4b5563", mb: 2 }}>
        We may disclose information if required by:
        <br />● Law
        <br />● Court order
        <br />● Government request
        <br />● To protect our rights, property, or safety
      </Typography>

      <Typography variant="h6" sx={{ fontWeight: 600, mt: 2, mb: 1 }}>
        C. Business Transfers
      </Typography>
      <Typography sx={{ mb: 6, lineHeight: 1.8, color: "#4b5563" }}>
        If we merge, sell, or transfer assets, your information may be part of the transferred assets.
      </Typography>

      <Divider sx={{ my: 6 }} />

      {/* Section 4: Data Security */}
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
        4. Data Security
      </Typography>
      <Typography sx={{ mb: 6, lineHeight: 1.8, color: "#4b5563" }}>
        We use commercially reasonable safeguards to protect your personal information. However, no method of online storage or transmission is 100% secure. We cannot guarantee absolute security, but we take protection seriously.
      </Typography>

      <Divider sx={{ my: 6 }} />

      {/* Section 5: Financial Policy */}
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
        5. Financial Policy (Credit & Trade References)
      </Typography>
      <Typography sx={{ mb: 6, lineHeight: 1.8, color: "#4b5563", fontWeight: 'bold' }}>
        3S Smart Solutions Star, Inc. does NOT provide credit references or trade references to any outside company. We do not extend credit accounts or release information regarding financial relationships.
      </Typography>

      <Divider sx={{ my: 6 }} />

      {/* Section 6: Third-Party Links */}
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
        6. Links to Third-Party Websites
      </Typography>
      <Typography sx={{ mb: 6, lineHeight: 1.8, color: "#4b5563" }}>
        Our Site may include links to external websites. We are not responsible for the:
        <br />● Content
        <br />● Privacy practices
        <br />● Security
        <br />● Policies
        <br />
        of any third-party website.
        <br />
        <br />
        We strongly recommend reviewing the Privacy Policy of any site you visit.
      </Typography>

      <Divider sx={{ my: 6 }} />

      {/* Section 7: Children's Privacy */}
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
        7. Children's Privacy
      </Typography>
      <Typography sx={{ mb: 6, lineHeight: 1.8, color: "#4b5563" }}>
        Our Services are not intended for children under 13. We do not knowingly collect Personal Information from children under 13.
        <br />
        <br />
        If we learn that a child under 13 has submitted information, we will immediately delete it. Parents or guardians may contact us to request removal.
      </Typography>

      <Divider sx={{ my: 6 }} />

      {/* Section 8: Your Privacy Rights */}
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
        8. Your Privacy Rights
      </Typography>
      <Typography sx={{ mb: 3, lineHeight: 1.8, color: "#4b5563", fontStyle: 'italic' }}>
        (For GDPR, CCPA, and other applicable privacy laws)
      </Typography>
      <Typography sx={{ mb: 6, lineHeight: 1.8, color: "#4b5563" }}>
        Depending on your location, you may have the right to:
        <br />● Access personal information we hold
        <br />● Request correction or deletion
        <br />● Opt out of marketing emails
        <br />● Request a copy of your data
        <br />● Limit or restrict certain processing activities
        <br />
        <br />
        To exercise these rights, contact us using the details below.
      </Typography>

      <Divider sx={{ my: 6 }} />

      {/* Section 9: Changes to This Privacy Policy */}
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
        9. Changes to This Privacy Policy
      </Typography>
      <Typography sx={{ mb: 6, lineHeight: 1.8, color: "#4b5563" }}>
        We may update this Privacy Policy from time to time. Any changes will be posted on this page with a revised “Last Updated” date. Your continued use of the Site after changes indicates acceptance of the updated policy.
      </Typography>

      <Divider sx={{ my: 6 }} />

      {/* Section 10: Contact Us */}
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
        10. Contact Us
      </Typography>
      <Typography sx={{ mb: 4, lineHeight: 1.8, color: "#4b5563" }}>
        If you have questions, concerns, or requests about this Privacy Policy, please contact us:
      </Typography>
      <Typography sx={{ lineHeight: 1.8, color: "#4b5563", mb: 1 }}>
        <span style={{ marginRight: '8px' }}>👉</span>Contact Page:
        <span
          onClick={() => navigate("/contact-us")}
          style={{
            color: "#2563eb",
            cursor: "pointer",
            textDecoration: "underline",
            fontWeight: 600,
            marginLeft: '8px',
          }}
        >
          [Insert Contact Page URL Here]
        </span>
      </Typography>
      <Typography sx={{ lineHeight: 1.8, color: "#4b5563", mb: 1 }}>
        <span style={{ marginRight: '8px' }}>👉</span>Email: <span style={{ fontWeight: 600 }}>[Insert Email sales@3sproshop.com]</span>
      </Typography>
      <Typography sx={{ lineHeight: 1.8, color: "#4b5563", mb: 5 }}>
        <span style={{ marginRight: '8px' }}>👉</span>Address: <span style={{ fontWeight: 600 }}>3S Smart Solutions Star, Inc. [6 Hazelwood Court, Jericho, New York 11753]</span>
      </Typography>
    </Box>
  );
}