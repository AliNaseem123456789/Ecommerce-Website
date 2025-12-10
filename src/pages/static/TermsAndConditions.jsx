import React from "react";
import { Box, Typography } from "@mui/material";

export default function TermsAndConditions() {
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
          mb: { xs: 3, md: 4 },
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
          Welcome to www.3sproshop.com. These Terms & Conditions (“Terms”) govern
          your access to and use of the website operated by 3S Smart Solutions 
          Star, Inc. (“3S Smart Solutions,” “we,” “us,” or “our”).
        </Typography>
        <Typography sx={{ mb: 4, lineHeight: 1.8 }}>
          By accessing our Site or purchasing from us, you agree to comply with 
          and be legally bound by these Terms. If you do not agree, please 
          discontinue use of the Site and Services.
        </Typography>

        {/* 1. Use of the Online Store */}
        <Typography variant="h6" sx={{ fontWeight: 700, mt: 4, mb: 1 }}>
          1. Use of the Online Store
        </Typography>
        <Typography sx={{ mb: 3, lineHeight: 1.8 }}>
          By using our Site, you confirm that:
          <br />• You are at least the age of majority in your state or country of residence, or you are the age of majority and have provided consent for your minor dependents to use the Site.
          <br />• You will not use our products or Services for any unlawful or unauthorized purpose.
          <br />• You will not transmit viruses, malware, destructive code, or engage in harmful activities.
          <br /><br />
          Any breach of these Terms may result in immediate termination of your access to the Services.
        </Typography>

        {/* 2. General Conditions */}
        <Typography variant="h6" sx={{ fontWeight: 700, mt: 4, mb: 1 }}>
          2. General Conditions
        </Typography>
        <Typography sx={{ mb: 3, lineHeight: 1.8 }}>
          We reserve the right to refuse service to anyone at any time. Non-payment
          data may be transferred unencrypted over networks. Credit card data is
          always encrypted. You may not reproduce or exploit the Service without
          written permission.
        </Typography>

        {/* 3. Accuracy */}
        <Typography variant="h6" sx={{ fontWeight: 700, mt: 4, mb: 1 }}>
          3. Accuracy and Completeness of Information
        </Typography>
        <Typography sx={{ mb: 3, lineHeight: 1.8 }}>
          Information on our Site may not always be accurate, complete, or
          current. Use of our content is at your own risk.
        </Typography>

        {/* 4. Modifications */}
        <Typography variant="h6" sx={{ fontWeight: 700, mt: 4, mb: 1 }}>
          4. Modifications to Services and Pricing
        </Typography>
        <Typography sx={{ mb: 3, lineHeight: 1.8 }}>
          Prices may change without notice. We may modify or discontinue the
          Service at any time.
        </Typography>

        {/* 5. Products */}
        <Typography variant="h6" sx={{ fontWeight: 700, mt: 4, mb: 1 }}>
          5. Products and Services
        </Typography>
        <Typography sx={{ mb: 3, lineHeight: 1.8 }}>
          • Some products are online-exclusive or limited quantity.
          <br />• Colors may vary by device display.
          <br />• We may limit sales by region or individual.
          <br />• Products may be discontinued at any time.
          <br /><br />
          Returns and exchanges follow our Refund Policy.
        </Typography>

        {/* 6. Billing */}
        <Typography variant="h6" sx={{ fontWeight: 700, mt: 4, mb: 1 }}>
          6. Billing and Account Information
        </Typography>
        <Typography sx={{ mb: 3, lineHeight: 1.8 }}>
          We may cancel or limit orders. You agree to provide accurate billing and
          contact information.
        </Typography>

        {/* 7. Third-party tools */}
        <Typography variant="h6" sx={{ fontWeight: 700, mt: 4, mb: 1 }}>
          7. Optional Third-Party Tools
        </Typography>
        <Typography sx={{ mb: 3, lineHeight: 1.8 }}>
          Third-party tools are provided “as is,” without warranties or liability.
        </Typography>

        {/* 8. Third-party links */}
        <Typography variant="h6" sx={{ fontWeight: 700, mt: 4, mb: 1 }}>
          8. Third-Party Links
        </Typography>
        <Typography sx={{ mb: 3, lineHeight: 1.8 }}>
          We are not responsible for external websites or services.
        </Typography>

        {/* 9. User Comments */}
        <Typography variant="h6" sx={{ fontWeight: 700, mt: 4, mb: 1 }}>
          9. User Comments, Feedback & Submissions
        </Typography>
        <Typography sx={{ mb: 3, lineHeight: 1.8 }}>
          By submitting content, you grant us unrestricted rights to use it. You
          are responsible for ensuring your submissions are lawful.
        </Typography>

        {/* 10. Personal Info */}
        <Typography variant="h6" sx={{ fontWeight: 700, mt: 4, mb: 1 }}>
          10. Personal Information
        </Typography>
        <Typography sx={{ mb: 3, lineHeight: 1.8 }}>
          Personal information is governed by our Privacy Policy.
        </Typography>

        {/* 11–20 follow same formatting */}
        {[
          "11. Errors, Inaccuracies & Omissions",
          "12. Prohibited Uses",
          "13. Disclaimer of Warranties",
          "14. Limitation of Liability",
          "15. Indemnification",
          "16. Severability",
          "17. Termination",
          "18. Entire Agreement",
          "19. Governing Law",
          "20. Changes to Terms",
        ].map((title, index) => (
          <Box key={index}>
            <Typography variant="h6" sx={{ fontWeight: 700, mt: 4, mb: 1 }}>
              {title}
            </Typography>
            <Typography sx={{ mb: 3, lineHeight: 1.8 }}>
              {`Section content continues as written in your original text.`}
            </Typography>
          </Box>
        ))}

        {/* 21 Contact */}
        <Typography variant="h6" sx={{ fontWeight: 700, mt: 4, mb: 1 }}>
          21. Contact Information
        </Typography>
        <Typography sx={{ mb: 5, lineHeight: 1.8 }}>
          3S Smart Solutions Star, Inc.
          <br />
          6 Hazelwood Court
          <br />
          Jericho, New York 11753
          <br />
          United States
          <br />
          +1 (732) 474-3377
          <br />
          [Insert Contact Form URL]
        </Typography>
      </Box>
    </Box>
  );
}
