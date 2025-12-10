import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function FAQ() {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 900,
        mx: "auto",
        mt: { xs: 4, md: 8 },
        px: { xs: 2, md: 4 },
      }}
    >
      {/* Heading */}
      <Typography
        variant="subtitle2"
        sx={{
          color: "#8c8c8c",
          fontWeight: 500,
          mb: 0.5,
          fontSize: { xs: "0.7rem", md: "0.75rem" },
        }}
      >
        INFORMATION QUESTIONS
      </Typography>

      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          color: "#2c7cf1",
          mb: { xs: 2.5, md: 4 },
          fontSize: { xs: "1.2rem", md: "1.6rem" },
        }}
      >
        FREQUENTLY ASKED QUESTIONS
      </Typography>

      {/* Accordions */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{ px: { xs: 1, md: 2 } }}
          >
            <Typography>Are your beauty products safe for sensitive skin?</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ px: { xs: 1, md: 2 } }}>
            Yes, our products are formulated to be gentle and safe for most skin types.
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: { xs: 1, md: 2 } }}>
            <Typography>What materials are used in your kitchen tools?</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ px: { xs: 1, md: 2 } }}>
            High-quality stainless steel, BPA-free plastics, and food-safe silicone.
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: { xs: 1, md: 2 } }}>
            <Typography>Do you offer international shipping?</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ px: { xs: 1, md: 2 } }}>
            Yes, we ship to most countries worldwide.
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: { xs: 1, md: 2 } }}>
            <Typography>How do I clean and maintain my kitchen tools?</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ px: { xs: 1, md: 2 } }}>
            Most tools are dishwasher-safe. Hand wash delicate items.
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: { xs: 1, md: 2 } }}>
            <Typography>Are your beauty products cruelty-free?</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ px: { xs: 1, md: 2 } }}>
            Yes, all our products are 100% cruelty-free.
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
}
