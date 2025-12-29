import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount, projectRequest } = body;

    if (!amount || amount < 50) {
      return NextResponse.json(
        { error: "Amount must be at least 50 EUR" },
        { status: 400 }
      );
    }

    const apiKey = process.env.COINGATE_API_KEY;
    const environment = process.env.COINGATE_ENVIRONMENT || "live"; // 'sandbox' or 'live'
    
    if (!apiKey) {
      console.error("COINGATE_API_KEY not set");
      return NextResponse.json(
        { error: "Payment system not configured. Please contact support." },
        { status: 500 }
      );
    }

    // CoinGate API endpoint (sandbox for testing, live for production)
    const apiUrl = environment === "sandbox" 
      ? "https://api-sandbox.coingate.com/v2/orders"
      : "https://api.coingate.com/v2/orders";

    // Create order on CoinGate
    const orderData = {
      order_id: `project-${Date.now()}`,
      price_amount: amount,
      price_currency: "EUR",
      receive_currency: "EUR",
      title: `Project: ${projectRequest.projectName}`,
      description: `${projectRequest.projectType} - ${projectRequest.description.substring(0, 200)}`,
      callback_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/payment/webhook`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/payment`,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/payment/success`,
      purchaser_email: projectRequest.userEmail || "",
      // Custom data for later retrieval

    };

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${apiKey}`,
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("CoinGate API error:", errorData);
      return NextResponse.json(
        { error: "Failed to create payment order" },
        { status: response.status }
      );
    }

    const order = await response.json();

    return NextResponse.json({
      orderId: order.id,
      hostedUrl: order.payment_url,
      status: order.status,
    });
  } catch (error) {
    console.error("Payment creation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
