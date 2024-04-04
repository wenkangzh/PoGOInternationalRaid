'use client'
import React, { useState } from 'react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

    <ClipboardReader>Test</ClipboardReader>
    </main>
  );
}

function ClipboardReader() {
  const [buttonText, setButtonText] = useState('Click to Read Clipboard');
  const [matchingSubstrings, setMatchingSubstrings] = useState([]);
  const [groupedMatchingSubstrings, setGroupedMatchingSubstrings] = useState([[], []]);

  const handleClick = async () => {
    try {
      const clipboardContent = await navigator.clipboard.readText();
      setButtonText(clipboardContent);

      // Apply regex to extract substrings
      const regex = /\. ([a-zA-Z0-9]+)/g;
      const matches = clipboardContent.match(regex);
      if (matches) {
        setMatchingSubstrings(matches.map(match => match.substring(2)).join(', ')); // Exclude ". " from matched substrings and join them with commas

        // Convert matching substrings into two sets of strings each with 5 results
        const firstSet = matches.slice(0, 5).map(match => match.substring(2)); // Exclude ". " from matched substrings
        const secondSet = matches.slice(5, 10).map(match => match.substring(2)); // Exclude ". " from matched substrings
        setGroupedMatchingSubstrings([firstSet, secondSet]);
      } else {
        setMatchingSubstrings([]);
        setGroupedMatchingSubstrings([[], []]);
      }
    } catch (error) {
      console.error('Failed to read clipboard:', error);
    }
  };

  const handleCopyToClipboard = async (content) => {
    try {
      await navigator.clipboard.writeText(content);
      alert('Copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  return (
      <div>
        <button className="bg-blue-500 text-white border border-blue-500 px-4 py-2 rounded-md transition duration-300 hover:bg-blue-300" onClick={handleClick}>{buttonText}</button>
        <div>
          <h3>Matching Substrings:</h3>
          <button className="bg-blue-500 text-white border border-blue-500 px-4 py-2 rounded-md transition duration-300 hover:bg-blue-300" onClick={() => handleCopyToClipboard(matchingSubstrings)}>{matchingSubstrings}</button>
        </div>
        <div>
          <h3>Grouped Matching Substrings:</h3>
          <div>
            <button className="bg-blue-500 text-white border border-blue-500 px-4 py-2 rounded-md transition duration-300 hover:bg-blue-300" onClick={() => handleCopyToClipboard(groupedMatchingSubstrings[0].join(', '))}>{groupedMatchingSubstrings[0].join(', ')}</button>
          </div>
          <div>
            <button className="bg-blue-500 text-white border border-blue-500 px-4 py-2 rounded-md transition duration-300 hover:bg-blue-300" onClick={() => handleCopyToClipboard(groupedMatchingSubstrings[1].join(', '))}>{groupedMatchingSubstrings[1].join(', ')}</button>
          </div>
        </div>
      </div>
  );
}