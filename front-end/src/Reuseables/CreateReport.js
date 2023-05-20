import jsPDF from 'jspdf';
import React from 'react';

const handleDownloadReport = (electionData) => {
    // Create a PDF document
    const doc = new jsPDF();

    // Set document title
    doc.title = "Election Report";

    // Set font styles
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);

    // Add election name
    doc.text("Election Name: " + electionData.electionName, 20, 20);

    // Set font styles for party and candidate details
    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);

    // Add party and candidate details
    let yOffset = 40; // Initial vertical offset for content
    electionData.parties.forEach((party, partyIndex) => {
        // Add party name
        doc.text("Party Name: " + party.partyName, 20, yOffset);

        // Add candidates for the party
        party.candidates.forEach((candidate, candidateIndex) => {
            const position = "Position: " + candidate.position;
            const voteCount = "Vote Count: " + candidate.voteCount;

            // Add candidate details
            const xPos = 30 + candidateIndex * 80;
            doc.text(candidate.name, xPos, yOffset + 10);
            doc.text(position, xPos, yOffset + 20);
            doc.text(voteCount, xPos, yOffset + 30);
        });

        yOffset += 50; // Increase vertical offset for the next party
    });

    // Save the PDF file
    doc.save("election_report.pdf");
};

export default handleDownloadReport;