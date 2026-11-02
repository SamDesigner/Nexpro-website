import { NextRequest, NextResponse } from 'next/server';
export const runtime = 'nodejs';
const services = new Set(['Oilfield services & drilling support','Procurement & general supplies','Engineering & construction','Equipment rental','Supplier partnership','General enquiry']);
export async function POST(request: NextRequest) {
  const origin = request.headers.get('origin');
  if (origin && origin !== request.nextUrl.origin) return NextResponse.json({error:'Invalid request origin.'},{status:403});
  let data: Record<string, unknown>;
  try { const raw = await request.text(); if(raw.length>12000) return NextResponse.json({error:'Your message is too long.'},{status:413}); data=JSON.parse(raw); if(!data || typeof data!=='object' || Array.isArray(data)) throw new Error(); }
  catch {return NextResponse.json({error:'Please submit a valid enquiry.'},{status:400});}
  if(data.website) return NextResponse.json({ok:true});
  const clean=(key:string)=>typeof data[key]==='string'?(data[key] as string).trim():'';
  const name=clean('name'),email=clean('email'),company=clean('company'),phone=clean('phone'),service=clean('service'),message=clean('message');
  if(!name || name.length>100 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length>254 || company.length>150 || phone.length>40 || !services.has(service) || message.length<10 || message.length>5000) return NextResponse.json({error:'Please check your name, email, service and project details.'},{status:400});
  if(!process.env.RESEND_API_KEY || !process.env.CONTACT_FROM_EMAIL) return NextResponse.json({error:'Online delivery is not yet configured. Please contact nexpetro18@outlook.com directly.'},{status:503});
  try {
    const response=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${process.env.RESEND_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify({from:process.env.CONTACT_FROM_EMAIL,to:['nexpetro18@outlook.com'],reply_to:email,subject:`Website enquiry: ${service}`,text:`Name: ${name}\nEmail: ${email}\nCompany: ${company || 'Not provided'}\nPhone: ${phone || 'Not provided'}\nService: ${service}\n\n${message}`}),signal:AbortSignal.timeout(12000)});
    if(!response.ok) throw new Error('Delivery failed');
    return NextResponse.json({ok:true});
  }catch{return NextResponse.json({error:'We could not deliver your message. Please try again or email us directly.'},{status:502});}
}
