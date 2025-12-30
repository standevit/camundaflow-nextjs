import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { priceAmount, priceCurrency, title, description, successUrl, cancelUrl, metadata } = body;

    if (!priceAmount || priceAmount < 50) {
      return NextResponse.json(
        { error: "Amount must be at least 50 EUR" },
        { status: 400 }
      );
    }

    const apiKey = process.env.COINGATE_API_KEY;
    const environment = process.env.COINGATE_ENVIRONMENT || "sandbox"; // 'sandbox' or 'live'
    
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
      order_id: `order-${Date.now()}`,
      price_amount: priceAmount,
      price_currency: priceCurrency || "EUR",
      receive_currency: priceCurrency || "EUR",
      title: title || "CamundaFlow Project",
      description: description || "CamundaFlow service request",
      callback_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/payment/webhook`,
      cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/payment`,
      success_url: successUrl || `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/payment/success`,
      purchaser_email: metadata?.email || "",
    };

    console.log("Creating CoinGate order:", { environment, orderData });

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${apiKey}`,
      },
      body: JSON.stringify(orderData),
    });

    const responseText = await response.text();
    console.log("CoinGate response status:", response.status);
    console.log("CoinGate response body:", responseText);

    if (!response.ok) {
      let errorData;
      try {
        errorData = JSON.parse(responseText);
      } catch {
        errorData = { message: responseText };
      }
      console.error("CoinGate API error:", errorData);
      return NextResponse.json(
        { error: "Failed to create payment order", details: errorData },
        { status: response.status }
      );
    }

    const order = JSON.parse(responseText);

    return NextResponse.json({
      orderId: order.id,
      checkoutUrl: order.payment_url,
      status: order.status,
    });
  } catch (error) {
    console.error("Payment creation error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
