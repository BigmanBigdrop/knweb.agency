import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    if (data.session) {
      console.log("Session créée côté serveur:", !!data.session);
      return NextResponse.json({
        user: data.user,
        session: data.session,
        success: true,
      });
    }

    return NextResponse.json(
      { error: "Échec de la création de session" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Erreur API login:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
