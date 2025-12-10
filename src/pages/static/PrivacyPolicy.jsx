import React from "react";
import { Box, Typography } from "@mui/material";

export default function PrivacyPolicy() {
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

      {/* Section */}
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
        Introduction
      </Typography>
      <Typography sx={{ mb: 3, lineHeight: 1.8, color: "#4b5563" }}>
        3S Smart Solutions Star, Inc. (“3S Smart Solutions,” “we,” “us,” or “our”) operates
        www.3sproshop.com (the “Site”) and provides ecommerce products and related
        services (the “Services”). This Privacy Policy describes how we collect, use, and
        protect your Personal Information when you interact with our Site and Services.
      </Typography>

      {/* Section */}
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
        1. Information We Collect
      </Typography>

      <Typography variant="h6" sx={{ fontWeight: 600, mt: 2, mb: 1 }}>
        A. Personal Information You Provide
      </Typography>
      <Typography sx={{ mb: 2, lineHeight: 1.8, color: "#4b5563" }}>
        When you use our Site or place an order, we may collect:
        <br />• Name
        <br />• Email address
        <br />• Phone number
        <br />• Billing and shipping address
        <br />• Payment information (processed securely by third-party processors)
        <br />• Account login details (if you create an account)
      </Typography>

      <Typography variant="h6" sx={{ fontWeight: 600, mt: 2, mb: 1 }}>
        B. Automatically Collected Data
      </Typography>
      <Typography sx={{ mb: 2, lineHeight: 1.8, color: "#4b5563" }}>
        When you visit our Site, your device or browser automatically sends:
        <br />• IP address
        <br />• Browser type and version
        <br />• Device type
        <br />• Pages viewed
        <br />• Time spent on the Site
        <br />• Location (approximate)
        <br />• Referring source
        <br />• Standard analytics data
      </Typography>

      <Typography variant="h6" sx={{ fontWeight: 600, mt: 2, mb: 1 }}>
        C. Cookies & Tracking Technologies
      </Typography>
      <Typography sx={{ mb: 3, lineHeight: 1.8, color: "#4b5563" }}>
        We use cookies to:
        <br />• Improve site performance
        <br />• Maintain preferences
        <br />• Enable secure login and checkout
        <br />• Personalize the experience
        <br />• Analyze traffic for optimizations
      </Typography>

      {/* Section */}
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
        2. How We Use Your Information
      </Typography>
      <Typography sx={{ mb: 3, lineHeight: 1.8, color: "#4b5563" }}>
        We use collected information to:
        <br />• Process and fulfill orders
        <br />• Provide customer support
        <br />• Improve site functionality
        <br />• Prevent fraud and unauthorized access
        <br />• Send service updates and promotional messages
        <br />• Analyze traffic and performance
        <br />
        <br />
        <strong>We do NOT sell your personal information.</strong>
      </Typography>

      {/* Section */}
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
        3. Sharing Your Information
      </Typography>

      <Typography variant="h6" sx={{ fontWeight: 600, mt: 2, mb: 1 }}>
        A. Service Providers
      </Typography>
      <Typography sx={{ lineHeight: 1.8, color: "#4b5563" }}>
        We may share information with:
        <br />• Payment processors
        <br />• Shipping carriers
        <br />• Hosting providers
        <br />• Analytics tools
        <br />• Email marketing services
        <br />
        These partners may use data only to perform tasks on our behalf.
      </Typography>

      <Typography variant="h6" sx={{ fontWeight: 600, mt: 2, mb: 1 }}>
        B. Legal Obligations
      </Typography>
      <Typography sx={{ lineHeight: 1.8, color: "#4b5563" }}>
        We may disclose data to comply with:
        <br />• Laws and regulations
        <br />• Court orders
        <br />• Government requests
      </Typography>

      <Typography variant="h6" sx={{ fontWeight: 600, mt: 2, mb: 1 }}>
        C. Business Transfers
      </Typography>
      <Typography sx={{ mb: 3, lineHeight: 1.8, color: "#4b5563" }}>
        Your information may be included in business transfers such as mergers or acquisitions.
      </Typography>

      {/* Section */}
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
        4. Data Security
      </Typography>
      <Typography sx={{ mb: 3, lineHeight: 1.8, color: "#4b5563" }}>
        We use commercially reasonable safeguards to protect your information.
        However, no online system is 100% secure. We take your privacy seriously and continuously
        update our security measures.
      </Typography>

      {/* Section */}
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
        5. Financial Policy (Credit & Trade References)
      </Typography>
      <Typography sx={{ mb: 3, lineHeight: 1.8, color: "#4b5563" }}>
        We do NOT provide credit references or trade references to any outside company.  
        We do not offer credit accounts or release financial relationship histories.
      </Typography>

      {/* Section */}
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
        6. Links to Third-Party Websites
      </Typography>
      <Typography sx={{ mb: 3, lineHeight: 1.8, color: "#4b5563" }}>
        External websites linked from our Site are not controlled by us.  
        We are not responsible for their content, security, or privacy practices.
      </Typography>

      {/* Section */}
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
        7. Children's Privacy
      </Typography>
      <Typography sx={{ mb: 3, lineHeight: 1.8, color: "#4b5563" }}>
        Our Services are not intended for children under 13.  
        We do not knowingly collect information from anyone under this age.
      </Typography>

      {/* Section */}
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
        8. Your Privacy Rights
      </Typography>
      <Typography sx={{ mb: 3, lineHeight: 1.8, color: "#4b5563" }}>
        Depending on your region (GDPR, CCPA, etc.), you may request:
        <br />• Access to your data
        <br />• Corrections or deletions
        <br />• Copies of stored data
        <br />• Restrictions on data processing
        <br />• Opt-out from marketing messages
      </Typography>

      {/* Section */}
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
        9. Changes to This Policy
      </Typography>
      <Typography sx={{ mb: 3, lineHeight: 1.8, color: "#4b5563" }}>
        We may update this Privacy Policy as needed.  
        Continued use of our Site means you accept updated terms.
      </Typography>

      {/* Section */}
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
        10. Contact Us
      </Typography>
      <Typography sx={{ lineHeight: 1.8, color: "#4b5563" }}>
        For questions or requests:
        <br />
        <br />
        <strong>Email:</strong> sales@3sproshop.com
        <br />
        <strong>Address:</strong> 6 Hazelwood Court, Jericho, New York 11753
        <br />
        <strong>Contact Page:</strong> [Insert URL]
      </Typography>
    </Box>
  );
}
