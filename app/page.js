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
  const [buttonText, setButtonText] = useState('按这儿！');
  const [matchingSubstringsLocal, setMatchingSubstringsLocal] = useState([]);
  const [groupedMatchingSubstringsLocal, setGroupedMatchingSubstringsLocal] = useState([[], []]);

  const [matchingSubstringsRemote, setMatchingSubstringsRemote] = useState([]);
  const [groupedMatchingSubstringsRemote, setGroupedMatchingSubstringsRemote] = useState([[], []]);

  const handleClick = async () => {
    try {
      const clipboardContent = await navigator.clipboard.readText();
      setButtonText(clipboardContent);

      // Apply regex to extract substrings
      const regex = /\. ([a-zA-Z0-9]+)/g;
      const matches = clipboardContent.match(regex);
      if (matches) {
        setMatchingSubstringsLocal(matches.slice(1, 11).map(match => match.substring(2)).join(', ')); // Exclude ". " from matched substrings and join them with commas
        setMatchingSubstringsRemote(matches.slice(1, 10).map(match => match.substring(2)).join(', '));
        // Convert matching substrings into two sets of strings each with 5 results
        const firstSet = matches.slice(1, 6).map(match => match.substring(2)); // Exclude ". " from matched substrings
        const secondSetLocal = matches.slice(6, 11).map(match => match.substring(2)); // Exclude ". " from matched substrings
        const secondSetRemote = matches.slice(6, 10).map(match => match.substring(2)); // Exclude ". " from matched substrings
        setGroupedMatchingSubstringsLocal([firstSet, secondSetLocal]);
        setGroupedMatchingSubstringsRemote([firstSet, secondSetRemote]);
      } else {
        setMatchingSubstringsLocal([]);
        setGroupedMatchingSubstringsLocal([[], []]);
        setGroupedMatchingSubstringsRemote([[], []]);
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
        <button
            className="bg-blue-500 text-white border border-blue-500 px-4 py-2 rounded-md transition duration-300 hover:bg-blue-300 mb-4"
            onClick={handleClick}>{buttonText}</button>
        <div className="rounded-lg border border-green-500 text-cyan-500 p-4 shadow-md mb-4">
          <h3>如果你是<span className="inline underline font-bold">近程票</span>：</h3>
          <div>
            <h3>一次性复制所有（只包括接龙2-11）:</h3>
            <button
                className="bg-blue-500 text-white border border-blue-500 px-4 py-2 rounded-md transition duration-300 hover:bg-blue-300"
                onClick={() => handleCopyToClipboard(matchingSubstringsLocal)}>{matchingSubstringsLocal}</button>
          </div>
          <div>
            <h3>分开的，2-6 然后是7-11:</h3>
            <div className="mb-4">
              <button
                  className="bg-blue-500 text-white border border-blue-500 px-4 py-2 rounded-md transition duration-300 hover:bg-blue-300"
                  onClick={() => handleCopyToClipboard(groupedMatchingSubstringsLocal[0].join(', '))}>{groupedMatchingSubstringsLocal[0].join(', ')}</button>
            </div>

            <div className="mb-4">
              <button
                  className="bg-blue-500 text-white border border-blue-500 px-4 py-2 rounded-md transition duration-300 hover:bg-blue-300"
                  onClick={() => handleCopyToClipboard(groupedMatchingSubstringsLocal[1].join(', '))}>{groupedMatchingSubstringsLocal[1].join(', ')}</button>
            </div>
          </div>
        </div>

        <hr className="border-t border-gray-500 mb-4" />
        <div className="rounded-lg border border-cyan-500 text-cyan-500 p-4 shadow-md">
          <h3>如果你是<span className="inline underline font-bold">远程票！</span>：</h3>
          <div>
            <h3>一次性复制所有（只包括接龙2-10）:</h3>
            <button
                className="bg-blue-500 text-white border border-blue-500 px-4 py-2 rounded-md transition duration-300 hover:bg-blue-300"
                onClick={() => handleCopyToClipboard(matchingSubstringsRemote)}>{matchingSubstringsRemote}</button>
          </div>
          <div>
            <h3>分开的，2-6 然后是7-10:</h3>
            <div className="mb-4">
              <button
                  className="bg-blue-500 text-white border border-blue-500 px-4 py-2 rounded-md transition duration-300 hover:bg-blue-300"
                  onClick={() => handleCopyToClipboard(groupedMatchingSubstringsRemote[0].join(', '))}>{groupedMatchingSubstringsRemote[0].join(', ')}</button>
            </div>

            <div className="mb-4">
              <button
                  className="bg-blue-500 text-white border border-blue-500 px-4 py-2 rounded-md transition duration-300 hover:bg-blue-300"
                  onClick={() => handleCopyToClipboard(groupedMatchingSubstringsRemote[1].join(', '))}>{groupedMatchingSubstringsRemote[1].join(', ')}</button>
            </div>
          </div>
        </div>
      </div>
  );
}