
"use client";

import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [html, setHtml] = useState("");
  const [loading, setLoading] = useState(false);
  const [editPrompt, setEditPrompt] = useState("");

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

  async function editWebsite() {
    if (!editPrompt || !html) return;

    setLoading(true);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `
Current Website HTML:
${html}

Edit Request:
${editPrompt}

Modify the website based on the request.
Return the FULL updated HTML only.
`,
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-5xl font-black mb-2">
              AI Website Builder 🚀
            </h1>

            <p className="text-gray-600 text-lg">
              Generate and edit beautiful websites instantly with AI
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-200 mb-8">
          <div className="flex gap-4">
            <input
              className="flex-1 border border-gray-300 p-5 rounded-2xl text-black outline-none"
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

        <div className="grid grid-cols-4 gap-6">
          <div className="bg-white rounded-3xl p-5 shadow-lg border border-gray-200 h-fit">
            <h2 className="text-2xl font-bold mb-4">
              AI Editor ✨
            </h2>

            <textarea
              className="w-full border border-gray-300 rounded-2xl p-4 h-40 outline-none"
              placeholder="Make the website futuristic with blue gradients..."
              value={editPrompt}
              onChange={(e) => setEditPrompt(e.target.value)}
            />

            <button
              onClick={editWebsite}
              className="w-full bg-black text-white py-4 rounded-2xl mt-4 font-bold hover:opacity-80 transition"
            >
              Apply Edit
            </button>

            <div className="mt-8">
              <h3 className="font-bold text-lg mb-3">
                Quick Ideas
              </h3>

              <div className="space-y-2">
                <button
                  onClick={() =>
                    setPrompt("Luxury fashion ecommerce website")
                  }
                  className="w-full text-left bg-gray-100 hover:bg-gray-200 transition p-3 rounded-xl"
                >
                  Luxury Fashion
                </button>

                <button
                  onClick={() =>
                    setPrompt("Modern AI startup landing page")
                  }
                  className="w-full text-left bg-gray-100 hover:bg-gray-200 transition p-3 rounded-xl"
                >
                  AI Startup
                </button>

                <button
                  onClick={() =>
                    setPrompt("Cyberpunk gaming website")
                  }
                  className="w-full text-left bg-gray-100 hover:bg-gray-200 transition p-3 rounded-xl"
                >
                  Gaming Website
                </button>

                <button
                  onClick={() =>
                    setPrompt("Minimal coffee shop website")
                  }
                  className="w-full text-left bg-gray-100 hover:bg-gray-200 transition p-3 rounded-xl"
                >
                  Coffee Shop
                </button>
              </div>
            </div>
          </div>

          <div className="col-span-3 bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-200">
            <iframe
              title="website-preview"
              className="w-full h-[850px]"
              srcDoc={html}
            />
          </div>
        </div>
      </div>
    </main>
  );
}