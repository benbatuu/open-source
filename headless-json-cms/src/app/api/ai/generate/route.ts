import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { schemaId, topic, language, instructions } = await request.json()
    if (!schemaId || !topic) {
      return NextResponse.json({ error: "schemaId and topic are required" }, { status: 400 })
    }

    // Stub AI generation; replace with real provider integration.
    const html = `
      <h1>${topic}</h1>
      <p>${instructions || ""}</p>
      <h2>Overview</h2>
      <p>${language === "tr" ? "Bu içerik, seçtiğiniz şemaya uygun olarak oluşturulmuştur." : "This content is generated according to the selected schema."}</p>
      <h2>Details</h2>
      <ul>
        <li>${language === "tr" ? "Ana nokta 1" : "Key point 1"}</li>
        <li>${language === "tr" ? "Ana nokta 2" : "Key point 2"}</li>
        <li>${language === "tr" ? "Ana nokta 3" : "Key point 3"}</li>
      </ul>
    `

    return NextResponse.json({ html })
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate content" }, { status: 500 })
  }
}


