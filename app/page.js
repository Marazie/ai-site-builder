"use client";

import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [html, setHtml] = useState("");
  const [loading, setLoading] = useState(false);

  async function generateWebsite() {
    if (!prompt) return;

    setLoading(true);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
        }),
      });

      const data = await res.json();

      setHtml(data.result);
    } catch (err) {
      console.log(err);
      alert("Something went wrong.");
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-gray-100 text-black p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-black mb-3">
          AI Website Builder 🚀
        </h1>

        <p className="text-gray-600 mb-8 text-lg">
          Create websites instantly with AI
        </p>

        <div className="bg-white p-6 rounded-3xl shadow-lg mb-8">
          <div className="flex gap-4">
            <input
              className="flex-1 border border-gray-300 p-5 rounded-2xl text-black"
              placeholder="Create a futuristic sneaker website..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />

            <button
              onClick={generateWebsite}
              className="bg-black text-white px-8 rounded-2xl font-bold hover:opacity-80 transition"
            >
              {loading ? "Generating..." : "Generate"}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-200">
          <iframe
            title="website-preview"
            className="w-full h-[850px]"
            srcDoc={html}
          />
        </div>
      </div>
    </main>
  );
}