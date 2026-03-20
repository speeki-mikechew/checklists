#!/usr/bin/env python3
import PyPDF2
import sys
import json

def extract_pdf_text(pdf_path):
    """Extract text from PDF file"""
    text = ""
    try:
        with open(pdf_path, 'rb') as file:
            pdf_reader = PyPDF2.PdfReader(file)
            for page in pdf_reader.pages:
                text += page.extract_text() + "\n\n"
    except Exception as e:
        return f"Error: {str(e)}"
    return text

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python3 extract_pdf.py <pdf_file>")
        sys.exit(1)

    pdf_file = sys.argv[1]
    text = extract_pdf_text(pdf_file)
    print(text)
