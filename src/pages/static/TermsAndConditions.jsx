// import React from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
export default function TermsAndConditions() {
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
      {/* Page Heading */}
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          fontWeight: 700,
          mb: { xs: 1, md: 2 },
          fontSize: { xs: "1.7rem", md: "2rem" },
        }}
      >
        Terms & Conditions
      </Typography>

      {/* Last Updated */}
      <Typography
        sx={{
          fontSize: "0.9rem",
          color: "#6b7280",
          textAlign: "center",
          mb: 4,
        }}
      >
        Last Updated: 12/01/2025
      </Typography>

      {/* SECTION WRAPPER */}
      <Box sx={{ color: "#4b5563", fontSize: { xs: "0.9rem", md: "1rem" } }}>
        
        {/* Intro */}
        <Typography sx={{ mb: 2, lineHeight: 1.8 }}>
          Welcome to www.3sproshop.com.
        </Typography>
        <Typography sx={{ mb: 2, lineHeight: 1.8 }}>
          These Terms & Conditions ("Terms") govern your access to and use of the website operated by 3S Smart Solutions Star, Inc. ("3S Smart Solutions," "we," "us," or "our").
        </Typography>
        <Typography sx={{ mb: 4, lineHeight: 1.8 }}>
          By accessing our Site or purchasing from us, you agree to comply with and be legally bound by these Terms. If you do not agree, please discontinue use of the Site and Services.
        </Typography>

        {/* Divider */}
        <Box sx={{ borderBottom: "1px solid #e5e7eb", my: 4 }} />

        {/* 1. Use of the Online Store */}
        <Typography variant="h6" sx={{ fontWeight: 700, mt: 4, mb: 2 }}>
          1. Use of the Online Store
        </Typography>
        <Typography sx={{ mb: 2, lineHeight: 1.8 }}>
          By using our Site, you confirm that:
        </Typography>
        <Box component="ul" sx={{ pl: 4, mb: 2 }}>
          <Typography component="li" sx={{ mb: 1, lineHeight: 1.8 }}>
            You are at least the age of majority in your state or country of residence, or you are the age of majority and have provided consent for your minor dependents to use the Site.
          </Typography>
          <Typography component="li" sx={{ mb: 1, lineHeight: 1.8 }}>
            You will not use our products or Services for any unlawful or unauthorized purpose.
          </Typography>
          <Typography component="li" sx={{ mb: 2, lineHeight: 1.8 }}>
            You will not transmit viruses, malware, destructive code, or engage in harmful activities.
          </Typography>
        </Box>
        <Typography sx={{ mb: 4, lineHeight: 1.8 }}>
          Any breach of these Terms may result in immediate termination of your access to the Services.
        </Typography>

        {/* Divider */}
        <Box sx={{ borderBottom: "1px solid #e5e7eb", my: 4 }} />

        {/* 2. General Conditions */}
        <Typography variant="h6" sx={{ fontWeight: 700, mt: 4, mb: 1 }}>
          2. General Conditions
        </Typography>
        <Typography sx={{ mb: 3, lineHeight: 1.8 }}>
          We reserve the right to refuse service to anyone at any time.
        </Typography>
        <Typography sx={{ mb: 2, lineHeight: 1.8 }}>
          You understand that non-payment data (excluding credit card information) may be transferred unencrypted over various networks and adapted to technical requirements. Payment card information is always encrypted during transmission.
        </Typography>
        <Typography sx={{ mb: 4, lineHeight: 1.8 }}>
          You agree not to reproduce, duplicate, sell, resell, or exploit any part of the Service without our written permission.
        </Typography>

        {/* Divider */}
        <Box sx={{ borderBottom: "1px solid #e5e7eb", my: 4 }} />

        {/* 3. Accuracy */}
        <Typography variant="h6" sx={{ fontWeight: 700, mt: 4, mb: 1 }}>
          3. Accuracy and Completeness of Information
        </Typography>
        <Typography sx={{ mb: 2, lineHeight: 1.8 }}>
          Information on our Site may not always be accurate, complete, or current. Content is provided for general information and should not be the sole basis for decision-making. Any reliance on our Site's information is at your own risk.
        </Typography>
        <Typography sx={{ mb: 4, lineHeight: 1.8 }}>
          We may update or modify content without obligation to do so.
        </Typography>

        {/* Divider */}
        <Box sx={{ borderBottom: "1px solid #e5e7eb", my: 4 }} />

        {/* 4. Modifications */}
        <Typography variant="h6" sx={{ fontWeight: 700, mt: 4, mb: 1 }}>
          4. Modifications to Services and Pricing
        </Typography>
        <Typography sx={{ mb: 2, lineHeight: 1.8 }}>
          Product prices and availability are subject to change at any time without notice. We may modify or discontinue the Service (or any part of it) without notice.
        </Typography>
        <Typography sx={{ mb: 4, lineHeight: 1.8 }}>
          We will not be liable for any modification, price change, suspension, or discontinuance.
        </Typography>

        {/* Divider */}
        <Box sx={{ borderBottom: "1px solid #e5e7eb", my: 4 }} />

        {/* 5. Products */}
        <Typography variant="h6" sx={{ fontWeight: 700, mt: 4, mb: 2 }}>
          5. Products and Services
        </Typography>
        <Box component="ul" sx={{ pl: 4, mb: 2 }}>
          <Typography component="li" sx={{ mb: 1, lineHeight: 1.8 }}>
            Certain products may be available exclusively online and in limited quantities.
          </Typography>
          <Typography component="li" sx={{ mb: 1, lineHeight: 1.8 }}>
            Colors and product images are displayed as accurately as possible, but we cannot guarantee your device's display accuracy.
          </Typography>
          <Typography component="li" sx={{ mb: 1, lineHeight: 1.8 }}>
            We may limit sales to any person, region, or jurisdiction at our discretion.
          </Typography>
          <Typography component="li" sx={{ mb: 2, lineHeight: 1.8 }}>
            We may discontinue any product at any time.
          </Typography>
        </Box>
        <Typography sx={{ mb: 2, lineHeight: 1.8 }}>
          All product descriptions, pricing, and offers are subject to change at any time.
        </Typography>
       <Typography sx={{ mb: 4, lineHeight: 1.8 }}>
  Returns and exchanges are governed by our Refund Policy: 👉 
  <span
    onClick={() => navigate("/refund-returns")}
    style={{
      color: "#2563eb",
      cursor: "pointer",
      textDecoration: "underline",
      fontWeight: 600,
      marginLeft: "4px",
    }}
  >
    [Insert Refund Policy Link]
  </span>
</Typography>
        {/* Divider */}
        <Box sx={{ borderBottom: "1px solid #e5e7eb", my: 4 }} />

        {/* 6. Billing */}
        <Typography variant="h6" sx={{ fontWeight: 700, mt: 4, mb: 2 }}>
          6. Billing and Account Information
        </Typography>
        <Typography sx={{ mb: 2, lineHeight: 1.8 }}>
          We reserve the right to refuse or cancel any order. Restrictions may include orders:
        </Typography>
        <Box component="ul" sx={{ pl: 4, mb: 2 }}>
          <Typography component="li" sx={{ mb: 1, lineHeight: 1.8 }}>
            Using the same customer account
          </Typography>
          <Typography component="li" sx={{ mb: 1, lineHeight: 1.8 }}>
            Using the same payment method
          </Typography>
          <Typography component="li" sx={{ mb: 2, lineHeight: 1.8 }}>
            Using the same billing or shipping address
          </Typography>
        </Box>
        <Typography sx={{ mb: 2, lineHeight: 1.8 }}>
          If an order is changed or canceled, we may attempt to notify you using the contact information provided at purchase.
        </Typography>
        <Typography sx={{ mb: 4, lineHeight: 1.8 }}>
          You agree to provide accurate and up-to-date account information, including billing details, email, and credit card expiration dates.
        </Typography>

        {/* Divider */}
        <Box sx={{ borderBottom: "1px solid #e5e7eb", my: 4 }} />

        {/* 7. Third-party tools */}
        <Typography variant="h6" sx={{ fontWeight: 700, mt: 4, mb: 1 }}>
          7. Optional Third-Party Tools
        </Typography>
        <Typography sx={{ mb: 2, lineHeight: 1.8 }}>
          We may provide access to third-party tools which we do not control or supervise. These tools are provided "as is" without warranties. Your use of optional tools is entirely at your own risk.
        </Typography>
        <Typography sx={{ mb: 4, lineHeight: 1.8 }}>
          Future new features or services added to the Site will also be subject to these Terms.
        </Typography>

        {/* Divider */}
        <Box sx={{ borderBottom: "1px solid #e5e7eb", my: 4 }} />

        {/* 8. Third-party links */}
        <Typography variant="h6" sx={{ fontWeight: 700, mt: 4, mb: 1 }}>
          8. Third-Party Links
        </Typography>
        <Typography sx={{ mb: 2, lineHeight: 1.8 }}>
          The Site may include content or links to third-party websites. We are not responsible for evaluating or guaranteeing the accuracy of third-party content and will not be liable for:
        </Typography>
        <Box component="ul" sx={{ pl: 4, mb: 2 }}>
          <Typography component="li" sx={{ mb: 1, lineHeight: 1.8 }}>
            Third-party products
          </Typography>
          <Typography component="li" sx={{ mb: 1, lineHeight: 1.8 }}>
            Services
          </Typography>
          <Typography component="li" sx={{ mb: 1, lineHeight: 1.8 }}>
            Websites
          </Typography>
          <Typography component="li" sx={{ mb: 2, lineHeight: 1.8 }}>
            Transactions
          </Typography>
        </Box>
        <Typography sx={{ mb: 4, lineHeight: 1.8 }}>
          Please review relevant third-party policies before engaging with them.
        </Typography>

        {/* Divider */}
        <Box sx={{ borderBottom: "1px solid #e5e7eb", my: 4 }} />

        {/* 9. User Comments */}
        <Typography variant="h6" sx={{ fontWeight: 700, mt: 4, mb: 2 }}>
          9. User Comments, Feedback & Submissions
        </Typography>
        <Typography sx={{ mb: 2, lineHeight: 1.8 }}>
          If you submit content, feedback, suggestions, proposals, or other materials ("Comments"), you agree that:
        </Typography>
        <Box component="ul" sx={{ pl: 4, mb: 2 }}>
          <Typography component="li" sx={{ mb: 1, lineHeight: 1.8 }}>
            We may use, copy, publish, and distribute them without restriction.
          </Typography>
          <Typography component="li" sx={{ mb: 1, lineHeight: 1.8 }}>
            We are not obligated to maintain comments in confidence or respond to them.
          </Typography>
          <Typography component="li" sx={{ mb: 2, lineHeight: 1.8 }}>
            You will not submit unlawful, defamatory, obscene, or harmful content.
          </Typography>
        </Box>
        <Typography sx={{ mb: 4, lineHeight: 1.8 }}>
          You are solely responsible for the accuracy of your submissions.
        </Typography>

        {/* Divider */}
        <Box sx={{ borderBottom: "1px solid #e5e7eb", my: 4 }} />

        {/* 10. Personal Info */}
        <Typography variant="h6" sx={{ fontWeight: 700, mt: 4, mb: 1 }}>
          10. Personal Information
        </Typography>
       <Typography sx={{ mb: 4, lineHeight: 1.8 }}>
  Your submission of Personal Information is governed by our Privacy Policy: 👉 
  <span
    onClick={() => navigate("/privacy-policy")}
    style={{
      color: "#2563eb",
      cursor: "pointer",
      textDecoration: "underline",
      fontWeight: 600,
      marginLeft: "4px",
    }}
  >
    [Insert Privacy Policy Link]
  </span>
</Typography>

        {/* Divider */}
        <Box sx={{ borderBottom: "1px solid #e5e7eb", my: 4 }} />

        {/* 11. Errors */}
        <Typography variant="h6" sx={{ fontWeight: 700, mt: 4, mb: 2 }}>
          11. Errors, Inaccuracies & Omissions
        </Typography>
        <Typography sx={{ mb: 2, lineHeight: 1.8 }}>
          Occasionally, our Site may contain:
        </Typography>
        <Box component="ul" sx={{ pl: 4, mb: 2 }}>
          <Typography component="li" sx={{ mb: 1, lineHeight: 1.8 }}>
            Typographical errors
          </Typography>
          <Typography component="li" sx={{ mb: 1, lineHeight: 1.8 }}>
            Pricing inaccuracies
          </Typography>
          <Typography component="li" sx={{ mb: 1, lineHeight: 1.8 }}>
            Product detail errors
          </Typography>
          <Typography component="li" sx={{ mb: 2, lineHeight: 1.8 }}>
            Shipping or availability inaccuracies
          </Typography>
        </Box>
        <Typography sx={{ mb: 2, lineHeight: 1.8 }}>
          We reserve the right to correct these issues and update information or cancel orders.
        </Typography>
        <Typography sx={{ mb: 4, lineHeight: 1.8 }}>
          We are not obligated to update Site information except as required by law.
        </Typography>

        {/* Divider */}
        <Box sx={{ borderBottom: "1px solid #e5e7eb", my: 4 }} />

        {/* 12. Prohibited Uses */}
        <Typography variant="h6" sx={{ fontWeight: 700, mt: 4, mb: 2 }}>
          12. Prohibited Uses
        </Typography>
        <Typography sx={{ mb: 2, lineHeight: 1.8 }}>
          You are prohibited from using the Site:
        </Typography>
        <Box component="ul" sx={{ pl: 4, mb: 2 }}>
          <Typography component="li" sx={{ mb: 1, lineHeight: 1.8 }}>
            For unlawful purposes
          </Typography>
          <Typography component="li" sx={{ mb: 1, lineHeight: 1.8 }}>
            To solicit others to perform unlawful acts
          </Typography>
          <Typography component="li" sx={{ mb: 1, lineHeight: 1.8 }}>
            To violate laws or regulations
          </Typography>
          <Typography component="li" sx={{ mb: 1, lineHeight: 1.8 }}>
            To infringe on intellectual property
          </Typography>
          <Typography component="li" sx={{ mb: 1, lineHeight: 1.8 }}>
            To harass, harm, insult, defame, or discriminate
          </Typography>
          <Typography component="li" sx={{ mb: 1, lineHeight: 1.8 }}>
            To submit false information
          </Typography>
          <Typography component="li" sx={{ mb: 1, lineHeight: 1.8 }}>
            To upload malware
          </Typography>
          <Typography component="li" sx={{ mb: 1, lineHeight: 1.8 }}>
            To collect personal information of others
          </Typography>
          <Typography component="li" sx={{ mb: 1, lineHeight: 1.8 }}>
            For spam, phishing, or fraudulent activity
          </Typography>
          <Typography component="li" sx={{ mb: 2, lineHeight: 1.8 }}>
            To interfere with security features
          </Typography>
        </Box>
        <Typography sx={{ mb: 4, lineHeight: 1.8 }}>
          We may terminate your use of the Service for violating prohibited uses.
        </Typography>

        {/* Divider */}
        <Box sx={{ borderBottom: "1px solid #e5e7eb", my: 4 }} />

        {/* 13. Disclaimer of Warranties */}
        <Typography variant="h6" sx={{ fontWeight: 700, mt: 4, mb: 2 }}>
          13. Disclaimer of Warranties
        </Typography>
        <Typography sx={{ mb: 2, lineHeight: 1.8 }}>
          We do not guarantee that:
        </Typography>
        <Box component="ul" sx={{ pl: 4, mb: 2 }}>
          <Typography component="li" sx={{ mb: 1, lineHeight: 1.8 }}>
            The Service will be continuous, error-free, secure, or timely
          </Typography>
          <Typography component="li" sx={{ mb: 2, lineHeight: 1.8 }}>
            Results from using the Service will be accurate or reliable
          </Typography>
        </Box>
        <Typography sx={{ mb: 2, lineHeight: 1.8 }}>
          The Service and all products are provided "as is" and "as available" without warranties, either expressed or implied.
        </Typography>
        <Typography sx={{ mb: 2, lineHeight: 1.8 }}>
          To the fullest extent permitted by law, 3S Smart Solutions Star, Inc. is not liable for:
        </Typography>
        <Box component="ul" sx={{ pl: 4, mb: 2 }}>
          <Typography component="li" sx={{ mb: 1, lineHeight: 1.8 }}>
            Lost profits
          </Typography>
          <Typography component="li" sx={{ mb: 1, lineHeight: 1.8 }}>
            Lost revenue or savings
          </Typography>
          <Typography component="li" sx={{ mb: 1, lineHeight: 1.8 }}>
            Data loss
          </Typography>
          <Typography component="li" sx={{ mb: 2, lineHeight: 1.8 }}>
            Replacement costs
          </Typography>
          <Typography component="li" sx={{ mb: 2, lineHeight: 1.8 }}>
            Indirect or consequential damages
          </Typography>
        </Box>
        <Typography sx={{ mb: 4, lineHeight: 1.8 }}>
          Some states do not allow limitation of liability; in such cases, liability is limited to the maximum permitted by law.
        </Typography>

        {/* Divider */}
        <Box sx={{ borderBottom: "1px solid #e5e7eb", my: 4 }} />

        {/* 14. Indemnification */}
        <Typography variant="h6" sx={{ fontWeight: 700, mt: 4, mb: 1 }}>
          14. Indemnification
        </Typography>
        <Typography sx={{ mb: 4, lineHeight: 1.8 }}>
          You agree to indemnify and hold harmless 3S Smart Solutions Star, Inc., including its owners, officers, employees, agents, contractors, and affiliates, from all claims, damages, losses, or expenses arising from your:
        </Typography>
        <Box component="ul" sx={{ pl: 4, mb: 4 }}>
          <Typography component="li" sx={{ mb: 1, lineHeight: 1.8 }}>
            Violation of these Terms
          </Typography>
          <Typography component="li" sx={{ mb: 1, lineHeight: 1.8 }}>
            Violation of laws
          </Typography>
          <Typography component="li" sx={{ mb: 1, lineHeight: 1.8 }}>
            Violation of third-party rights
          </Typography>
        </Box>

        {/* Divider */}
        <Box sx={{ borderBottom: "1px solid #e5e7eb", my: 4 }} />

        {/* 15. Severability */}
        <Typography variant="h6" sx={{ fontWeight: 700, mt: 4, mb: 1 }}>
          15. Severability
        </Typography>
        <Typography sx={{ mb: 4, lineHeight: 1.8 }}>
          If any part of these Terms is found unenforceable, the remainder will remain fully valid and enforceable.
        </Typography>

        {/* Divider */}
        <Box sx={{ borderBottom: "1px solid #e5e7eb", my: 4 }} />

        {/* 16. Termination */}
        <Typography variant="h6" sx={{ fontWeight: 700, mt: 4, mb: 1 }}>
          16. Termination
        </Typography>
        <Typography sx={{ mb: 2, lineHeight: 1.8 }}>
          We may terminate access at any time if we believe you violated any part of these Terms. You remain liable for all charges incurred up to the date of termination.
        </Typography>
        <Typography sx={{ mb: 4, lineHeight: 1.8 }}>
          You may terminate your account by discontinuing use of the Site.
        </Typography>

        {/* Divider */}
        <Box sx={{ borderBottom: "1px solid #e5e7eb", my: 4 }} />

        {/* 17. Entire Agreement */}
        <Typography variant="h6" sx={{ fontWeight: 700, mt: 4, mb: 1 }}>
          17. Entire Agreement
        </Typography>
        <Typography sx={{ mb: 4, lineHeight: 1.8 }}>
          These Terms, together with posted policies and notices, constitute the entire agreement between you and us regarding the Service and replace any prior agreements.
        </Typography>

        {/* Divider */}
        <Box sx={{ borderBottom: "1px solid #e5e7eb", my: 4 }} />

        {/* 18. Governing Law */}
        <Typography variant="h6" sx={{ fontWeight: 700, mt: 4, mb: 1 }}>
          18. Governing Law
        </Typography>
        <Typography sx={{ mb: 4, lineHeight: 1.8 }}>
          These Terms are governed by the laws of the State of New York, USA, without regard to conflict-of-law principles.
        </Typography>

        {/* Divider */}
        <Box sx={{ borderBottom: "1px solid #e5e7eb", my: 4 }} />

        {/* 19. Changes to Terms */}
        <Typography variant="h6" sx={{ fontWeight: 700, mt: 4, mb: 1 }}>
          19. Changes to Terms
        </Typography>
        <Typography sx={{ mb: 4, lineHeight: 1.8 }}>
          We may update or modify these Terms at any time. Your continued use of the Site constitutes acceptance of all changes.
        </Typography>

        {/* Divider */}
        <Box sx={{ borderBottom: "1px solid #e5e7eb", my: 4 }} />

        {/* 20. Contact */}
        <Typography variant="h6" sx={{ fontWeight: 700, mt: 4, mb: 2 }}>
          20. Contact Information
        </Typography>
        <Typography sx={{ mb: 2, lineHeight: 1.8 }}>
          If you have questions about these Terms, you may contact us:
        </Typography>
        <Typography sx={{ mb: 1, lineHeight: 1.8 }}>
          3S Smart Solutions Star, Inc.
        </Typography>
        <Typography sx={{ mb: 1, lineHeight: 1.8 }}>
          6 Hazelwood Court
        </Typography>
        <Typography sx={{ mb: 1, lineHeight: 1.8 }}>
          Jericho, New York 11753
        </Typography>
        <Typography sx={{ mb: 1, lineHeight: 1.8 }}>
          United States
        </Typography>
        <Typography sx={{ mb: 1, lineHeight: 1.8 }}>
          📞 +1 (732) 474-3377
        </Typography>
      

<Typography sx={{ mb: 5, lineHeight: 1.8 }}>
  📩 
  <span
    onClick={() => navigate("/contact-us")}
    style={{
      color: "#2563eb",
      cursor: "pointer",
      textDecoration: "underline",
      fontWeight: 600,
      marginLeft: "4px",
    }}
  >
    [Insert Contact Form URL]
  </span>
</Typography>
      </Box>
    </Box>
  );
}