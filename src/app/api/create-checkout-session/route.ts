import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { planName, price, period } = await req.json();

    // Converte o preço para número
    const valor = parseFloat(price.replace(',', '.'));
    const descricao = `Plano ${planName} - CLARA (${period})`;

    // Verifica se o Access Token do Mercado Pago está configurado
    const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;
    
    if (!accessToken) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Mercado Pago não configurado. Configure o Access Token nas variáveis de ambiente.',
          needsConfig: true
        },
        { status: 500 }
      );
    }

    // Cria a preferência de pagamento no Mercado Pago
    const preference = {
      items: [
        {
          title: descricao,
          quantity: 1,
          unit_price: valor,
          currency_id: 'BRL'
        }
      ],
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/success?plan=${encodeURIComponent(planName)}&valor=${valor}`,
        failure: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/?error=payment_failed`,
        pending: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/?status=pending`
      },
      auto_return: 'approved',
      payment_methods: {
        installments: 12,
        default_installments: 1
      }
    };

    const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(preference)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro ao criar preferência no Mercado Pago');
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      checkoutUrl: data.init_point,
      preferenceId: data.id,
      planName,
      period,
      valor
    });
  } catch (error: any) {
    console.error('Erro ao criar checkout do Mercado Pago:', error);
    return NextResponse.json(
      { 
        success: false,
        error: error.message || 'Erro ao processar pagamento',
        needsConfig: error.message?.includes('não configurado')
      },
      { status: 500 }
    );
  }
}
