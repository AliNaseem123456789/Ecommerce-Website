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
        mt: 6,
        px: { xs: 2, md: 4 },
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{ color: "#8c8c8c", fontWeight: 500, mb: 0.5, fontSize: "0.75rem" }}
      >
        INFORMATION QUESTIONS
      </Typography>

      <Typography
        variant="h6"
        sx={{ fontWeight: 700, color: "#2c7cf1", mb: 2, fontSize: "1.2rem" }}
      >
        FREQUENTLY ASKED QUESTIONS
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            Are your beauty products safe for sensitive skin?
          </AccordionSummary>
          <AccordionDetails>
            Yes, our products are formulated to be gentle and safe for most skin types.
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            What materials are used in your kitchen tools?
          </AccordionSummary>
          <AccordionDetails>
            High-quality stainless steel, BPA-free plastics, and food-safe silicone.
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            Do you offer international shipping?
          </AccordionSummary>
          <AccordionDetails>
            Yes, we ship to most countries worldwide.
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            How do I clean and maintain my kitchen tools?
          </AccordionSummary>
          <AccordionDetails>
            Most tools are dishwasher-safe. Hand wash delicate items.
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            Are your beauty products cruelty-free?
          </AccordionSummary>
          <AccordionDetails>
            Yes, all our products are 100% cruelty-free.
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
}
